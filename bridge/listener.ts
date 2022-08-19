import {BridgeMethod} from './method';
type ObtainMethods<T> = {
  [Prop in keyof T]: T[Prop] extends Fn ? Prop : never;
}[keyof T];

type Method = ObtainMethods<BridgeMethod>;

interface Message<T = any> {
  method: Method;
  data: T;
}

class BridgeListener {
  onMessage({method, data}: Message) {
    switch (method) {
      case 'clipboard':
        break;
      case 'openLink':
        break;
      case 'share':
        break;
    }
  }
}

export default new BridgeListener();
