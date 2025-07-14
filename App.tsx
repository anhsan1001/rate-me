// In App.js in a new project

import * as React from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import {
  NavigationContainer,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
export type RootStackParamList = {
  home: any;
  detail?: { itemId?: number; otherParam?: string }; // hoặc có thể có params như { id: string }
  create_post?: any;
};

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

function HomeScreen({ route }: any) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  React.useEffect(() => {
    if (route.params?.post) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
      alert('New post: ' + route.params?.post);
    }
  }, [route.params?.post]);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        onPress={() =>
          navigation.navigate('detail', {
            itemId: 86,
            otherParam: 'anything you want here',
          })
        }
        title="Go to Details"
      />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          onPress={() => navigation.navigate('create_post')}
          title=" Create post"
        />

        <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
      </View>
    </View>
  );
}

function DetailsScreen({ route }: any) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { itemId, otherParam } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text> Detail</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        onPress={() =>
          navigation.push('detail', {
            itemId: Math.floor(Math.random() * 100),
          })
        }
        title="Go to Details"
      />
      <Button
        onPress={() =>
          navigation.setParams({
            itemId: Math.floor(Math.random() * 100),
            otherParam: 'updated',
          })
        }
        title="Updated"
      />
      <Button onPress={() => navigation.goBack()} title="Go Back" />
      <Button onPress={() => navigation.popToTop()} title="Go Home" />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="home"
      screenOptions={{
        headerStyle: { backgroundColor: 'tomato' },
      }}
    >
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{ title: 'Overview' }}
      />
      <Stack.Screen
        name="detail"
        component={DetailsScreen}
        options={{ title: 'Detail' }}
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

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
