import React, { createContext, useCallback, useState } from "react";

interface IPomoContextData {
  timerPreview: string;
  defineTimerPreview: (value: string) => void;
}
export const PomoContext = createContext<IPomoContextData>(
  {} as IPomoContextData
);

interface IPomoProvider {
  children: React.ReactNode;
}

export const PomoProvider: React.FC<IPomoProvider> = ({
  children,
}: IPomoProvider) => {
  const [timerPreview, setTimerPreview] = useState("");

  const defineTimerPreview = useCallback(
    (value: string) => {
      setTimerPreview(value);
    },
    [setTimerPreview]
  );

  return (
    <PomoContext.Provider
      value={{
        timerPreview,
        defineTimerPreview,
      }}
    >
      {children}
    </PomoContext.Provider>
  );
};
