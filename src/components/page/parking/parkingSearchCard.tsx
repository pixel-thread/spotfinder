import { Ionicons } from '@expo/vector-icons';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { View, TextInput } from 'react-native';
import useDebounce from '~/src/hooks/useDebounce';

type FieldValues = {
  search: string;
};

type ParkingSearchCardProps = {
  isLoading: boolean;
  onPressSubmit: (value: string) => void;
};

export const ParkingSearchCard = ({ isLoading, onPressSubmit }: ParkingSearchCardProps) => {
  const form = useForm<FieldValues>({
    defaultValues: {
      search: '',
    },
  });

  const watchOnSearchChange = useWatch({
    control: form.control,
    name: 'search',
  });

  const debouncedValue = useDebounce(watchOnSearchChange, 1000);

  return (
    <View className="mb-4 flex-row items-center rounded-lg bg-gray-100 px-3 py-2">
      <Ionicons name="search-outline" size={20} color="#6b7280" className="mr-2" />
      <Controller
        name="search"
        control={form.control}
        disabled={isLoading}
        render={({ field: { onChange, onBlur, value, ...field } }) => (
          <TextInput
            {...field}
            onChangeText={onChange}
            onSubmitEditing={() => onPressSubmit(debouncedValue)}
            value={value}
            className="flex-1 bg-transparent text-gray-800" // Ensure full width
            keyboardType="default"
            placeholder="Search"
            placeholderTextColor="#9ca3af" // Consistent placeholder color
          />
        )}
      />
    </View>
  );
};
