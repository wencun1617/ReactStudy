import React, { PureComponent } from 'react';

import {subAction} from '../store/actionCreators'; // 函数, 接收实参后返回 store.dispatch的对象参数
import connect from '../store/connect'   // connect 函数

class Profile extends PureComponent {

  render() {
    return (
      <div>
        <h1>Profile</h1>
        <h2>计数: {this.props.counter}</h2>
        <button onClick={e => this.decrease()}>-1</button>
        <button onClick={e => this.subtractCounter()}>-5</button>
      </div> 
    )
  }

  decrease() {
    // 调用传过来的函数, addNumber
    // 会回到高阶组件去执行(在传递给WrappedComponent参数那里),便是通过action(store.dispatch派发action) 来修改state
    // 之后高阶组件返回的class组件里便会进行相应的操作, 最后更改完的新props便会再传进来
    this.props.subtractNumber(1)
  }

  subtractCounter() {
    this.props.subtractNumber(5)
  }
}

// 函数, 根据 实参store.getState() 进而得到希望使用的 state属性, 再以对象形式返回
const mapStateToProps = state => {
  return {
    counter: state.counter
  }
}

// 返回一个对象, 对象的属性 addNumber 的值为函数
// 调用addNumber函数便是 --->  通过action(store.dispatch派发action) 来修改state 
const mapDispatchToProps = dispatch => {
  return {
    subtractNumber: function(number) {
      // dispatch <==> store.dispatch 为函数,
      // addAction(number) 也是函数, 接收实参后返回 store.dispatch的对象参数
      dispatch(subAction(number));
    }

    // addNumber(number) {
    //   dispatch(addAction(number));
    // }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);