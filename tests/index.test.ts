import createLocalStorage from '../src/localstorage';

test('localstorage.getStorage()', () => {
  const storage = { a: 1, b: 2 };
  const localstorage = createLocalStorage(storage);

  expect(
    localstorage.getStorage(),
  ).toEqual(storage);
});
test('localstorage.setStorage()', () => {
  const storageBefore = { a: 1, b: 2 };
  const storageAfter = { a: 3, b: 4 };

  const localstorage = createLocalStorage(storageBefore);
  localstorage.setStorage({ a: 3, b: 4 });

  expect(
    localstorage.getStorage(),
  ).toEqual(storageAfter);
});
test('localstorage.getItem()', () => {
  const storage = { a: 1, b: 2 };
  const localstorage = createLocalStorage(storage);

  expect(
    localstorage.getItem('a'),
  ).toEqual(1);
});
test('localstorage.setItem()', () => {
  const storageBefore = { a: 1, b: 2 };
  const storageAfter = { a: 1, b: 3 };

  const localstorage = createLocalStorage(storageBefore);
  localstorage.setItem('b', 3);

  expect(
    localstorage.getStorage(),
  ).toEqual(storageAfter);
});
