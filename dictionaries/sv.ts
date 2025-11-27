import { type Dictionary } from './types';

const dictionary: Dictionary = {
  nav: {
    brand: 'Literati Pub',
    dashboard: 'Instrumentpanel',
    signIn: 'Logga in',
    signUp: 'Skapa konto',
  },
  hero: {
    badge: 'Nu i öppen beta för indieförfattare',
    title: 'Gör klart boken utan att brottas med produktionen.',
    highlight: 'Ljud, tryck och export i ett arbetsflöde.',
    description:
      'Släpp in manus, välj rätt berättarröst och ladda ner filer som följer ACX, KDP och IngramSpark. Ingen gissning, inga verktyg att jonglera.',
    ctaPrimary: 'Börja gratis',
    ctaSecondary: 'Se hur det fungerar',
    checklist: [
      'Dra-och-släpp Word och Google Docs',
      'Berättarröst anpassad efter genre och tempo',
      'Tryck-PDF:er med trim, marginaler och innehållsförteckning klart',
    ],
    uploaderNote: 'Ladda upp ett provkapitel—ingen kortinfo behövs. Behåll varje export.',
    quickSteps: [
      'Förbered, förhandsgranska och publicera i samma flöde',
      'Behåll rättigheter, masterfiler och distributionsval',
    ],
    stats: [
      { label: 'Ljudutkast', value: 'Kapitel klara på ~10 min' },
      { label: 'Trycklayout', value: '6x9” & 5x8” exporter' },
      { label: 'Regelefterlevnad', value: 'ACX + KDP anpassat' },
      { label: 'Kontroll', value: 'Ladda ner allt' },
    ],
    cardLabel: 'Produktionscockpit',
    cardTitle: 'Alla leverabler sida vid sida',
    promiseTitle: 'Hoppa över programvarudjungeln.',
    promiseDescription:
      'Ladda upp en gång, förhandsgranska ljud och tryck, och exportera polerade filer idag.',
  },
  howItWorks: {
    title: 'Se din bok gå från utkast till leverabel',
    description:
      'Ett guidat flöde som låter dig skriva vidare medan vi hanterar specifikationer, timing och exporter.',
    steps: [
      {
        number: '1',
        title: 'Ladda upp och andas ut',
        description:
          'Lämna in ditt utkast och hoppa över formateringsreglerna. Vi städar, strukturerar och förbereder berättelsen så fort den landar.',
        image:
          'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80&auto=format&fit=crop',
      },
      {
        number: '2',
        title: 'Välj röst och utseende',
        description:
          'Välj en berättarröst som matchar din ton och se kapitlen falla på plats i en polerad, tryckfärdig layout. Förhandsgranska innan du exporterar.',
        image:
          'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80&auto=format&fit=crop',
      },
      {
        number: '3',
        title: 'Publicera med trygghet',
        description:
          'Exportera ACX-godkända ljudfiler och KDP-klara PDF:er. Ingen gissning, inga avslag—bara filer redo att skickas.',
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
    tag: 'beta-platser öppna nu',
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
  footer: {
    privacy: 'Integritet',
    terms: 'Villkor',
    contact: 'Kontakt',
    copyright:
      '© {year} Literati Pub. Byggt för den moderna författaren.',
  },
};

export default dictionary;
