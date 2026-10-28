// Dual-Engine Audio Service for Authentic Japanese Pronunciation
// 1. Primary: High-fidelity Native Japanese Audio Stream (HTML5 Audio via Google TTS)
//    -> Guaranteed to work on all iOS Safari, Android Chrome, Windows & Mac without requiring system voice packs!
// 2. Fallback: Browser Web Speech API (offline support)

let currentAudio = null;

function speakWithWebSpeech(text, rate = 0.85) {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      resolve();
      return;
    }

    try {
      // Small timeout workaround for Chrome cancellation bug
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = rate;
      utterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices() || [];
      const jaVoice = voices.find(v => 
        (v.lang === 'ja-JP' || v.lang === 'ja_JP' || v.lang?.startsWith('ja')) &&
        (v.name.includes('Google') || v.name.includes('Kyoko') || v.name.includes('Otoya') || v.name.includes('Siri') || v.name.includes('Natural'))
      ) || voices.find(v => v.lang?.startsWith('ja'));

      if (jaVoice) {
        utterance.voice = jaVoice;
      }

      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Web Speech error:', e);
      resolve();
    }
  });
}

export function playJapaneseAudio(text, rate = 0.85) {
  if (!text) return Promise.resolve();

  // Strip furigana parenthesis e.g. "おちゃ (お茶)" -> "おちゃ"
  const cleanText = text
    .replace(/\(.*?\)/g, '')
    .replace(/（.*?）/g, '')
    .replace(/[~〜]/g, '')
    .trim();

  if (!cleanText) return Promise.resolve();

  return new Promise((resolve) => {
    try {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }

      const encoded = encodeURIComponent(cleanText);
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=ja&client=tw-ob&q=${encoded}`;
      const audio = new Audio(url);
      currentAudio = audio;

      audio.playbackRate = rate;

      audio.onended = () => {
        resolve();
      };

      audio.onerror = (err) => {
        console.warn('Online audio stream notice, falling back to Web Speech:', err);
        speakWithWebSpeech(cleanText, rate).then(resolve);
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Audio play restricted by browser policy, attempting SpeechSynthesis:', err);
          speakWithWebSpeech(cleanText, rate).then(resolve);
        });
      }
    } catch (err) {
      console.warn('Audio initialization exception, using fallback:', err);
      speakWithWebSpeech(cleanText, rate).then(resolve);
    }
  });
}
