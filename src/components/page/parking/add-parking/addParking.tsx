import { ScrollView } from 'react-native';

import { AddParkingForm } from './addParkingForm';

import { Container } from '~/src/components/Container';

export default function AddParking() {
  return (
    <Container className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        <AddParkingForm />
      </ScrollView>
    </Container>
  );
}
