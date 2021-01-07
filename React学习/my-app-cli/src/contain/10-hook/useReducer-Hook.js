import React,{ useReducer} from 'react'

// const [state, dispatch] = useReducer(reducer, initialArg, init);
// 接收一个形如 (state, action) => newState 的 reducer，并返回当前的 state 以及与其配套的 dispatch 方法

// 两种不同的初始化useReducer state 的方式
  // 1. 指定初始的state, 将初始的state作为第二个参数传入useReducer
  // 2. 惰性初始化
    // 需要将 init 函数作为 useReducer 的第三个参数传入，这样初始 state 将被设置为 init(initialArg)
    // 如此可以将用于计算 state 的逻辑提取到 reducer 外部，这也为将来对重置 state 的 action 做处理提供了便利

function init(initVarious) {
  return {
    count: initVarious,
    name: '温存'
  };
}

function reducer(state,action) {
  //state会自动传入,便是init(initialCount)  惰性初始化
  console.log("test",state)
  switch(action.type) {
    case 'increment':
      return {count: state.count + 1, name: '温存'};
    case 'decrement':
      return {count: state.count - 1, name: '温存'};
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}

export default function CountHook({initialCount}) { //直接解构变量

  // useReducer 相当于根据 reducer创建store  ---> const store = redux.createStore(reducer); 
  // 且不使用state = initialCount 这一由 Redux推广开来的参数约定(既 reducer 不自带初始的state)
  // 而是在调用hook时指定(之后自动传入)
  const [state, dispatch] = useReducer(reducer, initialCount, init);

  return (
    <>
      <div>Count: {state.count}</div>
      <button
        onClick={() => dispatch({type: 'reset', payload: initialCount})}>
        Reset
      </button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  )
}