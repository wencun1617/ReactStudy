import reduxThunk from "redux-thunk"; // 引入中间件(Middleware), 使得redux中可以发送异步的网络请求
import reduxPromise from "redux-promise";
// import createSagaMiddleware from 'redux-saga'; // 集成redux-saga中间件
import { createStore, applyMiddleware, combineReducers } from "redux"; // compose
// import mySaga from './saga';

import {composeWithDevTools} from 'redux-devtools-extension'

import counterReducer from "./reducer/counter";
import homeReducer from "./reducer/home";

// applyMiddleware 像 vue.install

//#region redux 的 combineReducers辅助函数
// 随着应用变得复杂,需对reducer 函数进行拆分,拆分后的每一块独立负责管理state的一部分
// combineReducers 辅助函数的作用是, 把一个 由多个不同reducer(独立分管部分state) 作为value的object,合并成一个最终的reducer函数后返回
// 合并后的reducer 可以调用各个子reducer, 并把他们的结果合并成一个state对象。state对象的结构由传入的多个reducer的key决定, (该state便是整个项目最终的)

// combineReducers使得可以拥有多个reducer,同时保持各自负责逻辑块的独立性
// 参数
// reducers (Object): 一个对象,它的值(value)对应不同的reducer函数，这些reducer函数会合并成一个最终的reducer函数后返回。
// 返回值
// (Function)：一个调用reducers对象里所有reducer的reducer(最终)，并且构造一个与reducers对象结构相同的state对象(该state便是整个项目最终的)
//在 reducer 层级的任何一级都可以调用 combineReducers。并不是一定要在最外层。实际上，你可以把一些复杂的子 reducer 拆分成单独的孙子级 reducer，甚至更多层

// 事实上，combineReducers 是将传入的reducers合并到一个对象中，最终返回一个combination的函数（相当于我们之前的reducer函数了）；
// 在执行combination函数的过程中，它会通过判断前后返回的数据是否相同来决定返回之前的state还是新的state；
// 新的state会触发订阅者发生对应的刷新，而旧的state可以有效的阻止订阅者发生刷新
//#endregion

//#region 2.创建reducer
// reducer是一个纯函数 (不需要直接修改state,否则会带来问题)
// reducer做的事情就是将传入的state和action结合起来生成一个新的state返回

// 根据reducer创建store,  action不用传到reducer, 派发action(store.dispatch)的时候 便是默认传入了
const reducer = combineReducers({
  counterInfo: counterReducer,
  homeInfo: homeReducer,
});
//#endregion

//#region 3.根据reducer创建store --> 来存储这个state
//3.1 创建store时必须先创建reducer  ----> 根据reducer创建store
//3.2 可以通过 store.getState 来获取当前的state

// // 通过createSagaMiddleware函数来创建saga中间件
// const sagaMiddleware = createSagaMiddleware();

//redux-Devtools扩展所需  // trace打开 写法一
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({trace: true}) || compose;

// 通过applyMiddleware来结合多个Middleware, 返回一个enhancer
// applyMiddleware <==>  vue.install
// enhancer 增强
// const enhancer = composeEnhancers(applyMiddleware(reduxThunk));

// 根据reducer函数创建store
// 在创建store时传入应用了middleware的enhance函数
// 将enhancer作为第二个参数传入到createStore中
// 中间件(增强器)的作用: 通过改变dispatch方法改变数据流, 所以使用enhancer对createstore方法进行装饰
// const store = createStore(reducer, enhancer);

// 写法二
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(reduxThunk,reduxPromise))
);

// composeWithDevTools

// // 必须启动saga中间件，并且传入其要监听的generator(发电机,电力公司,发生器)
// sagaMiddleware.run(mySaga);
//#endregion

export default store;
