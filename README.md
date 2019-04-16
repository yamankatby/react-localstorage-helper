# react-localstorage-helper

[![Latest Stable Version](https://img.shields.io/npm/v/react-localstorage-helper.svg)](https://www.npmjs.com/package/react-localstorage-helper)
[![NPM Downloads](https://img.shields.io/npm/dm/react-localstorage-helper.svg)](https://www.npmjs.com/package/react-localstorage-helper)
[![GitHub issues](https://img.shields.io/github/issues-raw/yamankatby/react-localstorage-helper.svg)](https://github.com/yamankatby/react-localstorage-helper/issues)
[![Used Languages](https://img.shields.io/github/languages/top/yamankatby/react-localstorage-helper.svg)](https://github.com/yamankatby/react-localstorage-helper/issues)

## Installation


```bash
npm install react-localstorage-helper --save
```
**Or if you're using yarn:**

```
yarn add react-localstorage-helper
```

## Getting Started

Access localStorage easily inside your React component.
- Full support to use localStorage with new `React Hooks` ⚓.
- Listen to changes easily just by pass a `Callback function` 🔉.
- No need to worry about encoding data to `JSON` and decoding it back.

![react-localstorage-helper Overview](https://raw.githubusercontent.com/yamankatby/react-localstorage-helper/master/overview.gif)

## Usage

### Function components (With Hooks) ⚓.

```jsx harmony
import { useLocalStorage } from "react-localstorage-helper";

const App = () => {
  const [name, setName] = useLocalStorage("__name__", "Somebody");
  const [isDark, setIsDark] = useLocalStorage("__isDark__", false);

  return (
    <div style={{ backgroundColor: isDark ? "black" : "white" }}>
      <h1>Hello! {name}</h1>
      <input onChange={e => setName(e.currentTarget.value)} />

      <input
        type="checkbox"
        value={isDark}
        onChange={() => setIsDark(preValue => !preValue)}
      />
    </div>
  );
};
```

### Class components (With Callback Function) 🔉.

```jsx harmony
import { localStorage } from "react-localstorage-helper";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "Somebody", isDark: false };

    this.updateName = localStorage("__name__", this.state.name, newName => {
      this.setState(newName);
    });

    this.updateIsDark = localStorage(
      "__isDark__",
      this.state.isDark,
      newIsDark => {
        this.setState({ isDark: newIsDark });
      }
    );
  }

  render() {
    return (
      <div style={{ backgroundColor: isDark ? "black" : "white" }}>
        <h1>Hello! {this.state.name}</h1>
        <input onChange={e => this.updateName(e.currentTarget.value)} />

        <input
          type="checkbox"
          value={isDark}
          onChange={() => this.updateIsDark(preValue => !preValue)}
        />
      </div>
    );
  }
}
```

## Documentation

**Class component:**

```js
this.updateValue = localStorage(key, initialValue, onValueChange);
```

`localStorage` function returns a function to update the value in the localStorage and triggers `onValueChange` callback function.

**Function component:**

```js
const [value, setValue] = useLocalStorage(key, initialValue);
```

`useLocalStorage()` Hook returns a stateful value, and a function to update it.

During the initial render, the returned value (`value`) will be the same as the value passed as the secound argument (`initialState`) if there is no data stored in the localStorage.

### Lazy initial value

The `initialValue` argument is the value used during the initial render if there is no stored value in the localStorage. In subsequent renders, it is disregarded. If the initial value is the result of an expensive computation, you may provide a function instead, which will be executed only on the initial render:

**Class component:**

```js
this.updateValue = localStorage(
  "__key__",
  () => {
    const initialValue = someExpensiveComputation(props);
    return initialValue;
  },
  this.handleValueChange
);
```

**Function component:**

```js
const [value, setValue] = useLocalStorage("__key__", () => {
  const initialValue = someExpensiveComputation(props);
  return initialValue;
});
```

### Functional updates
If the new value is computed using the previous value, you can pass a function to `setValue`. The function will receive the previous value, and return an updated value. Here’s an example:

**Class component:**

```js
this.updateTheme = localStorage("__theme__", "light", this.handleValueChange);
this.updateTheme(prevValue => (prevTheme === "light" ? "dark" : "light"));
```

**Function component:**

```js
const [them, setTheme] = useLocalStorage("__theme__", "light");
onToggleTheme = () =>
  setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
```
## Authors

* **Yaman KATBY** - *Initial work* - [Website](https://yaman.idewaxa.com/)

See also the list of [contributors](https://github.com/yamankatby/redux-immutable-helper/contributors) who participated in this project.

## License

This library is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
