import { useCallback, useEffect, useState } from "react";

export const usePomo = () => {
    const [defaultTimePomo, setDefaultTimePomo] = useState(15 * 60);
    const [defaultTimeShortBreak, setDefaultTimeShortBreak] = useState(5 * 60);
    const [defaultTimeLongBreak, setDefaultTimeLongBreak] = useState(10 * 60);
  const [secondsAmount, setSecondsAmount] = useState(defaultTimePomo);
  const [isCounting, setIsCounting] = useState(false);

  const decreaseSecondsAmount = () => {
    setSecondsAmount((old) => old - 1);
  };

  const defineDefaultTime = (value: number) => {
    setDefaultTimePomo(value);
  };

  const defineIsCounting = useCallback((value: boolean) => {
    setIsCounting(value);
  }, []);

  const startPomo = () => {
    setIsCounting(true);
    setSecondsAmount(defaultTimePomo);
    console.log("start pomo");
  };

  const stopPomo = () => {
    setIsCounting(false);
    setSecondsAmount(defaultTimePomo);
    console.log("stop pomo");
  };

  useEffect(() => {
    if (secondsAmount > 0 && isCounting) {
      setTimeout(() => {
        if (secondsAmount > 0) {
          decreaseSecondsAmount();
        }
      }, 1000);
    } else {
      defineIsCounting(false);
    }
  }, [defineIsCounting, isCounting, secondsAmount]);

  const minutes = Math.floor(secondsAmount / 60);
  const seconds = secondsAmount % 60;

  const getClockLabel = (): string => {
    if (!isCounting) {
      return "00:00";
    } else {
      return `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }
  }

  const setTypePomo = (type: 'pomo' | 'short-break' | 'long-break') => {
    if( type === 'pomo'){
      setSecondsAmount(defaultTimePomo)
    }
    if( type === 'short-break'){
      setSecondsAmount(defaultTimeShortBreak)
    }
    if( type === 'long-break'){
      setSecondsAmount(defaultTimeLongBreak)
    }
  }

    return {
        secondsAmount,
        defaultTimePomo,
        defineDefaultTime,
        isCounting,
        decreaseSecondsAmount,
        defineIsCounting,
        startPomo,
        stopPomo,
        getClockLabel,
        setTypePomo
    };
  };