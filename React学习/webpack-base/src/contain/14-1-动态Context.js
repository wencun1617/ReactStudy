import React,{Component} from 'react'
import ReactDOM from 'react-dom'


// 动态 Context
// 一个更加复杂的方案是对 theme 例子使用动态值（dynamic values）

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
const ThemeContext = React.createContext(
  themes.dark // 默认值
);

//----------------------------------------------------------------------------------------------

// themed-button.js
class ThemedButton extends Component {
  render() {
    let props = this.props;
    let theme = this.context;
    console.log(props)
    return (
      <button
        {...props}
        // onClick = {props.onClick}
        // children = {props.children}
        style={{backgroundColor: theme.background}}
      ></button>
    );
  }
}
ThemedButton.contextType = ThemeContext;

//----------------------------------------------------------------------------------------------

// app.js
// 一个使用 ThemedButton 的中间组件
function Toolbar(props) {
  return (
    //子组件 向父组件传递消息
    // React中同样是通过props传递消息
    // 只是让父组件给子组件传递一个回调函数, 在子组件内中调用这个函数即可
    // 子组件回调 函数,便是子组件在某个操作后向父组件传递消息

    <ThemedButton onClick={props.changeTheme}>
      {/* 父组件通过 属性 = 值(children = 'Change Theme')的形式来传递给子组件数据 */}
      Change Theme
    </ThemedButton>
  );
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
    };

    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };
  }

  render() {
    // 在 ThemeContext.Provider 内部的 ThemedButton 按钮组件使用 state 中的 theme 值，
    // 而外部的组件使用默认的 theme 值
    return (
      <div>
        <ThemeContext.Provider value={this.state.theme}>
          {/* 回调函数通过props传递,便要一层一层传 */}
          <Toolbar changeTheme={this.toggleTheme} />
        </ThemeContext.Provider>
        <div children = 'children属性里面的内容便作为标签的子元素'></div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));