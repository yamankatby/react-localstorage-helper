import { storage } from './utilities/storage';

const localStorage = <T>(
  key: string,
  initialValue: (() => T) | T | any,
  onValueChange: (newValue: T, prevValue?: T) => void,
) => {
  const storageManager = storage<T>(key);

  const prevValue = storageManager.get();
  const init = prevValue || (typeof initialValue === 'function' ? initialValue() : initialValue);
  storageManager.set(init);

  return (newValue: ((prevValue: T) => T) | T | any): void => {
    const prevValue = storageManager.get();
    const value = typeof newValue === 'function' ? newValue(storageManager.get()) : newValue;

    storageManager.set(value);
    onValueChange(value, prevValue!);
  };
};

export default localStorage;
