// import React,{Component} from 'react'
import React from 'react'
import ReactDOM from 'react-dom'

//------------------------------------------------------------------

//  使用class 关键字创建的组件,  有自己的私有数据(this.state)和生命周期函数
//  用class 关键字创建的组件    -----> 有状态组件

//  使用 function 创建的组件, 只有props, 没有自己的私有数据和声明周期函数
//  用构造函数创建的组件        ----->  无状态组件

// 有无状态组件的本质区别  有无state和生命周期
// 无状态组件 由于没有自己的state和生命周期,运行效率 比有状态组件高

//------------------------------------------------------------------

class Chinese extends React.Component {

  constructor() {
    super()
 
    // class 创建的组件中 this.state中的数据  read write 均可
    this.state = { //类似 vue 组件中的 data(){ return {}}  每个组件独有
      msg: 'communication n.沟通方式，交流，通讯，信息'
    } 
  }

 
  render() {
    console.log(this)
    this.state.msg = '修改msg的值'

    return <h1>郁欢
      <hr/>
      {this.props.name} - {this.props.action} 
      <hr/>
       <div>{this.state.msg}</div> 
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

