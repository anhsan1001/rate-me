// In App.js in a new project
import * as Notifications from 'expo-notifications';
import * as React from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import * as Linking from 'expo-linking';
import {
  NavigationContainer,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ImageViewer from './components/ImageViewer';
import CustomButton from './components/CustomButton';
import * as ImagePicker from 'expo-image-picker';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
export type RootStackParamList = {
  home: any;
  detail?: { itemId?: number; otherParam?: string }; // hoặc có thể có params như { id: string }
  create_post?: any;
};

const PlaceholderImage = require('./assets/icon.png');
function CreatePostScreen({ route }: any) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [postText, setPostText] = React.useState('');

  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: 'white' }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        onPress={() => {
          // Pass params back to home screen
          navigation.popTo('home', { post: postText });
        }}
        title="Done"
      />
    </>
  );
}

const Stack = createNativeStackNavigator();

function FeedScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Feed Screen</Text>
      <Button
        // onPress={() => navigation.navigate('Profile')}
        title=" Go to Profile"
      />
    </View>
  );
}

function MessagesScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Messages Screen</Text>
    </View>
  );
}
const Tab = createBottomTabNavigator();
function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
    </Tab.Navigator>
  );
}

function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="details"
        component={DetailsScreen}
        options={{
          headerBackTitle: 'Custom Back',
          headerBackTitleStyle: { fontSize: 30 },
        }}
        initialParams={{ otherParam: 'texxt' }}
      />
      <Stack.Screen
        name="create_post"
        component={CreatePostScreen}
        options={{ title: 'Create Post' }}
      />
    </Stack.Navigator>
  );
}
const config = {
  screens: {
    home: 'home',
    details: 'details',
    NotFound: '*',
  },
};
const prefix = Linking.createURL('myapp://');
const linking = {
  prefixes: [prefix, 'https://anhsan1001.github.io/anh-san.github.io'],
  config,
  // async getInitialURL() {
  //   const url = await Linking.getInitialURL();
  //   if (url != null) {
  //     console.log('App launched from deep link (getInitialURL):', url);
  //   }
  //   return url;
  // },
  // subscribe(listener) {
  //   const onReceiveURL = ({ url }) => {
  //     console.log('Deep link received (subscribe):', url);
  //     listener(url);
  //   };

  //   const subscription = Linking.addEventListener('url', onReceiveURL);
  //   return () => {
  //     subscription.remove();
  //   };
  // },
};

export default function App() {
  React.useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  async function registerForPushNotificationsAsync() {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission not granted');
      return;
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Expo Token:', token);

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
      });
    }
  }
  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <RootStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
    backgroundColor: '#999',
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
