import { Text, TextProps } from 'react-native';
import { cn } from '../../libs/index';

type Variant = 'heading' | 'body' | 'caption' | 'label';

interface TypographyProps extends TextProps {
  variant?: Variant;
  className?: string;
}

export function Typography({ variant = 'body', className, ...props }: TypographyProps) {
  const variantClasses = {
    heading: 'text-2xl font-bold',
    body: 'text-base',
    caption: 'text-sm text-gray-500',
    label: 'text-sm font-medium',
  };

  return <Text className={cn(variantClasses[variant], className)} {...props} />;
}
