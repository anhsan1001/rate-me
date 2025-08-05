import messaging from '@react-native-firebase/messaging';
import * as Notifications from 'expo-notifications';

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken();
  }
};

export const getFcmToken = async () => {
  try {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('Permission for notifications not granted!');
      return;
    }
    const token = await messaging().getToken();
    if (token) {
      console.log('FCM Token:', token);
      // 👉 send token to your backend if needed
    } else {
      console.log('Failed to get FCM token');
    }
  } catch (error) {
    console.error('Error getting FCM token:', error);
  }
};
export const listenForNotificationLinks = (callback: (url: string) => void) => {
  // Khi app mở từ background
  messaging().onNotificationOpenedApp((remoteMessage) => {
    if (remoteMessage?.data?.deeplink) {
      callback(remoteMessage.data.deeplink);
    }
  });

  // Khi app mở từ trạng thái bị kill
  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage?.data?.deeplink) {
        callback(remoteMessage.data.deeplink);
      }
    });
};
