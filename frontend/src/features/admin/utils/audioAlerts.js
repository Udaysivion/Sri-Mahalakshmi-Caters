/**
 * Sri Mahalakshmi Caters - High-Impact Audio Notification System
 * Uses Browser Web Audio API to produce rich, loud, customizable alerts
 * without relying on external MP3 assets.
 */

const STORAGE_KEY = 'sri_admin_sound_settings_v1';

const DEFAULT_SETTINGS = {
  enabled: true,
  soundType: 'bell', // 'bell', 'siren', 'kaching', 'digital', 'chime'
  volume: 0.9,       // 0.1 to 1.0 (Loud / Big Sound by default)
  repeatCount: 2     // 1, 2, or 3 rings
};

export const SOUND_OPTIONS = [
  {
    id: 'bell',
    name: 'Loud Kitchen Bell',
    description: 'Resonant double brass bell chime (recommended for kitchen noise)',
    tag: 'Big Sound',
    icon: '🛎️'
  },
  {
    id: 'siren',
    name: 'High-Alert Siren',
    description: 'Urgent alternating two-tone alarm for immediate attention',
    tag: 'Extra Loud',
    icon: '🚨'
  },
  {
    id: 'kaching',
    name: 'Cash Register "Ka-Ching"',
    description: 'Crisp cash register ring for new paid customer orders',
    tag: 'Crisp & Punchy',
    icon: '💰'
  },
  {
    id: 'digital',
    name: 'Rapid POS Triple Beep',
    description: 'Sharp digital printer beep sequence',
    tag: 'Punchy',
    icon: '📢'
  },
  {
    id: 'chime',
    name: 'Royal Palace Chime',
    description: 'Harmonious 4-tone ascending melody',
    tag: 'Pleasant',
    icon: '🎵'
  }
];

// Load persisted settings from session
export const getSoundSettings = () => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    }
  } catch (e) {
    console.debug('Failed to load sound settings:', e);
  }
  return DEFAULT_SETTINGS;
};

// Save settings to sessionStorage
export const saveSoundSettings = (settings) => {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.debug('Failed to save sound settings:', e);
  }
};

let sharedAudioCtx = null;

const getAudioContext = () => {
  const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtxClass) return null;
  if (!sharedAudioCtx || sharedAudioCtx.state === 'closed') {
    sharedAudioCtx = new AudioCtxClass();
  }
  if (sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume().catch(() => {});
  }
  return sharedAudioCtx;
};

// Global click listener to unlock Web Audio context on modern browsers
if (typeof window !== 'undefined') {
  const unlockAudio = () => {
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().then(() => {
        window.removeEventListener('click', unlockAudio);
        window.removeEventListener('keydown', unlockAudio);
      }).catch(() => {});
    }
  };
  window.addEventListener('click', unlockAudio, { once: true });
  window.addEventListener('keydown', unlockAudio, { once: true });
}

/**
 * Sound Generators using Web Audio API
 */

// 1. Loud Kitchen Bell (Double resonant brass ring)
const playKitchenBell = (ctx, baseVol, startTime = 0) => {
  const t = ctx.currentTime + startTime;
  const frequencies = [659.25, 987.77, 1318.51]; // E5, B5, E6 harmonics

  // First strike
  frequencies.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = idx === 0 ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(freq, t);

    const strikeVol = baseVol * (idx === 0 ? 0.8 : 0.4);
    gain.gain.setValueAtTime(strikeVol, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.6);
  });

  // Second strike (higher harmonic)
  const t2 = t + 0.22;
  [880, 1320, 1760].forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, t2);

    const strikeVol = baseVol * (idx === 0 ? 0.9 : 0.5);
    gain.gain.setValueAtTime(strikeVol, t2);
    gain.gain.exponentialRampToValueAtTime(0.001, t2 + 0.8);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t2);
    osc.stop(t2 + 0.8);
  });
};

// 2. High-Alert Siren (Alternating urgent tones)
const playSiren = (ctx, baseVol, startTime = 0) => {
  const t = ctx.currentTime + startTime;
  const tones = [880, 659.25, 880, 659.25, 987.77];
  const step = 0.14;

  tones.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, t + (i * step));

    gain.gain.setValueAtTime(baseVol * 0.7, t + (i * step));
    gain.gain.exponentialRampToValueAtTime(0.001, t + (i * step) + step - 0.01);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t + (i * step));
    osc.stop(t + (i * step) + step);
  });
};

// 3. Cash Register Ka-Ching (Sharp metal coin strike)
const playKaChing = (ctx, baseVol, startTime = 0) => {
  const t = ctx.currentTime + startTime;

  // Mechanical "click-clack"
  const clickOsc = ctx.createOscillator();
  const clickGain = ctx.createGain();
  clickOsc.type = 'square';
  clickOsc.frequency.setValueAtTime(320, t);
  clickGain.gain.setValueAtTime(baseVol * 0.5, t);
  clickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
  clickOsc.connect(clickGain);
  clickGain.connect(ctx.destination);
  clickOsc.start(t);
  clickOsc.stop(t + 0.05);

  // High metallic coin bell
  const bellFrequencies = [1318.5, 1760, 2093, 2637];
  bellFrequencies.forEach((freq, i) => {
    const tCoin = t + 0.06 + (i * 0.03);
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, tCoin);

    gain.gain.setValueAtTime(baseVol * 0.75, tCoin);
    gain.gain.exponentialRampToValueAtTime(0.001, tCoin + 0.7);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(tCoin);
    osc.stop(tCoin + 0.7);
  });
};

// 4. Rapid POS Triple Beep
const playDigitalBeep = (ctx, baseVol, startTime = 0) => {
  const t = ctx.currentTime + startTime;
  const beeps = [950, 950, 1200];
  const step = 0.12;

  beeps.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(freq, t + (i * step));

    gain.gain.setValueAtTime(baseVol * 0.6, t + (i * step));
    gain.gain.exponentialRampToValueAtTime(0.001, t + (i * step) + 0.09);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t + (i * step));
    osc.stop(t + (i * step) + 0.09);
  });
};

// 5. Royal Palace Chime (4-tone ascending melody)
const playChime = (ctx, baseVol, startTime = 0) => {
  const t = ctx.currentTime + startTime;
  const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
  const step = 0.15;

  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t + (i * step));

    const duration = i === notes.length - 1 ? 0.9 : 0.35;
    gain.gain.setValueAtTime(baseVol * 0.8, t + (i * step));
    gain.gain.exponentialRampToValueAtTime(0.001, t + (i * step) + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t + (i * step));
    osc.stop(t + (i * step) + duration);
  });
};

/**
 * Master Sound Play Function
 */
export const playOrderAlertSound = (customOptions = {}) => {
  try {
    const settings = { ...getSoundSettings(), ...customOptions };
    if (!settings.enabled) return;

    const ctx = getAudioContext();
    if (!ctx) return;

    const soundType = settings.soundType || 'bell';
    const volume = Math.max(0.1, Math.min(1.0, settings.volume || 0.9));
    const repeatCount = Math.max(1, Math.min(3, settings.repeatCount || 2));

    const soundFnMap = {
      bell: playKitchenBell,
      siren: playSiren,
      kaching: playKaChing,
      digital: playDigitalBeep,
      chime: playChime
    };

    const soundFn = soundFnMap[soundType] || playKitchenBell;

    // Loop repetitions with clear spacing
    const intervalMap = {
      bell: 0.95,
      siren: 0.85,
      kaching: 0.9,
      digital: 0.55,
      chime: 0.95
    };
    const spacing = intervalMap[soundType] || 0.9;

    for (let r = 0; r < repeatCount; r++) {
      soundFn(ctx, volume, r * spacing);
    }
  } catch (err) {
    console.debug('Error executing order alert sound:', err);
  }
};
