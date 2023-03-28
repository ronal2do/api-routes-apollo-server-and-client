import React from 'react';
import { StyleSheet, View } from 'react-native';
import Lottie from 'lottie-react-native'
// @ts-ignore
import { theme } from '../constants/Colors';
type LoadingProps = Readonly<{
  onLoad: () => void;
}>

export default class LoadingScreen extends React.PureComponent<LoadingProps> {
  public _timeoutId?: any;
  private animation: any;

  state = {
    animation: 'https://cdn.rawgit.com/airbnb/lottie-react-native/635163550b9689529bfffb77e489e4174516f1c0/example/animations/Watermelon.json',
  };

  componentWillMount() {
    this._playAnimation();
    this._timeoutId = setTimeout(() => this.props.onLoad(), 1000)
  }

  componentWillUnmount() {
    if (this._timeoutId != null) {
      clearTimeout(this._timeoutId)
    }
  }

  render() {
    return (
      <View style={styles.animationContainer}>
        {this.state.animation != null &&
          <Lottie
            ref={(el: any) => this.animation = el}
            autoPlay
            resizeMode='cover'
            source={require('../animations/loading.json')}
          />
          }
      </View>
    );
  }

  _playAnimation = () => {
    this.animation && this.animation.reset();
    this.animation && this.animation.play();
    // if (!this.state.animation) {
    //   this._loadAnimationAsync();
    // } else {
    //   this.animation && this.animation.reset();
    //   this.animation && this.animation.play();
    // }
  };

  // _loadAnimationAsync = async () => {
  //   let result = await fetch(
  //     'https://cdn.rawgit.com/airbnb/lottie-react-native/635163550b9689529bfffb77e489e4174516f1c0/example/animations/Watermelon.json'
  //   )
  //     .then(data => {
  //       return data.json();
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  //   this.setState({ animation: result }, this._playAnimation);
  // };
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: theme.BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});
