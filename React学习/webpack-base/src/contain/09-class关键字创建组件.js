// import React,{Component} from 'react'
import React from 'react'
import ReactDOM from 'react-dom'

// import '@/contain/06-class的基本使用-实例属性和静态属性'
// import '@/contain/07-class-实例方法和静态方法'
// import '@/contain/08-class-extends'


//class 关键字创建组件
//基本组件结构
class Chinese extends React.Component {
  //No `render` method found on the returned component instance: you may have forgotten to define `render`
  //组件内部必有render函数 且其中必须返回合法的 jsx虚拟DOM结构
  //render函数没有返回会导致:
  //Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null

  // 不论是class 还是 普通function创建的组件, 其 props 都是  read-only
  // props.name = '温存'  报错 read-only  

  render() { // 作用: 渲染当前组件对应的 虚拟DOM 元素
    
    //this 表示当前组件的实例对象
    console.log(this)
    //在 class 关键字创建的组件中, 若想使用外界传递过来的 props 参数, 不需要接收, 直接通过this.props.XXX 访问即可
    return <h1>郁欢
      <hr/>
      {this.props.name} - {this.props.action}
    </h1>
  }
}

let word = {
  name: 'variable',
  action: 'procedure'
}

let mydiv = <div>
  温存
  <hr/>
  {/* 相当于类的一个实例对象 */}
  <Chinese {...word}></Chinese>
</div>

//使用render函数渲染
let divApp = document.getElementById('app')
ReactDOM.render(mydiv,divApp)

//#region 
  /*
    1. 类组件中的render(实例方法)， 置于类(eg:Chinese)的原型对象上，供实例使用
    2.render中的this  类的实例对象/ 类组件的实例对象

    3. 执行ReactDOM.render()之后发生了什么
        (1) React解析组件标签，搜寻相关的组件找不到就报错了
        (2) 发现组件是使用类定义的, 随后创建该类的实例，并通过该实例调用实例原型上的render方法
        (3) 将render返回的虚拟DOM, 转为真实DOM, 随后呈现在视图中
  */
//#endregion