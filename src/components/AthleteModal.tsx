import React, { useEffect, useRef } from 'react';
import { X, Award } from 'lucide-react';
import { Athlete } from '../types';
import { gsap, attachMagneticEffect } from '../utils/gsap';

interface AthleteModalProps {
  athlete: Athlete | null;
  onClose: () => void;
  onOpenSignUp: () => void;
}

export const AthleteModal: React.FC<AthleteModalProps> = ({
  athlete,
  onClose,
  onOpenSignUp,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (athlete) {
      if (backdropRef.current) {
        gsap.fromTo(
          backdropRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.25, ease: 'power2.out' }
        );
      }
      if (modalRef.current) {
        gsap.fromTo(
          modalRef.current,
          { scale: 0.92, opacity: 0, y: 30 },
          { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: 'back.out(1.5)' }
        );
      }
    }
  }, [athlete]);

  useEffect(() => {
    if (athlete && closeBtnRef.current) {
      return attachMagneticEffect(closeBtnRef.current, 0.35);
    }
  }, [athlete]);

  if (!athlete) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <div
        ref={modalRef}
        className="bg-[#12141a] border border-neutral-800 text-white w-full max-w-lg rounded-[32px] overflow-hidden relative shadow-2xl"
      >
        <button
          ref={closeBtnRef}
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Media */}
        <div className="relative h-64 sm:h-72 w-full bg-neutral-900 overflow-hidden">
          <img
            src={athlete.image}
            alt={athlete.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12141a] via-black/20 to-transparent" />

          <div className="absolute top-4 left-4">
            <span className="bg-[#ccff00] text-black font-bold text-xs px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md">
              {athlete.sport}
            </span>
          </div>

          <div className="absolute bottom-4 left-6 right-6">
            <h3 className="font-display font-bold text-3xl sm:text-4xl uppercase tracking-tight text-white">
              {athlete.name}
            </h3>
            <p className="text-xs text-neutral-300 font-medium">
              {athlete.category} • {athlete.tenure}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-5">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
              <span className="text-[10px] text-neutral-400 block uppercase">NIL Projection</span>
              <span className="font-display font-bold text-lg text-[#ccff00]">$1.4M / yr</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
              <span className="text-[10px] text-neutral-400 block uppercase">Prospect Grade</span>
              <span className="font-display font-bold text-lg text-white">5-Star Tier</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
              <span className="text-[10px] text-neutral-400 block uppercase">Status</span>
              <span className="font-display font-bold text-lg text-[#ccff00]">Portal Ready</span>
            </div>
          </div>

          <div className="space-y-2 text-xs text-neutral-300 leading-relaxed">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Award className="w-4 h-4 text-[#ccff00]" />
              <span>Showcase Evaluation:</span>
            </div>
            <p>
              Ranked among the premier transfer portal candidates in college athletics, boasting elite athletic scores, high social engagement, and proven tournament performance.
            </p>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onOpenSignUp();
              }}
              className="flex-1 bg-[#ccff00] hover:bg-[#bbf000] text-black font-bold text-xs sm:text-sm py-3 rounded-full transition-all duration-200 cursor-pointer text-center uppercase tracking-wider shadow-lg"
            >
              Sign Up For Live Combine Feed
            </button>
            <button
              onClick={onClose}
              className="px-4 py-3 rounded-full border border-white/20 text-xs text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
