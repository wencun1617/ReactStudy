import React,{useContext,Component} from 'react'

// 消费多个 Context 使用Context.Consumer
// 为了确保 context 快速进行重渲染，React 需要使每一个 consumers 组件的 context 在组件树中成为一个单独的节点
// Consumer content的来源 只有唯一的 Provider？

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

// 用户登录 context
const UserContext = React.createContext({
  name: 'Guest',
});

//--------------------------------------------------------------

// 一个组件可能会消费多个 context
function ContentHook() {
  const ThemeContextValue = useContext(ThemeContext);
  const UserContextValue = useContext(UserContext)
  return (
    <>
      <button style={{ backgroundColor: ThemeContextValue.theme.background }} onClick={ThemeContextValue.toggleTheme}>
        Toggle Theme
      </button>
      <div>{UserContextValue}</div>
    </>
  );
}


//--------------------------------------------------------------

export default class ContextHookExample extends Component {
  constructor(props) {
    super(props);

    this.toggleTheme = () => {
      this.setState(state => ({
        theme: state.theme === themes.dark ? themes.light : themes.dark,
      }));
    };

    // State 也包含了更新函数，传递进 context provider。
    this.state = {
      theme: themes.light,
      toggleTheme: this.toggleTheme,
    };
  }
  render() {
    // 提供初始 context 值的 App 组件
    return (
      <ThemeContext.Provider value={this.state}>
        <UserContext.Provider value={'温存'}>
          <Layout />
        </UserContext.Provider>
      </ThemeContext.Provider>
    );
  }
}
// 中间组件
function Layout() {
  return (
    <div>
      <ContentHook />
    </div>
  );
}
