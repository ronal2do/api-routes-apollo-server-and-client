import React, {useEffect, useState } from 'react';
import Typography, { TypographyStyle } from './Typography'

type AnimatedNumberProps = {
  value: number;
  interval?: number;
  timing?: 'linear' | 'easeOut' | 'easeIn';
  steps?: number;
  countBy?: number;
  kind?: TypographyStyle;
  color?: string;
};

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  timing = 'easeOut',
  steps = 7,
  kind = 'max',
  color = 'GREEN',
}: AnimatedNumberProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [startFrom, setStartFrom] = useState(0);
  const [endWith, setEndWith] = useState(0);
  const [direction, setDirection] = useState(true);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setStartFrom(currentValue);
    setEndWith(value);
    setDirty(true);
    startAnimate();
  }, [value]);

  useEffect(() => {
    if (!dirty) return;
    if (direction) {
      if (currentValue <= value) {
        startAnimate();
      }
    } else {
      if (currentValue >= value) {
        startAnimate();
      }
    }
  }, [dirty, direction, currentValue]);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  let timeoutId: any;

  function startAnimate() {
    const progress = getAnimationProgress();
    timeoutId = setTimeout(() => {
      let animationValue = (endWith - startFrom) / steps;
      let total = currentValue + animationValue;
      setDirection(animationValue > 0);
      const condition = +direction ^ +(total <= endWith);
      if (condition === 1) {
        setDirty(false);
        total = endWith;
      }
      setCurrentValue(total);
      setDisplayValue(total);
    }, getTimingFunction(100, progress));
  }

  function getAnimationProgress() {
    return (currentValue - startFrom) / (endWith - startFrom);
  }

  function getTimingFunction(interval: number, progress: number) {
    return TimingFunctions[timing](interval, progress);
  }

  return (
    <Typography kind={kind} color={color}>
      {Math.floor(displayValue)}
    </Typography>
  );
};

type Timing = {
  linear: (interval: number) => number;
  easeOut: (interval: number, progress: number) => number;
  easeIn: (interval: number, progress: number) => number;
}

const TimingFunctions: Timing = {
  linear: (interval: number) => interval,
  easeOut: (interval: number, progress: number) =>
    interval * Math.sin(Math.PI * 0.5 * progress),
  easeIn: (interval: number, progress: number) =>
    interval * Math.sin(Math.PI * 0.5 * (1 - progress)),
};

export default AnimatedNumber;