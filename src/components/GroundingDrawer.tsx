import React, { useState, useEffect } from 'react';
import { Heart, X, Wind, Shield, Phone, Sparkles } from 'lucide-react';

interface GroundingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GroundingDrawer: React.FC<GroundingDrawerProps> = ({ isOpen, onClose }) => {
  const [breathePhase, setBreathePhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [counter, setCounter] = useState(4);

  // Gentle 4-4-6 breathing cycle for nervous system regulation
  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev <= 1) {
          if (breathePhase === 'inhale') {
            setBreathePhase('hold');
            return 4;
          } else if (breathePhase === 'hold') {
            setBreathePhase('exhale');
            return 6;
          } else {
            setBreathePhase('inhale');
            return 4;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, breathePhase]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="grounding-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C2A39]/60 backdrop-blur-sm transition-opacity duration-300"
    >
      <div 
        className="relative w-full max-w-lg bg-[#F9F6F0] rounded-2xl shadow-2xl border border-[#D4AF37]/30 p-6 sm:p-8 text-[#1C2A39] overflow-hidden"
      >
        {/* Soft background aura */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#7A8B7B]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Grounding Space"
          className="absolute top-5 right-5 p-2 rounded-full text-[#1C2A39]/60 hover:text-[#1C2A39] hover:bg-[#1C2A39]/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#7A8B7B]">
            Sacred Grounding Anchor
          </span>
          <h2 id="grounding-title" className="text-2xl sm:text-3xl font-serif font-semibold text-[#1C2A39] mt-1">
            Be Still in This Moment
          </h2>
          <p className="text-sm text-[#2B2B2B]/80 mt-2 max-w-sm mx-auto">
            You don’t have to fix the next year right now. You only need to breathe through this moment.
          </p>
        </div>

        {/* Breathing Circle */}
        <div className="flex flex-col items-center justify-center py-4">
          <div className="relative flex items-center justify-center w-36 h-36 rounded-full border-2 border-[#D4AF37]/40 bg-white/70 shadow-inner">
            <div
              className={`absolute inset-2 rounded-full transition-all duration-1000 ${
                breathePhase === 'inhale'
                  ? 'scale-100 bg-[#7A8B7B]/20'
                  : breathePhase === 'hold'
                  ? 'scale-95 bg-[#D4AF37]/20'
                  : 'scale-75 bg-[#1C2A39]/10'
              }`}
            />
            <div className="relative z-10 text-center">
              <span className="text-xs uppercase tracking-wider text-[#7A8B7B] font-semibold block">
                {breathePhase === 'inhale' ? 'Breathe In' : breathePhase === 'hold' ? 'Hold Gently' : 'Release slowly'}
              </span>
              <span className="text-3xl font-serif font-bold text-[#1C2A39] tabular-nums">
                {counter}s
              </span>
            </div>
          </div>
          <p className="text-xs text-[#7A8B7B] italic mt-3">
            {breathePhase === 'inhale'
              ? 'Receive His unconditional grace.'
              : breathePhase === 'hold'
              ? 'Rest in His quiet presence.'
              : 'Let go of the white-knuckle grip.'}
          </p>
        </div>

        {/* Scripture Anchor */}
        <div className="my-5 p-4 rounded-xl bg-white/80 border border-[#D4AF37]/25 text-center">
          <p className="font-serif italic text-base sm:text-lg text-[#1C2A39]">
            &ldquo;Be still, and know that I am God.&rdquo;
          </p>
          <span className="text-xs font-semibold text-[#7A8B7B] tracking-wider uppercase mt-1 block">
            Psalm 46:10
          </span>
          <p className="text-xs text-[#2B2B2B]/75 mt-2">
            The storm is outside. Christ is within. You are held, forgiven, and never alone.
          </p>
        </div>

        {/* Need to talk to someone */}
        <div className="mt-4 pt-4 border-t border-[#1C2A39]/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#2B2B2B]/80">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#7A8B7B] shrink-0" />
            <span>Need human support right now?</span>
          </div>
          <div className="flex items-center gap-3 font-semibold text-[#1C2A39]">
            <a href="tel:988" className="hover:text-[#D4AF37] underline underline-offset-2">
              Dial 988 (Lifeline)
            </a>
            <span>·</span>
            <a href="tel:18006624357" className="hover:text-[#D4AF37] underline underline-offset-2">
              SAMHSA 1-800-662-4357
            </a>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-5 py-3 rounded-xl bg-[#1C2A39] text-[#F9F6F0] hover:bg-[#2A3C50] text-sm font-medium transition-colors"
        >
          Return to My Journey
        </button>
      </div>
    </div>
  );
};
