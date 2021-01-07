import React from 'react'
import ReactDOM from 'react-dom'

//1.创建虚拟DOM元素
// 在JS中, 混合写入类似 HTML 的语法   --->  JSX 语法   符合 XML 规范的JS语法 (语法格式相对来说，比HTML严谨的多)

// 使用balel来转换这些 JS 中的标签
// JSX 语法本质, 在运行的时候转换为 React.createElement 形式来执行
const mydiv = <div id="mydiv" title="this is a div haha">
  <h1 id="myh1">
    温存1617
  </h1>
</div>
//2. 调用 render 函数渲染
const myapp = document.getElementById('app')
ReactDOM.render(mydiv,myapp)

console.log(...[1, 2, 3])

const a = 12356
