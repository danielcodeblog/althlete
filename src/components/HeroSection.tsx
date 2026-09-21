import React, { useState, useEffect, useRef } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { IMAGES } from '../data/mockData';
import { gsap, ScrollTrigger, attachMagneticEffect } from '../utils/gsap';

interface HeroSectionProps {
  onLocationClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onLocationClick }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const leftWidgetRef = useRef<HTMLDivElement>(null);
  const rightWidgetRef = useRef<HTMLButtonElement>(null);
  const notchRef = useRef<HTMLDivElement>(null);

  // Real-time ticking countdown
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 12,
    minutes: 40,
    seconds: 22,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format2 = (num: number) => String(num).padStart(2, '0');

  useEffect(() => {
    // GSAP Master Entrance Timeline
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Parallax hero background
      if (bgImageRef.current && sectionRef.current) {
        gsap.to(bgImageRef.current, {
          yPercent: 18,
          scale: 1.02,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      // Initial reveal
      tl.fromTo(
        bgImageRef.current,
        { scale: 1.2, opacity: 0.4 },
        { scale: 1.06, opacity: 0.9, duration: 2.2, ease: 'power2.out' },
        0
      )
        .fromTo(
          subtitleRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2 },
          0.3
        )
        .fromTo(
          titleRef.current,
          { y: 60, opacity: 0, skewY: 2 },
          { y: 0, opacity: 1, skewY: 0, duration: 1.4, ease: 'power3.out' },
          0.4
        )
        .fromTo(
          [leftWidgetRef.current, rightWidgetRef.current],
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power3.out' },
          0.7
        )
        .fromTo(
          notchRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'back.out(1.7)' },
          1.0
        );

      // Ambient gentle floating physics for the left and right widgets
      if (leftWidgetRef.current) {
        gsap.to(leftWidgetRef.current, {
          y: -5,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.5,
        });
      }

      if (rightWidgetRef.current) {
        gsap.to(rightWidgetRef.current, {
          y: -6,
          duration: 3.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.8,
        });
      }
    }, sectionRef);

    // Magnetic effect for right widget
    const cleanMagnetic = attachMagneticEffect(rightWidgetRef.current, 0.25);

    return () => {
      ctx.revert();
      cleanMagnetic();
    };
  }, []);

  const scrollToNext = () => {
    const el = document.getElementById('athletes');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[92vh] lg:min-h-screen bg-[#0d0f13] text-white flex flex-col justify-between overflow-hidden pt-28 sm:pt-36 pb-0"
    >
      {/* Background Image Layer with Depth Gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          ref={bgImageRef}
          src={IMAGES.hero}
          alt="Athlete Showcase College Football Player in Green Jersey"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform filter brightness-95 contrast-110 will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f13] via-black/35 to-black/70" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/30 to-black/85" />
      </div>

      {/* Main Title & Header Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 w-full mt-4 sm:mt-10">
        <div className="max-w-4xl">
          <p
            ref={subtitleRef}
            className="text-white/95 text-base sm:text-lg md:text-xl font-medium tracking-wide mb-3 flex items-center gap-2"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-[#ccff00] animate-ping" />
            Transfer Portal
          </p>

          <h1
            ref={titleRef}
            className="font-display font-bold text-7xl sm:text-8xl md:text-9xl lg:text-[11.5rem] tracking-tight uppercase leading-[0.82] text-white select-none drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)]"
          >
            ATHLETE <br />
            SHOWCASE
          </h1>
        </div>
      </div>

      {/* Floating Bottom Widgets */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 w-full mt-auto mb-10 sm:mb-12">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5">
          {/* Left Pill: Countdown Timer & Description */}
          <div
            ref={leftWidgetRef}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 bg-[#16181f]/90 backdrop-blur-2xl border border-white/20 px-6 sm:px-7 py-3.5 sm:py-4 rounded-3xl sm:rounded-full shadow-2xl max-w-xl"
          >
            {/* Countdown Numbers separated by sleek dividers */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              <div className="flex items-baseline gap-1">
                <span className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-white">
                  {format2(timeLeft.days)}
                </span>
                <span className="text-xs sm:text-sm text-neutral-400 font-medium">
                  Days
                </span>
              </div>

              <span className="text-white/30 font-light text-base">|</span>

              <div className="flex items-baseline gap-1">
                <span className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-white">
                  {format2(timeLeft.hours)}
                </span>
                <span className="text-xs sm:text-sm text-neutral-400 font-medium">
                  Hours
                </span>
              </div>

              <span className="text-white/30 font-light text-base">|</span>

              <div className="flex items-baseline gap-1">
                <span className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-white">
                  {format2(timeLeft.minutes)}
                </span>
                <span className="text-xs sm:text-sm text-neutral-400 font-medium">
                  Min
                </span>
              </div>
            </div>

            {/* Description text beside timer */}
            <p className="text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed sm:border-l sm:border-white/15 sm:pl-5">
              Meet some of the top athletes entering the Transfer Portal.
            </p>
          </div>

          {/* Right Pill: Date & Location */}
          <button
            ref={rightWidgetRef}
            onClick={onLocationClick}
            className="group flex items-center gap-4 bg-[#16181f]/90 backdrop-blur-2xl border border-white/20 hover:border-[#ccff00]/60 px-5 py-3 sm:py-3.5 rounded-3xl sm:rounded-full shadow-2xl transition-all duration-300 cursor-pointer text-left self-start md:self-auto"
          >
            <div className="w-11 h-11 rounded-full bg-[#ccff00] text-black flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md">
              <MapPin className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="font-semibold text-sm sm:text-base text-white group-hover:text-[#ccff00] transition-colors">
                January 5th, 2025
              </div>
              <div className="text-xs text-neutral-400">
                Dragon Stadium in Southlake Texas
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Bottom Center Curved Notch / Scroll Down Indicator */}
      <div
        ref={notchRef}
        className="relative z-20 flex justify-center translate-y-[1px]"
      >
        <div className="relative bg-white pt-3.5 pb-2 px-10 rounded-t-[32px] text-center shadow-lg flex flex-col items-center">
          <button
            onClick={scrollToNext}
            className="flex flex-col items-center gap-1 text-[11px] font-semibold tracking-wider text-neutral-700 hover:text-black uppercase cursor-pointer group transition-colors"
          >
            <span className="group-hover:tracking-widest transition-all duration-200">
              scroll down
            </span>
            <ChevronDown className="w-4 h-4 animate-bounce text-neutral-900 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
