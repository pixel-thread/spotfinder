import { AuthGuard } from '../guard/auth';
import { AuthProvider } from './auth';
import { TQueryProvider } from './query';

type Props = {
  children: Readonly<React.ReactNode>;
};

export const MainProviders = ({ children }: Props) => {
  return (
    <TQueryProvider>
      <AuthProvider>
        <AuthGuard>{children}</AuthGuard>
      </AuthProvider>
    </TQueryProvider>
  );
};
