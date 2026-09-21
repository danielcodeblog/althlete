import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { IMAGES } from '../data/mockData';
import { gsap, ScrollTrigger, attachMagneticEffect } from '../utils/gsap';

interface TransferPortalCTAProps {
  onOpenSignUp: () => void;
  onOpenLiveStream: () => void;
}

export const TransferPortalCTA: React.FC<TransferPortalCTAProps> = ({
  onOpenSignUp,
  onOpenLiveStream,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const signUpBtnRef = useRef<HTMLButtonElement>(null);
  const liveStreamBtnRef = useRef<HTMLButtonElement>(null);
  const svgPath1Ref = useRef<SVGPathElement>(null);
  const svgPath2Ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards on scroll
      gsap.fromTo(
        [leftCardRef.current, rightCardRef.current],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      // SVG Line Drawing Animation
      if (svgPath1Ref.current && svgPath2Ref.current) {
        const len1 = svgPath1Ref.current.getTotalLength();
        const len2 = svgPath2Ref.current.getTotalLength();

        gsap.set(svgPath1Ref.current, { strokeDasharray: len1, strokeDashoffset: len1 });
        gsap.set(svgPath2Ref.current, { strokeDasharray: len2, strokeDashoffset: len2 });

        gsap.to([svgPath1Ref.current, svgPath2Ref.current], {
          strokeDashoffset: 0,
          duration: 2.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: rightCardRef.current,
            start: 'top 70%',
          },
        });
      }
    }, sectionRef);

    const c1 = attachMagneticEffect(signUpBtnRef.current, 0.3);
    const c2 = attachMagneticEffect(liveStreamBtnRef.current, 0.35);

    return () => {
      ctx.revert();
      c1();
      c2();
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Left Dark CTA Card matching Image 1 */}
          <div
            ref={leftCardRef}
            className="bg-[#111318] rounded-[34px] p-8 sm:p-12 lg:p-14 border border-neutral-800 shadow-xl flex flex-col items-center justify-center text-center"
          >
            <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-[3.6rem] uppercase tracking-tight leading-[0.92] text-white mb-6">
              DO YOU WANT TO <br />
              WATCH TOP PROSPECTS <br />
              IN THE TRANSFER <br />
              PORTAL?
            </h2>

            <p className="text-neutral-400 text-sm sm:text-base max-w-md leading-relaxed mb-8">
              Join the list of college sports fans who are rooting for their team to land the
              nation&apos;s best prospects.
            </p>

            <div className="flex items-center gap-3.5 flex-wrap justify-center">
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
                className="bg-white hover:bg-neutral-100 text-black font-semibold text-sm pl-6 pr-2 py-2 rounded-full inline-flex items-center gap-3.5 shadow-lg transition-all duration-200 cursor-pointer group"
              >
                <span>Live Stream</span>
                <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            </div>
          </div>

          {/* Right Red Player Card with Geometric Line Graphic */}
          <div
            ref={rightCardRef}
            className="relative rounded-[34px] overflow-hidden bg-neutral-900 border border-neutral-800 shadow-xl min-h-[380px] sm:min-h-[460px] group"
          >
            <img
              src={IMAGES.footballAction}
              alt="College Football Running Back with Football"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter brightness-105 contrast-110 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Geometric Vector Lines across athlete with GSAP animation */}
            <svg
              viewBox="0 0 400 400"
              className="absolute inset-0 w-full h-full pointer-events-none fill-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                ref={svgPath1Ref}
                d="M 50 200 L 150 140 L 250 170 L 350 220 L 280 340 L 100 320 Z"
                stroke="rgba(255, 255, 255, 0.85)"
                strokeWidth="2.5"
                strokeDasharray="5 3"
              />
              <path
                ref={svgPath2Ref}
                d="M 80 220 L 190 160 L 320 230"
                stroke="rgba(255, 255, 255, 0.95)"
                strokeWidth="2"
              />
              <circle cx="150" cy="140" r="5" fill="#ccff00" className="animate-pulse" />
              <circle cx="250" cy="170" r="5" fill="#ccff00" />
              <circle cx="350" cy="220" r="5" fill="#ccff00" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};
