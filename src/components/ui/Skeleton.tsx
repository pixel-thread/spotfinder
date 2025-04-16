import { View, ViewProps } from 'react-native';
import { cn } from '~/src/libs'; // Assuming `cn` handles class merging

type SkeletonProps = {
  className?: string;
} & ViewProps;

const Skeleton = ({ className = '', ...props }: SkeletonProps) => {
  return <View className={cn('h-4 rounded-md bg-gray-300', className)} {...props} />;
};

export default Skeleton;
