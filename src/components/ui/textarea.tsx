import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import { cn } from '~/src/libs';

interface TextAreaProps extends TextInputProps {
  className?: string;
}

export function TextArea({ className, ...props }: TextAreaProps) {
  return (
    <View className={cn('w-full rounded-md border border-gray-200', className)}>
      <TextInput
        multiline
        textAlignVertical="top"
        className="p-2 text-base text-gray-900"
        placeholderTextColor="#9ca3af"
        {...props}
      />
    </View>
  );
}
