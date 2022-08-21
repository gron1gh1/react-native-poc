import Clipboard from '@react-native-community/clipboard';
import {createNavigationContainerRef} from '@react-navigation/native';
import {Alert, Share, Linking} from 'react-native';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import {StackActions} from '@react-navigation/native';

// WebView <=> Native Communication

export const navigationRef = createNavigationContainerRef();

class BridgeMethod {
  async openLink(url: string) {
    try {
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
  }

  async share(message: string) {
    try {
      await Share.share({
        message,
      });
    } catch (error: any) {
      Alert.alert(error.message);
    }
  }

  clipboard(message: string) {
    Clipboard.setString(message);
  }

  navigate({name, params}: {name: never; params: never}) {
    if (navigationRef.isReady()) {
      navigationRef.navigate(name, params);
    }
  }
  push({name, params}: {name: string; params?: object}) {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(StackActions.push(name, params));
    }
  }

  injectionAuth() {
    const InjectedScript = `
      window.localStorage.setItem("BZ_TOKEN", "TEST_TOKEN");
    `;
    return InjectedScript;
  }
}

export default BridgeMethod;
