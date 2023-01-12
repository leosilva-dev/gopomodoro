import { useCallback, useEffect, useState } from "react";

export const usePomo = () => {
  const [defaultTimePomo, setDefaultTimePomo] = useState(15 * 60);
  const [defaultTimeShortBreak, setDefaultTimeShortBreak] = useState(5 * 60);
  const [defaultTimeLongBreak, setDefaultTimeLongBreak] = useState(10 * 60);
  const [pomoType, setPomoType] = useState<'pomo' | 'short-break' | 'long-break'>('pomo')
  const [secondsAmount, setSecondsAmount] = useState(defaultTimePomo);
  const [isCounting, setIsCounting] = useState(false);

  const decreaseSecondsAmount = useCallback(() => {
    setSecondsAmount((old) => old - 1);
  }, []);

  const defineIsCounting = useCallback((value: boolean) => {
    setIsCounting(value);
  }, []);

  const startPomo = useCallback(() => {
    setIsCounting(true);
  }, [setIsCounting]);

  const stopPomo = useCallback(() => {
    setIsCounting(false);
  }, [setIsCounting]);

  const getClockLabel = useCallback(() => {
    const minutes = Math.floor(secondsAmount / 60);
    const seconds = secondsAmount % 60;

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }, [secondsAmount]);

  const setTypePomo = useCallback((type: 'pomo' | 'short-break' | 'long-break') => {
    stopPomo()
    if( type === 'pomo'){
      setPomoType('pomo')
      setSecondsAmount(defaultTimePomo)
    }
    if( type === 'short-break'){
      setPomoType('short-break')
      setSecondsAmount(defaultTimeShortBreak)
    }
    if( type === 'long-break'){
      setPomoType('long-break')
      setSecondsAmount(defaultTimeLongBreak)
    }
  }, [defaultTimeLongBreak, defaultTimePomo, defaultTimeShortBreak, stopPomo, setPomoType]);

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
  }, [defineIsCounting, isCounting, secondsAmount, decreaseSecondsAmount]);

    return {
        secondsAmount,
        defaultTimePomo,
        isCounting,
        decreaseSecondsAmount,
        defineIsCounting,
        startPomo,
        stopPomo,
        getClockLabel,
        setTypePomo,
        pomoType,
        setPomoType
    };
  };