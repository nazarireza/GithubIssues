import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

export const useTimeout = (
  effect: EffectCallback,
  deps?: DependencyList | undefined,
  ms?: number | undefined
): void => {
  const unsubscribeRef = useRef<any>(null);

  useEffect(() => {
    if (unsubscribeRef.current) clearTimeout(unsubscribeRef.current);

    unsubscribeRef.current = setTimeout(() => effect(), ms || 200);

    return () => clearTimeout(unsubscribeRef.current);
  }, deps);
};
