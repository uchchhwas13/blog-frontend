import { useEffect, useState } from 'react';

export const useDebounce = <Type>(value: Type, delay = 500): Type => {
  const [debouncedValue, setDebouncedValue] = useState<Type>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
