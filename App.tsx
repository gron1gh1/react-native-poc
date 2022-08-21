/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useMemo} from 'react';
import {Button, SafeAreaView, Text, View} from 'react-native';

import {WebView} from 'react-native-webview';

import BridgeListener from './bridge/listener';
import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import Logo from './assets/brandazine.svg';

import InboxIcon from './assets/inbox-main-icon.svg';
import ClosetIcon from './assets/closet2.svg';
import {navigationRef} from './bridge/method';
const Stack = createNativeStackNavigator();

type RootStackParamList = {
  Home: undefined;
  Webview: {title: string; url: string};
};
type ActivityProps = NativeStackScreenProps<
  RootStackParamList,
  'Webview',
  'Home'
>;

function HomeScreen({navigation}: ActivityProps) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Logo width={200} height={60} fill={'#000'} />
      <Button
        title="Go to Details"
        onPress={() =>
          navigation.replace('Webview', {
            url: 'http://localhost:3000',
            title: '',
          })
        }
      />
    </View>
  );
}
function WebviewScreen({navigation, route}: ActivityProps) {
  const webViewRef = React.useRef<WebView>(null);

  useEffect(() => {
    navigation.setOptions({title: route.params?.title ?? ''});
  }, [navigation, route]);

  const uri = useMemo(() => {
    return route.params ? route.params.url : 'http://localhost:3000';
  }, [route]);

  return (
    <SafeAreaView style={{height: '100%', backgroundColor: '#fff'}}>
      <WebView
        ref={webViewRef}
        source={{
          uri,
        }}
        onMessage={event => {
          BridgeListener.onMessage(JSON.parse(event.nativeEvent.data));
        }}
        // onContentProcessDidTerminate={syntheticEvent => {
        //   const {nativeEvent} = syntheticEvent;
        //   console.warn('Content process terminated, reloading', nativeEvent);
        //   if (webViewRef.current) {
        //     webViewRef.current.reload();
        //   }
        // }}
      />
    </SafeAreaView>
  );
}

function HeaderLeft() {
  const navigation = useNavigation();
  return (
    <View style={{marginBottom: 5}}>
      {!navigation.canGoBack() ? (
        <Logo width={130} height={20} fill={'#000'} />
      ) : (
        <Text onPress={() => navigation.goBack()}> {'이전'}</Text>
      )}
    </View>
  );
}

function HeaderRight() {
  const navigation = useNavigation();
  if (navigation.canGoBack()) {
    return null;
  }
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 5,
      }}>
      <InboxIcon
        height={20}
        style={{marginRight: 10}}
        onPress={() =>
          BridgeListener.run({
            method: 'push',
            data: {
              name: 'Webview',
              params: {url: 'http://localhost:3000/inbox', title: '인박스'},
            },
          })
        }
      />
      <ClosetIcon
        height={20}
        onPress={() =>
          BridgeListener.run({
            method: 'push',
            data: {
              name: 'Webview',
              params: {url: 'http://localhost:3000/closet', title: '옷장'},
            },
          })
        }
      />
    </View>
  );
}

function HeaderTitle({title}: {title: string}) {
  const navigation = useNavigation();
  if (!navigation.canGoBack()) {
    return null;
  }
  return <Text style={{fontWeight: 'bold'}}>{title}</Text>;
}

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Webview"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#FFF',
          },
          headerLeft: () => <HeaderLeft />,
          headerRight: () => <HeaderRight />,
          headerTitle: ({children}) => <HeaderTitle title={children} />,
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
        <Stack.Screen name="Webview" component={WebviewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
