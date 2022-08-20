import BridgeMethod from './method';
type ObtainMethods<T> = {
  [Prop in keyof T]: T[Prop] extends Function ? Prop : never;
}[keyof T];

type Method = ObtainMethods<BridgeMethod>;

interface Message<T = any> {
  method: Method;
  data: T;
}

class BridgeListener extends BridgeMethod {
  onMessage({method, data}: Message) {
    switch (method) {
      default:
        this[method](data);
        break;
    }
  }
}

export default new BridgeListener();
