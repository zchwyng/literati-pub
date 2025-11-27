import { type Dictionary } from './types';

const dictionary: Dictionary = {
  nav: {
    brand: 'Literati Pub',
    dashboard: 'Instrumentpanel',
    signIn: 'Logga in',
    signUp: 'Skapa konto',
  },
  hero: {
    badge: 'För indieförfattare och debutanter',
    title: 'Gör ditt utkast till en bok redo för bokhandel.',
    highlight: 'Ingen formatering. Ingen stress.',
    description:
      'Ladda upp berättelsen du drömt om. Vi förfinar den till en ljudbok och en tryckfärdig roman som följer branschens standarder—så att du äntligen kan hålla boken i handen och dela den med läsare.',
    checklist: [
      'Ladda upp ditt Word-dokument, vi hanterar specifikationerna',
      'Berättarröst justerad för ton och känsla',
      'Tryck-PDF:er klara för Amazon KDP och IngramSpark',
    ],
    uploaderNote: 'Gratis att börja. Ditt första projekt bjuder vi på.',
    quickSteps: ['Idé till färdiga filer på några minuter', 'Behåll ägandet över varje fil'],
    stats: [
      { label: 'Ljudbokskapitel', value: 'Klart på ca 10 min' },
      { label: 'Trycklayout', value: '6x9” roman-PDF' },
      { label: 'Regelefterlevnad', value: 'ACX + KDP-specar' },
      { label: 'Kontroll', value: 'Ladda ner och äg allt' },
    ],
    cardLabel: 'Startplatta för indieförfattare',
    cardTitle: 'Från manus till marknad',
    promiseTitle: 'Byggt för författare som aldrig vill röra InDesign.',
    promiseDescription:
      'Ladda upp en gång, förhandsgranska och exportera polerade filer som du kan publicera idag. Fortsätt skriva—vi tar hand om tekniken.',
  },
  howItWorks: {
    title: 'Din skrivresa utan teknikhuvudvärk',
    description:
      'Från en gnista till en färdig bok du kan dela—varje steg är tydligt, snabbt och författarvänligt.',
    steps: [
      {
        number: '1',
        title: 'Ladda upp och andas ut',
        description:
          'Lämna in ditt utkast och hoppa över formateringsreglerna. Vi städar, strukturerar och förbereder berättelsen direkt.',
        image:
          'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80&auto=format&fit=crop',
      },
      {
        number: '2',
        title: 'Välj röst och utseende',
        description:
          'Välj en berättarröst som matchar din ton och se kapitlen falla på plats i en vacker, tryckfärdig layout. Förhandsgranska innan du exporterar.',
        image:
          'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80&auto=format&fit=crop',
      },
      {
        number: '3',
        title: 'Publicera med trygghet',
        description:
          'Exportera ACX-godkända ljudfiler och KDP-klara PDF:er. Inget gissande, inga avslag—bara filer du kan ladda upp direkt.',
        image:
          'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80&auto=format&fit=crop',
      },
    ],
  },
  features: {
    title: 'Skapat för författare som ger ut själva',
    description:
      'Vi tog de jobbiga delarna av indiepublicering och automatiserade dem—utan att tappa själ och tonalitet.',
    items: [
      {
        title: 'En röst som passar din berättelse',
        description:
          'Filmisk AI-berättelse med rätt tempo, känsla och tydlighet. Hör boken som om en professionell skådespelare läser den.',
        icon: 'headphones',
        image:
          'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&q=80&auto=format&fit=crop',
      },
      {
        title: 'Sättning utan långa guider',
        description:
          'Automatisk 6x9″-layout med kapitelbrytningar, ornament, marginaler och sidnummer enligt branschstandard.',
        icon: 'printer',
        image:
          'https://images.unsplash.com/photo-1448932252197-d19750584e56?w=600&q=80&auto=format&fit=crop',
      },
      {
        title: 'Distributionsklara filer',
        description:
          'Exportpaket som går igenom ACX, KDP och IngramSpark på första försöket. Inga krångliga filinställningar.',
        icon: 'book',
        image:
          'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80&auto=format&fit=crop',
      },
      {
        title: 'Snabbt nog för lanseringsveckan',
        description:
          'Skapa berättarröst och trycklayout på minuter istället för månader. Perfekt för förhandsbokningar eller crowdfundinglöften.',
        icon: 'zap',
        image:
          'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&q=80&auto=format&fit=crop',
      },
      {
        title: 'Din att äga',
        description:
          'Inga prenumerationer eller låsta format. Ladda ner mastrade ljud- och tryckfiler, behåll din IP och publicera var du vill.',
        icon: 'sparkles',
        image:
          'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80&auto=format&fit=crop',
      },
      {
        title: 'Format för varje läsare',
        description:
          'MP3 för ljudböcker, PDF för print-on-demand, EPUB på väg. Varje export är optimerad för kvalitet och kompatibilitet.',
        icon: 'file',
        image:
          'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&q=80&auto=format&fit=crop',
      },
    ],
  },
  callout: {
    tag: 'byggt av författare för författare',
    title: 'Du fokuserar på berättelsen. Vi paketerar den för varje hylla.',
    description:
      'Förhandslyssna, justera tempot och exportera filer redo att laddas upp på ett och samma ställe. Inget mer jonglerande av frilansare eller designprogram.',
    action: 'Starta din första bok',
  },
  benefits: {
    title: 'Därför väljer författare Literati Pub',
    description:
      'Vi har djupdykt i indieförfattarens resa så att du slipper anlita ett team eller lära dig ny programvara.',
    items: [
      {
        title: 'Spara lanseringsbudgeten',
        description:
          'Ersätt flera frilansare med ett arbetsflöde. Få proffsig ljud- och tryckproduktion för en bråkdel av kostnaden.',
      },
      {
        title: 'Trygghet i varje export',
        description:
          'Utskrifter och ljud följer ACX-, KDP- och Ingram-krav så att du slipper avslag, förseningar och omuppladdningar.',
      },
      {
        title: 'Det kreativa ägandet är ditt',
        description:
          'Du behåller masterfiler och rättigheter. Publicera brett, annonsera eller släpp specialutgåvor hur du vill.',
      },
      {
        title: 'Skapat för upptagna drömmare',
        description:
          'Skriver du före jobbet eller efter läggdags? Vi hjälper dig. Inget krångligt gränssnitt—bara tydliga steg som får ut boken.',
      },
    ],
  },
  socialProof: {
    title: 'Betrodd av indieförfattare som släpper sin första – och nästa – bok',
    description:
      'Skrivgrupper, berättarröster och småförlag använder Literati Pub för att gå snabbare från utkast till distribution.',
    logos: [
      { name: 'Indie Author Alliance' },
      { name: 'Storycraft Labs' },
      { name: 'Northwind Audio' },
      { name: 'Midnight Sun Press' },
      { name: 'First Draft Collective' },
    ],
    testimonials: [
      {
        quote: 'Det snabbaste sättet jag sett till ACX-klara kapitel. Känns som en studio i webbläsaren.',
        name: 'Lena Ortiz',
        role: 'Berättare och indieförfattare',
      },
      {
        quote: 'Fick äntligen ut min följetong som pocket utan att slåss med layoutprogram eller frilansare.',
        name: 'Marcus Hale',
        role: 'Författare inom urban fantasy',
      },
      {
        quote: 'Som att ha ett produktionsteam i bakfickan. Min skrivcirkel är helt såld.',
        name: 'Priya Desai',
        role: 'Organisatör, Riverfront Writers',
      },
    ],
  },
  footer: {
    privacy: 'Integritet',
    terms: 'Villkor',
    contact: 'Kontakt',
    copyright:
      '© {year} Literati Pub. Byggt för den moderna författaren.',
  },
};

export default dictionary;
