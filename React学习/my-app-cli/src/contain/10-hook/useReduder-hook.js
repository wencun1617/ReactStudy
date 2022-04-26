// const [state, dispatch] = useReducer(reducer, initialArg, init);
// useReducer 一般配合 context 使用

// 两种不同初始化 useReducer state 的方式

//#region 1. 指定初始 state

// 将初始 state 作为第二个参数传入 useReducer 是最简单的方法
// const [state, dispatch] = useReducer(reducer, { count: initialCount });

//#endregion

//#region 2. 惰性初始化

// const [state, dispatch] = useReducer(reducer, initialArg, init);
// 选择惰性地创建初始 state。为此，需要将 init 函数作为 useReducer 的第三个参数传入，
// 这样初始 state 将被设置为 init(initialArg)。

// 这么做可以将用于计算 state 的逻辑提取到 reducer 外部，这也为将来对重置 state 的 action 做处理提供了便利：
import React,{useReducer} from "react"

function init(initialCount) {
  return { count: initialCount, elseParams: [] };
}

function reducer(state, action) {
  let { type, value } = action;
  switch (type) {
    case "increment":
      return { ...state, count: state.count + value };
    case "decrement":
      return { ...state, count: state.count - value };
    case "reset":
      return init(value);
    default:
      return state;
  }
}

export default function Counter({initialCount}) {
    const [state, dispatch] = useReducer(reducer,initialCount,init)
    return <>
        <h5>Couter: {state.count}</h5>
        <button onClick={() => dispatch({type: "increment",value: 5})}>+5</button>
        <button onClick={() => dispatch({type: "decrement", value: 5})}>-5</button>
        <button onClick={() => dispatch({type: "reset", value:0})}>重置</button>
    </>
}
//#endregion
