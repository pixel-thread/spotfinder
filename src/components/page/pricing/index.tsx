import { Ionicons } from '@expo/vector-icons';
import { View, ScrollView } from 'react-native';

import { Container } from '~/src/components/Container';
import { Typography } from '~/src/components/ui/typography';
import PlanCard from './planCard';

import { useLocalSearchParams } from 'expo-router';

export const Pricing = () => {
  const { parking } = useLocalSearchParams();

  return (
    <Container className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-4 py-6">
          {/* Header with improved messaging */}
          <View className="mb-6">
            <Typography variant="heading" className="text-center text-2xl">
              Become a Partner
            </Typography>
            <Typography variant="body" className="mt-2 text-center text-gray-600">
              Purchase at least one slot to join our network and start earning
            </Typography>
          </View>

          {/* Hero banner */}
          <View className="mb-6 overflow-hidden rounded-xl bg-blue-600">
            <View className="p-5">
              <Typography variant="heading" className="text-xl text-white">
                Turn Your Space Into Income
              </Typography>
              <Typography variant="body" className="mt-1 text-blue-100">
                Join thousands of partners earning passive income
              </Typography>
              <View className="mt-3 flex-row items-center">
                <Ionicons name="checkmark-circle" size={20} color="#fff" />
                <Typography className="ml-2 text-white">Start with just 1 slot</Typography>
              </View>
            </View>
          </View>
          {/* Plan Card with emphasis */}
          <View className="mb-6">
            <PlanCard parkingId={parking as string} />
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};
export default Pricing;
