import React, { useEffect, useRef } from 'react';
import { ArrowRight, AtSign, Instagram } from 'lucide-react';
import { gsap, attachMagneticEffect } from '../utils/gsap';

interface FooterSectionProps {
  onOpenSignUp: () => void;
  onOpenLiveStream: () => void;
  onContactClick: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  onOpenSignUp,
  onOpenLiveStream,
  onContactClick,
}) => {
  const footerRef = useRef<HTMLElement>(null);
  const partnerCardRef = useRef<HTMLDivElement>(null);
  const contactBtnRef = useRef<HTMLButtonElement>(null);
  const atBtnRef = useRef<HTMLButtonElement>(null);
  const signUpBtnRef = useRef<HTMLButtonElement>(null);
  const liveStreamBtnRef = useRef<HTMLButtonElement>(null);
  const bigTitleRef = useRef<HTMLHeadingElement>(null);
  const socialIconsRef = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        partnerCardRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        bigTitleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.3,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: bigTitleRef.current,
            start: 'top 95%',
          },
        }
      );
    }, footerRef);

    const c1 = attachMagneticEffect(contactBtnRef.current, 0.3);
    const c2 = attachMagneticEffect(atBtnRef.current, 0.35);
    const c3 = attachMagneticEffect(signUpBtnRef.current, 0.3);
    const c4 = attachMagneticEffect(liveStreamBtnRef.current, 0.35);

    const socialCleanups = socialIconsRef.current.map((el) =>
      attachMagneticEffect(el, 0.35)
    );

    return () => {
      ctx.revert();
      c1();
      c2();
      c3();
      c4();
      socialCleanups.forEach((c) => c());
    };
  }, []);

  const addSocialRef = (el: HTMLAnchorElement | null) => {
    if (el && !socialIconsRef.current.includes(el)) {
      socialIconsRef.current.push(el);
    }
  };

  return (
    <footer
      ref={footerRef}
      className="bg-[#0b0d11] text-white pt-20 pb-12 px-4 sm:px-8 border-t border-neutral-900 relative overflow-hidden"
    >
      {/* Top Center Notch Curve matching Image 1 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="w-28 h-6 bg-[#0b0d11] rounded-t-full border-t border-white/10" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Top Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 pb-16 border-b border-white/10 items-start">
          {/* Left Column: Slogan & Partner Card */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-medium text-neutral-100 max-w-sm mb-8 leading-snug">
              Maximizing College Athlete NIL Earning Potential
            </h3>

            {/* White Rounded "Become a partner" Card */}
            <div
              ref={partnerCardRef}
              className="bg-white text-black p-7 sm:p-8 rounded-[28px] shadow-2xl max-w-sm border border-neutral-200"
            >
              <h4 className="font-bold text-lg text-neutral-950 mb-2">
                Become a partner
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 mb-6 leading-relaxed">
                Interested in sponsorship or partnering with Athlete Showcase? Let&apos;s connect!
              </p>

              <div className="flex items-center gap-2.5">
                <button
                  ref={contactBtnRef}
                  onClick={onContactClick}
                  className="bg-black hover:bg-neutral-800 text-white font-semibold text-xs px-5 py-2.5 rounded-full transition-all duration-200 cursor-pointer shadow-md"
                >
                  Contact Us
                </button>

                <button
                  ref={atBtnRef}
                  onClick={onContactClick}
                  className="w-9 h-9 rounded-full bg-black hover:bg-neutral-800 text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md"
                  aria-label="Email partner team"
                >
                  <AtSign className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Details & Action Buttons */}
          <div className="lg:col-span-7 flex flex-col justify-between lg:pl-10">
            <div>
              {/* Help Email */}
              <div className="mb-6">
                <span className="text-xs text-neutral-400 block mb-1 font-medium">For Help</span>
                <a
                  href="mailto:info@athleteshowcase.com"
                  className="text-2xl sm:text-3xl font-medium text-white hover:text-[#ccff00] transition-colors"
                >
                  info@athleteshowcase.com
                </a>
              </div>

              {/* Media Email */}
              <div className="mb-8">
                <span className="text-xs text-neutral-400 block mb-1 font-medium">For Media</span>
                <a
                  href="mailto:press@athleteshowcase.com"
                  className="text-2xl sm:text-3xl font-medium text-white hover:text-[#ccff00] transition-colors"
                >
                  press@athleteshowcase.com
                </a>
              </div>

              {/* Date & Address */}
              <div className="mb-8">
                <div className="text-sm font-semibold text-neutral-200">
                  January 5th, 2025
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">
                  498 Gandy Street, Auburn, New York
                </div>
              </div>
            </div>

            {/* Buttons Row matching Image 1 */}
            <div className="flex items-center gap-3.5">
              <button
                ref={signUpBtnRef}
                onClick={onOpenSignUp}
                className="border border-white/30 hover:border-white text-white font-medium text-sm px-6 py-2.5 rounded-full transition-all duration-200 cursor-pointer hover:bg-white/5"
              >
                Sign Up
              </button>

              <button
                ref={liveStreamBtnRef}
                onClick={onOpenLiveStream}
                className="bg-white hover:bg-neutral-100 text-black font-semibold text-sm pl-6 pr-2 py-2 rounded-full inline-flex items-center gap-3.5 shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer group"
              >
                <span>Live Stream</span>
                <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Giant Branding Title & Social Links */}
        <div className="pt-12 flex flex-col gap-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            {/* Giant Display Title matching Image 1 */}
            <h2
              ref={bigTitleRef}
              className="font-display font-bold text-5xl sm:text-7xl md:text-8xl lg:text-[7.8rem] tracking-tight uppercase leading-[0.88] text-white select-none"
            >
              ATHLETE SHOWCASE
            </h2>

            {/* Social Icons Row */}
            <div className="flex items-center gap-2.5 shrink-0 self-end md:self-auto mb-2">
              <a
                ref={addSocialRef}
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-[#181b22] hover:bg-[#232732] border border-white/10 text-neutral-300 hover:text-white flex items-center justify-center transition-all shadow-md"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                ref={addSocialRef}
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-[#181b22] hover:bg-[#232732] border border-white/10 text-neutral-300 hover:text-white flex items-center justify-center transition-all text-xs font-bold font-sans shadow-md"
                aria-label="X Twitter"
              >
                ✕
              </a>

              <a
                ref={addSocialRef}
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-[#181b22] hover:bg-[#232732] border border-white/10 text-neutral-300 hover:text-white flex items-center justify-center transition-all shadow-md"
                aria-label="TikTok"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.29 0 .58.04.85.12V9.41a6.33 6.33 0 00-.85-.06A6.34 6.34 0 003.15 15.7a6.34 6.34 0 0010.82 4.48V13a8.28 8.28 0 005.62 2.21v-3.45a4.83 4.83 0 010-5.07z" />
                </svg>
              </a>

              <a
                ref={addSocialRef}
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-[#181b22] hover:bg-[#232732] border border-white/10 text-neutral-300 hover:text-white flex items-center justify-center transition-all shadow-md"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Subfooter Copyright & Legal Links */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 pt-6 border-t border-white/10">
            <div>Copyright. Athlete Showcase 2024</div>
            <div className="flex items-center gap-6">
              <a href="#about" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#about" className="hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
