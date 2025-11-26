export const FONTS = {
  garamond: {
    name: 'EB Garamond',
    family: '"EB Garamond", serif',
    url: 'family=EB+Garamond:ital,wght@0,400;0,700;1,400;1,700',
    previewStyle: { fontFamily: '"EB Garamond", serif' },
  },
  baskerville: {
    name: 'Libre Baskerville',
    family: '"Libre Baskerville", serif',
    url: 'family=Libre+Baskerville:ital,wght@0,400;0,700;1,400',
    previewStyle: { fontFamily: '"Libre Baskerville", serif' },
  },
  caslon: {
    name: 'Libre Caslon Text',
    family: '"Libre Caslon Text", serif',
    url: 'family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400',
    previewStyle: { fontFamily: '"Libre Caslon Text", serif' },
  },
  merriweather: {
    name: 'Merriweather',
    family: '"Merriweather", serif',
    url: 'family=Merriweather:ital,wght@0,300;0,400;0,700;1,400',
    previewStyle: { fontFamily: '"Merriweather", serif' },
  },
  lora: {
    name: 'Lora',
    family: '"Lora", serif',
    url: 'family=Lora:ital,wght@0,400;0,700;1,400;1,700',
    previewStyle: { fontFamily: '"Lora", serif' },
  },
  crimson: {
    name: 'Crimson Text',
    family: '"Crimson Text", serif',
    url: 'family=Crimson+Text:ital,wght@0,400;0,700;1,400;1,700',
    previewStyle: { fontFamily: '"Crimson Text", serif' },
  },
} as const;

export type FontKey = keyof typeof FONTS;
