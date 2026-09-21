import { Athlete, FAQItem } from '../types';

import heroFootballImg from '../assets/images/hero_football_player_1789574723807.jpg';
import jokicImg from '../assets/images/athlete_jokic_1789574787097.jpg';
import sprinterImg from '../assets/images/athlete_sprinter_1789574803503.jpg';
import rugbyImg from '../assets/images/athlete_rugby_green_1789574816830.jpg';
import hoopsImg from '../assets/images/athlete_hoops_1789574832610.jpg';
import collegeQbImg from '../assets/images/college_qb_red_1789574740597.jpg';
import crowdImg from '../assets/images/stadium_crowd_aerial_1789574756137.jpg';
import footballActionImg from '../assets/images/football_action_red_1789574772021.jpg';

export const IMAGES = {
  hero: heroFootballImg,
  jokic: jokicImg,
  sprinter: sprinterImg,
  rugby: rugbyImg,
  hoops: hoopsImg,
  collegeQb: collegeQbImg,
  crowd: crowdImg,
  footballAction: footballActionImg,
};

export const ATHLETES: Athlete[] = [
  {
    id: '1',
    name: 'Nikola Jokić',
    sport: 'Basketball',
    category: 'Center / Playmaker',
    badge: 'Basketball',
    tenure: '8 years in the league',
    image: jokicImg,
    rating: '98 OVR',
    team: 'Denver Showcase'
  },
  {
    id: '2',
    name: 'Noah Lyles',
    sport: 'Run',
    category: '100m / 200m Sprint',
    badge: 'Run',
    tenure: '8 years in the league',
    image: sprinterImg,
    rating: '99 SPD',
    team: 'USA Track'
  },
  {
    id: '3',
    name: 'Carlin Isles',
    sport: 'Rugby',
    category: 'Wing / Speedster',
    badge: 'Rugby',
    tenure: '8 years in the league',
    image: rugbyImg,
    rating: '97 SPD',
    team: 'Rugby 7s'
  },
  {
    id: '4',
    name: 'Jordan Collins',
    sport: 'Basketball',
    category: 'Forward / NCAA Transfer',
    badge: 'Basketball',
    tenure: '8 years in the league',
    image: hoopsImg,
    rating: '93 OVR',
    team: 'ACC Transfer'
  },
  {
    id: '5',
    name: 'Marcus Henderson',
    sport: 'Football',
    category: 'Quarterback / All-American',
    badge: 'Football',
    tenure: '3 years in NCAA',
    image: collegeQbImg,
    rating: '95 THP',
    team: 'SEC Prospect'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What is NIL and how does it affect student athletes?',
    answer:
      'NIL stands for Name, Image, and Likeness. It grants student-athletes the legal right to monetize their personal brand through sponsorships, commercial endorsements, public appearances, merchandise, and digital media partnerships without forfeiting their college eligibility.'
  },
  {
    id: 'faq-2',
    question: 'Who can participate in this event?',
    answer:
      'Athlete Showcase is an exclusive, invite-only platform for premier student-athletes entering the NCAA Transfer Portal, top-tier collegiate prospects, verified college recruiters, national media, and certified brand sponsors looking for talent.'
  },
  {
    id: 'faq-3',
    question: 'What opportunities does NIL offer student-athletes?',
    answer:
      'Beyond direct financial compensation, NIL opens avenues for equity partnerships, professional networking, sports marketing experience, personal brand development, and long-term career opportunities before and after graduation.'
  },
  {
    id: 'faq-4',
    question: 'Will there be support for creating sponsorship deals?',
    answer:
      'Yes. Athlete Showcase partners with sports agencies, legal advisors, and platforms like EXOS and Omaha Productions to assist prospects with valuation data, contract templates, compliance verification, and brand matchmaking.'
  },
  {
    id: 'faq-5',
    question: 'How does NIL impact students\' athletic careers?',
    answer:
      'NIL empowers athletes to build financial stability while maintaining peak training and academic focus. It elevates visibility across the transfer portal and connects top performers directly to high-impact collegiate programs.'
  }
];
