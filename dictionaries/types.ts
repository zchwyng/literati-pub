export type FeatureIcon = 'headphones' | 'printer' | 'book' | 'zap' | 'sparkles' | 'file';

export type Dictionary = {
  nav: {
    brand: string;
    dashboard: string;
    signIn: string;
    signUp: string;
  };
  hero: {
    badge: string;
    title: string;
    highlight: string;
    description: string;
    checklist: string[];
    uploaderNote: string;
    quickSteps: string[];
    stats: { label: string; value: string }[];
    cardLabel: string;
    cardTitle: string;
    promiseTitle: string;
    promiseDescription: string;
  };
  howItWorks: {
    title: string;
    description: string;
    steps: { number: string; title: string; description: string; image?: string }[];
  };
  features: {
    title: string;
    description: string;
    items: {
      title: string;
      description: string;
      icon: FeatureIcon;
      image?: string;
    }[];
  };
  callout: {
    tag: string;
    title: string;
    description: string;
    action: string;
  };
  benefits: {
    title: string;
    description: string;
    items: { title: string; description: string }[];
  };
  socialProof: {
    title: string;
    description: string;
    logos: { name: string }[];
    testimonials: { quote: string; name: string; role: string }[];
  };
  footer: {
    privacy: string;
    terms: string;
    contact: string;
    copyright: string;
  };
};
