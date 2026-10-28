import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  signInWithRedirect, 
  getRedirectResult, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  onSnapshot 
} from 'firebase/firestore';

const LOCAL_STORAGE_KEY = 'nihongo_flow_progress_v1';
const FIREBASE_CONFIG_KEY = 'nihongo_flow_firebase_config_v1';

// Default / fallback Firebase config from Vite environment variables (if provided)
const envConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ''
};

let app = null;
let auth = null;
let db = null;
let googleProvider = null;

export function getSavedFirebaseConfig() {
  try {
    const saved = localStorage.getItem(FIREBASE_CONFIG_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.warn('Error reading stored Firebase config', e);
  }
  return envConfig.apiKey ? envConfig : null;
}

export function saveFirebaseConfig(config) {
  try {
    localStorage.setItem(FIREBASE_CONFIG_KEY, JSON.stringify(config));
    window.location.reload();
  } catch (e) {
    console.error('Failed to save config', e);
  }
}

export function isFirebaseConfigured() {
  const cfg = getSavedFirebaseConfig();
  return Boolean(cfg && cfg.apiKey && cfg.projectId);
}

// Initialize Firebase SDK safely
export function setupFirebase() {
  const config = getSavedFirebaseConfig();
  if (!config || !config.apiKey) return null;

  try {
    if (!getApps().length) {
      app = initializeApp(config);
    } else {
      app = getApp();
    }
    auth = getAuth(app);
    db = getFirestore(app);
    googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({ prompt: 'select_account' });
    return { app, auth, db };
  } catch (err) {
    console.error('Firebase initialization error:', err);
    return null;
  }
}

// Initial attempt to start
setupFirebase();

// Google Sign-In with mobile-friendly popup/redirect detection
export async function loginWithGoogle() {
  if (!auth || !googleProvider) {
    throw new Error('請先在設定中輸入您的 Firebase 設定金鑰，即可開啟 Google 同步！');
  }

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  try {
    if (isMobile) {
      // Popup can sometimes be blocked by mobile browsers; redirect works smoothly on iOS/Android
      try {
        const res = await signInWithPopup(auth, googleProvider);
        return res.user;
      } catch (popupErr) {
        if (popupErr.code === 'auth/popup-blocked' || popupErr.code === 'auth/cancelled-popup-request') {
          await signInWithRedirect(auth, googleProvider);
          return null;
        }
        throw popupErr;
      }
    } else {
      const res = await signInWithPopup(auth, googleProvider);
      return res.user;
    }
  } catch (err) {
    console.error('Google login error:', err);
    throw err;
  }
}

// Log out user
export async function logoutUser() {
  if (!auth) return;
  await signOut(auth);
}

// Auth State Listener
export function onAuthChange(callback) {
  if (!auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}

// --- LOCAL STORAGE PROGRESS MANAGEMENT ---
export const DEFAULT_PROGRESS = {
  kanaMastered: {},   // { [id]: true }
  kanaSRS: {},        // { [id]: { level: 0, nextReview: timestamp, streak: 0 } }
  vocabMastered: {},  // { [id]: true }
  streak: {
    count: 1,
    lastActiveDate: new Date().toISOString().slice(0, 10),
  },
  xp: 0,
  quizStats: {
    total: 0,
    correct: 0,
  },
  updatedAt: Date.now()
};

export function getLocalProgress() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return updateStreakCalculation({ ...DEFAULT_PROGRESS, ...parsed });
    }
  } catch (e) {
    console.warn('Failed reading local progress:', e);
  }
  return updateStreakCalculation(DEFAULT_PROGRESS);
}

export function saveLocalProgress(progress) {
  try {
    const updated = { ...progress, updatedAt: Date.now() };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed saving local progress:', e);
    return progress;
  }
}

// Calculate daily active streak
function updateStreakCalculation(prog) {
  const today = new Date().toISOString().slice(0, 10);
  const lastDate = prog.streak?.lastActiveDate;

  if (!lastDate) {
    return {
      ...prog,
      streak: { count: 1, lastActiveDate: today }
    };
  }

  if (lastDate === today) {
    return prog;
  }

  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (lastDate === yesterday) {
    return {
      ...prog,
      streak: { count: (prog.streak?.count || 0) + 1, lastActiveDate: today }
    };
  } else {
    // Missed more than a day
    return {
      ...prog,
      streak: { count: 1, lastActiveDate: today }
    };
  }
}

// --- CLOUD FIRESTORE PROGRESS SYNC ---
export async function syncProgressToCloud(user, progress) {
  if (!db || !user) return;
  try {
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
      progress,
      lastSync: Date.now(),
      email: user.email,
      displayName: user.displayName || '學習者'
    }, { merge: true });
  } catch (err) {
    console.error('Error syncing progress to Firestore:', err);
  }
}

export async function fetchCloudProgress(user) {
  if (!db || !user) return null;
  try {
    const userRef = doc(db, 'users', user.uid);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return snap.data().progress;
    }
  } catch (err) {
    console.error('Error fetching cloud progress:', err);
  }
  return null;
}

export function subscribeToCloudProgress(user, callback) {
  if (!db || !user) return () => {};
  const userRef = doc(db, 'users', user.uid);
  return onSnapshot(userRef, (snap) => {
    if (snap.exists() && snap.data().progress) {
      callback(snap.data().progress);
    }
  }, (err) => {
    console.warn('Real-time sync error:', err);
  });
}
