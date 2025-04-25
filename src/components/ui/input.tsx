import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';

import { Typography } from './typography';

import { cn } from '~/src/libs';

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
  required?: boolean;
  className?: string;
};

export const Input = React.forwardRef<TextInput, InputProps>(
  ({ label, error, required, className, ...props }, ref) => {
    return (
      <View className="mb-4 w-full">
        {label && (
          <Typography
            variant="label"
            className={cn(
              'mb-1 mr-2 text-sm font-medium',
              error ? 'text-red-500' : 'text-gray-700'
            )}>
            {label}
          </Typography>
        )}
        <TextInput
          ref={ref}
          className={cn(
            className,
            `rounded-lg border p-3 ${error ? 'border-red-500' : 'border-gray-300'}`
          )}
          {...props}
        />
        {error && (
          <Typography variant="label" className="mt-1 text-xs text-red-500">
            {error}
          </Typography>
        )}
      </View>
    );
  }
);

Input.displayName = 'Input';
