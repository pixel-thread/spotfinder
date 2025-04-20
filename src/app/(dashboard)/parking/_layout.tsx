import { Ionicons } from '@expo/vector-icons';
import { Stack, usePathname, useRouter } from 'expo-router';
import { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';

export default function ParkingLayout() {
  const [searchQuery, setSearchQuery] = useState('');
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
        headerTitle: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#f3f4f6',
                borderRadius: 8,
                paddingHorizontal: 8,
                height: 36,
              }}>
              <Ionicons name="search" size={16} color="#6b7280" />
              <TextInput
                placeholder="Search parking..."
                style={{ flex: 1, marginLeft: 8, fontSize: 14 }}
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
