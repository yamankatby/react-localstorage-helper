import { Dispatch, useState } from 'react';
import { storage } from './utilities/storage';

const useLocalStorage = <T>(key: string, initialValue: (() => T) | T | any): [T, Dispatch<T>] => {
  const storageManager = storage<T>(key);

  const [value, setValue] = useState(() => {
    const init = storageManager.get() || (typeof initialValue === 'function' ? initialValue() : initialValue);
    storageManager.set(init);
    return init;
  });

  const updateValue = (newValue: ((prevValue: T) => T) | T | any): void => {
    const val = typeof newValue === 'function' ? initialValue(value) : initialValue;
    storageManager.set(val);
    setValue(val);
  };

  return [value, updateValue];
};

export default useLocalStorage;
