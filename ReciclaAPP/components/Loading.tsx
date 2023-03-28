import LottieView from 'lottie-react-native';
import React, { Component, RefObject } from 'react';

export default class Loading extends Component<{}, {}> {
  private lottieAnimation: RefObject<LottieView> = React.createRef();

  public play = () => this.lottieAnimation.current!.play();

  public render() {
    return (
      <LottieView
        ref={this.lottieAnimation}
        source={require('../animations/loading.json')}
        autoPlay
        // onAnimationFinish={() => this.play()}
        onAnimationFinish={() => console.log('onAnimationFinish')}
      />
    );
  }
}