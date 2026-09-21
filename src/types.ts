export interface Athlete {
  id: string;
  name: string;
  sport: 'Basketball' | 'Run' | 'Rugby' | 'Football';
  category: string;
  badge: string;
  tenure: string;
  image: string;
  rating?: string;
  team?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Partner {
  id: string;
  name: string;
  type: 'exos' | 'omaha';
}
