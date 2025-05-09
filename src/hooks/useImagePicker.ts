import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

type PickerResult = {
  uri: string;
  cancelled: boolean;
  error?: string;
};

export function useImagePicker() {
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const pickFromLibrary = async (): Promise<PickerResult> => {
    setError(null);

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      const msg = 'Permission to access gallery was denied';
      setError(msg);
      return { uri: '', cancelled: true, error: msg };
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setImage(uri);
      return { uri, cancelled: false };
    }

    return { uri: '', cancelled: true };
  };

  const takePhoto = async (): Promise<PickerResult> => {
    setError(null);

    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      const msg = 'Permission to access camera was denied';
      setError(msg);
      return { uri: '', cancelled: true, error: msg };
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setImage(uri);
      return { uri, cancelled: false };
    }

    return { uri: '', cancelled: true };
  };

  const clearImage = () => {
    setImage(null);
    setError(null);
  };

  return {
    image,
    error,
    pickFromLibrary,
    takePhoto,
    clearImage,
  };
}
