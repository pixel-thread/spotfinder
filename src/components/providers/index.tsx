import { AuthProvider } from './auth';
import { TQueryProvider } from './query';
import { AuthGuard } from '../guard/auth';
import Toast from 'react-native-toast-message';
import { View } from 'react-native';

type Props = {
  children: Readonly<React.ReactNode>;
};

export const MainProviders = ({ children }: Props) => {
  return (
    <TQueryProvider>
      <AuthProvider>
        <AuthGuard>
          <View className="h-full w-full bg-gray-100">{children}</View>
          <Toast />
        </AuthGuard>
      </AuthProvider>
    </TQueryProvider>
  );
};
