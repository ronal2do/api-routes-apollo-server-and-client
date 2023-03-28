import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  Reactotron
    .configure({
      name: "ReciclaAPP"
    })
    .useReactNative({
      asyncStorage: false, // there are more options to the async storage.
      networking: { // optionally, you can turn it off with false.
        ignoreUrls: /symbolicate|logs/,
      },
      editor: false, // there are more options to editor
      errors: { veto: (stackFrame) => false }, // or turn it off with false
      overlay: false, // just turning off overlay
    })
    .connect();
}