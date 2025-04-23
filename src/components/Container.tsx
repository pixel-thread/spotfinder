import { SafeAreaView } from 'react-native';

import { cn } from '../libs';

interface ContainerProps extends React.ComponentProps<typeof SafeAreaView> {}

export const Container = ({ children, className, ...props }: ContainerProps) => {
  return (
    <SafeAreaView {...props} className={cn(className, 'flex flex-1 px-3')}>
      {children}
    </SafeAreaView>
  );
};
