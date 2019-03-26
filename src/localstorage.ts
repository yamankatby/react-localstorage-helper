export type LocalStorageListener<T> = (storage: T, prevStorage: T) => void;

const createLocalstorage = <T>(initialStorage: T) => {
  let storage: T = { ...initialStorage };
  let listeners: Array<LocalStorageListener<T>> = [];

  const invokeListeners = (storage: T, prevStorage: T) => {
    listeners.forEach(listener => listener(storage, prevStorage));
  };

  const getStorage = () => {
    return storage;
  };
  const setStorage = (newStorage: any) => {
    const prevStorage = storage;
    storage = { ...storage, ...newStorage };

    invokeListeners(storage, prevStorage);
  };
  const getItem = (key: keyof T) => {
    return storage[key];
  };
  const setItem = (key: keyof T, value: any) => {
    const prevStorage = storage;
    storage[key] = value;

    invokeListeners(storage, prevStorage);
  };
  const subscribe = (listener: LocalStorageListener<T>) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  return { getStorage, setStorage, getItem, setItem, subscribe };
};

export default createLocalstorage;
