import { createTamagui } from 'tamagui';

const tamaguiConfig = createTamagui({
  tokens: {
    color: {
      primary: '#007AFF',
    },
    space: {
      0: 0,
      1: 4,
      2: 8,
      3: 16,
      4: 24,
      5: 32,
      6: 48,
      7: 64,
      8: 96,
      9: 128,
      10: 192,
      11: 256,
      12: 384,
    },
  },
  themes: {
    light: {
      background: '#fff',
      color: '#000',
    },
    dark: {
      background: '#000',
      color: '#fff',
    },
  },
});

export type Conf = typeof tamaguiConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}

export default tamaguiConfig;
