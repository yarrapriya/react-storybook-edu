import { useEffect, useRef, useState } from 'react';

export interface TimerHookProps {
  value: number;
  start: () => void;
}

export const useTimer = (time: number, timesAValueisUpdatedinASecond = 1, startByDefault = true, delay = 0): TimerHookProps => {
  const [value, setValue] = useState<number>(time);
  const [started, setStarted] = useState<boolean>(startByDefault);
  const counterRef = useRef<NodeJS.Timeout>(); // Ref to store the interval ID

  useEffect(() => {
    setValue(time ? time : 0);
    return () => end();
  }, [time]);

  const start = () => {
    setValue(time);
    setTimeout(() => {
      setStarted(true);
    }, delay);
  };

  const end = () => {
    clearInterval(counterRef.current); // Use the stored interval ID
  };

  useEffect(() => {
    counterRef.current = setInterval(() => {
      if (value === 0) {
        !startByDefault && setStarted(false);
        end();
      } else if (started) {
        setValue(value - (1 / timesAValueisUpdatedinASecond));
      }
    }, 1000 / timesAValueisUpdatedinASecond);

    return () => end();
  }, [value, started, startByDefault]);

  return {
    value,
    start,
  };
};
