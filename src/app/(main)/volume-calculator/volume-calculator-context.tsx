'use client';
import { ReactNode, createContext, useState } from 'react';

export const VolumeCalculatorContext = createContext<{
  total: number;
  setTotal: (total: number) => void;
  adaptionFactor: number;
  setAdaptionFactor: (adaptionFactor: number) => void;
}>({
  total: 0,
  setTotal: () => {},
  adaptionFactor: 0,
  setAdaptionFactor: () => {},
});

export function VolumeCalculatorProvider({ children }: { children: ReactNode }) {
  const [total, setTotal] = useState(0);
  const [adaptionFactor, setAdaptionFactor] = useState(0);

  return (
    <VolumeCalculatorContext.Provider
      value={{
        total,
        setTotal,
        adaptionFactor,
        setAdaptionFactor,
      }}
    >
      {children}
    </VolumeCalculatorContext.Provider>
  );
}
