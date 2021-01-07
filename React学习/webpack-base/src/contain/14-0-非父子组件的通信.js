import React from 'react'
import ReactDOM from 'react-dom'

//#region 深入理解jsx https://zh-hans.reactjs.org/docs/jsx-in-depth.html
  // JSX 仅仅只是 React.createElement(component, props, ...children) 函数的语法糖
  // JSX 标签的第一部分(React.createElement()第一个参数) 指定了 React 元素的类型 
  // 大写字母开头的 JSX 标签意味着它们是 React 组件。这些标签会被编译为 对命名变量的 直接引用
  //在 JSX 类型中使用点语法

  // 在运行时选择类型
  // 你不能将通用表达式作为 React 元素类型。 
  // 如果你想通过通用表达式来（动态）决定元素类型，你需要首先将它赋值给 大写字母开头的变量。这通常用于根据 prop 来渲染不同组件的情况下:

  // JSX 中的 Props
  // JavaScript 表达式作为 Props
  // 可以把包裹在 {} 中的 JavaScript 表达式作为一个 prop 传递给 JSX 元素.

  // 字符串字面量
  // 可以将字符串字面量赋值给 props  属性 = 值

  // Props 默认值为 "true"
  // 如果你没给 prop 赋值，它的默认值是 true

  // 属性展开
  // 可以使用展开运算符 ... 来在 JSX 中传递整个 props 对象
//#endregion


//#region  Context https://zh-hans.reactjs.org/docs/context.html#before-you-use-context
// Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法
// React 提供了一个API  Context 相当与 vue 的事件总线
// Context 提供了一种在 组件之间共享此类值的方式, 而不必显示的通过组件树的逐层传递 props

// Context 设计的目的是为了 共享那些对于一个组件树而言是 "全局的数据", eg: 当前认证用户,主体或首选语言
// 在组件树中很多不同层级的组件需要访问同样的一批数据。
// Context 能让你将这些数据向组件树下所有的组件进行“广播”，所有的组件都能访问到这些数据，也能访问到后续的数据更新
//#endregion


//#region React.createContext 
// 创建一个 Context 对象。
// 每个 Context 对象都会返回一个 Provider React 组件，它允许消费组件订阅context的变化
// 消费组件   --->   (使用context的组件)       订阅context的变化(既当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染)

// const MyContext = React.createContext(defaultValue);
// 只有当组件(消费组件)所处的树中没有匹配到 Provider 时，其 defaultValue 参数才会生效。这有助于在不使用 Provider 包装组件的情况下对组件进行测试。
// 注意：将 undefined 传递给 Provider 的 value 时，消费组件的 defaultValue 不会生效
//#endregion
const MyContext = React.createContext({word: 'default',mean: 'n.默认,违约,缺席'});

//#region  Context.displayName   自定义Context标签名
  // 在 DevTools 中   <Context.Provider>  ------变为----->  <MyDisplayName.Provider>
  MyContext.displayName = 'MyDisplayName';
  // context 对象接受一个名为 displayName 的 property，类型为字符串。React DevTools 使用该字符串来确定 context 要显示的内容
//#endregion
class App extends React.Component {
  render() {
    return (
      <div>
        {/* Context.Provider */}
        {/* Provider 接收一个 value 属性，传递给消费组件。
        一个 Provider 可以和多个消费组件有对应关系。
        多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据(value 和作用域差不多意思？) */}
        {/* 当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染 */}
        <MyContext.Provider value = {{word: 'dymamic',mean: 'n.活力/动力 adj.有活力的,不断变化的,动态的'}}>
          <CenterModule/>
          <h4>App组件的其他内容</h4>
        </MyContext.Provider>
      </div>
    )
  }
}

// 中间的组件  
// 再也不必指明往下传递 prop 了
class CenterModule extends React.Component{
  render() {
    return (
      <div>
        <div style = {{borderBottom : '1px solid purple'}}>中间的组件</div>
        <NeedData/>
      </div>
    )
  }
}

// 消费组件  订阅了Context的变化
// 当 React 渲染一个订阅了这个 Context 对象的组件，这个组件会从组件树中离自身最近的那个匹配的 Provider 中读取到当前的 context 值
// class 有状态组件 在Devtools 会看到拥有 Context 属性
class NeedData extends React.Component{
  // static contextType = MyContext;
  // 使用实验性的 public class fields 语法，你可以使用 static 这个类属性来初始化你的 contextType
  // Class.contextType 便要注释掉
  render() {
    return (
      <div>
        <h2>单词: {this.context.word}</h2>
        <h5>意思: {this.context.mean}</h5>
      </div>
    )
  }
}

NeedData.contextType = MyContext;
// 该 API 订阅单一 context
//#region Class.contextType 使得this.context 可以拿到值
  // 挂载在 class 上的 contextType 属性会被重赋值为一个由 React.createContext() 创建的 Context 对象。
  // 这能让你使用 this.context 来消费最近 Context 上的那个值。你可以在任何生命周期中访问到它，包括 render 函数中

  // class MyClass extends React.Component {
  //   componentDidMount() {
  //     let value = this.context;
  //     /* 在组件挂载完成后，使用 MyContext 组件的值来执行一些有副作用的操作 */
  //   }
  //   componentDidUpdate() {
  //     let value = this.context;
  //     /* ... */
  //   }
  //   componentWillUnmount() {
  //     let value = this.context;
  //     /* ... */
  //   }
  //   render() {
  //     let value = this.context;
  //     /* 基于 MyContext 组件的值进行渲染 */
  //   }
  // }
  // MyClass.contextType = MyContext;

//#endregion

//------------------------------------------------------------------------------------------------------------------------------

//#region class组件使用 Context.Consumer 可以用但没必要
// class NeedData extends React.Component{
//   render() {
//     return (
//     <MyContext.Consumer>
//       {({word,mean})=> {
//         return (
//           <div>
//             <h2>单词2: {word}</h2>
//             <h5>意思2: {mean}</h5>
//           </div>
//         )
//       }}
//     </MyContext.Consumer>
//     )
//   }
// }
//#endregion

//#region 函数式组件,使用Context.Consumer
// function 无状态组件 在Devtools 看不到拥有 Context 属性
// function NeedData() {
//   return (
//     <MyContext.Consumer>
//       {({word,mean})=> {
//         return (
//           <div>
//             <h2>单词1: {word}</h2>
//             <h5>意思1: {mean}</h5>
//           </div>
//         )
//       }}
//     </MyContext.Consumer>
//   )
// }
//#endregion

//#region  Context.Consumer

//  函数式组件没有 public class fields 语法,也没有Class.contextType,
// 便拿不到 Provide 提供的 value(默认值也拿不到), 所以便有了 Context.Consumer
// class 组件有两种方式, 使得  Provide 提供的 value 可以被拿到, 便不用上 Context.Consumer (也可以使用,但直接用Class.contextType订阅单一 context 使用起来更方便)

{/* <MyContext.Consumer> */}
  // {value => /* 基于 context 值进行渲染*/}
{/* </MyContext.Consumer> */}

// 一个 React 组件可以订阅 context 的变更，这让你在函数式组件中可以订阅 context。 Context.Consumer 就是给函数式组件使用的
// 1. 需要一个函数作为子元素（function as a child）
// 2. 这个函数接收当前的 context 值，并返回一个 React 节点
// 传递给函数的 value 值等等价于组件树上方离这个 context 最近的 Provider 提供的 value 值。
// 如果没有对应的 Provider，value 参数等同于传递给 createContext() 的 defaultValue

//#endregion

ReactDOM.render(<App/>,document.getElementById('app'))