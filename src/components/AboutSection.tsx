import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../utils/gsap';

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const statementRef = useRef<HTMLParagraphElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });

      tl.fromTo(
        headingRef.current,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        0
      )
        .fromTo(
          statementRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
          0.2
        )
        .fromTo(
          [col1Ref.current, col2Ref.current],
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out' },
          0.4
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-white text-black pt-16 pb-24 px-4 sm:px-8 border-t border-neutral-100 relative"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left Column: ABOUT Heading */}
          <div className="lg:col-span-3">
            <h2
              ref={headingRef}
              className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-neutral-950"
            >
              ABOUT
            </h2>
          </div>

          {/* Right Column: Bold Statement and Two-Column Content */}
          <div className="lg:col-span-9">
            {/* Bold Display Statement matching Image 2 */}
            <p
              ref={statementRef}
              className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] uppercase tracking-tight text-neutral-950 leading-[1.12] mb-12"
            >
              ATHLETE SHOWCASE IS THE PREMIER EVENT FOR TOP TRANSFER PORTAL PROSPECTS,
              DIRECTLY CONNECTING ELITE PLAYERS TO GREATER NIL EARNING OPPORTUNITIES.
            </p>

            {/* Two-Column Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 text-neutral-600 text-sm sm:text-base leading-relaxed">
              <div ref={col1Ref}>
                <p>
                  Athlete Showcase is by invite-only for the top transfer portal
                  prospects in college football. Fans can tune in live to watch elite
                  talent take to the field and increase their NIL earning potential.
                  Athlete Showcase will set the stage for NIL growth and
                  career-defining connections.
                </p>
              </div>

              <div ref={col2Ref}>
                <h3 className="font-semibold text-neutral-950 text-base sm:text-lg mb-2">
                  What to Expect
                </h3>
                <p>
                  Witness exclusive workouts, college athlete interviews and NIL data
                  – all in one thrilling live-streamed event.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
