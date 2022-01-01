import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom'

// 高阶函数的维基百科定义: 至少满足以下条件之一:
// 接受一个或多个函数作为输入;
// 输出一个函数;

// 高阶组件 ---> Higher-Order Components，简称为 HOC
// 官方的定义: 高阶组件是参数为组件，返回值为新组件的函数  --->  高阶组件 本身是一个函数:其次，这个函数的参数是一个组件，返回值也是一个组件

//---------------------------------------------------------------------------------------------------------------

// 高阶组件并不是 React API 的一部分，它是 基于React的组合特性 而形成的 设计模式 ；
// 高阶组件在一些React第三方库中非常常见:
// 比如redux中的connect
// 比如react-router中的withRouter

// 高阶组件的调用过程类似于这样
// const EnhancedComponent = higherOrderComponent(WrappedComponent);

// 高阶组件的编写过程类似于这样
function higherOrderComponent(WrapperComponent) {

  //#region  ES6中，类表达式中类名是可以省略的
  // NewComponent可省略
  // 原来的 NewComponent标签名 便变为 PureComponent
  // return class extends PureComponent {
  //   render() {
  //     return <WrapperComponent/>
  //   }
  // }
  //#endregion

  // return <WrapperComponent/>
  // 没包裹一层组件,万一传进来的不是组件,就凉了?
  class NewComponent extends PureComponent {
    render() {
      return <WrapperComponent/>
    }
  }

  // 组件的名称都可以通过displayName来修改 (规范要大写开头哦)
  NewComponent.displayName = 'New'
  return NewComponent
}

class App extends PureComponent {
  render() {
    return (
      <div>
        App
      </div>
    )
  }
}

//高阶组件的调用过程
const Example = higherOrderComponent(App)

ReactDOM.render(<Example/>,document.getElementById('app'))