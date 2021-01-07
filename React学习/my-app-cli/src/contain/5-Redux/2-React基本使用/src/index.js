const redux = require('redux');

//#region 1. 创建一个对象，作为要保存的状态：
  const initialState = {
    counter: 0
  }
//#endregion

//#region 2.创建reducer
    // reducer是一个纯函数 (不需要直接修改state,否则会带来问题)
    // reducer做的事情就是将传入的state和action结合起来生成一个新的state

  // 根据reducer创建store,  action不用传到reducer, 派发action(store.dispatch)的时候 便是默认传入了
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "INCREMENT":
        return {...state, counter: state.counter + 1};
      case "DECREMENT":
        return {...state, counter: state.counter - 1};
      case "ADD_NUMBER":
        return {...state, counter: state.counter + action.number}
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
  console.log("11",store.getState());

  // 可以在派发action之前，监听store的变化 (提前知道怎么变化)
  store.subscribe(() => {
    console.log("22",store.getState());
  })
//#endregion
  
//#region 4.通过action(store.dispatch派发action) 来修改state  ---> 修改store中存储的state
  //Redux要求通过action来更新数据：
    // 所有数据的变化，必须通过派发（dispatch）action来更新；---> 通过dispatch来派发action；
    // action是一个普通的JavaScript对象，用来描述这次更新的type和content；---> 通常action中都会有type属性，也可以携带其他的数据；
  store.dispatch({
    type: "INCREMENT"
  })
  // 通过 store.getState 来获取当前的state
  console.log("INCREMENT",store.getState());

  store.dispatch({
    type: "DECREMENT"
  })
  console.log("DECREMENT",store.getState());

  store.dispatch({
    type: "ADD_NUMBER",
    number: 5
  })
  console.log("ADD_NUMBER",store.getState());
//#endregion