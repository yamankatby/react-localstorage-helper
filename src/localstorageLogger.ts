const localstorageLogger = <T>(storage: T, prevStorage: T) => {
  console.group('change * from * to *');
  console.log('prev storage', prevStorage);
  console.log('next storage', storage);
  console.groupEnd();
};

export { localstorageLogger };
