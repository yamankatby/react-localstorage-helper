interface ILocalStorage<T> {
  get: () => T | null;
  set: (value: T) => void;
}

const localstorage = <T>(key: string): ILocalStorage<T> => {
  const get = (): T | null => {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue !== null) {
      return JSON.parse(serializedValue);
    }

    return null;
  };
  const set = (value: T): void => {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  };

  return { get, set };
};

export default localstorage;
