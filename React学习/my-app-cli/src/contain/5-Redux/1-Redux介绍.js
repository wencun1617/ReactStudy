import React from 'react'
import {Button} from "antd"
//#region JavaScript纯函数
  // 函数式编程中有一个概念叫纯函数，JavaScript符合函数式编程的范式，所以也有纯函数的概念
  // 纯函数的维基百科定义:
    //在程序设计中，若一个函数符合以下条件，那么这个函数被称为纯函数
      // 此函数在相同的输入值时，需产生相同的输出。函数的输出 和输入值以外的其他隐藏信息或状态无关，也和由I/O设备产生的外部输出无关。 ---> 确定的输入，一定会产生确定的输出
      // 该函数不能有语义上可观察的函数副作用，诸如“触发事件”，使输出设备输出，或更改输出值以外物件的内容等  ---> 函数在执行过程中，不能产生副作用
  
  // 纯函数在函数式编程中非常重要
    // 1. 可以安心的写和安心的用
    // 2. 写的时候保证了函数的纯度，只要实现自己的业务逻辑即可，不需要关心传入的内容或者依赖其他的外部变量
    // 3. 用的时候，确定输入内容不会被任意篡改，并且自己确定的输入，一定会有确定的输出
//#endregion

// React中就要求无论是函数还是class声明一个组件，这个组件都必须像纯函数一样，保护它们的props不被修改
// React非常灵活,但有一个严格的规则 ----> 所有组件都必须像纯函数一样保护它们的 props 不被修改
// redux中，reducer也被要求是一个纯函数。

//#region 认识Redux
// React是在视图层帮助解决了DOM的渲染过程，但是State依然是留给自己来管理
  // 无论是组件定义自己的state，还是组件之间的通信通过props进行传递；也包括通过Context进行数据之间的共享
  // React主要负责帮助我们管理视图，state如何维护最终还是我们自己来决定
  // UI = Render(state)

// Redux就是一个帮助管理State的容器：Redux是JavaScript的状态容器，提供了可预测的状态管理
// Redux除了和React一起使用之外，它也可以和其他界面库一起来使用（比如Vue），并且它非常小（包括依赖在内，只有2kb）

//#endregion

// Redux要求通过action来更新数据：
// 所有数据的变化，必须通过派发（dispatch）action来更新；
// action是一个普通的JavaScript对象，用来描述这次更新的type和content；

// 强制使用action的好处是可以清晰的知道数据到底发生了什么样的变化，所有的数据变化都是可跟追、可预测的；
// reducer是一个纯函数；
// reducer做的事情就是将传入的state和action结合起来生成一个新的state；

//#region 例子
class ReduxTest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      friends: [
        { name: "why", age: 18 },
        { name: "kobe", age: 40 },
        { name: "lilei", age: 30 },
      ],
      test1: '111',
      test2: '222'
    }
  }
  render() {
    return(
      <>
      <Button type="primary" onClick={e => this.btnClick()}>按钮</Button>
      </>
    )
    
  }

  btnClick() {
    console.log('点击了按钮')
    // 目前的action是固定的对象，真实应用中，会通过函数来定义，返回一个action
    const action1 = { type: "ADD_FRIEND", info: { name: "lucy", age: 20 } }
    const action2 = { type: "INC_AGE", index: 0 }
    const action3 = { type: "CHANGE_NAME", playload: { index: 0, newName: "coderwhy" } }

    const aa1 = this.reducer(this.state,action1)
    console.log("ADD_FRIEND",aa1)
    const aa2 = this.reducer(this.state,action2)
    console.log("INC_AGE",aa2)
    const aa3 = this.reducer(this.state,action3)
    console.log("CHANGE_NAME",aa3)
  }

  // 将传入的state和action结合起来生成一个新的state
  reducer(state, action) {
    console.log("调用了reducer",action)
    switch (action.type) {
      case "ADD_FRIEND":
        return { ...state, friends: [...state.friends, action.info] }
      case "INC_AGE":
        return {
          ...state, friends: state.friends.map((item, index) => {
            if (index === action.index) {
              return { ...item, age: item.age + 1 }
            }
            return item;
          })
        }
      case "CHANGE_NAME":
        return {
          ...state, friends: state.friends.map((item, index) => {
            if (index === action.playload.index) {
              return { ...item, name: action.playload.newName }
            }
            return item;
          })
        }
      default:
        return state;
    }
  }


}
export default ReduxTest
//#endregion

//#region  redux的三大原则

// 单一数据源
  // 整个应用程序的state被存储在一颗object tree中，并且这个object tree只存储在一个 store 中：
    // Redux并没有强制不能创建多个Store，但是那样做并不利于数据的维护；
    // 单一的数据源可以让整个应用程序的state变得方便维护、追踪、修改

// State是只读的
  // 唯一修改State的方法一定是触发action，不要试图在其他地方通过任何的方式来修改State
    // 这样就确保了View或网络请求都不能直接修改state，它们只能通过action来描述自己想要如何修改state
    // 这样可以保证所有的修改都被集中化处理，并且按照严格的顺序来执行，所以不需要担心race condition（竟态）的问题

// 使用纯函数来执行修改
  // 通过reducer将 旧state和 actions联系在一起，并且返回一个新的State
    // 随着应用程序的复杂度增加，我们可以将reducer拆分成多个小的reducers，分别操作不同state tree的一部分；
    // 但是所有的reducer都应该是纯函数，不能产生任何的副作用
//#endregion