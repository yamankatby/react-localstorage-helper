import { Dispatch, useState } from 'react';

const setItem = <T>(key: string, value: T): void => {
  const serializedValue = JSON.stringify(value);
  localStorage.setItem(key, serializedValue);
};
const getItem = <T>(key: string): T | null => {
  const serializedValue = localStorage.getItem(key);
  if (serializedValue !== null) {
    return JSON.parse(serializedValue);
  }

  return null;
};

const useLocalStorage = <T>(key: string, initialValue: T | (() => T)): [T, Dispatch<T>] => {
  const [value, setValue] = useState(() => {
    // @ts-ignore
    const init = getItem(key) || (typeof initialValue === 'function' ? initialValue() : initialValue);
    setItem(key, init);

    return init;
  });

  const updateValue = (newValue: T | ((prevValue: T) => T)): void => {
    // @ts-ignore
    const val = typeof newValue === 'function'? initialValue(value): initialValue;
    setItem(key, newValue);

    setValue(newValue);
  };

  return [value, updateValue];
};

export default useLocalStorage;
