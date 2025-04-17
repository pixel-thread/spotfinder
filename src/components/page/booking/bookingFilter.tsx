import { useState } from 'react';
import { Text, ScrollView, TouchableOpacity } from 'react-native';

const filters = ['All', 'Nearest', 'Cheapest', 'Highest Rated', 'Most Available'];
export const BookingFilter = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pb-2">
      {filters.map((filter, index) => (
        <TouchableOpacity
          key={index}
          className={`mr-2 rounded-full px-4 py-2 ${
            selectedFilter === filter ? 'bg-blue-500' : 'bg-gray-100'
          }`}
          onPress={() => setSelectedFilter(filter)}>
          <Text
            className={`${selectedFilter === filter ? 'text-white' : 'text-gray-700'} font-medium`}>
            {filter}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};
