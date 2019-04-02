import { Dispatch, useState } from 'react';

export type IValue<T> = T | ((value: T) => T) | any;

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

const useLocalStorage = <T>(key: string, initialValue: IValue<T>): [T | any, Dispatch<any>] => {
  const [value, setValue] = useState(() => {
    let init = getItem(key);
    if (init === null && typeof initialValue === 'function') {
      init = initialValue();
    }

    setItem(key, init);
    return init;
  });

  const updateValue = (newValue: IValue<T>) => {
    if (typeof newValue === 'function') {
      newValue = newValue(value);
    }

    setItem(key, newValue);
    setValue(newValue);
  };

  return [value, updateValue];
};

export default useLocalStorage;
