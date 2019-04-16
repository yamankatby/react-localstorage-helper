import { Dispatch, useState } from 'react';
import { storage } from './utilities/storage';

export default <S>(key: string, initialValue: (() => S) | S | any): [S, Dispatch<S>] => {
  if (!key || typeof key !== 'string' || key.length === 0) {
    throw new Error('Make sure that you have provide a key as first argument. the key must be string and not empty.');
  }
  if (!initialValue) {
    initialValue = false;
  }

  const storageManager = storage<S>(key);

  const [value, setValue] = useState(() => {
    const init = storageManager.get() || (typeof initialValue === 'function' ? initialValue() : initialValue);
    storageManager.set(init);
    return init;
  });

  const updateValue = (newValue: ((prevValue: S) => S) | S | any): void => {
    if (!newValue) {
      newValue = false;
    }
    if (typeof newValue === 'function') {
      newValue = newValue(value);
    }

    storageManager.set(newValue);
    setValue(newValue);
  };

  return [value, updateValue];
};
