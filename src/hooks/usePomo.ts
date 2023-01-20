import { useCallback, useEffect, useMemo, useState } from "react";

type pomoType = 'pomo' | 'short-break' | 'long-break'
interface ICycle {
  order: number;
  pomoType: pomoType;
}

export const usePomo = () => {
  const [defaultTimePomo] = useState(15 * 60); // 15 minutes
  const [defaultTimeShortBreak] = useState(5 * 60);// 5 minutes
  const [defaultTimeLongBreak] = useState(10 * 60); // 10 minutes
  const [currentPomoOrder, setCurrentPomoOrder] = useState(1)
  const [pomoType, setPomoType] = useState<pomoType>('pomo')
  const [secondsAmount, setSecondsAmount] = useState(defaultTimePomo);
  const [isCounting, setIsCounting] = useState(false);
  const [isPomoFinished, setIsPomoFinished] = useState(false);
  const [showStopedTimer, setShowStopedTimer] = useState(false);
  const [cycle] = useState<ICycle[]>([
    {
      order:1,
      pomoType: 'pomo'
    },
    {
      order:2,
      pomoType: 'short-break'
    },
    {
      order:3,
      pomoType: 'pomo'
    },
    {
      order:4,
      pomoType: 'short-break'
    },
    {
      order:5,
      pomoType: 'pomo'
    },
    {
      order:6,
      pomoType: 'long-break'
    },
  ])

  const getNextPomoTypeByCurrentPomoOrder = useCallback((currentPomoOrder: number):pomoType => {
    const nextOrderPomoType = currentPomoOrder + 1
    const nextPomoType = cycle.find(pomo => pomo.order === nextOrderPomoType)
    
    return nextPomoType?.pomoType || 'pomo'
  }, [cycle]);

  const playStartPomoSound = useCallback(() => {
    new Audio("/sounds/clock_start_stop.wav").play()
  }, []);

  const playFinishedPomoSound = useCallback(() => {
    new Audio("/sounds/finished.wav").play()
  }, []);

  const defineIsCounting = useCallback((value: boolean) => {
    setIsCounting(value);
  }, []);

  const setTypePomo = useCallback((type: pomoType) => {
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
    setShowStopedTimer(false)
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
    setShowStopedTimer(false)
    setIsPomoFinished(false)
    setTypePomo(getNextPomoTypeByCurrentPomoOrder(currentPomoOrder))

    let nextCurrentPomoOrder 

    if(currentPomoOrder + 1 <= cycle.length){
       nextCurrentPomoOrder = currentPomoOrder + 1
    }else{
       nextCurrentPomoOrder = 1
    }    
    setCurrentPomoOrder(nextCurrentPomoOrder)
    setIsCounting(true);
    playStartPomoSound()
  }, [getNextPomoTypeByCurrentPomoOrder, currentPomoOrder, setTypePomo, cycle.length, playStartPomoSound])

  const restartPomo = useCallback(() => {
    setShowStopedTimer(true)
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
    if(showStopedTimer) return '-- --'
    const minutes = Math.floor(secondsAmount / 60);
    const seconds = secondsAmount % 60;

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }, [secondsAmount, showStopedTimer]);

  const decreaseSecondsAmount = useCallback(() => {
    setSecondsAmount((old) => old - 1);
  }, []);

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