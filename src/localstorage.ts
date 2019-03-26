export type LocalStorageListener<T> = (storage: T, prevStorage: T) => void;

const invokeListeners = <T>(listeners: Array<LocalStorageListener<T>>, storage: T, prevStorage: T) => {
  listeners.forEach(listener => listener(storage, prevStorage));
};

const createLocalstorage = <T>(initialStorage: T, enableLogger: boolean = false, storageName = 'rootStorage') => {
  let storage: T = { ...initialStorage };
  let listeners: Array<LocalStorageListener<T>> = [];

  const rehydrateLocalStorage = () => {
    const jsonStorage = localStorage.getItem(storageName);
    if (jsonStorage !== null) {
      storage = JSON.parse(jsonStorage);
    } else {
      updateLocalStorage(initialStorage, initialStorage);
    }
  };
  const updateLocalStorage = (storage: T, prevStorage: T) => {
    localStorage.setItem(storageName, JSON.stringify(storage));
    invokeListeners(listeners, storage, prevStorage);
  };
  rehydrateLocalStorage();

  const getStorage = () => {
    return storage;
  };
  const setStorage = (newStorage: any) => {
    const prevStorage = storage;
    storage = { ...storage, ...newStorage };

    updateLocalStorage(storage, prevStorage);
  };
  const getItem = (key: keyof T) => {
    return storage[key];
  };
  const setItem = (key: keyof T, value: any) => {
    const prevStorage = storage;
    storage[key] = value;

    updateLocalStorage(storage, prevStorage);
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
