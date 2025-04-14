import { VariantProps, cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { Pressable, PressableProps, Text } from 'react-native';
import { cn } from '~/src/libs';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-blue-500 active:bg-blue-600',
        destructive: 'bg-red-500 active:bg-red-600',
        outline: 'border border-gray-300 bg-white active:bg-gray-100',
        secondary: 'bg-gray-100 active:bg-gray-200',
        ghost: 'hover:bg-gray-100 active:bg-gray-200',
        link: 'underline-offset-4',
      },
      size: {
        default: 'h-12 px-6',
        sm: 'h-9 px-4 rounded-md',
        lg: 'h-14 px-8 rounded-md',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const buttonTextVariants = cva('text-center font-medium', {
  variants: {
    variant: {
      default: 'text-primary-foreground',
      destructive: 'text-destructive-foreground',
      outline: 'text-gray-900',
      secondary: 'text-gray-900',
      ghost: 'text-gray-900',
      link: 'text-blue-500 underline',
    },
    size: {
      default: 'text-base',
      sm: 'text-sm',
      lg: 'text-lg',
      icon: 'text-base',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

type ButtonProps = PressableProps & VariantProps<typeof buttonVariants>;

const Button = forwardRef<typeof Pressable, ButtonProps>(
  ({ className, variant, size, style, children, ...props }, ref) => {
    return (
      <Pressable className={cn(buttonVariants({ variant, size, className }))} {...props}>
        {typeof children === 'string' ? (
          <Text className={cn(buttonTextVariants({ variant, size }))}>{children}</Text>
        ) : (
          children
        )}
      </Pressable>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants, buttonTextVariants };
