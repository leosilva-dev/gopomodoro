import { useContext } from "react";

import { PomoContext } from "../contexts/PomoContext";

export const usePomoContext = () => {
  const context = useContext(PomoContext);

  return context;
};