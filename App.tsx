/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {WebView} from 'react-native-webview';

import BridgeListener from './bridge/listener';

const App = () => {
  const backgroundStyle = {
    backgroundColor: Colors.lighter,
    height: '100%',
  };
  const webViewRef = React.useRef<WebView>(null);

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
        </script>
        <h1>Hello World</h1>
        <button onclick="inapp()">인앱</button>
        <button onclick="share()">공유</button>
        <button onclick="clipboard()">복사</button>
        
        <input type="text"></input>
      </body>
      </html>
    `;

  return (
    <SafeAreaView style={backgroundStyle}>
      <WebView
        ref={webViewRef}
        source={{html}}
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
    </SafeAreaView>
  );
};

export default App;
