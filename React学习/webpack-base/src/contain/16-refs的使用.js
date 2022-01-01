import React, { PureComponent, createRef } from "react";
import ReactDOM from "react-dom";

//#region refs的使用  1.1 创建ref来获取对应的DOM 三种方式

// 在React的开发模式中，通常情况下不需要、也不建议直接操作DOM原生，但是某些特殊的情况，确实需要获取到DOM进行某些操作
// eg: 1.管理焦点 2.文本选择或媒体播放。触发强制动画。3.集成第三方 DOM 库 .....

// 1.1 创建ref来获取对应的DOM 三种方式

//1.传入字符串
// 使用时通过 this.refs.传入的字符串格式 获取对应的元素
//2.传入一个对象
// 对象通过 React.createRef() 方式创建出来的
// 用时获取到创建的对象其中有一个current属性就是对应的元素
//3.传入一个函数
// 该函数会在DOM被挂载时进行回调，这个函数会传入一个 元素对象，自己保存
// 使用时，直接拿到之前保存的元素对象即可

//#endregion

//#region ref的使用例子
// class App extends PureComponent {
//   constructor(props) {
//     super(props)

//     //ref传入对象的创建
//     this.titleRef = createRef()
//     //ref传入的函数 会在DOM被挂载时进行回调, 保存该函数所传入的一个元素对象
//     this.titleEl = null
//   }

//   render() {
//     return (
//       <div>
//         <h2 ref="title">字符串</h2>

//         {/* 为 DOM 元素添加 ref */}
//         {/* React 会在组件挂载时给 current 属性传入 DOM 元素，并在组件卸载时传入 null 值 */}
//         {/* ref 会在 componentDidMount 或 componentDidUpdate 生命周期钩子触发前更新 */}
//         <h2 ref={this.titleRef} >对象</h2>

//         {/* {使用 ref 回调函数} */}
//         {/* {React 将在组件挂载时，会调用 ref 回调函数并传入 DOM 元素,当卸载时调用它并传入 null} */}
//         {/* {在 componentDidMount 或 componentDidUpdate 触发前，React 会保证 refs 一定是最新的} */}
//         <h2 ref = {element => this.titleEl = element}>函数</h2>

//         <button onClick = {e => this.changeText()}> 改变文本 </button>
//       </div>
//     )
//   }
//   changeText() {
//     this.refs.title.innerHTML = "system n.系统"
//     console.log(this.titleRef)
//     this.titleRef.current.innerHTML = "systematic adj.系统的"
//     this.titleEl.innerHTML = "bridge n.桥"
//     console.log(this.titleEl)
//   }
// }
//#endregion

//#region refs的使用  1.2 ref节点的类型

//ref 的值根据节点的类型而有所不同
// 当 ref 属性用于 HTML 元素时，构造函数中使用 React.createRef() 创建的 ref 接收底层 DOM 元素作为其 current 属性
// 当 ref 属性用于自定义 class 组件时，ref 对象接收组件的挂载实例作为其 current 属性
// 不能在函数组件上使用 ref 属性，因为他们没有实例

// 函数式组件是没有实例的，所以无法通过ref获取他们的实例：
// 但是某些时候，我们可能想要获取函数式组件中的某个DOM元素；
// 这个时候我们可以通过 React.forwardRef ，后面我们也会学习 hooks 中如何使用ref；

//#endregion

//#region ref引用一个class组件对象例子
class Counter extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
  }

  render() {
    return (
      <div>
        <h2>当前计数: {this.state.counter}</h2>
        <button onClick={(e) => this.increment()}>Counter +1</button>
      </div>
    );
  }

  increment() {
    this.setState({
      counter: this.state.counter + 1,
    });
  }
}

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.counterRef = createRef();
  }

  render() {
    return (
      <div>
        <Counter ref={this.counterRef} />
        <button onClick={(e) => this.increment()}>App +1</button>
      </div>
    );
  }

  increment() {
    this.counterRef.current.increment();
    // 当 ref 属性用于自定义 class 组件时，ref 对象接收组件的挂载实例 (Counter) 作为其 current 属性
    console.log(this.counterRef);
  }
}

//#endregion

ReactDOM.render(<App />, document.getElementById("app"));
