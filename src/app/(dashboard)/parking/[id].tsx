import { useLocalSearchParams } from 'expo-router';

import { ParkingDetailView } from '~/src/components/page/parking/detail';

export default function ParkingDetailScreen() {
  const { id: parkingId } = useLocalSearchParams() || '';
  return <ParkingDetailView parkingId={parkingId as string} />;
}
