import { SafeAreaView } from 'react-native';

import { cn } from '../libs';

interface ContainerProps extends React.ComponentProps<typeof SafeAreaView> {}

export const Container = ({ children, className, ...props }: ContainerProps) => {
  return (
    <SafeAreaView
      {...props}
      className={cn('flex flex-1 bg-white px-3 dark:bg-gray-950', className)}>
      {children}
    </SafeAreaView>
  );
};
