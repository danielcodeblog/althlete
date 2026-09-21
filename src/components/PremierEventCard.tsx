import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { IMAGES } from '../data/mockData';
import { gsap, ScrollTrigger, attachMagneticEffect } from '../utils/gsap';

interface PremierEventCardProps {
  onOpenLiveStream: () => void;
}

export const PremierEventCard: React.FC<PremierEventCardProps> = ({ onOpenLiveStream }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const playerImageRef = useRef<HTMLImageElement>(null);
  const svgLine1Ref = useRef<SVGPathElement>(null);
  const svgLine2Ref = useRef<SVGPathElement>(null);
  const statsCardRef = useRef<HTMLDivElement>(null);

  // Animated counters state
  const [counts, setCounts] = useState({ days: 0, speakers: 0, brands: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Counter animation with GSAP
      const counterObj = { days: 0, speakers: 0, brands: 0 };

      ScrollTrigger.create({
        trigger: cardRef.current,
        start: 'top 75%',
        onEnter: () => {
          gsap.to(counterObj, {
            days: 3,
            speakers: 15,
            brands: 12,
            duration: 2,
            ease: 'power3.out',
            onUpdate: () => {
              setCounts({
                days: Math.floor(counterObj.days),
                speakers: Math.floor(counterObj.speakers),
                brands: Math.floor(counterObj.brands),
              });
            },
          });
        },
      });

      // SVG Geometric Line Tracing
      if (svgLine1Ref.current && svgLine2Ref.current) {
        const len1 = svgLine1Ref.current.getTotalLength();
        const len2 = svgLine2Ref.current.getTotalLength();

        gsap.set(svgLine1Ref.current, { strokeDasharray: len1, strokeDashoffset: len1 });
        gsap.set(svgLine2Ref.current, { strokeDasharray: len2, strokeDashoffset: len2 });

        gsap.to([svgLine1Ref.current, svgLine2Ref.current], {
          strokeDashoffset: 0,
          duration: 2.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 70%',
          },
        });
      }

      // Card entrance animation
      gsap.fromTo(
        cardRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        statsCardRef.current,
        { scale: 0.9, opacity: 0, rotate: -2 },
        {
          scale: 1,
          opacity: 1,
          rotate: 0,
          duration: 1.2,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 75%',
          },
        }
      );
    }, cardRef);

    const cleanMagnetic = attachMagneticEffect(buttonRef.current, 0.35);

    return () => {
      ctx.revert();
      cleanMagnetic();
    };
  }, []);

  const format2 = (n: number) => String(n).padStart(2, '0');

  return (
    <section id="premier-event" className="bg-white py-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div
          ref={cardRef}
          className="bg-[#111318] rounded-[36px] overflow-hidden border border-neutral-800 shadow-2xl relative p-7 sm:p-10 lg:p-14 transition-all"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
            {/* Left Content */}
            <div className="lg:col-span-4 z-10 flex flex-col justify-center">
              <h2
                ref={titleRef}
                className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[4.85rem] uppercase leading-[0.88] tracking-tight text-white mb-6"
              >
                PREMIER <br />
                EVENT FOR <br />
                COLLEGE <br />
                SPORTS
              </h2>

              <p className="text-neutral-300 text-sm sm:text-base mb-8 max-w-sm">
                Signup to watch the livestream for free
              </p>

              <div>
                <button
                  ref={buttonRef}
                  onClick={onOpenLiveStream}
                  className="bg-white hover:bg-neutral-100 text-black font-semibold text-sm pl-6 pr-2 py-2 rounded-full inline-flex items-center gap-3.5 shadow-xl transition-all duration-200 cursor-pointer group"
                >
                  <span>Live Stream</span>
                  <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
              </div>
            </div>

            {/* Center Player Image with Geometric Vector Overlay */}
            <div className="lg:col-span-5 relative flex items-center justify-center min-h-[350px] sm:min-h-[440px]">
              <div className="relative w-full max-w-md h-80 sm:h-[410px] rounded-3xl overflow-hidden shadow-2xl bg-neutral-900 border border-white/10">
                <img
                  ref={playerImageRef}
                  src={IMAGES.collegeQb}
                  alt="College Football Quarterback in Red Jersey"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter brightness-105 contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111318]/70 via-transparent to-transparent" />

                {/* Stylized geometric line graphic animated with GSAP */}
                <svg
                  viewBox="0 0 400 400"
                  className="absolute inset-0 w-full h-full pointer-events-none fill-none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    ref={svgLine1Ref}
                    d="M 60 180 L 140 100 L 260 100 L 320 180 L 280 320 L 120 320 Z"
                    stroke="rgba(255, 255, 255, 0.85)"
                    strokeWidth="2.5"
                    strokeDasharray="4 2"
                  />
                  <path
                    ref={svgLine2Ref}
                    d="M 100 190 L 180 140 L 300 210 L 260 300 Z"
                    stroke="rgba(255, 255, 255, 0.95)"
                    strokeWidth="2.5"
                  />
                  <circle cx="140" cy="100" r="5" fill="#ccff00" className="animate-pulse" />
                  <circle cx="260" cy="100" r="5" fill="#ccff00" />
                  <circle cx="320" cy="180" r="5" fill="#ccff00" />
                  <circle cx="180" cy="140" r="5" fill="#ccff00" />
                </svg>
              </div>
            </div>

            {/* Right Lime Green Stats Card */}
            <div className="lg:col-span-3 flex justify-center lg:justify-end">
              <div
                ref={statsCardRef}
                className="bg-[#ccff00] text-black w-full max-w-[250px] rounded-[30px] p-6 sm:p-8 flex flex-col justify-between shadow-[0_15px_35px_rgba(204,255,0,0.25)] border border-[#b8e600]"
              >
                {/* Stat 1: Days */}
                <div className="py-2">
                  <div className="font-display font-bold text-6xl sm:text-7xl leading-none text-black">
                    {format2(counts.days)}
                  </div>
                  <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-800 mt-1">
                    Days
                  </div>
                </div>

                <div className="border-t border-black/20 my-3" />

                {/* Stat 2: Speakers */}
                <div className="py-2">
                  <div className="font-display font-bold text-6xl sm:text-7xl leading-none text-black">
                    {format2(counts.speakers)}
                  </div>
                  <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-800 mt-1">
                    Speakers
                  </div>
                </div>

                <div className="border-t border-black/20 my-3" />

                {/* Stat 3: Brands */}
                <div className="py-2">
                  <div className="font-display font-bold text-6xl sm:text-7xl leading-none text-black">
                    {format2(counts.brands)}
                  </div>
                  <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-800 mt-1">
                    Brands
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
