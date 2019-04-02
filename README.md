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

![react-native-js-tableview Android Screenshot](https://raw.githubusercontent.com/yamankatby/react-localstorage-helper/master/assets/overview.gif)(https://raw.githubusercontent.com/yamankatby/react-localstorage-helper/master/assets/overview.gif)

### Class components

```jsx harmony
import { localStorage } from 'react-localstorage-helper';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: 'Somebody', isDark: false };

    this.updateName = localStorage('__name__', this.state.name, (newName) => {
      this.setState(newName);
    });

    this.updateIsDark = localStorage('__isDark__', this.state.isDark, (newIsDark) => {
        this.setState({ isDark: newIsDark });
    });
  }

  render() {
    return (
      <div style={{ backgroundColor: isDark ? 'black' : 'white' }}>
        <h1>Hello! {this.state.name}</h1>
        <input onChange={(e) => this.updateName(e.currentTarget.value)} />

        <input
          type='checkbox'
          value={isDark}
          onChange={() => this.updateIsDark((preValue) => !preValue)}
        />
      </div>
    );
  }
}

```

### Function components (With Hooks) ⚓.

```jsx harmony
import { useLocalStorage } from 'react-localstorage-helper';

const App = () => {
  const [name, setName] = useLocalStorage('__name__', 'Somebody');
  const [isDark, setIsDark] = useLocalStorage('__isDark__', false);

  return (
    <div style={{ backgroundColor: isDark ? 'black' : 'white' }}>
      <h1>Hello! {name}</h1>
      <input onChange={(e) => setName(e.currentTarget.value)} />

      <input
        type='checkbox'
        value={isDark}
        onChange={() => setIsDark((preValue) => !preValue)}
      />
    </div>
  );
};

```

## Authors

* **Yaman KATBY** - *Initial work* - [Website](https://yaman.idewaxa.com/)

See also the list of [contributors](https://github.com/yamankatby/redux-immutable-helper/contributors) who participated in this project.

## License

This library is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
