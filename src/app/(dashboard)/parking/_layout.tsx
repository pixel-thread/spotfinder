import { Ionicons } from '@expo/vector-icons';
import { Stack, usePathname, useRouter } from 'expo-router';
import { useSearchParams } from 'expo-router/build/hooks';
import { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';

export default function ParkingLayout() {
  const [searchQuery, setSearchQuery] = useState('');
  const search = useSearchParams();
  const isAutoFocusSearch: boolean = search.get('autoFocus') === 'true' || false;
  const pathName = usePathname();
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      if (pathName.includes('search')) {
        router.replace({
          pathname: '/parking/search',
          params: { search: searchQuery },
        });
        return;
      }
      router.push({
        pathname: '/parking/search',
        params: { search: searchQuery },
      });
    }
  };

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: '',
        headerBackButtonDisplayMode: 'generic',
        headerTitle: () => (
          <View className="w-full flex-col items-center">
            <View className="h-10 flex-1 flex-row items-center rounded-lg bg-gray-100 px-2">
              <Ionicons name="search" size={16} color="#6b7280" />
              <TextInput
                autoFocus={isAutoFocusSearch}
                placeholder="Search parking..."
                className="ml-2 flex-1 text-sm"
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={handleSearch}
                returnKeyType="search"
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Ionicons name="close-circle" size={16} color="#6b7280" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        ),
      }}
    />
  );
}
