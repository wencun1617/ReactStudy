import React from 'react'
import ReactDOM from 'react-dom'



//渲染数字
let a = 16
//渲染字符串
let b = '温存'
//渲染布尔值  变量是 null undefined Boolean 类型时,显示为空, 可转为字符串,便可显示
let c = true
// 为属性绑定值
let title = '相当于动态绑定'
//渲染jsx元素
const h1 = <h1>郁欢</h1>
//渲染jsx元素数组
const arr = [
  <h2 key="2">h2标签</h2>,
  <h3 key="3">h3标签</h3>
]
//对象类型不能作为子元素 not valid as a React child

//将普通字符串数组, 转为jsx数组并渲染到页面上
const normalArr = ['dependent','dependence','depend']

let jsxArr1 = []
//方法一:
normalArr.forEach((value,index) => {
  const temp = <div key={index}>{value}</div>
  jsxArr1.push(temp)
})

let jsxArr2 = []
//方法二：
//数组的map方法
//map() 方法创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值
//map 方法处理数组元素的范围是在 callback 方法第一次调用之前就已经确定了。调用map方法之后追加的数组元素不会被callback访问
//如果存在的数组元素改变了，那么传给callback的值是map访问该元素时的值。在map函数调用后但在访问该元素前，该元素被删除的话，则无法被访问到
jsxArr2 = normalArr.map((item,index) => {
  return <h2 key={index} >{item + index}</h2>
})

//需要在jsx 控制的区域内， 写js表达式，则需要把js代码写到 {} 中
// jsx中写注释 推荐使用{/*注释*/}
// 为jsx的元素添加class类名,需要使用classname替换class  htmlFor替换label的for属性
// 在jsx创建DOM的时候，所有的节点，必须有唯一的根元素进行包裹
//1.创建虚拟DOM元素
let mydiv = <div>
  {a + 1}
  <hr/>
  {b}
  <hr/>
  {/* jsx嵌入表达式 运算表达式 三元运算符 执行一个函数 */}
  {c ? c.toString() : '条件为假'}
  <hr/>
  <p className="ff" title={title}>p标签</p>
  <hr/>
  {h1}
  <hr/>
  {/* {arr} */}
  <hr/>
  {jsxArr1}
  <hr/>
  {jsxArr2}
</div>

//2. 调用 render 函数渲染
let divApp = document.getElementById('app')
ReactDOM.render(mydiv,divApp)