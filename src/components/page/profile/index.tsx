import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { View, ScrollView, Image, TouchableOpacity } from 'react-native';

import { Container } from '~/src/components/Container';
import { Button } from '~/src/components/ui/button';
import { Typography } from '~/src/components/ui/typography';
import { useAuth } from '~/src/hooks/auth/useAuth';
import { Ternary } from '../../Ternary';
import { logger } from '~/src/utils/logger';

type ProfileItems = {
  icon: string;
  label: string;
  route: string;
};

type ProfileSection = {
  title: string;
  desc?: string;
  items: ProfileItems[];
};

const profileSections: ProfileSection[] = [
  {
    title: 'Account',
    items: [
      { icon: 'person-outline', label: 'Profile', route: '/pricing' },
      { icon: 'lock-closed-outline', label: 'Privacy', route: '/pricing' },
      { icon: 'shield-checkmark-outline', label: 'Security', route: '/pricing' },
    ],
  },
  {
    title: 'Partnership',
    items: [
      { icon: 'briefcase-outline', label: 'Pricing', route: '/pricing' },
      { icon: 'car-outline', label: 'Parking', route: '/profile/partner' },
      { icon: 'car-outline', label: 'Add Parking', route: '/profile/partner/add-parking' },
      { icon: 'settings-outline', label: 'Parking Settings', route: '/pricing' },
    ],
  },
  {
    title: 'Transactions',
    items: [
      { icon: 'receipt-outline', label: 'Booking History', route: '/pricing' },
      { icon: 'card-outline', label: 'Payment History', route: '/pricing' },
      { icon: 'document-text-outline', label: 'Other', route: '/pricing' },
    ],
  },
  {
    title: 'Settings',
    items: [
      { icon: 'phone-call-outline', label: 'Contact Us', route: '/pricing' },
      { icon: 'help-outline', label: 'Help', route: '/pricing' },
      { icon: 'information-outline', label: 'About', route: '/pricing' },
      { icon: 'bug-outline', label: 'Reports', route: '/pricing' },
    ],
  },
];

const profileSectionsWithOutAuth: ProfileSection[] = [
  {
    title: 'Partnership',
    items: [
      { icon: 'briefcase-outline', label: 'Pricing', route: '/pricing' },
      { icon: 'car-outline', label: 'Parking', route: '/pricing' },
      { icon: 'settings-outline', label: 'Parking Settings', route: '/pricing' },
    ],
  },
  {
    title: 'Settings',
    items: [
      { icon: 'help-outline', label: 'Help', route: '/pricing' },
      { icon: 'information-outline', label: 'About', route: '/pricing' },
      { icon: 'bug-outline', label: 'Reports', route: '/pricing' },
    ],
  },
];

const AuthProfile = () => {
  const { user, onLogout } = useAuth();
  const router = useRouter();

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
              <Image
                source={{
                  uri: `https://avatar.iran.liara.run/public/${Math.floor(Math.random() * 100)}`,
                }}
                className="h-20 w-20 rounded-full"
              />
            </View>

            <View>
              <Typography className="text-xl font-bold text-white">
                {user?.name || 'Guest User'}
              </Typography>
              <Typography className="text-white/80">
                {user?.auth.email || 'Not signed in'}
              </Typography>
              <Typography className="text-white/80">{user?.auth.phone || ''}</Typography>
            </View>
          </View>
        </View>

        {/* Profile Sections */}
        <View className="-mt-4 px-4">
          <Ternary
            condition={!!user}
            trueComponent={
              <View>
                {profileSections.map((section, idx) => (
                  <View key={idx} className="mb-4 rounded-xl bg-white p-4 shadow-sm">
                    <Typography className="mb-2 text-lg font-semibold text-gray-800">
                      {section.title}
                    </Typography>

                    {section.items.map((item, itemIdx) => (
                      <Link push={true} key={itemIdx} href={item.route as any} asChild>
                        <TouchableOpacity className="flex-row items-center border-b border-gray-100 py-3 last:border-b-0">
                          <View className="mr-3 rounded-full bg-blue-50 p-2">
                            <Ionicons name={item.icon as any} size={22} color="#3b82f6" />
                          </View>
                          <Typography className="flex-1 text-gray-700">{item.label}</Typography>
                          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
                        </TouchableOpacity>
                      </Link>
                    ))}
                  </View>
                ))}
              </View>
            }
            falseComponent={
              <View>
                {profileSectionsWithOutAuth.map((section, idx) => (
                  <View key={idx} className="mb-4 rounded-xl bg-white p-4 shadow-sm">
                    <Typography className="mb-2 text-lg font-semibold text-gray-800">
                      {section.title}
                    </Typography>

                    {section.items.map((item, itemIdx) => (
                      <Link push={true} key={itemIdx} href={item.route as any} asChild>
                        <TouchableOpacity className="flex-row items-center border-b border-gray-100 py-3 last:border-b-0">
                          <View className="mr-3 rounded-full bg-blue-50 p-2">
                            <Ionicons name={item.icon as any} size={22} color="#3b82f6" />
                          </View>
                          <Typography className="flex-1 text-gray-700">{item.label}</Typography>
                          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
                        </TouchableOpacity>
                      </Link>
                    ))}
                  </View>
                ))}
              </View>
            }
          />

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
