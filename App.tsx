/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {Button, SafeAreaView, Text, View} from 'react-native';

import {WebView} from 'react-native-webview';

import BridgeListener from './bridge/listener';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
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
      <Button
        title="Go to Details"
        onPress={() =>
          navigation.navigate('Webview', {
            url: 'http://localhost:3000',
            title: '홈',
          })
        }
      />
    </View>
  );
}
function WebviewScreen({navigation, route}: ActivityProps) {
  const webViewRef = React.useRef<WebView>(null);

  useEffect(() => {
    navigation.setOptions({title: route.params.title});
  }, [navigation, route]);

  const html = `
      <html>
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body>
      <script>
      function inapp() {
        window.ReactNativeWebView.postMessage(JSON.stringify({method:"openLink", data: "https://github.com/gron1gh1"}))
      }

      function share() {
        window.ReactNativeWebView.postMessage(JSON.stringify({method:"share", data: "https://github.com/gron1gh1"}))
      }

      function clipboard() {
        window.ReactNativeWebView.postMessage(JSON.stringify({method:"clipboard", data: "https://github.com/gron1gh1"}))
      }

      function navigate() {
        window.ReactNativeWebView.postMessage(JSON.stringify({method:"navigate", data:{name:'Home'}}))
      }

      function push(url) {
        window.ReactNativeWebView.postMessage(JSON.stringify({method:"push", data:{name:'Webview',params: {url}}}))
      }

        </script>
        <h1>Hello World</h1>
        <button onclick="inapp()">인앱</button>
        <button onclick="share()">공유</button>
        <button onclick="clipboard()">복사</button>

        <button onclick="navigate()">홈</button>
        
        <button onclick="push('')">푸시</button>
        
        <button onclick="push('https://github.com/gron1gh1')">깃헙</button>
        
        <input type="text"></input>
      </body>
      </html>
    `;
  return (
    <SafeAreaView style={{height: '100%'}}>
      <WebView
        ref={webViewRef}
        source={{
          html: (route.params as any)?.url === '' ? html : undefined,
          uri: (route.params as any)?.url,
        }}
        onMessage={event => {
          BridgeListener.onMessage(JSON.parse(event.nativeEvent.data));
        }}
        onContentProcessDidTerminate={syntheticEvent => {
          const {nativeEvent} = syntheticEvent;
          console.warn('Content process terminated, reloading', nativeEvent);

          if (webViewRef.current) {
            webViewRef.current.reload();
          }
        }}
      />
      <Button
        title="Go to Details... again"
        onPress={() => {
          navigation.push('Webview', {url: '', title: 'home'});
        }}
      />
      {/* <NavigationContainer></NavigationContainer> */}
    </SafeAreaView>
  );
}

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Webview" component={WebviewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
