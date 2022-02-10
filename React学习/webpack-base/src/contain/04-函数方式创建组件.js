import React from 'react'
import ReactDOM from 'react-dom'


//#region 
  /*
    1.  react框架调用的函数
    2.  函数里面的this不是window,是underfine的, babel翻译后开启了严格模式, 禁止了自定义函数的this指向window
    3. 执行ReactDOM.render()之后发生了什么
        (1) React解析组件标签，搜寻相关的组件找不到就报错了
        (2) 发现组件是使用函数定义的, 随后调用该组件，将返回的虚拟DOM，转为真实DOM，显示到视图
  */
//#endregion


//方法一 创建组件的方式
//React component 开头必须是大写
function Hello(props) {
  // 返回null 表示组件为空
  // return null

  console.log(props)
  // props.name = '温存'  报错 read-only  
  // Vue和React,组件中的props永远都是只读的，不允许被重新赋值
  let testDiv =<div>
    函数形式创建组件
    <hr/>
    {props.name}
    <hr/>
    {props.action}
  </div>
  
  //返回一个合法的 jsx 虚拟DOM元素
  return testDiv
}

let word = {
  name: 'variable',
  action: 'procedure'
}

let mydiv = <div>
  123
  {/* 父子组件通信 父传子 props*/}
  {/* <Hello name={word.name} action={word.action}></Hello> */}
  <Hello {...word}></Hello>
</div>

//使用render函数进行渲染
let divApp = document.getElementById('app')


ReactDOM.render(mydiv,divApp)