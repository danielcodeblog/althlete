import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle2, Ticket } from 'lucide-react';
import { gsap, attachMagneticEffect } from '../utils/gsap';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [role, setRole] = useState<'Fan' | 'Athlete' | 'Recruiter' | 'Brand'>('Fan');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
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
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && closeBtnRef.current) {
      return attachMagneticEffect(closeBtnRef.current, 0.35);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitted(true);
  };

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <div
        ref={modalRef}
        className="bg-[#12141a] border border-neutral-800 text-white w-full max-w-md rounded-[32px] p-6 sm:p-8 relative shadow-2xl overflow-hidden"
      >
        {/* Close Button */}
        <button
          ref={closeBtnRef}
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ccff00]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#ccff00]">
                Free Digital Access
              </span>
            </div>

            <h3 className="font-display font-bold text-3xl uppercase tracking-tight text-white mb-2">
              JOIN THE SHOWCASE
            </h3>
            <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
              Sign up to unlock the official 4K live broadcast, real-time scout data, and transfer portal alerts.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  I am a
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['Fan', 'Athlete', 'Recruiter', 'Brand'] as const).map((r) => (
                    <button
                      type="button"
                      key={r}
                      onClick={() => setRole(r)}
                      className={`py-2 text-xs font-medium rounded-xl border transition-all cursor-pointer ${
                        role === r
                          ? 'bg-[#ccff00] text-black border-[#ccff00] font-bold shadow-md'
                          : 'bg-white/5 border-white/10 text-neutral-300 hover:border-white/30'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#ccff00]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@college.edu"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#ccff00]"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-[#ccff00] hover:bg-[#bbf000] text-black font-bold text-sm py-3 rounded-full transition-all duration-200 cursor-pointer shadow-lg uppercase tracking-wide"
              >
                Claim Free Digital Pass
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-[#ccff00]/20 text-[#ccff00] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="font-display font-bold text-3xl uppercase tracking-tight text-white mb-2">
              YOU&apos;RE ON THE LIST!
            </h3>
            <p className="text-xs text-neutral-300 mb-6">
              Welcome, <span className="text-white font-semibold">{name}</span>! Your digital showcase credentials have been activated.
            </p>

            {/* Simulated pass ticket */}
            <div className="bg-white/5 border border-dashed border-white/25 rounded-2xl p-4 mb-6 text-left relative">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <Ticket className="w-4 h-4 text-[#ccff00]" />
                  <span className="text-xs font-bold text-white uppercase">
                    ATHLETE SHOWCASE PASS
                  </span>
                </div>
                <span className="text-[10px] bg-[#ccff00] text-black font-bold px-2 py-0.5 rounded-full">
                  VERIFIED
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-neutral-400 text-[10px] block">Attendee</span>
                  <span className="font-medium text-white">{name}</span>
                </div>
                <div>
                  <span className="text-neutral-400 text-[10px] block">Tier</span>
                  <span className="font-medium text-[#ccff00]">{role} Access</span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-white hover:bg-neutral-200 text-black font-semibold text-sm py-2.5 rounded-full transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
