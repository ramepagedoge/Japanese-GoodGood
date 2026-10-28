// Web Speech API wrapper for native, high-quality Japanese pronunciation
// Zero external API cost, instant latency, works offline on mobile and desktop browsers

let cachedVoices = [];

function loadVoices() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  cachedVoices = window.speechSynthesis.getVoices();
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}

export function playJapaneseAudio(text, rate = 0.85) {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported in this browser.');
      resolve();
      return;
    }

    try {
      // Cancel previous utterances to avoid queuing delay
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = rate; // 0.85x is comfortable for beginner listening
      utterance.pitch = 1.0;

      if (cachedVoices.length === 0) {
        cachedVoices = window.speechSynthesis.getVoices();
      }

      // Prioritize natural Japanese voices
      const jaVoice = cachedVoices.find(v => 
        (v.lang === 'ja-JP' || v.lang === 'ja_JP' || v.lang.startsWith('ja')) &&
        (v.name.includes('Google') || v.name.includes('Kyoko') || v.name.includes('Otoya') || v.name.includes('Siri') || v.name.includes('Natural'))
      ) || cachedVoices.find(v => v.lang.startsWith('ja'));

      if (jaVoice) {
        utterance.voice = jaVoice;
      }

      utterance.onend = () => resolve();
      utterance.onerror = (e) => {
        console.warn('Audio playback notice:', e);
        resolve();
      };

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.error('Failed to play audio:', err);
      resolve();
    }
  });
}
