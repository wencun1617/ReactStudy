import React,{Component} from 'react'
import ReactDOM from 'react-dom'

// 在嵌套组件中更新 Context
// 从一个在组件树中嵌套很深的组件中更新 context 是很有必要的。
// 在这种场景下，你可以通过 context 传递一个函数，使得 consumers 组件更新 context
// 函数作为context其中一个传递过来的value 

// theme-context.js
const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
};

// 确保传递给 createContext 的默认值数据结构是调用的组件（consumers）所能匹配的！
const ThemeContext = React.createContext({
  theme: themes.dark,
  toggleTheme: () => {},
});

//--------------------------------------------------------------------------------------------

// theme-toggler-button.js
// 消费组件时一个函数式组件, 使用Context.Consumer
function ThemeTogglerButton() {
  // ThemeTogglerButton组件 不仅仅只获取 theme 值，它也从 context 中获取到一个 toggleTheme 函数
  return (
    <ThemeContext.Consumer>
      {({theme, toggleTheme}) => (
        <button onClick={toggleTheme} style={{backgroundColor: theme.background}}>
          Toggle Theme
        </button>
      )}
    </ThemeContext.Consumer>
  );
}

//--------------------------------------------------------------------------------------------
// app.js
class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };

    // State 也包含了更新函数，因此它会被传递进 context provider。
    this.state = {
      theme: themes.light,
      toggleTheme: this.toggleTheme,
    };
  }

  render() {
    // 整个 state 都被传递进 provider
    return (
      <ThemeContext.Provider value={this.state}>
        <Content />
      </ThemeContext.Provider>
    );
  }
}

//中间组件
function Content() {
  return (
    <div>
      <ThemeTogglerButton />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));