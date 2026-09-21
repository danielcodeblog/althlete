import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle2, Send } from 'lucide-react';
import { gsap, attachMagneticEffect } from '../utils/gsap';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  defaultTopic?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  title = 'CONNECT WITH ATHLETE SHOWCASE',
  defaultTopic = 'General Inquiry',
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    topic: defaultTopic,
    message: '',
  });

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
    setSubmitted(true);
  };

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <div
        ref={modalRef}
        className="bg-[#12141a] border border-neutral-800 text-white w-full max-w-lg rounded-[32px] p-6 sm:p-8 relative shadow-2xl"
      >
        <button
          ref={closeBtnRef}
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#ccff00]" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#ccff00]">
                Direct Contact Channel
              </span>
            </div>

            <h3 className="font-display font-bold text-3xl uppercase tracking-tight text-white mb-2">
              {title}
            </h3>
            <p className="text-xs text-neutral-400 mb-6">
              Our partner relations and NIL operations team will respond within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jordan Smith"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#ccff00]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jordan@agency.com"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#ccff00]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Organization / University / Brand
                </label>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  placeholder="e.g. Apex Sports Management or SEC Athletic Dept"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#ccff00]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Inquiry Type
                </label>
                <select
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full bg-[#181a22] border border-white/15 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#ccff00]"
                >
                  <option value="Sponsorship & Brand Partnership">Sponsorship & Brand Partnership</option>
                  <option value="Athlete Transfer Portal Invite">Athlete Transfer Portal Invite</option>
                  <option value="Media & Press Credentials">Media & Press Credentials</option>
                  <option value="General Question">General Question</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Message
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details about your goals or proposal..."
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#ccff00]"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-[#ccff00] hover:bg-[#bbf000] text-black font-bold text-sm py-3 rounded-full transition-all duration-200 cursor-pointer shadow-lg flex items-center justify-center gap-2 uppercase tracking-wide"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-14 h-14 rounded-full bg-[#ccff00]/20 text-[#ccff00] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="font-display font-bold text-3xl uppercase tracking-tight text-white mb-2">
              MESSAGE SENT!
            </h3>
            <p className="text-xs text-neutral-300 mb-6 max-w-sm mx-auto">
              Thank you, {formData.name}. Our showcase team has received your submission and will get in touch shortly.
            </p>

            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="w-full bg-white hover:bg-neutral-200 text-black font-semibold text-sm py-2.5 rounded-full transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
