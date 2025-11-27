import { type Dictionary } from './types';

const dictionary: Dictionary = {
  nav: {
    brand: 'Literati Pub',
    dashboard: 'Dashboard',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    beta: 'Beta',
  },
  hero: {
    badge: 'For indie authors and first-time writers',
    title: 'Turn your draft into a bookstore-ready book.',
    highlight: 'No formatting. No overwhelm.',
    description:
      "Upload the story you've been dreaming about. We polish it into an audiobook and a print-ready novel that meets industry standards—so you can finally hold your book and share it with readers.",
    ctaPrimary: 'Start free',
    ctaSecondary: 'See how it works',
    checklist: [
      'Upload your Word doc, we handle the specs',
      'Narration tuned for tone and emotion',
      'Print PDFs ready for Amazon KDP & IngramSpark',
    ],
    uploaderNote: 'Free to start. Your first project is on us.',
    quickSteps: ['Idea to final files in minutes', 'Keep ownership of every file'],
    stats: [
      { label: 'Audiobook chapters', value: 'Ready in ~10 min' },
      { label: 'Print layout', value: '6x9” novel PDF' },
      { label: 'Compliance', value: 'ACX + KDP specs' },
      { label: 'Control', value: 'Download & own everything' },
    ],
    trustBar: [
      { label: 'Audio delivery', detail: 'ACX peak-normalized masters' },
      { label: 'Print layout', detail: 'KDP & IngramSpark compliant' },
      { label: 'Timeline', detail: 'Export files in under an hour' },
    ],
    cardLabel: 'Indie launchpad',
    cardTitle: 'From manuscript to market',
    promiseTitle: 'Built for writers who never want to touch InDesign.',
    promiseDescription:
      "Upload once, preview, and export polished files you can publish today. Keep writing—we'll handle the tech.",
  },
  howItWorks: {
    title: 'Your writing journey, without the tech headaches',
    description:
      "From the spark of an idea to a finished book you can share, every step is clear, fast, and author-friendly.",
    steps: [
      {
        number: '1',
        title: 'Upload and breathe',
        description:
          'Drop in your draft and skip the formatting rules. We clean, structure, and prep your story the moment it lands.',
        image:
          'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80&auto=format&fit=crop',
      },
      {
        number: '2',
        title: 'Choose your voice & look',
        description:
          'Pick narration that matches your tone and watch your chapters flow into a beautiful, print-ready layout. Preview before you export.',
        image:
          'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80&auto=format&fit=crop',
      },
      {
        number: '3',
        title: 'Publish with confidence',
        description:
          'Export ACX-compliant audio and KDP-ready PDFs. No guessing, no rejections—just files you can upload today.',
        image:
          'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80&auto=format&fit=crop',
      },
    ],
  },
  features: {
    title: 'Crafted for writers who are publishing themselves',
    description:
      'We took the painful parts of indie publishing and automated them—without losing the soul of your book.',
    items: [
      {
        title: 'Voice that fits your story',
        description:
          'Cinema-grade AI narration tuned for pacing, emotion, and clarity. Hear your book as if a professional actor read it.',
        icon: 'headphones',
        image:
          'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&q=80&auto=format&fit=crop',
      },
      {
        title: 'Typesetting without the tutorials',
        description:
          'Automatic 6x9″ print layout with chapter breaks, ornaments, margins, and page numbers dialed to spec.',
        icon: 'printer',
        image:
          'https://images.unsplash.com/photo-1448932252197-d19750584e56?w=600&q=80&auto=format&fit=crop',
      },
      {
        title: 'Distribution ready files',
        description:
          'Export packages that pass ACX, KDP, and IngramSpark on the first try. No fiddling with file settings.',
        icon: 'book',
        image:
          'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80&auto=format&fit=crop',
      },
      {
        title: 'Fast enough for launch week',
        description:
          'Generate narration and print layout in minutes, not months. Perfect for hitting preorder dates or crowdfunding promises.',
        icon: 'zap',
        image:
          'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&q=80&auto=format&fit=crop',
      },
      {
        title: 'Yours to own',
        description:
          'No subscriptions or locked formats. Download the mastered audio and print files, keep your IP, and publish anywhere.',
        icon: 'sparkles',
        image:
          'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80&auto=format&fit=crop',
      },
      {
        title: 'Formats for every reader',
        description:
          'MP3 for audiobooks, PDF for print-on-demand, EPUB on the roadmap. Each output is optimized for quality and compatibility.',
        icon: 'file',
        image:
          'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&q=80&auto=format&fit=crop',
      },
    ],
  },
  callout: {
    tag: 'built for authors, by authors',
    title: "You focus on the story. We'll package it for every shelf.",
    description:
      'Preview narration, tweak pacing, and export ready-to-upload files in one sitting. No more juggling freelancers or learning design software.',
    action: 'Start your first book',
  },
  useCases: {
    tag: 'fits your launch',
    title: 'Built for every publishing path',
    description:
      'Whether you are recording your first audiobook or prepping a print run for a preorder, Literati Pub adapts to the way you ship.',
    items: [
      {
        badge: 'PenLine',
        title: 'Drafting your first chapters',
        description:
          'Upload raw Word docs while you write. We keep your chapters tidy, versioned, and ready to export when you are.',
      },
      {
        badge: 'Mic',
        title: 'Audio-first storytellers',
        description:
          'Dial narration pacing, choose a voice, and export ACX-ready MP3s without booking a studio or learning DAWs.',
      },
      {
        badge: 'Library',
        title: 'Series authors & backlist',
        description:
          'Batch older titles into consistent print layouts and audio masters so every book in your universe feels cohesive.',
      },
    ],
  },
  testimonials: {
    title: 'Authors shipping faster',
    description:
      'Indie writers and first-time authors use Literati Pub to skip the technical hurdles and get straight to publishing.',
    items: [
      {
        quote:
          '“I uploaded a messy draft and had a clean KDP PDF in the same afternoon. It felt like skipping three freelancers.”',
        name: 'Ari, fantasy author',
        role: 'Self-published trilogy',
      },
      {
        quote:
          '“The narration presets nailed my protagonist’s tone. Listening back felt like hearing a pro studio session I didn’t have to manage.”',
        name: 'Dev, thriller writer',
        role: 'Audio-first release',
      },
      {
        quote:
          '“Having ACX and KDP specs baked in removed the guesswork. I hit my preorder date instead of waiting for revision emails.”',
        name: 'Mara, romance novelist',
        role: 'Crowdfunded launch',
      },
    ],
  },
  benefits: {
    title: 'Why writers choose Literati Pub',
    description:
      "We obsessed over the indie author journey so you don't have to hire a team or learn new software.",
    items: [
      {
        title: 'Save launch budget',
        description:
          'Replace multiple freelancers with one workflow. Get pro-grade audio and print files for a fraction of the usual cost.',
      },
      {
        title: 'Confidence in every export',
        description:
          'Outputs are tuned to ACX, KDP, and Ingram specs, so you avoid rejections, delays, and re-upload fees.',
      },
      {
        title: 'Creative control stays yours',
        description:
          'You keep the master files and rights. Publish wide, run ads, or release special editions however you want.',
      },
      {
        title: 'Built for busy dreamers',
        description:
          "If you're writing before work or after bedtime, we've got you. No complicated UI—just clear steps that ship your book.",
      },
    ],
  },
  footer: {
    privacy: 'Privacy',
    terms: 'Terms',
    contact: 'Contact',
    copyright:
      '© {year} Literati Pub. Built for the modern author.',
  },
};

export default dictionary;
