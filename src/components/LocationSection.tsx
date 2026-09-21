import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, ArrowLeft, ArrowRight } from 'lucide-react';
import { IMAGES } from '../data/mockData';
import { gsap, attachMagneticEffect } from '../utils/gsap';

interface LocationSectionProps {
  onOpenMapModal: () => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ onOpenMapModal }) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const openMapBtnRef = useRef<HTMLButtonElement>(null);
  const navBtnRef = useRef<HTMLButtonElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  const photos = [
    {
      src: IMAGES.crowd,
      caption: 'Dragon Stadium Concourse & Registration',
    },
    {
      src: IMAGES.hero,
      caption: 'On-Field Showcase & Testing Facility',
    },
  ];

  const animatePhotoChange = (newIdx: number) => {
    if (imgRef.current) {
      gsap.fromTo(
        imgRef.current,
        { opacity: 0.3, scale: 1.04 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
      );
    }
    setPhotoIndex(newIdx);
  };

  const nextPhoto = () => {
    animatePhotoChange((photoIndex + 1) % photos.length);
  };

  const prevPhoto = () => {
    animatePhotoChange((photoIndex - 1 + photos.length) % photos.length);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { y: 50, opacity: 0 },
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
    }, cardRef);

    const c1 = attachMagneticEffect(openMapBtnRef.current, 0.3);
    const c2 = attachMagneticEffect(navBtnRef.current, 0.35);
    const c3 = attachMagneticEffect(prevBtnRef.current, 0.35);
    const c4 = attachMagneticEffect(nextBtnRef.current, 0.35);

    return () => {
      ctx.revert();
      c1();
      c2();
      c3();
      c4();
    };
  }, []);

  return (
    <section id="location" className="bg-white py-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div
          ref={cardRef}
          className="bg-[#111318] rounded-[36px] overflow-hidden border border-neutral-800 shadow-2xl p-7 sm:p-10 lg:p-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white mb-8">
                LOCATION
              </h2>

              {/* Lime Map Pin Badge */}
              <div className="w-13 h-13 rounded-full bg-[#ccff00] text-black flex items-center justify-center mb-6 shadow-lg shadow-[#ccff00]/20">
                <MapPin className="w-6 h-6 fill-current" />
              </div>

              {/* Date & Stadium */}
              <div className="mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1.5">
                  January 5th, 2025
                </h3>
                <p className="text-sm sm:text-base text-neutral-400">
                  Dragon Stadium in Southlake Texas
                </p>
              </div>

              {/* Action Buttons matching Image 1 */}
              <div className="flex items-center gap-3">
                <button
                  ref={openMapBtnRef}
                  onClick={onOpenMapModal}
                  className="bg-white hover:bg-neutral-100 text-black font-semibold text-sm px-6 py-2.5 rounded-full transition-all duration-200 shadow-lg cursor-pointer"
                >
                  Open Map
                </button>

                <button
                  ref={navBtnRef}
                  onClick={onOpenMapModal}
                  className="w-10 h-10 rounded-full border border-white/25 hover:border-white/50 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Venue Directions"
                >
                  <Navigation className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Crowd / Stadium Photo Carousel */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[4/3] rounded-[30px] overflow-hidden shadow-2xl bg-neutral-900 border border-neutral-800">
                <img
                  ref={imgRef}
                  src={photos[photoIndex].src}
                  alt={photos[photoIndex].caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover will-change-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                {/* Bottom-right carousel white arrow buttons matching Image 1 */}
                <div className="absolute bottom-5 right-5 flex items-center gap-2.5 z-10">
                  <button
                    ref={prevBtnRef}
                    onClick={prevPhoto}
                    className="w-10 h-10 rounded-full bg-white hover:bg-neutral-200 text-black flex items-center justify-center shadow-xl transition-transform hover:scale-105 cursor-pointer"
                    aria-label="Previous stadium view"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    ref={nextBtnRef}
                    onClick={nextPhoto}
                    className="w-10 h-10 rounded-full bg-white hover:bg-neutral-200 text-black flex items-center justify-center shadow-xl transition-transform hover:scale-105 cursor-pointer"
                    aria-label="Next stadium view"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
