import React, { PureComponent } from 'react';

import {addAction} from '../store/actionCreators'; // 函数, 接收实参后返回 store.dispatch的对象参数
import connect from '../store/connect'   // connect 函数

class Home extends PureComponent {

  // 自己组件的this.state 里便没有必要放公共使用 state属性

  render() {
    return (
      <div>
        <h1>Home</h1>
        <h2>当前计数: {this.props.counter}</h2>
        <button onClick={e => this.increment()}>+1</button>
        <button onClick={e => this.addCounter()}>+5</button>
      </div> 
    )
  }

  increment() {
    // 调用传过来的函数, addNumber
    // 会回到高阶组件去执行(在传递给WrappedComponent参数那里),便是通过action(store.dispatch派发action) 来修改state
    // 之后高阶组件返回的class组件里便会进行相应的操作, 最后更改完的新props便会再传进来
    this.props.addNumber(1)
  }

  addCounter() {
    this.props.addNumber(5)
  }
}

// 在home和props文件中,按照需要的state、dispatch来进行映射
// 有了connect函数,只需要关心从state和dispatch中映射自己需要的状态和行为即可

// 函数, 根据 实参store.getState() 进而得到希望使用的 state属性, 再以对象形式返回
// [mapStateToProps：用于将state映射到一个对象中，对象中包含我们需要的属性]
const mapStateToProps = state => {
  return {
    counter: state.counter
  }
}

// 返回一个对象, 对象的属性 addNumber 的值为函数
// 调用addNumber函数便是 --->  通过action(store.dispatch派发action) 来修改state 
// [mapDispatchToProps：用于将dispatch映射到对象中，对象中包含在组件中可能操作的函数(addNumber)；当调用该函数时，本质上其实是调用dispatch(派发对应的Action)]
const mapDispatchToProps = dispatch => {
  return {
    addNumber: function(number) {
      // dispatch <==> store.dispatch 为函数,
      // addAction(number) 也是函数, 接收实参后返回 store.dispatch的对象参数
      dispatch(addAction(number));
    }

    // addNumber(number) {
    //   dispatch(addAction(number));
    // }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);