import { EasingFunction, ReduceMotion } from 'react-native-reanimated';

export type TimingConfig = {
  duration: number;
  easing: EasingFunction;
  reduceMotion: ReduceMotion;
};
