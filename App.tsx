/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {type PropsWithChildren} from 'react';
import {
  Alert,
  Button,
  Linking,
  SafeAreaView,
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {WebView} from 'react-native-webview';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    height: '100%',
  };
  const webViewRef = React.useRef<WebView>(null);

  const openLink = async () => {
    try {
      const url = 'https://github.com/proyecto26';
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
          headers: {
            'my-custom-header': 'my custom header value',
          },
        });
        Alert.alert(JSON.stringify(result));
      } else {
        Linking.openURL(url);
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <WebView
        ref={webViewRef}
        source={{uri: 'https://google.com'}}
        injectedJavaScript={`
        window.onload = () => {
          (function() {
            window.ReactNativeWebView.postMessage(JSON.stringify({method: "asd", data: {A:1,B:"asd"}}))
          })()
        }
        
        `}
        onMessage={event => {
          console.log(JSON.parse(event.nativeEvent.data));
        }}
        onContentProcessDidTerminate={syntheticEvent => {
          const {nativeEvent} = syntheticEvent;
          console.warn('Content process terminated, reloading', nativeEvent);

          if (webViewRef.current) {
            webViewRef.current.reload();
          }
        }}
      />

      <View>
        <Button onPress={openLink} title="In App Browser" />
        <Button onPress={onShare} title="Share" />
        <Button onPress={() => Clipboard.setString('Hello Im')} title="Copy" />
      </View>
    </SafeAreaView>
  );
};

export default App;
