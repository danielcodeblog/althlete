import React, { useEffect, useRef } from 'react';
import { gsap, attachMagneticEffect } from '../utils/gsap';

export const OurPartners: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const pillsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        pillsRef.current,
        { y: 40, opacity: 0, scale: 0.92 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          stagger: 0.07,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    // Attach magnetic interaction to all partner pills
    const cleanups = pillsRef.current.map((pill) => attachMagneticEffect(pill, 0.22));

    return () => {
      ctx.revert();
      cleanups.forEach((c) => c());
    };
  }, []);

  const addPillRef = (el: HTMLDivElement | null) => {
    if (el && !pillsRef.current.includes(el)) {
      pillsRef.current.push(el);
    }
  };

  return (
    <section ref={sectionRef} className="bg-white py-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2
          ref={titleRef}
          className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-tight text-neutral-950 mb-12"
        >
          OUR PARTNERS
        </h2>

        {/* Honeycomb / Staggered Pill Cluster matching Image 1 */}
        <div className="flex flex-col items-center gap-4 max-w-2xl mx-auto">
          {/* Row 1: 2 Pills */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div
              ref={addPillRef}
              className="bg-white border border-neutral-200/90 hover:border-neutral-400 px-8 py-3 rounded-full shadow-xs hover:shadow-md flex items-center justify-center min-w-[140px] transition-all cursor-pointer"
            >
              <span className="font-bold text-2xl tracking-tight text-neutral-600 font-sans lowercase">
                exos
              </span>
            </div>

            <div
              ref={addPillRef}
              className="bg-white border border-neutral-200/90 hover:border-neutral-400 px-8 py-3 rounded-full shadow-xs hover:shadow-md flex flex-col items-center justify-center min-w-[155px] transition-all cursor-pointer"
            >
              <span className="font-display font-bold text-xl tracking-wider text-neutral-800 leading-none">
                OMAHA
              </span>
              <span className="text-[8px] font-semibold tracking-widest text-neutral-500 uppercase -mt-0.5">
                PRODUCTIONS
              </span>
            </div>
          </div>

          {/* Row 2: 3 Pills */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div
              ref={addPillRef}
              className="bg-white border border-neutral-200/90 hover:border-neutral-400 px-8 py-3 rounded-full shadow-xs hover:shadow-md flex items-center justify-center min-w-[140px] transition-all cursor-pointer"
            >
              <span className="font-bold text-2xl tracking-tight text-neutral-600 font-sans lowercase">
                exos
              </span>
            </div>

            <div
              ref={addPillRef}
              className="bg-white border border-neutral-200/90 hover:border-neutral-400 px-8 py-3 rounded-full shadow-xs hover:shadow-md flex items-center justify-center min-w-[140px] transition-all cursor-pointer"
            >
              <span className="font-bold text-2xl tracking-tight text-neutral-600 font-sans lowercase">
                exos
              </span>
            </div>

            <div
              ref={addPillRef}
              className="bg-white border border-neutral-200/90 hover:border-neutral-400 px-8 py-3 rounded-full shadow-xs hover:shadow-md flex items-center justify-center min-w-[140px] transition-all cursor-pointer"
            >
              <span className="font-bold text-2xl tracking-tight text-neutral-600 font-sans lowercase">
                exos
              </span>
            </div>
          </div>

          {/* Row 3: 2 Pills */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div
              ref={addPillRef}
              className="bg-white border border-neutral-200/90 hover:border-neutral-400 px-8 py-3 rounded-full shadow-xs hover:shadow-md flex items-center justify-center min-w-[140px] transition-all cursor-pointer"
            >
              <span className="font-bold text-2xl tracking-tight text-neutral-600 font-sans lowercase">
                exos
              </span>
            </div>

            <div
              ref={addPillRef}
              className="bg-white border border-neutral-200/90 hover:border-neutral-400 px-8 py-3 rounded-full shadow-xs hover:shadow-md flex items-center justify-center min-w-[140px] transition-all cursor-pointer"
            >
              <span className="font-bold text-2xl tracking-tight text-neutral-600 font-sans lowercase">
                exos
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
