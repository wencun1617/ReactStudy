// 必须导入
import React from 'react'

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

export default Hello