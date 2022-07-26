import {useState, useEffect} from 'react';

export const useDebouncedValue = (input: string = '', time: number = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(input);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebouncedValue(input);
    }, time);

    return () => {
      // clean previous timeout when there is a new input
      clearTimeout(timeOut);
      // we clean the interval every time the input changes (adding or removing a char)
      // so the time will not count until we stop tipping
    };
  }, [input]);

  return {
    debouncedValue,
  };
};
