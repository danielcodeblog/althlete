import React, { useRef, useState, useEffect } from 'react';
import { ATHLETES } from '../data/mockData';
import { Athlete } from '../types';
import { gsap, ScrollTrigger, attachMagneticEffect } from '../utils/gsap';

interface FeaturedAthletesProps {
  onSelectAthlete: (athlete: Athlete) => void;
}

export const FeaturedAthletes: React.FC<FeaturedAthletesProps> = ({ onSelectAthlete }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragBadgeRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const poweredByRef = useRef<HTMLDivElement>(null);
  const exosPillRef = useRef<HTMLDivElement>(null);
  const omahaPillRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);

  // GSAP ScrollTrigger Entrance & Cursor Follower
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Animation
      gsap.fromTo(
        headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        cardsRef.current,
        { y: 60, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: scrollRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        poweredByRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: poweredByRef.current,
            start: 'top 90%',
          },
        }
      );
    }, sectionRef);

    // Magnetic buttons for powered by
    const cleanExos = attachMagneticEffect(exosPillRef.current, 0.25);
    const cleanOmaha = attachMagneticEffect(omahaPillRef.current, 0.25);

    // Dynamic Cursor Tracking for DRAG Bubble
    const container = containerRef.current;
    const badge = dragBadgeRef.current;

    let quickX: (val: number) => void;
    let quickY: (val: number) => void;

    if (badge && container) {
      quickX = gsap.quickTo(badge, 'x', { duration: 0.45, ease: 'power3' });
      quickY = gsap.quickTo(badge, 'y', { duration: 0.45, ease: 'power3' });

      const handlePointerMove = (e: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left - 36;
        const y = e.clientY - rect.top - 36;
        quickX(x);
        quickY(y);
      };

      const handlePointerEnter = () => {
        gsap.to(badge, {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      const handlePointerLeave = () => {
        // Return to center
        const rect = container.getBoundingClientRect();
        quickX(rect.width / 2 - 36);
        quickY(rect.height / 2 - 36);
      };

      container.addEventListener('pointermove', handlePointerMove);
      container.addEventListener('pointerenter', handlePointerEnter);
      container.addEventListener('pointerleave', handlePointerLeave);

      return () => {
        ctx.revert();
        cleanExos();
        cleanOmaha();
        container.removeEventListener('pointermove', handlePointerMove);
        container.removeEventListener('pointerenter', handlePointerEnter);
        container.removeEventListener('pointerleave', handlePointerLeave);
      };
    }

    return () => {
      ctx.revert();
      cleanExos();
      cleanOmaha();
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setHasMoved(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);

    if (dragBadgeRef.current) {
      gsap.to(dragBadgeRef.current, {
        scale: 0.85,
        backgroundColor: '#0f48e6',
        duration: 0.2,
      });
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    if (dragBadgeRef.current) {
      gsap.to(dragBadgeRef.current, {
        scale: 1,
        backgroundColor: '#1e5aff',
        duration: 0.3,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (dragBadgeRef.current) {
      gsap.to(dragBadgeRef.current, {
        scale: 1,
        backgroundColor: '#1e5aff',
        duration: 0.3,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.6;
    if (Math.abs(walk) > 6) {
      setHasMoved(true);
    }
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section
      id="athletes"
      ref={sectionRef}
      className="bg-white text-black pt-16 sm:pt-24 pb-20 px-4 sm:px-8 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Heading matching Image 2 */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-neutral-950 mb-4">
            FEATURED ATHLETES
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
            Meet some of the top athletes entering the Transfer Portal. These players
            represent the future of college sports, each with the talent, skill, and
            drive to excel on and off the field.
          </p>
        </div>

        {/* Carousel Container with Interactive Floating DRAG Bubble */}
        <div ref={containerRef} className="relative select-none">
          {/* Floating Electric Blue DRAG Badge */}
          <div
            ref={dragBadgeRef}
            className="pointer-events-none absolute left-0 top-0 z-30 hidden md:flex items-center justify-center w-[74px] h-[74px] rounded-full bg-[#1e5aff] text-white font-bold text-xs tracking-wider uppercase shadow-[0_12px_28px_rgba(30,90,255,0.45)] ring-4 ring-white/50 cursor-grab will-change-transform"
            style={{ transform: 'translate3d(500px, 160px, 0)' }}
          >
            DRAG
          </div>

          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={`flex gap-5 sm:gap-6 overflow-x-auto no-scrollbar pb-8 pt-2 px-1 scroll-smooth ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
          >
            {ATHLETES.map((athlete, idx) => (
              <div
                key={athlete.id}
                ref={(el) => {
                  if (el) cardsRef.current[idx] = el;
                }}
                onClick={() => !hasMoved && onSelectAthlete(athlete)}
                className="group relative flex-none w-[265px] sm:w-[290px] h-[380px] sm:h-[410px] rounded-[28px] overflow-hidden bg-neutral-900 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-neutral-200/80"
              >
                {/* Athlete Card Image */}
                <img
                  src={athlete.image}
                  alt={athlete.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 filter brightness-100 contrast-105"
                />

                {/* Dark Gradient Overlay for optimal legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                {/* Top Badge: Monogram mark on left, Sport pill on right */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                      <path d="M12 2L4 19h3.5l1.8-4.2h5.4L16.5 19H20L12 2zm0 5.8l1.7 4h-3.4l1.7-4z" />
                    </svg>
                  </div>

                  <span className="bg-[#ccff00] text-black text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {athlete.badge}
                  </span>
                </div>

                {/* Fun Smiley Face Graphic on Card 1 (Nikola Jokić) directly replicating Image 2 */}
                {idx === 0 && (
                  <div className="absolute top-[28%] left-1/2 -translate-x-1/2 z-15 pointer-events-none group-hover:scale-110 transition-transform duration-300">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#ffea00] border-2 border-black flex items-center justify-center shadow-lg">
                      <svg
                        viewBox="0 0 100 100"
                        className="w-10 h-10 sm:w-12 sm:h-12 fill-black"
                      >
                        {/* Smiley Eyes and Mouth */}
                        <circle cx="34" cy="38" r="6" />
                        <circle cx="66" cy="38" r="6" />
                        <path
                          d="M 28 58 Q 50 82 72 58"
                          fill="none"
                          stroke="black"
                          strokeWidth="7"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Bottom Overlay: Athlete Name & Tenure */}
                <div className="absolute bottom-5 left-5 right-5 z-10 text-white">
                  <h3 className="font-semibold text-xl tracking-tight text-white mb-0.5 group-hover:text-[#ccff00] transition-colors">
                    {athlete.name}
                  </h3>
                  <p className="text-xs text-neutral-300 font-normal">
                    {athlete.tenure}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Powered By Section matching Image 2 bottom */}
        <div
          ref={poweredByRef}
          className="mt-14 sm:mt-18 text-center flex flex-col items-center"
        >
          <p className="text-xs text-neutral-400 font-semibold uppercase tracking-widest mb-4">
            Powered by
          </p>

          <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
            {/* EXOS pill logo */}
            <div
              ref={exosPillRef}
              className="bg-white border border-neutral-200/90 hover:border-neutral-400 px-8 py-2.5 rounded-full shadow-xs hover:shadow-md flex items-center justify-center min-w-[130px] transition-all cursor-pointer"
            >
              <span className="font-bold text-xl tracking-tight text-neutral-800 lowercase font-sans">
                exos
              </span>
            </div>

            {/* Omaha Productions pill logo */}
            <div
              ref={omahaPillRef}
              className="bg-white border border-neutral-200/90 hover:border-neutral-400 px-8 py-2.5 rounded-full shadow-xs hover:shadow-md flex flex-col items-center justify-center min-w-[145px] transition-all cursor-pointer"
            >
              <span className="font-display font-bold text-lg tracking-wider text-neutral-900 leading-none">
                OMAHA
              </span>
              <span className="text-[9px] font-semibold tracking-widest text-neutral-500 uppercase -mt-0.5">
                PRODUCTIONS
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
