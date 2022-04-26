import React, { useCallback, useState, useEffect, } from "react";

// 函数式组件一变就会全部重新渲染  使用 useMemo, useCallback 来进行缓存性能优化
// 此处的重新创建指的是整个 TestuseCallback 函数式组件重新创建(所包含的东西若没有缓存，便是全部重新创建) ？？？
export default function TestuseCallback() {
  const [count, setCount] = useState(0);

  // 不缓存，每次 count 更新时都会重新创建
  const handleCountAdd = () => {
    //将 handleCountAdd 传递给子组件，子组件件进行回调
    // console.log("没有缓存，每次 count 更新时都会重新创建，表现为Child中的useEffect频繁触发,依赖项(countAdd)");
    console.log("handleCountAdd调用")
    setCount(count + 1);
  };

  // 使用 useCallBack 缓存
//   父组件更新时，通过props传递给子组件的函数也会重新创建，然后这个时候使用 useCallBack 就可以缓存函数不使它重新创建
  const handleCountAddByCallBack = useCallback(() => {
    // console.log("缓存，每次 count 更新时不会重新创建, 表现为Child中的useEffect没有触发,依赖项(countAddByCallback)");
    console.log("handleCountAddByCallBack调用")
    setCount((count) => count + 1); // 函数式更新
  }, []);

  return (
    <div>
      <h3> Child count : {count}</h3>
      <Child
        countAdd={handleCountAdd}
        countAddByCallback={handleCountAddByCallBack}
      />
    </div>
  );
}


// 如果你的组件在相同 props 的情况下渲染相同的结果，那么你可以通过将其包装在 React.memo 中调用，
//以此通过记忆组件渲染结果的方式来提高组件的性能表现。
// 这意味着在这种情况下，React 将跳过渲染组件的操作并直接复用最近一次渲染的结果。

// React.memo 仅检查 props 变更。
// 如果函数组件被 React.memo 包裹，且其实现中拥有 useState，useReducer 或 useContext 的 Hook，
// 当 state 或 context 发生变化时，它仍会重新渲染。

// 默认情况下其只会对复杂对象做浅层对比，如果你想要控制对比过程，那么请将自定义的比较函数通过第二个参数传入来实现。
const Child = React.memo(function (props) {
  const { countAdd, countAddByCallback } = props;

  console.log("Child渲染")

  // 没有缓存，由于每次都创建，memo 认为两次地址都不同，属于不同的函数，所以会触发 useEffect
  // 性能优化，只有数组里的countAdd发生变化时，才会执行effect(传入的回调函数)
  useEffect(() => {
    console.log("effect依赖的 countAdd 发生变化 effect便会被调用(没有缓存的方法)")
  }, [countAdd]);

  //  有缓存，memo 判定两次地址都相同，所以不触发 useEffect
  // 性能优化，只有数组里的countAddByCallback发生变化时，才会执行effect(传入的回调函数)
  useEffect(() => {
    console.log("effect依赖的 countAddByCallback 发生变化 effect便会被调用(缓存的方法)")
  }, [countAddByCallback]);

  return (
    <div>
      <h5> countAdd -- 没有性能优化的更改count</h5>
      <button onClick={props.countAdd}>+1</button>

      <hr />

      <h5> countAddByCallback -- 性能优化的更改count</h5>
      <button onClick={props.countAddByCallback}>+1</button>
    </div>
  );
})
