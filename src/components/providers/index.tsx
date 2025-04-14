import { defaultConfig } from '@tamagui/config/v4';
import { TamaguiProvider, View, createTamagui, Theme } from 'tamagui';

import { AuthProvider } from './auth';
import { TQueryProvider } from './query';
import { AuthGuard } from '../guard/auth';

import { tamaguiThemes } from '~/src/config/tamagui/theme';

type Props = {
  children: Readonly<React.ReactNode>;
};

export const MainProviders = ({ children }: Props) => {
  const config = createTamagui({
    tamaguiThemes,
    ...defaultConfig,
  });
  return (
    <TamaguiProvider config={config}>
      <Theme name="dark">
        <TQueryProvider>
          <AuthProvider>
            <AuthGuard>
              <View width="100%" height="100%" backgroundColor="$background">
                {children}
              </View>
            </AuthGuard>
          </AuthProvider>
        </TQueryProvider>
      </Theme>
    </TamaguiProvider>
  );
};
