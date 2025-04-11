import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '~/src/components/Button';

const DashboardPage = () => {
  return (
    <SafeAreaView>
      <View>
        <Text className="text-3xl">Login Page</Text>
        <Button title="Login" />
      </View>
    </SafeAreaView>
  );
};
export default DashboardPage;
