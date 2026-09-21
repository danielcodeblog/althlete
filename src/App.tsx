/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturedAthletes } from './components/FeaturedAthletes';
import { AboutSection } from './components/AboutSection';
import { PremierEventCard } from './components/PremierEventCard';
import { LocationSection } from './components/LocationSection';
import { OurPartners } from './components/OurPartners';
import { TransferPortalCTA } from './components/TransferPortalCTA';
import { FAQSection } from './components/FAQSection';
import { FooterSection } from './components/FooterSection';
import { SignUpModal } from './components/SignUpModal';
import { LiveStreamModal } from './components/LiveStreamModal';
import { ContactModal } from './components/ContactModal';
import { AthleteModal } from './components/AthleteModal';
import { MapModal } from './components/MapModal';
import { Athlete } from './types';

export default function App() {
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [liveStreamOpen, setLiveStreamOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);
  const [contactTitle, setContactTitle] = useState('CONNECT WITH ATHLETE SHOWCASE');
  const [contactTopic, setContactTopic] = useState('General Inquiry');

  const handleOpenContact = (title?: string, topic?: string) => {
    if (title) setContactTitle(title);
    if (topic) setContactTopic(topic);
    setContactOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0f1115] text-neutral-900 font-sans selection:bg-[#ccff00] selection:text-black">
      {/* Top Navigation */}
      <Navbar
        onOpenSignUp={() => setSignUpOpen(true)}
        onOpenLiveStream={() => setLiveStreamOpen(true)}
      />

      {/* Main Page Flow Matching Exact Designs */}
      <main>
        {/* 1. Hero Section (Image 2 Top) */}
        <HeroSection onLocationClick={() => setMapOpen(true)} />

        {/* 2. Featured Athletes Horizontal Drag Carousel (Image 2 Middle) */}
        <FeaturedAthletes
          onSelectAthlete={(athlete) => setSelectedAthlete(athlete)}
        />

        {/* 3. About Section (Image 2 Middle-Bottom) */}
        <AboutSection />

        {/* 4. Premier Event For College Sports Card (Image 2 Bottom) */}
        <PremierEventCard onOpenLiveStream={() => setLiveStreamOpen(true)} />

        {/* 5. Location Section with Stadium Concourse Crowd (Image 1 Top) */}
        <LocationSection onOpenMapModal={() => setMapOpen(true)} />

        {/* 6. Our Partners Honeycomb/Pill Cloud (Image 1 Middle) */}
        <OurPartners />

        {/* 7. Do You Want To Watch Top Prospects In The Transfer Portal? Split Card (Image 1 Middle) */}
        <TransferPortalCTA
          onOpenSignUp={() => setSignUpOpen(true)}
          onOpenLiveStream={() => setLiveStreamOpen(true)}
        />

        {/* 8. FAQ Section with Lime Green Card & Accordion (Image 1 Bottom) */}
        <FAQSection
          onContactClick={() =>
            handleOpenContact('HAVE A QUESTION FOR THE TEAM?', 'General Question')
          }
        />
      </main>

      {/* 9. Footer Section with Partner Card, Contact & Giant Display Title (Image 1 Bottom) */}
      <FooterSection
        onOpenSignUp={() => setSignUpOpen(true)}
        onOpenLiveStream={() => setLiveStreamOpen(true)}
        onContactClick={() =>
          handleOpenContact('BECOME A SHOWCASE PARTNER', 'Sponsorship & Brand Partnership')
        }
      />

      {/* Interactive Modals */}
      <SignUpModal
        isOpen={signUpOpen}
        onClose={() => setSignUpOpen(false)}
      />

      <LiveStreamModal
        isOpen={liveStreamOpen}
        onClose={() => setLiveStreamOpen(false)}
      />

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        title={contactTitle}
        defaultTopic={contactTopic}
      />

      <AthleteModal
        athlete={selectedAthlete}
        onClose={() => setSelectedAthlete(null)}
        onOpenSignUp={() => {
          setSelectedAthlete(null);
          setSignUpOpen(true);
        }}
      />

      <MapModal
        isOpen={mapOpen}
        onClose={() => setMapOpen(false)}
      />
    </div>
  );
}
