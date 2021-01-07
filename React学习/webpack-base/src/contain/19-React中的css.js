import React,{PureComponent} from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
// react中的css

//#region 1. 内联样式 ---> 官方推荐的一种css样式的写法
// style 接受一个采用小驼峰命名属性的 JavaScript 对象,
// 并且可以引用state中的状态来设置相关的样式
//#endregion

//#region 2. 普通的css
// 不是一个独立的模块
// 普通的css都属于全局的css，样式之间会相互影响
//#endregion

//#region 3. css modules
// css modules并不是React特有的解决方案，而是所有使用了类似于webpack配置的环境下都可以使用,需要自行配置 ---> 见webpack-base目录里的 评论例子(CmtList.jsx)
// React的脚手架已经内置了css modules的配置
// .css/.less/.scss 等样式文件都修改成 .module.css/.module.less/.module.scss
// 然后就可以当做模块一样导入使用
// eg: import aaa from  './navBar.module.css'
// 缺陷:
// 引用的类名，不能使用连接符(.home-title)，在JavaScript中是不识别的；
// 所有的className都必须使用{XXX.选择器名} 的形式来编写；
// 不方便动态来修改某些样式，依然需要使用内联样式的方式；
//#endregion

//#region  4. CSS in JS
// CSS-in-JS 是指一种模式，其中 CSS 由 JavaScript 生成而不是在外部文件中定义(All in JS)
// 此功能并不是 React 的一部分，而是由第三方库提供。 React 对样式如何定义并没有明确态度

//CSS-in-JS的模式就是一种将样式（CSS）也写入到JavaScript中的方式，并且可以方便的使用JavaScript的状态
// 比较流行的CSS-in-JS的库  1.styled-components(popular)   2.emotion   3.glamorous

// 优秀的CSS-in-JS的库依然非常强大、方便, The reasons are as follows: 
// CSS-in-JS通过JavaScript来为CSS赋予一些能力，包括类似于CSS预处理器一样的样式嵌套、函数定义、逻辑复用、动态修改状态等等；
// 虽然SS预处理器也具备某些能力，但是获取动态状态依然是一个不好处理的点；
// 所以，目前可以说CSS-in-JS是React编写CSS最为受欢迎的一种解决方案

// 安装CSS-in-JS的库 ---> yarn add styled-components 1.

//#region 1.1 标签模板字符串（Tagged Template Literals）  --> 模板字符串另外一种用法:
function foo(...args) {
  console.log(args);
}

// 正常情况下，我们都是通过 函数名() 方式来进行调用的，其实函数还有另外一种调用方式
foo("Hello World");  // ["Hello World"]  ---> because ...arg
foo`Hello World` // [Array(1)]  ----> [["Hello World"]]

// 如果我们在调用的时候插入其他的变量：
// 模板字符串被拆分了；
// 第一个元素是数组，是被模块字符串拆分的字符串组合；
// 后面的元素是一个个模块字符串传入的内容；
const word = "adjust vt.调整,调节 v.适应"
foo`Hello World  ${word} `  // [Array(2), "adjust vt.调整,调节 v.适应"]    ----> [["Hello World  ", " "], "adjust vt.调整,调节 v.适应"]

// 在styled component中，就是通过这种方式来解析模块字符串，最终生成我们想要的样式的
//#endregion

//#region 1.2 styled基本使用
// styled-components的本质是通过函数的调用，最终创建出一个组件 eg: HomeWrapper
// 这个组件会被自动添加上一个不重复的class；
// styled-components会给该class添加相关的样式

// 1. 支持类似于CSS预处理器一样的样式嵌套
// 2. 支持直接子代选择器(>)或后代选择器，并且直接编写样式；
// 3. 可以通过&符号获取当前元素； & :sass的语法, 代表上一级选择器, scss 是 sass 的升级版本,兼容和新增功能
// 4. 直接伪类选择器、伪元素等

// css链接 --> 以不同方法设置链接样式
// :link选择器: 选择未被访问的链接,设置其样式
// :visited选择器: 选择已访问的链接,设置其样式
// :hover选择器: 选择鼠标指针悬浮在其上的元素,并设置其样式(可用于所有元素,不止是链接)
// :active选择器: 选择活动的链接,设置其样式  (在一个链接上点击,他就会成为活动的)
// 为了使定义生效：(link,visited) --> hover --> active
const HomeWrapper = styled.div`
  color: purple;

  h2 {
    font-size: 24px;
  }

  ul > li {
    color: orange;

    // & : sass的语法, 代表上一级选择器,实际编译成css便是代表 li
    &.active {
      color: red;
    }

    &:hover {
      font-style: italic;
    }

    // :after选择器: 向选定的元素之后插入内容, content属性指定插入的内容
    &::after {
      content: "abc";
      font-size: 22px;
      color: purple
    }
  }
`

// class App extends PureComponent {
//   render() {
//     return (
//       <HomeWrapper>
//         <h2>我是Home标题</h2>
//         <ul>
//           <li>patient n.病人 adj.有耐心的</li>
//           <li>be patient with 对...有耐心</li>
//           <li>patience n. 耐心,忍耐,容忍</li>
//           <li>have no patience with... 不能容忍</li>
//           <li>try one's patience 使某人忍无可忍</li>
//         </ul>
//       </HomeWrapper>
//     )
//   }
// }
//#endregion

//#region 1.3 props、attrs属性
const WrapInput = styled.input.attrs({ //添加attrs属性
  placeholder: "请填写密码",
  paddingLeft: props => props.left || "5px"
})`
  border-color: gray;

// 获取props需要通过 $ {} 传入一个插值函数，props会作为该函数的参数；
// 这种方式可以有效的解决动态样式的问题；
  background: ${props => props.color};

  &:focus {
    outline-color: red;
  }
`

// class App extends PureComponent {
//   render() {
//     return(
//       <div>
//         <div>effective adj.有效的,生效的</div>
//         {/* props可以穿透 ----> props可以被传递给styled组件 */}
//         <WrapInput type="password" color="pink"/>
//       </div>
      
//     )
//   }
// }
//#endregion

//#region 1.4 styled高级特性
// 支持样式的继承
const CommonButton = styled.button`
  padding: 8px 30px;
  border-radius: 5px;
`

const WarnButton = styled(CommonButton)`
  background-color: red;
  color: #fff;
`

const PrimaryButton = styled(CommonButton)`
  background-color: pink;
  color: #fff;
`

class App extends PureComponent {
  render() {
    return(
      <div>
        <CommonButton>普通按钮</CommonButton>
        <WarnButton>警告按钮</WarnButton>
        <PrimaryButton>primary adj.主要的,基本的,初等教育的,最初的 n.首选</PrimaryButton>
      </div>
    )
  }
}
//#endregion

//#region classnames(动态添加classnames的库)

// vue里 {/* <div class="static" :class="{ active: isActive, 'text-danger': hasError }"></div> */}
// react中添加class ---> 自行逻辑处理
// eg: <h2 className={"title " + (this.state.isActive ? "active": "")}>我是标题</h2>

// 借助助于一个第三方的库：classnames   ---> 动态添加classnames的一个库
// eg: classNames('foo', { bar: true, duck: false }, 'baz', { quux: true }); // => 'foo bar baz quux'(类名)

//#endregion
ReactDOM.render(<App/>,document.getElementById('app'))