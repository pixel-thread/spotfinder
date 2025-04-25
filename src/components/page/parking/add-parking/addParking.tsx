import { ScrollView } from 'react-native';

import { Container } from '~/src/components/Container';
import { AddParkingForm } from './addParkingForm';

const AddParking = () => {
  return (
    <Container className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        <AddParkingForm />
      </ScrollView>
    </Container>
  );
};

export default AddParking;
