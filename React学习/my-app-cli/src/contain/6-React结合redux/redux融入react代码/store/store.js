const redux = require('redux');

//#region 1. 创建一个对象，作为要保存的状态：
const initialState = {
  counter: 0,
  example: '温存'
}
//#endregion

//#region 2.创建reducer
    // reducer是一个纯函数 (不需要直接修改state,否则会带来问题)
    // reducer做的事情就是将传入的state和action结合起来生成一个新的state返回

  // 根据reducer创建store,  action不用传到reducer, 派发action(store.dispatch)的时候 便是默认传入了
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_NUMBER":
        return {...state, counter: state.counter + action.num};
      case "SUB_NUMBER":
        return {...state, counter: state.counter - action.num};
      default: 
        return state;
    }
  }
//#endregion


//#region 3.根据reducer创建store --> 来存储这个state
    //3.1 创建store时必须先创建reducer  ----> 根据reducer创建store
    //3.2 可以通过 store.getState 来获取当前的state 

  // 根据reducer创建store
  const store = redux.createStore(reducer);

  // 通过 store.getState 来获取当前的state
  // console.log("11",store.getState());

  // 可以在派发action之前，监听store的变化 (提前知道怎么变化)
  // store.subscribe(() => {
  //   console.log("22",store.getState());
  // })

//#endregion

export default store