import React from 'react'
import ReactDOM from 'react-dom'

import Hello from '@/components/Hello' //函数方式创建组件  不做配置jsx后缀名不可以省略

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