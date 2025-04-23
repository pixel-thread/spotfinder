import { Text, TextProps } from 'react-native';
import { cn } from '../../libs/index';

type Variant = 'heading' | 'body' | 'caption' | 'label';

interface TypographyProps extends TextProps {
  variant?: Variant;
  className?: string;
}

export function Typography({ variant = 'body', className, ...props }: TypographyProps) {
  const variantClasses = {
    heading: 'text-2xl font-bold text-gray-900 dark:text-gray-100',
    body: 'text-base text-gray-800 dark:text-gray-200',
    caption: 'text-sm text-gray-500 dark:text-gray-400',
    label: 'text-sm font-medium text-gray-700 dark:text-gray-300',
  };

  return <Text className={cn(variantClasses[variant], className)} {...props} />;
}
