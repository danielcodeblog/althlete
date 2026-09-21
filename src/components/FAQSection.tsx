import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, AtSign } from 'lucide-react';
import { FAQS } from '../data/mockData';
import { gsap, attachMagneticEffect } from '../utils/gsap';

interface FAQSectionProps {
  onContactClick: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onContactClick }) => {
  const [openId, setOpenId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const contactBtnRef = useRef<HTMLButtonElement>(null);
  const atSignBtnRef = useRef<HTMLButtonElement>(null);
  const faqItemsRef = useRef<HTMLDivElement[]>([]);
  const contentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const toggle = (id: string) => {
    const isCurrentlyOpen = openId === id;
    const nextId = isCurrentlyOpen ? null : id;

    // Smooth GSAP accordion height transitions
    if (openId && contentRefs.current[openId]) {
      gsap.to(contentRefs.current[openId], {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.inOut',
      });
    }

    if (nextId && contentRefs.current[nextId]) {
      gsap.fromTo(
        contentRefs.current[nextId],
        { height: 0, opacity: 0 },
        {
          height: 'auto',
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        }
      );
    }

    setOpenId(nextId);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftCardRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        faqItemsRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    const c1 = attachMagneticEffect(contactBtnRef.current, 0.3);
    const c2 = attachMagneticEffect(atSignBtnRef.current, 0.35);

    return () => {
      ctx.revert();
      c1();
      c2();
    };
  }, []);

  return (
    <section id="faq" ref={sectionRef} className="bg-white py-16 sm:py-24 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Lime Green Card matching Image 1 */}
          <div className="lg:col-span-4">
            <div
              ref={leftCardRef}
              className="bg-[#ccff00] rounded-[34px] p-8 sm:p-10 text-black flex flex-col justify-between min-h-[380px] sm:min-h-[420px] shadow-[0_15px_35px_rgba(204,255,0,0.22)] border border-[#b8e600]"
            >
              <div>
                <h2 className="font-display font-bold text-5xl sm:text-6xl uppercase tracking-tight text-black mb-8">
                  FAQ
                </h2>
              </div>

              <div>
                <div className="border-t border-black/20 mb-8" />
                <p className="text-black font-semibold text-base sm:text-lg mb-6">
                  Do you have another question?
                </p>

                <div className="flex items-center gap-2.5">
                  <button
                    ref={contactBtnRef}
                    onClick={onContactClick}
                    className="bg-black hover:bg-neutral-800 text-white font-semibold text-sm px-6 py-2.5 rounded-full transition-all duration-200 cursor-pointer shadow-lg"
                  >
                    Contact Us
                  </button>

                  <button
                    ref={atSignBtnRef}
                    onClick={onContactClick}
                    className="w-10 h-10 rounded-full bg-black hover:bg-neutral-800 text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg"
                    aria-label="Email Us"
                  >
                    <AtSign className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Accordion List */}
          <div className="lg:col-span-8 flex flex-col gap-3 sm:gap-3.5">
            {FAQS.map((faq, idx) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  ref={(el) => {
                    if (el) faqItemsRef.current[idx] = el;
                  }}
                  className={`border border-neutral-200/90 transition-all duration-300 bg-white shadow-2xs overflow-hidden ${
                    isOpen ? 'rounded-[26px] bg-neutral-50/50' : 'rounded-full'
                  }`}
                >
                  <button
                    onClick={() => toggle(faq.id)}
                    className="w-full flex items-center justify-between py-4.5 px-6 sm:px-8 text-left gap-4 cursor-pointer hover:bg-neutral-50/70 transition-colors"
                  >
                    <span className="font-semibold text-sm sm:text-base text-neutral-900 leading-snug">
                      {faq.question}
                    </span>
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-neutral-700 transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180 bg-neutral-200' : 'bg-neutral-100'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  {/* Accordion Content with GSAP Animation Ref */}
                  <div
                    ref={(el) => {
                      contentRefs.current[faq.id] = el;
                    }}
                    style={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 sm:px-8 pb-5 pt-1 text-neutral-600 text-sm leading-relaxed border-t border-neutral-100">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
