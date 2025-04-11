import { Slot } from 'expo-router';

import '../global.css';
import { MainProviders } from '~/src/components/providers';

export default function RootLayout() {
  return (
    <MainProviders>
      <Slot />
    </MainProviders>
  );
}
