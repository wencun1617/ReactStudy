import React from 'react'
import ReactDOM from 'react-dom'

// import '@/contain/10-两种创建组件方式的对比'
// import '@/contain/03-2-jsx事件监听-事件参数传递'
// import '@/contain/03-3-jsx条件渲染-列表渲染-原理解析'

import CmtList from '@/components/评论例子/CmtList'

//#region 事件监听法三例子
// function a () {

//   // function b () {
//   //   console.log('不会调用')
//   // }

//   //b 这样子不会调用
//   b()

//   console.log(this,'哈哈')
// }
// console.log(a)
// a()

// function b () {
//   console.log('不会调用')
// }

//#endregion



let mydiv = <div>
  温存
  <hr/>
  <CmtList></CmtList>
</div>

//使用render函数渲染
let divApp = document.getElementById('app')
ReactDOM.render(mydiv,divApp)