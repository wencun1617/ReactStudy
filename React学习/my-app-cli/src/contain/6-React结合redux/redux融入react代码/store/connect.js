import React, { PureComponent } from 'react'
// import store from './store';

// if 将connect 封装成一个独立的库，那么依赖的用于创建的store直接写入connect源码不合适
// 便是 store 与 connect 的耦合度太强,需解耦  ---->  store的context处理
import { StoreContext } from './context';

// 自定义connect函数 ---> 把两个组件重复的代码抽离出来
// 重复的代码 The reasons are as follows
// 比如监听store数据改变(然后更新this.state)的代码，都需要在 componentDidMount中完成;
// 比如触发事件去派发action(去修改state)，都需要先拿到 store， 在调用其 dispatch 等；

// connect函数本身接受两个参数：
// 参数一：里面存放 component 希望使用到的 State 属性；---> 实际是个函数,根据 实参store.getState() 进而得到希望使用的 state属性, 再以对象形式返回
// 参数二：里面存放 component 希望使用到的 dispatch动作；---> 实际是个函数,传入store.dispatch函数作为实参
function connect(mapStateToProps, mapDispatchToProps) {
  
  // connect函数返回一个高阶组件
  return function handleMapCpn(WrappedComponent) {

    class ConnectCpn extends PureComponent {
      // 在constructor中的state中保存一下 需要获取的状态(希望使用到的 State 属性)
      // constructor中直接使用第二个参数即可
      constructor(props, context) {
        super(props);

        this.state = {

          // const mapStateToProps = state => {
          //   return {
          //     counter: state.counter
          //   }
          // }
          // mapStateToProps({ counter: 0, example: '温存' })  <==> {counter: 0}
          storeState: mapStateToProps(context.getState())
        }
      }

      // 在componentDidMount中订阅store中数据的变化，并且执行 setState操作；
      componentDidMount() {
        // 可以在派发action之前，监听store的变化 (提前知道怎么变化)
        // store.subscribe(() => {
        //   console.log(store.getState());
        // })
        this.unsubscribe = this.context.subscribe(() => {
          this.setState({
            storeState: mapStateToProps(this.context.getState())
          })
        })
      }

      // 在componentWillUnmount中需要取消订阅；
      componentWillUnmount() {
        this.unsubscribe();
      }

      // 在render函数中返回传入的WrappedComponent，并且将所有的状态映射到其props中；
      render() {
        // 把上面的this.state,componentDidMount啥的都去掉,直接传props参数过去,home里点击后,公共counter是改变了,但页面不刷新
        return <WrappedComponent {...this.props} 
                                 {...this.state.storeState}
                                 {...mapDispatchToProps(this.context.dispatch)}/>
      }
    }
    // 订阅单一 context
    ConnectCpn.contextType = StoreContext;
    // 自定义Context标签名
    ConnectCpn.displayName = 'ConnectCpnn'

    return ConnectCpn
  }
}

export default connect