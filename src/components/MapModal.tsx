import React, { useEffect, useRef } from 'react';
import { X, MapPin, ExternalLink } from 'lucide-react';
import { gsap, attachMagneticEffect } from '../utils/gsap';

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MapModal: React.FC<MapModalProps> = ({ isOpen, onClose }) => {
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

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <div
        ref={modalRef}
        className="bg-[#12141a] border border-neutral-800 text-white w-full max-w-2xl rounded-[32px] overflow-hidden relative shadow-2xl"
      >
        <button
          ref={closeBtnRef}
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Map Visualization */}
        <div className="relative h-64 sm:h-80 w-full bg-[#1b1f28] overflow-hidden">
          {/* Stylized vector stadium map background */}
          <div className="absolute inset-0 bg-neutral-900 opacity-90">
            <svg
              viewBox="0 0 800 400"
              className="w-full h-full stroke-white/15 fill-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Road Grid */}
              <path d="M 0 100 L 800 100 M 0 200 L 800 200 M 0 300 L 800 300" strokeWidth="2" />
              <path d="M 200 0 L 200 400 M 400 0 L 400 400 M 600 0 L 600 400" strokeWidth="2" />
              {/* Stadium Oval Outline */}
              <ellipse
                cx="400"
                cy="200"
                rx="140"
                ry="90"
                className="stroke-[#ccff00] fill-white/5"
                strokeWidth="3"
              />
              <ellipse cx="400" cy="200" rx="100" ry="60" className="stroke-white/30" strokeWidth="1.5" />
              <rect
                x="340"
                y="170"
                width="120"
                height="60"
                className="stroke-[#ccff00]/60 fill-[#ccff00]/10"
                strokeWidth="2"
              />
              {/* Yard lines */}
              <line x1="360" y1="170" x2="360" y2="230" className="stroke-white/40" />
              <line x1="380" y1="170" x2="380" y2="230" className="stroke-white/40" />
              <line x1="400" y1="170" x2="400" y2="230" className="stroke-[#ccff00]" strokeWidth="2" />
              <line x1="420" y1="170" x2="420" y2="230" className="stroke-white/40" />
              <line x1="440" y1="170" x2="440" y2="230" className="stroke-white/40" />
            </svg>
          </div>

          {/* Stadium Marker Pin */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#ccff00] text-black flex items-center justify-center shadow-2xl animate-bounce">
              <MapPin className="w-6 h-6 fill-current" />
            </div>
            <div className="bg-black/90 backdrop-blur-md border border-[#ccff00]/50 text-white font-bold text-xs px-3 py-1 rounded-full shadow-lg mt-1">
              Dragon Stadium
            </div>
          </div>
        </div>

        {/* Venue Information */}
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs text-[#ccff00] font-bold uppercase tracking-wider">
                Event Host Venue
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl uppercase tracking-tight text-white mt-0.5">
                DRAGON STADIUM
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Southlake, Texas 76092 • USA
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://maps.google.com/?q=Dragon+Stadium+Southlake+Texas"
                target="_blank"
                rel="noreferrer"
                className="bg-white hover:bg-neutral-200 text-black font-semibold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
              <div className="font-bold text-white mb-1">Gates & Concourse</div>
              <div className="text-neutral-400">Opens 8:00 AM CST on January 5th, 2025.</div>
            </div>
            <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
              <div className="font-bold text-white mb-1">Scout & Media Parking</div>
              <div className="text-neutral-400">North VIP Lot (Credential required).</div>
            </div>
            <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
              <div className="font-bold text-white mb-1">Public Attendance</div>
              <div className="text-neutral-400">South concourse entrance with pass.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
