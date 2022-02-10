import React, { useState, useMemo } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);

  // 没有使用 useMemo，即使是更新 total, countToString 也会重新计算
  const countToString = (() => {
    console.log(
      "没有使用 useMemo，即使是更新 total, countToString 也会重新计算"
    );
    return count.toString();
  })();

  //  --------------------------------------------------------------------------------------------
  
  // 使用了 useMemo, 只有 total 改变，才会重新计算
  // 把“创建”函数和依赖项数组作为参数传入 useMemo，
  // 它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。

  // 记住，传入 useMemo 的函数会在渲染期间执行。
  // 请不要在这个函数内部执行与渲染无关的操作，诸如副作用这类的操作属于 useEffect 的适用范畴，而不是 useMemo。

  // 如果没有提供依赖项数组，useMemo 在每次渲染时都会计算新的值。
  const totalToStringByMemo = useMemo(() => {
    console.log("使用了 useMemo, 只有 total 改变，才会重新计算");
    return total + "";
  }, [total]);

  return (
    <>
      <h3>countToString: {countToString}</h3>
      <h3>countToString: {totalToStringByMemo}</h3>
      <button
        onClick={() => {
          setCount((count) => count + 1);
        }}
      >
        Add Count
      </button>
      <br />
      <button
        onClick={() => {
          setTotal((total) => total + 1);
        }}
        style={{ marginTop: "20px" }}
      >
        Add Total
      </button>
    </>
  );
}
