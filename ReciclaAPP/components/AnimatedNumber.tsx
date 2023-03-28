import React, { PureComponent, ReactText } from 'react';
import { theme as color } from '../constants/Colors'
import Typography, { TypographyStyle } from './Typography'

const HALF_RAD = Math.PI/2

interface AnimatedNumberProps {
  countBy: number,
  interval: number,
  steps: number,
  value: any,
  timing: 'linear' | 'easeOut' | 'easeIn',
  formatter: (total: number) => any,
  onProgress: (value: number, total: number) => any,
  onFinish: (total: number, formatter: (total: number) => any) => any,
  children: ReactText,
  kind?: TypographyStyle,
  color: string,
};

type AnimatedNumberState = {
  value: any,
  displayValue: ReactText
}


type Mixed = AnimatedNumberProps & any
export default class AnimatedNumber extends PureComponent<Mixed, AnimatedNumberState> {
  public _timeoutId?: any;

  static defaultProps = {
    interval: 0.1,
    timing: 'easeOut',
    steps: 7,
    value: 0,
    formatter: (val: any) => val,
    onFinish: () => {}
  };

  static TimingFunctions = {
    linear: (interval:number, progress:number):number => {
      return interval
    },

    easeOut: (interval:number, progress:number):number => {
      return interval * Math.sin(HALF_RAD*progress) * 5
    },

    easeIn: (interval:number, progress:number):number => {
      return interval * Math.sin((HALF_RAD - HALF_RAD*progress)) * 5
    },

  };

  direction: boolean | undefined;
  startFrom: number = 0;
  endWith: number = 0;
  dirty: boolean;

  constructor(props:any) {
    super(props);
    // default values of state and non-state variables
    this.dirty = false;
    this.startFrom = 0;
    this.endWith = 0;
  }

  state: AnimatedNumberState = {
    value: 0,
    displayValue: 0
  }

  componentDidMount() {
    this.startFrom = this.state.value
    this.endWith = this.props.value
    this.dirty = true
    this.startAnimate()
  }

  componentWillUpdate(nextProps: AnimatedNumberProps, nextState: AnimatedNumberState) {

    // check if start an animation
    if(this.props.value !== nextProps.value) {
      this.startFrom = this.props.value
      this.endWith = nextProps.value
      this.dirty = true
      this.startAnimate()
      return
    }
    // Check if iterate animation frame
    if(!this.dirty) {
      return
    }
    if (this.direction === true) {
      if(parseInt(this.state.value) <= parseInt(this.props.value)) {
        this.startAnimate();
      }
    }
    else if(this.direction === false){
      if (parseInt(this.state.value) >= parseInt(this.props.value)) {
        this.startAnimate();
      }
    }

  }

  componentWillUnmount() {
    if (this._timeoutId != null) {
      clearTimeout(this._timeoutId)
    }
  }

  render() {
    return (
      <Typography kind={this.props.kind || "max"} color={this.props.color || color.GREEN}>
        {this.state.displayValue}
      </Typography>
    )
  }

  startAnimate() {
    let progress = this.getAnimationProgress()

    this._timeoutId = setTimeout(() => {
      let value: any = (this.endWith - this.startFrom)/this.props.steps
      let sign = value >= 0 ? 1: -1
      if(this.props.countBy) {value = sign*Math.abs(this.props.countBy)}
      let total: any = parseInt(this.state.value) + parseInt(value)

      this.direction = (value > 0)
      const condition = +this.direction ^ +(total <= this.endWith)
      // animation terminate conditions
      if (condition === 1) {
      // if (( (this.direction) === (total <= this.endWith) )) {
        this.dirty = false
        total = this.endWith
        this.props.onFinish(total, this.props.formatter(total))
      }

      if(this.props.onProgress)
        this.props.onProgress(this.state.value, total)

      this.setState({
        value: total,
        displayValue: this.props.formatter(total)
      })

    }, this.getTimingFunction(100, progress))

  }

  getAnimationProgress():number {
    return (this.state.value - this.startFrom) / (this.endWith - this.startFrom)
  }

  getTimingFunction(interval:number, progress:number) {
    if(typeof this.props.timing === 'string') {
      // @ts-ignore
      let fn = AnimatedNumber.TimingFunctions[this.props.timing]
      return fn(interval, progress)
    }
    return AnimatedNumber.TimingFunctions['linear'](interval, progress)
  }
}