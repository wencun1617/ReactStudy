// webpack     3.6 里 提供了命令行和打包的功能

// webpack     4.x 里打包和命令行分开了
// 命令不再由webpack提供，而是由webpack-cli提供

//在wepack 4.x中  特性--> 约定大于配置
// 约定默认的 打包入口 src -> index.js
// 约定默认的 输出文件 dist -> main.js


//npx 调用项目内部安装的模块
//npx webpack   --mode=development
//npx webpack   --mode=production

//--------------------------------------------------------------------

import React from 'react'  //创建组件，虚拟DOM元素，生命周期
import ReactDOM from 'react-dom' //创建好的组件 和 虚拟DOM放到页面上展示

//1.创建虚拟DOM元素
//参数1 : 字符串类型的参数, 表示要创建的元素(标签)的名称
//参数2 : 一个对象或者null, 表示 创建的元素的属性节点
//参数3 : 子节点  (包括其他虚拟DOM 或 文本子节点)
//参数n : 其他子节点

//通过React.creactElement 最终创建出一个 ReactElement 对象
// React 会利用 ReactElement对象组成一个 JavaScript的对象树 ---->虚拟DOM
// jsx代码  --> >虚拟DOM(ReactElement对象组成一个 JavaScript的对象树) --> 真实DOM
//--------------------------------------------------------------------

//<h1 id="myh1" title="this is a h1">温存</h1>
//React实现组件化: 一切以JS来表现
const myh1 = React.createElement('h1',{id: 'myh1', title: 'this is a h1'},'温存')
const mydiv = React.createElement('div',null,'div元素',myh1)

//2.  使用ReactDOM.render 把虚拟DOM渲染到页面上
//参数1 : 要渲染的虚拟DOM对象
//参数2 : 指定页面上的容器  应当是一个 DOM元素，而不是一个选择器
//直接写 "#app"   ---> target container is not a DOM element
const divApp = document.getElementById('app')
ReactDOM.render(mydiv,divApp)