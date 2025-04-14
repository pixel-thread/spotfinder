import Toast from 'react-native-toast-message';

export const toast = {
  success: (message: string) => {
    Toast.show({
      type: 'success',
      text1: message,
      position: 'top',
      autoHide: true,
      visibilityTime: 3000,
      topOffset: 50,
      props: {
        iconName: 'check-circle',
        bgColor: '#10B981',
        textColor: '#FFFFFF',
      },
    });
  },
  error: (message: string) => {
    Toast.show({
      type: 'error',
      text1: message,
      position: 'top',
      autoHide: true,
      visibilityTime: 3000,
      topOffset: 50,
      props: {
        iconName: 'alert-circle',
        bgColor: '#EF4444',
        textColor: '#FFFFFF',
      },
    });
  },
  info: (message: string) => {
    Toast.show({
      type: 'info',
      text1: message,
      position: 'top',
      autoHide: true,
      visibilityTime: 3000,
      topOffset: 50,
      props: {
        iconName: 'info',
        bgColor: '#3B82F6',
      },
    });
  },
};
