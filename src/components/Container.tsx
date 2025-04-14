import { SafeAreaView } from 'react-native';
import { cn } from '../libs';

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export const Container = ({ children, className }: ContainerProps) => {
  return <SafeAreaView className={cn(className, styles.container)}>{children}</SafeAreaView>;
};

const styles = {
  container: 'flex flex-1 m-6',
};
