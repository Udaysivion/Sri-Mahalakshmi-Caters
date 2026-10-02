import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Volume2, 
  VolumeX, 
  X, 
  Play, 
  Check, 
  Sliders, 
  BellRing, 
  Radio, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { 
  SOUND_OPTIONS, 
  getSoundSettings, 
  saveSoundSettings, 
  playOrderAlertSound 
} from '../utils/audioAlerts';

const SoundSettingsModal = ({ isOpen, onClose, onSettingsChange }) => {
  const [settings, setSettings] = useState(getSoundSettings);
  const [playingId, setPlayingId] = useState(null);

  if (!isOpen) return null;

  const updateSetting = (key, val) => {
    const updated = { ...settings, [key]: val };
    setSettings(updated);
    saveSoundSettings(updated);
    if (onSettingsChange) onSettingsChange(updated);
  };

  const handleTestSound = (soundId, e) => {
    if (e) e.stopPropagation();
    setPlayingId(soundId);
    playOrderAlertSound({
      enabled: true,
      soundType: soundId,
      volume: settings.volume,
      repeatCount: 1 // Test single repetition
    });
    setTimeout(() => setPlayingId(null), 1200);
  };

  const handleTestFullAlert = () => {
    setPlayingId('full');
    playOrderAlertSound({
      enabled: true,
      soundType: settings.soundType,
      volume: settings.volume,
      repeatCount: settings.repeatCount
    });
    setTimeout(() => setPlayingId(null), 2500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="bg-[#112A1F] border border-emerald-500/30 rounded-2xl shadow-2xl max-w-lg w-full text-[#FFF8EC] overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#1B4332]/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#D4731A] text-white flex items-center justify-center shadow-lg">
                <Volume2 size={20} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Order Alert Sound Settings
                </h3>
                <p className="text-xs text-emerald-200/70">
                  Configure alert sound and volume for new orders & reservations
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-5 space-y-6 overflow-y-auto">
            {/* 1. Master Toggle */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${settings.enabled ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'}`}>
                  {settings.enabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {settings.enabled ? 'Audio Chime is Active' : 'Audio Chime is Muted'}
                  </h4>
                  <p className="text-xs text-white/60">
                    {settings.enabled 
                      ? 'Admin will hear a chime when customers place orders' 
                      : 'Silent mode: only visual toast notifications'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => updateSetting('enabled', !settings.enabled)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  settings.enabled ? 'bg-[#D4731A]' : 'bg-white/20'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    settings.enabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* 2. Sound Type Selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#D4731A] flex items-center gap-1.5">
                  <BellRing size={14} /> Alert Tone Options
                </label>
                <span className="text-[11px] text-white/50">Click card to select</span>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {SOUND_OPTIONS.map((option) => {
                  const isSelected = settings.soundType === option.id;
                  const isThisPlaying = playingId === option.id;

                  return (
                    <div
                      key={option.id}
                      onClick={() => updateSetting('soundType', option.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#1B4332] border-[#D4731A] shadow-md ring-1 ring-[#D4731A]/50'
                          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{option.icon}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-white">{option.name}</span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#D4731A]/20 text-[#E0B030] border border-[#D4731A]/40">
                              {option.tag}
                            </span>
                          </div>
                          <p className="text-xs text-white/60 mt-0.5">{option.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Preview button */}
                        <button
                          type="button"
                          onClick={(e) => handleTestSound(option.id, e)}
                          className={`p-2 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                            isThisPlaying
                              ? 'bg-[#D4731A] text-white animate-pulse'
                              : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                          }`}
                          title="Preview this sound"
                        >
                          <Play size={12} fill={isThisPlaying ? 'currentColor' : 'none'} />
                          <span className="text-[10px]">Preview</span>
                        </button>

                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-[#D4731A] text-white flex items-center justify-center shrink-0">
                            <Check size={12} strokeWidth={3} />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Volume Boost Slider */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#D4731A] flex items-center gap-1.5">
                  <Sliders size={14} /> Alert Volume
                </label>
                <span className="text-xs font-bold text-emerald-300">
                  {Math.round(settings.volume * 100)}% {settings.volume >= 0.8 && '🔊 Big Sound'}
                </span>
              </div>

              <input
                type="range"
                min="0.2"
                max="1.0"
                step="0.05"
                value={settings.volume}
                onChange={(e) => updateSetting('volume', parseFloat(e.target.value))}
                className="w-full accent-[#D4731A] cursor-pointer"
              />

              <div className="flex justify-between text-[10px] text-white/40">
                <span>Soft (20%)</span>
                <span>Normal (50%)</span>
                <span>Loud (80%)</span>
                <span className="text-[#D4731A] font-bold">Max Alert (100%)</span>
              </div>
            </div>

            {/* 4. Repetition Count */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#D4731A] flex items-center gap-1.5">
                <RotateCcw size={14} /> Chime Repetitions
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { count: 1, label: 'Single Ring (1x)' },
                  { count: 2, label: 'Double Ring (2x)', recommended: true },
                  { count: 3, label: 'Triple Ring (3x)' }
                ].map((rep) => (
                  <button
                    key={rep.count}
                    type="button"
                    onClick={() => updateSetting('repeatCount', rep.count)}
                    className={`py-2 px-2.5 rounded-lg text-xs font-bold transition-all border ${
                      settings.repeatCount === rep.count
                        ? 'bg-[#1B4332] text-white border-[#D4731A] ring-1 ring-[#D4731A]'
                        : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div>{rep.label}</div>
                    {rep.recommended && (
                      <div className="text-[9px] text-[#E0B030] font-normal">Recommended</div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-white/10 bg-[#1B4332]/40 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleTestFullAlert}
              disabled={playingId === 'full'}
              className="py-2.5 px-4 rounded-xl bg-[#D4731A] hover:bg-[#b85f12] text-white text-xs font-bold flex items-center gap-2 transition-all shadow-md disabled:opacity-50"
            >
              <Play size={14} fill="currentColor" />
              <span>{playingId === 'full' ? 'Ringing Alert...' : 'Test Full Alert'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-6 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SoundSettingsModal;
