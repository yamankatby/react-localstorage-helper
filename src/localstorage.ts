export type LocalStorageListener<T> = (storage: T, prevStorage: T) => void;

const logger = (storage: any, prevStorage: any) => {
  let changedItemKey = '*';
  let changedItemFrom = '*';
  let changedItemTo = '*';

  Object.keys(prevStorage).forEach(key => {
    const changed = JSON.stringify(prevStorage[key]) !== JSON.stringify(storage[key]);
    if (changed) {
      changedItemKey = key;
      changedItemFrom = prevStorage[key];
      changedItemTo = storage[key];
    }
  });

  console.group(`change ${changedItemKey} from ${changedItemFrom} to ${changedItemTo}`);
  console.log('prev storage', prevStorage);
  console.log('next storage', storage);
  console.groupEnd();
};

const invokeListeners = <T>(listeners: Array<LocalStorageListener<T>>, storage: T, prevStorage: T) => {
  listeners.forEach(listener => listener(storage, prevStorage));
};

const createLocalstorage = <T>(initialStorage: T, loggerEnabled: boolean = true, storageName = 'rootStorage') => {
  let storage: T = { ...initialStorage };
  let listeners: Array<LocalStorageListener<T>> = [];

  const controller = (() => {
    const reflect = (prevStorage: T) => {
      const immutablePrevStorage = { ...prevStorage };
      return (storage: T) => {
        const immutableStorage = { ...storage };
        localStorage.setItem(storageName, JSON.stringify(storage));
        invokeListeners(listeners, immutableStorage, immutablePrevStorage);
      };
    };
    const rehydrate = () => {
      const jsonStorage = localStorage.getItem(storageName);
      if (jsonStorage !== null) {
        reflect(storage)({ ...storage, ...JSON.parse(jsonStorage) });
      } else {
        reflect(initialStorage)(initialStorage);
      }
    };
    return { reflect, rehydrate };
  })();
  controller.rehydrate();

  const getStorage = () => {
    return storage;
  };
  const setStorage = (newStorage: any) => {
    const reflector = controller.reflect(storage);
    storage = { ...storage, ...newStorage };
    reflector(storage);
  };
  const getItem = (key: keyof T) => {
    return storage[key];
  };
  const setItem = (key: keyof T, value: any) => {
    const reflector = controller.reflect(storage);
    storage[key] = value;
    reflector(storage);
  };
  const subscribe = (listener: LocalStorageListener<T>) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  if (loggerEnabled) {
    subscribe(logger);
  }

  return { getStorage, setStorage, getItem, setItem, subscribe };
};

export default createLocalstorage;
