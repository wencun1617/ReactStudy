import React, { PureComponent } from "react";

import {
  addAction,
  // changeBannersAction,
  // changeRecommendsAction,
  getHomeMultidataAction,
} from "../store/actionCreators"; // 函数, 接收实参后返回 store.dispatch的对象参数

// 将之前使用的connect函数，换成react-redux的connect函数；
import { connect } from "react-redux";

// 组件中异步请求
// import axios from 'axios'

class MidNewHome extends PureComponent {
  componentDidMount() {
    //#region  缺陷: 将网络请求的异步代码放到组件的生命周期中来完成
    // 事实上,网络请求到的数据也属于状态管理的一部分，更好的一种方式应该是将其也交给redux来管理
    // axios.get("http://123.207.32.32:8000/home/multidata").then(res => {
    //   const data = res.data.data;
    //   this.props.changeBanners(data.banner.list);
    //   this.props.changeRecommends(data.recommend.list);
    // })
    //#endregion

    //#region  在redux中进行异步的操作   ---> 中间件（Middleware）
    // redux也引入了中间件（Middleware）的概念,
    // 这个中间件的目的是在dispatch的action和最终达到的reducer之间，扩展一些自己的代码 eg: 比如日志记录、调用异步接口、添加代码调试功能...

    // 现在要做的事情就是发送异步的网络请求，所以可以添加对应的中间件
    // 这里官网推荐的、包括演示的网络请求的中间件是使用 redux-thunk
    // redux-thunk如何做到让我们可以发送异步的请求
    // 默认情况下的dispatch(action)，action需要是一个JavaScript的对象
    // redux-thunk让dispatch(action函数),action可以是一个函数
    // 该函数会被调用，并且会传给这个函数一个dispatch函数和getState函数；
    // dispatch函数用于我们之后再次派发action；
    // getState函数考虑到之后的一些操作需要依赖原来的状态，用于可以获取之前的一些状态；

    //#endregion

    this.props.getHomeMultidata();
    console.log(this.props.getHomeMultidata, "pppppppppppppppppppppppppp");
  }

  render() {
    return (
      <div>
        <h3>MidNewHome</h3>
        <h4>当前计数: {this.props.counter}</h4>
        <button onClick={(e) => this.increment()}>+1</button>
        <button onClick={(e) => this.addCounter()}>+5</button>
      </div>
    );
  }

  increment() {
    // 调用传过来的函数, addNumber
    // 会回到高阶组件去执行(在传递给WrappedComponent参数那里),便是通过action(store.dispatch派发action) 来修改state
    // 之后高阶组件返回的class组件里便会进行相应的操作, 最后更改完的新props便会再传进来
    this.props.addNumber(1);
  }

  addCounter() {
    this.props.addNumber(5);
  }
}

// 在MidNewHome和props文件中,按照需要的state、dispatch来进行映射
// 有了connect函数,只需要关心从state和dispatch中映射自己需要的状态和行为即可

// 函数, 根据 实参store.getState() 进而得到希望使用的 state属性, 再以对象形式返回
// [mapStateToProps：用于将state映射到一个对象中，对象中包含我们需要的属性]
const mapStateToProps = (state) => {
  return {
    counter: state.counterInfo.counter,
  };
};

// 在connect函数返回的高阶组件render里,传实参store.dispatch后,返回一个对象
// 返回对象里面的属性(在connect函数里解构后)便会通过props去传递给子组件, 对象的属性的值均为函数
// 调用addNumber函数便是 --->  通过action(store.dispatch派发action) 来修改state
// [mapDispatchToProps：用于将dispatch映射到对象中，对象中包含在组件中可能操作的函数(addNumber)；当调用该函数时，本质上其实是调用dispatch(派发对应的Action)]
const mapDispatchToProps = (dispatch) => {
  return {
    addNumber(number) {
      // dispatch <==> store.dispatch 为函数,
      // addAction(number) 也是函数, 接收实参后返回 store.dispatch的对象参数
      dispatch(addAction(number));
    },

    //#region 组件中发送网络请求使用的
    // changeBanners(banners) {
    //   dispatch(changeBannersAction(banners))
    // },
    // changeRecommends(recommends) {
    //   dispatch(changeRecommendsAction(recommends))
    // }

    //#endregion

    getHomeMultidata() {
      
      // 中间件的作用: 通过改变dispatch方法改变数据流, 所以使用enhancer对createstore方法进行装饰
      // getHomeMultidataAction返回的action是个函数,且会传给这个函数一个dispatch函数和getState函数
      // 在此函数里进行异步请求
      // dispatch函数用于我们再次派发action  --> 此时的action(new)便是对象,里面存放类型和请求过来的数据
      // getState函数考虑到我们之后的一些操作需要依赖原来的状态，用于让我们可以获取之前的一些状态；

      // ...mapDispatchToProps(this.context.dispatch)
      dispatch(getHomeMultidataAction());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MidNewHome);
