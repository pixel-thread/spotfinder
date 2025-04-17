import { View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Container } from '~/src/components/Container';
import { Button, buttonTextVariants } from '~/src/components/ui/button';
import { useAuth } from '~/src/hooks/auth/useAuth';
import { Typography } from '~/src/components/ui/typography';
import { Link, useRouter } from 'expo-router';

type ProfileItems = {
  icon: string;
  label: string;
  route: string;
};

type ProfileSection = {
  title: string;
  items: ProfileItems[];
};

const profileSections: ProfileSection[] = [
  {
    title: 'Account',
    items: [
      { icon: 'person-outline', label: 'Personal Information', route: '/profile/personal' },
      { icon: 'car-outline', label: 'My Vehicles', route: '/profile/vehicles' },
      { icon: 'card-outline', label: 'Payment Methods', route: '/profile/payment' },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { icon: 'notifications-outline', label: 'Notifications', route: '/profile/notifications' },
      { icon: 'shield-checkmark-outline', label: 'Privacy', route: '/profile/privacy' },
      { icon: 'settings-outline', label: 'Settings', route: '/profile/settings' },
    ],
  },
  {
    title: 'Partnership',
    items: [
      { icon: 'help-circle-outline', label: 'Become a Partner', route: '/become-partner' },
      { icon: 'settings-outline', label: 'Parking Lot', route: '/profile/settings' },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: 'help-circle-outline', label: 'Help Center', route: '/profile/help' },
      { icon: 'chatbubble-outline', label: 'Contact Us', route: '/profile/contact' },
      { icon: 'star-outline', label: 'Rate the App', route: '/profile/rate' },
    ],
  },
];

const AuthProfile = () => {
  const { user, onLogout } = useAuth();
  const router = useRouter();

  // onPress logout
  const onPressLogout = () => {
    if (user) {
      onLogout();
      return;
    }
    router.replace('/auth');
  };
  return (
    <Container className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="rounded-lg bg-blue-600 px-4 pb-8 pt-6">
          <View className="flex-row items-center">
            <View className="mr-4 h-20 w-20 items-center justify-center rounded-full bg-white/20">
              {user?.profilePic ? (
                <Image
                  source={{
                    uri: `https://avatar.iran.liara.run/public/${user?.id}`,
                  }}
                  className="h-20 w-20 rounded-full"
                />
              ) : (
                <Ionicons name="person" size={40} color="white" />
              )}
            </View>

            <View>
              <Typography className="text-xl font-bold text-white">
                {user?.name || 'Guest User'}
              </Typography>
              <Typography className="text-white/80">{user?.email || 'Not signed in'}</Typography>
              <Typography className="text-white/80">{user?.phone || ''}</Typography>
            </View>
          </View>
        </View>

        {/* Profile Sections */}
        <View className="-mt-4 px-4">
          {profileSections.map((section, idx) => (
            <View key={idx} className="mb-4 rounded-xl bg-white p-4 shadow-sm">
              <Typography className="mb-2 text-lg font-semibold text-gray-800">
                {section.title}
              </Typography>

              {section.items.map((item, itemIdx) => (
                <Link key={itemIdx} href={item.route} asChild>
                  <TouchableOpacity className="flex-row items-center border-b border-gray-100 py-3 last:border-b-0">
                    <View className="mr-3 rounded-full bg-blue-50 p-2">
                      <Ionicons name={item.icon} size={22} color="#3b82f6" />
                    </View>
                    <Typography className="flex-1 text-gray-700">{item.label}</Typography>
                    <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
                  </TouchableOpacity>
                </Link>
              ))}
            </View>
          ))}

          {/* Logout Button */}
          <Button
            variant={user ? 'destructive' : 'outline'}
            onPress={onPressLogout}
            className="mb-8">
            {user ? 'Sign Out' : 'Sign In'}
          </Button>

          <View className="gap-y-2">
            <Typography variant="heading" className=" text-center text-xs text-gray-500">
              {process.env.EXPO_PUBLIC_APP_NAME}
            </Typography>
            <Typography className="text-center text-xs text-gray-500">
              {`© ${new Date().getFullYear()} Parking App. All rights reserved.`}
            </Typography>
            <Typography className="mb-8 text-center text-xs text-gray-500">
              App Version 1.0.0
            </Typography>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default AuthProfile;
