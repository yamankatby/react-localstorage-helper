interface IStorage<T> {
  get: () => T | null;
  set: (value: T) => void;
}

const storage = <T>(key: string): IStorage<T> => {
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

export { storage };
