import { useCallback, useEffect, useState } from "react";

export const usePomo = () => {
  const [defaultTimePomo] = useState(15 * 60);
  const [defaultTimeShortBreak] = useState(5 * 60);
  const [defaultTimeLongBreak] = useState(10 * 60);
  const [pomoType, setPomoType] = useState<'pomo' | 'short-break' | 'long-break'>('pomo')
  const [secondsAmount, setSecondsAmount] = useState(defaultTimePomo);
  const [isCounting, setIsCounting] = useState(false);
  const [isPomoFinished, setIsPomoFinished] = useState(false);

  const playStartPomoSound = useCallback(() => {
    new Audio("/sounds/clock_start_stop.wav").play()
  }, []);

  const playFinishedPomoSound = useCallback(() => {
    new Audio("/sounds/finished.wav").play()
  }, []);

  const decreaseSecondsAmount = useCallback(() => {
    setSecondsAmount((old) => old - 1);
  }, []);

  const defineIsCounting = useCallback((value: boolean) => {
    setIsCounting(value);
  }, []);

  const setTypePomo = useCallback((type: 'pomo' | 'short-break' | 'long-break') => {
    setIsCounting(false);
    setIsPomoFinished(false)
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
  }, [defaultTimeLongBreak, defaultTimePomo, defaultTimeShortBreak, setPomoType]);

  const startPomo = useCallback(() => {
    setIsPomoFinished(false)
    playStartPomoSound()
    if( pomoType === 'pomo'){
      setSecondsAmount(defaultTimePomo)
    }
    if( pomoType === 'short-break'){
      setSecondsAmount(defaultTimeShortBreak)
    }
    if( pomoType === 'long-break'){
      setSecondsAmount(defaultTimeLongBreak)
    }
    setIsCounting(true);
  }, [defaultTimeLongBreak, defaultTimePomo, defaultTimeShortBreak, playStartPomoSound, pomoType]);

  const startNextPomo = useCallback(() => {
    setIsPomoFinished(false)
    if( pomoType === 'pomo'){
      setTypePomo('short-break')
    }
    if( pomoType === 'short-break'){
      setTypePomo('long-break')
    }
    if( pomoType === 'long-break'){
      setTypePomo('pomo')
    }
    setIsCounting(true);
    playStartPomoSound()
  }, [pomoType, playStartPomoSound, setTypePomo])

  const restartPomo = useCallback(() => {
    playStartPomoSound()
    if( pomoType === 'pomo'){
      setSecondsAmount(defaultTimePomo)
    }
    if( pomoType === 'short-break'){
      setSecondsAmount(defaultTimeShortBreak)
    }
    if( pomoType === 'long-break'){
      setSecondsAmount(defaultTimeLongBreak)
    }
    setIsCounting(false);
    setIsPomoFinished(false)
  }, [playStartPomoSound, pomoType, defaultTimePomo, defaultTimeShortBreak, defaultTimeLongBreak]);

  const getClockLabel = useCallback(() => {
    if(!isCounting) return '-- --'
    const minutes = Math.floor(secondsAmount / 60);
    const seconds = secondsAmount % 60;

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }, [secondsAmount, isCounting ]);

  useEffect(() => {
    if (secondsAmount > 0 && isCounting) {
      setTimeout(() => {
        if (secondsAmount > 0 && isCounting) {
          decreaseSecondsAmount();
        }
      }, 1000);
    } else {
      defineIsCounting(false);
    }
    
    if(secondsAmount === 0){
      setIsPomoFinished(true)
      playFinishedPomoSound()
    }
  }, [defineIsCounting, isCounting, secondsAmount, decreaseSecondsAmount, setIsPomoFinished, playFinishedPomoSound]);

    return {
        secondsAmount,
        defaultTimePomo,
        isCounting,
        decreaseSecondsAmount,
        defineIsCounting,
        startPomo,
        getClockLabel,
        setTypePomo,
        pomoType,
        setPomoType,
        restartPomo,
        isPomoFinished,
        startNextPomo,
    };
  };