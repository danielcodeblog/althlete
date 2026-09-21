import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { gsap, attachMagneticEffect } from '../utils/gsap';

interface NavbarProps {
  onOpenSignUp: () => void;
  onOpenLiveStream: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSignUp, onOpenLiveStream }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [scrolled, setScrolled] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const logoBtnRef = useRef<HTMLButtonElement>(null);
  const signUpBtnRef = useRef<HTMLButtonElement>(null);
  const liveStreamBtnRef = useRef<HTMLButtonElement>(null);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // GSAP Navbar entrance
    gsap.fromTo(
      headerRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
    );

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Simple active link tracker
      const sections = ['about', 'athletes', 'premier-event', 'faq', 'location'];
      const scrollPos = window.scrollY + 200;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const c1 = attachMagneticEffect(logoBtnRef.current, 0.35);
    const c2 = attachMagneticEffect(signUpBtnRef.current, 0.3);
    const c3 = attachMagneticEffect(liveStreamBtnRef.current, 0.35);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      c1();
      c2();
      c3();
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 transition-all duration-300 ${
        scrolled ? 'pt-3 sm:pt-4' : 'pt-5 sm:pt-7'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo matching Image 2 */}
        <button
          ref={logoBtnRef}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center shadow-2xl hover:scale-105 transition-transform cursor-pointer"
          aria-label="Athlete Showcase Home"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 text-black fill-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2L4 19h3.5l1.8-4.2h5.4L16.5 19H20L12 2zm0 5.8l1.7 4h-3.4l1.7-4z" />
          </svg>
        </button>

        {/* Center Floating Pill Navigation matching Image 2 */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 bg-[#181a20]/85 backdrop-blur-xl px-7 py-2.5 rounded-full border border-white/15 shadow-2xl text-sm font-medium text-neutral-300">
          <button
            onClick={() => scrollTo('about')}
            className={`transition-colors cursor-pointer ${
              activeSection === 'about' ? 'text-white font-semibold' : 'hover:text-white'
            }`}
          >
            About
          </button>
          <button
            onClick={() => scrollTo('athletes')}
            className={`transition-colors cursor-pointer ${
              activeSection === 'athletes' ? 'text-white font-semibold' : 'hover:text-white'
            }`}
          >
            Featured Athletes
          </button>
          <button
            onClick={() => scrollTo('premier-event')}
            className={`transition-colors cursor-pointer ${
              activeSection === 'premier-event' ? 'text-white font-semibold' : 'hover:text-white'
            }`}
          >
            Activities
          </button>
          <button
            onClick={() => scrollTo('faq')}
            className={`transition-colors cursor-pointer ${
              activeSection === 'faq' ? 'text-white font-semibold' : 'hover:text-white'
            }`}
          >
            Timeline
          </button>
          <button
            onClick={() => scrollTo('location')}
            className={`transition-colors cursor-pointer ${
              activeSection === 'location' ? 'text-white font-semibold' : 'hover:text-white'
            }`}
          >
            Location
          </button>
        </nav>

        {/* Right Action Buttons matching Image 2 */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            ref={signUpBtnRef}
            onClick={onOpenSignUp}
            className="border border-white/25 hover:border-white/50 hover:bg-white/5 text-white text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-200 cursor-pointer"
          >
            Sign Up
          </button>

          <button
            ref={liveStreamBtnRef}
            onClick={onOpenLiveStream}
            className="bg-white hover:bg-neutral-100 text-black text-sm font-semibold pl-5 pr-1.5 py-1.5 rounded-full flex items-center gap-3 shadow-xl transition-all duration-200 cursor-pointer group"
          >
            <span>Live Stream</span>
            <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenLiveStream}
            className="bg-white text-black text-xs font-semibold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-md"
          >
            <span>Live</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 rounded-full bg-[#181a20]/90 border border-white/15 text-white flex items-center justify-center"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden mt-3 max-w-md mx-auto bg-[#181a20]/95 backdrop-blur-2xl border border-white/15 rounded-3xl p-5 shadow-2xl flex flex-col gap-3 text-sm">
          <button
            onClick={() => scrollTo('about')}
            className="text-left py-2 px-3 hover:bg-white/10 rounded-xl text-neutral-200"
          >
            About
          </button>
          <button
            onClick={() => scrollTo('athletes')}
            className="text-left py-2 px-3 hover:bg-white/10 rounded-xl text-neutral-200"
          >
            Featured Athletes
          </button>
          <button
            onClick={() => scrollTo('premier-event')}
            className="text-left py-2 px-3 hover:bg-white/10 rounded-xl text-neutral-200"
          >
            Activities
          </button>
          <button
            onClick={() => scrollTo('faq')}
            className="text-left py-2 px-3 hover:bg-white/10 rounded-xl text-neutral-200"
          >
            Timeline & FAQ
          </button>
          <button
            onClick={() => scrollTo('location')}
            className="text-left py-2 px-3 hover:bg-white/10 rounded-xl text-neutral-200"
          >
            Location
          </button>
          <div className="pt-2 border-t border-white/10 flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSignUp();
              }}
              className="w-full py-2.5 rounded-full border border-white/30 text-white font-medium text-center"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
