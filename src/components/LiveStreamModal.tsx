import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Volume2, VolumeX, Maximize2, Radio, Users } from 'lucide-react';
import { IMAGES } from '../data/mockData';
import { gsap, attachMagneticEffect } from '../utils/gsap';

interface LiveStreamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveStreamModal: React.FC<LiveStreamModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState([
    { user: 'Coach_Rivers', text: 'Watching the 40-yard dash times closely!' },
    { user: 'BamaFan99', text: 'Who has the highest NIL ceiling today?' },
    { user: 'ScoutPro', text: 'Marcus Henderson looking sharp on the out-routes.' },
  ]);

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
          { scale: 0.94, opacity: 0, y: 30 },
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

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setMessages((prev) => [...prev, { user: 'You', text: chatMessage.trim() }]);
    setChatMessage('');
  };

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
    >
      <div
        ref={modalRef}
        className="bg-[#101217] border border-neutral-800 text-white w-full max-w-5xl rounded-[32px] overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
      >
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-[#14171f]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 bg-red-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider animate-pulse">
              <Radio className="w-3.5 h-3.5" /> LIVE
            </span>
            <span className="font-display font-bold text-lg uppercase tracking-tight text-white">
              ATHLETE SHOWCASE 2025 • MAIN STAGE
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-400">
              <Users className="w-3.5 h-3.5 text-[#ccff00]" />
              <span>14,820 watching</span>
            </div>
            <button
              ref={closeBtnRef}
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Main Content: Video Player on Left, Chat/Schedule on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          {/* Video Stream Area */}
          <div className="lg:col-span-8 bg-black flex flex-col justify-between relative min-h-[280px] sm:min-h-[420px]">
            <img
              src={IMAGES.collegeQb}
              alt="Live Stream Feed"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover opacity-80 filter contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />

            {/* Top Video Overlay */}
            <div className="relative z-10 p-4 sm:p-6 flex items-center justify-between">
              <span className="bg-black/60 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full text-xs font-medium text-white">
                Dragon Stadium • Southlake, TX
              </span>
              <span className="bg-[#ccff00] text-black font-bold text-xs px-2.5 py-1 rounded-full">
                4K UHD
              </span>
            </div>

            {/* Center Play/Pause state */}
            <div className="relative z-10 flex items-center justify-center">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md border border-white/20 hover:scale-110 text-white flex items-center justify-center transition-transform cursor-pointer"
              >
                <Play className={`w-7 h-7 ${isPlaying ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Bottom Controls Bar */}
            <div className="relative z-10 p-4 sm:p-6 flex items-center justify-between bg-gradient-to-t from-black to-transparent">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <span className="text-xs text-neutral-300 font-mono">01:42:18</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-[#ccff00]">LIVE FEED ACTIVE</span>
                <button className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white">
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Agenda & Community Chat */}
          <div className="lg:col-span-4 bg-[#141720] border-t lg:border-t-0 lg:border-l border-neutral-800 flex flex-col justify-between p-4 sm:p-5">
            <div>
              <h4 className="font-display font-bold text-base uppercase tracking-tight text-white mb-3">
                SHOWCASE SCHEDULE
              </h4>
              <div className="space-y-2 mb-5 text-xs">
                <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                  <div className="text-[#ccff00] font-bold">10:00 AM CST • Current</div>
                  <div className="font-medium text-white">40-Yard Dash & Combine Measurements</div>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl p-2.5 text-neutral-400">
                  <div className="font-semibold text-neutral-300">12:30 PM CST</div>
                  <div>Quarterback Throwing Tree & Target Drills</div>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl p-2.5 text-neutral-400">
                  <div className="font-semibold text-neutral-300">02:00 PM CST</div>
                  <div>NIL Market Valuation & Brand Matchmaking</div>
                </div>
              </div>

              <h4 className="font-display font-bold text-base uppercase tracking-tight text-white mb-3">
                LIVE SCOUT CHAT
              </h4>
              <div className="space-y-2 max-h-44 overflow-y-auto pr-1 text-xs">
                {messages.map((m, idx) => (
                  <div key={idx} className="bg-white/5 rounded-lg p-2">
                    <span className="font-bold text-[#ccff00] block text-[11px]">{m.user}</span>
                    <span className="text-neutral-200">{m.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendChat} className="mt-4 pt-3 border-t border-neutral-800 flex gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Join the discussion..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#ccff00]"
              />
              <button
                type="submit"
                className="bg-[#ccff00] text-black font-bold text-xs px-3.5 py-2 rounded-xl hover:bg-[#bbf000] transition-colors cursor-pointer"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
