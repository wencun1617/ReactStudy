import React, { PureComponent } from 'react';

import {subAction} from '../store/actionCreators'; // 函数, 接收实参后返回 store.dispatch的对象参数
// import connect from '../store/connect'   // connect 函数

// 将之前使用的connect函数，换成react-redux的connect函数；
import { connect } from "react-redux";

class MidNewProfile extends PureComponent {

  render() {
    return (
      <div>
        <h3>MidNewProfile</h3>
        <h4>计数: {this.props.counter}</h4>
        <button onClick={e => this.decrease()}>-1</button>
        <button onClick={e => this.subtractCounter()}>-5</button>
        {this.props.banners !== undefined && this.props.banners.length !== 0 && (
          <>
            <h3>Banners</h3>
            <ul>
              {
                this.props.banners.map((item, index) => {
                  return <li key={item.acm}>{item.title}</li>
                })
              }
            </ul>
          </>
        )}
        {this.props.recommends !== undefined && this.props.recommends.length !== 0 && (
          <>
            <h3>Recommends</h3>
            <ul>
              {
                this.props.recommends.map((item, index) => {
                  return <li key={item.acm}>{item.title}</li>
                })
              }
            </ul>
          </>
        )}   
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
    counter: state.counterInfo.counter,
    banners: state.homeInfo.banners,
    recommends: state.homeInfo.recommends
  }
}

// 返回一个对象, 对象的属性 addNumber 的值为函数
// 调用addNumber函数便是 --->  通过action(store.dispatch派发action) 来修改state 
const mapDispatchToProps = dispatch => {
  return {
    subtractNumber(number) {
      // dispatch <==> store.dispatch 为函数,
      // addAction(number) 也是函数, 接收实参后返回 store.dispatch的对象参数
      dispatch(subAction(number));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MidNewProfile);