import React,{useState} from 'react'
export default function TsetuseState() {
    const [count, setCount] = useState(0);
    function handleClick() {
      setTimeout(() => {
        setCount(count + 1)
      }, 3000);
    }
    function handleClickFn() {
      setTimeout(() => {
        setCount((prevCount) => {
          return prevCount + 1
        })
      }, 3000);
    }
    return (
      <>
        Count: {count}
        <br/>
        普通更新：<button onClick={handleClick}>+</button>
        <br/>
        函数式更新：
        <button onClick={handleClickFn}>+</button>
      </>
    );
  }