import Clipboard from '@react-native-community/clipboard';
import {Alert, Share, Linking} from 'react-native';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';

// WebView <=> Native Communication
export class BridgeMethod {
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
}

export default new BridgeMethod();
