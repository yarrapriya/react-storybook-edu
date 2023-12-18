import { LottieOptions, useLottie } from "lottie-react";
import React, { useEffect } from 'react';

interface GeneoLottieProps extends Omit<LottieOptions, "animationData" | "loop" | "autoplay" | "onLoopComplete"> {
  animationData: any
  loop: boolean,
  animationDelay?: number,
  onLoopComplete?: () => void,
}

export const GeneoLottie: React.FC<GeneoLottieProps> = (props) => {
  const { animationDelay, animationData, loop, onLoopComplete, ...rem } = props
  const timeDelay = animationDelay ?? 0

  const options: LottieOptions = {
    animationData: animationData,
    loop: loop,
    autoplay: false,
    onComplete: (ev: React.AnimationEvent<Element>) => {
      if (onLoopComplete) {
        onLoopComplete()
      }
    },
    ...rem
  };

  const lottie = useLottie(options);

  useEffect(() => {
    setTimeout(() => {
      lottie.play()
    }, timeDelay);
  }, [])

  return <>{lottie.View}</>;
}
