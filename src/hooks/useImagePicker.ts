import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';
import { toast } from '~/src/components/ui/toast';

type ImagePickerOptions = {
  allowsEditing?: boolean;
  aspect?: [number, number];
  quality?: number;
  allowsMultipleSelection?: boolean;
};

export const useImagePicker = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const pickImage = async (options: ImagePickerOptions = {}) => {
    if (hasPermission === null) {
      // Permission still being checked
      toast.info('Checking permissions...');
      return null;
    }

    if (hasPermission === false) {
      // Permission denied
      toast.error('Permission to access photos is required');
      return null;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: options.allowsEditing ?? true,
        aspect: options.aspect ?? [4, 3],
        quality: options.quality ?? 1,
        allowsMultipleSelection: options.allowsMultipleSelection ?? true,
      });

      if (result.canceled) {
        return null;
      }

      return result.assets;
    } catch (error) {
      console.error('Error picking image:', error);
      toast.error('Failed to pick image');
      return null;
    }
  };

  return {
    pickImage,
    hasPermission,
  };
};
