import { Dispatch, useState } from 'react';
import localstorage from './utilities/localstorage';

type IUseLocalStorage<T> = [T, Dispatch<T>];

const useLocalStorage = <T>(key: string, initialValue: T | (() => T)): IUseLocalStorage<T> => {
  const storageManager = localstorage<T>(key);

  const [value, setValue] = useState(() => {
    // @ts-ignore
    const init = getItem(key) || (typeof initialValue === 'function' ? initialValue() : initialValue);
    storageManager.set(init);

    return init;
  });

  const updateValue = (newValue: T | ((prevValue: T) => T)): void => {
    // @ts-ignore
    const val = typeof newValue === 'function' ? initialValue(value) : initialValue;

    storageManager.set(val);
    setValue(val);
  };

  return [value, updateValue];
};

export default useLocalStorage;
