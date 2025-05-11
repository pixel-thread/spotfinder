import { useLocalSearchParams } from 'expo-router';
import { ParkingDetailView } from '~/src/components/page/parking/detail';

export default function UpdateParking() {
  const { parkingId } = useLocalSearchParams() || '';
  return <ParkingDetailView parkingId={parkingId as string} />;
}
