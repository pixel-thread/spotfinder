import { View, ViewProps } from 'react-native';
import { cn } from '../../libs/index';

interface CardProps extends ViewProps {
  className?: string;
}

export function Card({ className, ...props }: CardProps) {
  return (
    <View
      className={cn(
        'rounded-lg bg-white shadow-sm dark:bg-gray-900/30 dark:shadow-gray-900',
        className
      )}
      {...props}
    />
  );
}

interface CardHeaderProps extends ViewProps {
  className?: string;
}

export function CardHeader({ className, ...props }: CardHeaderProps) {
  return <View className={cn('mb-3 dark:text-gray-100', className)} {...props} />;
}

interface CardContentProps extends ViewProps {
  className?: string;
}

export function CardContent({ className, ...props }: CardContentProps) {
  return <View className={cn('dark:text-gray-300', className)} {...props} />;
}

interface CardFooterProps extends ViewProps {
  className?: string;
}

export function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <View
      className={cn(
        'mt-3 border-t border-gray-200 pt-3 dark:border-gray-700 dark:text-gray-400',
        className
      )}
      {...props}
    />
  );
}
