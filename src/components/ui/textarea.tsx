import { TextInput, TextInputProps, View } from 'react-native';
import { cn } from '~/src/libs';
import { Typography } from './typography';

interface TextAreaProps extends TextInputProps {
  className?: string;
  label?: string;
  error?: string;
  required?: boolean;
}

export function TextArea({ className, label, error, required, ...props }: TextAreaProps) {
  return (
    <View className="mb-4">
      {label && (
        <Typography
          variant="label"
          className={cn('mb-1 text-sm font-medium', error ? 'text-red-500' : 'text-gray-700')}>
          {label} {required && <Typography className="text-red-500">*</Typography>}
        </Typography>
      )}
      <TextInput
        {...props}
        multiline
        textAlignVertical="top"
        className={cn(
          'rounded-lg border p-3',
          className,
          error ? 'border-red-500' : 'border-gray-300'
        )}
        placeholderTextColor="#9ca3af"
      />
      {error && (
        <Typography variant="label" className="mt-1 text-xs text-red-500">
          {error}
        </Typography>
      )}
    </View>
  );
}
