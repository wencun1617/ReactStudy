import React from  'react'

// 直接导入css层叠样式表,默认在全局,整个项目都生效(样式表默认没有独立作用域)
// 普通的css都属于全局的css，样式之间会相互影响
// import './navBar.css'

// css modules 
// css modules并不是React特有的解决方案，而是所有使用了类似于webpack配置的环境下都可以使用,需要自行配置 ---> 见webpack-base目录里的 评论例子(CmtList.jsx)
// React的脚手架已经内置了css modules的配置
// .css/.less/.scss 等样式文件都修改成 .module.css/.module.less/.module.scss
// 然后就可以当做模块一样导入使用
import aaa from  './navBar.module.css'
// console.log(aaa)
// 缺陷:
// 引用的类名，不能使用连接符(eg: .home-title)，在JavaScript中是不识别的；
// 所有的className都必须使用{XXX.选择器名} 的形式来编写；
// 不方便动态来修改某些样式，依然需要使用内联样式的方式；

//---------------------------------------------------------------------------------------------------------------------------

//#region clildren实现
// 每个组件都可以取到 props.children: 包含组件开始标签到结束标签之间的内容
// 如果只有一个元素, child指向的是该元素
// 如果有多个元素, child指向的是数组，数组中包含多个元素                                    
// 弊端: 通过索引值获取传入的元素很容易出错,不能准确获取传入的原生
                                                                                                                                                                                             
class NavBar extends React.Component {
  render() {
    return (
      <div>
        <div className={aaa.navBar}>
          <div className={aaa.itemLeft}>{this.props.children[0]}</div>
          <div className={aaa.itemCenter}>{this.props.children[1]}</div>
          <div className={aaa.itemRight}>{this.props.children[2]}</div>
        </div>
      </div>
      
    )
  }
}

export default class NavBarExample extends React.Component {
  render() {
    return (
      <NavBar>
        <div>
          <span>左</span>
          <span>边</span>
        </div>
        <div>中间</div>
        <div>右边</div>
      </NavBar>
    )
  }
}

//#endregion

//#region props 实现
// class NavBar extends React.Component {
//   render() {
//     const {leftSolt, centerSolt, rightSolt} = this.props

//     return (
//       <div className='nav-bar'>
//         <div className='item-left'>{leftSolt}</div>
//         <div className='item-center'>{centerSolt}</div>
//         <div className='item-right'>{rightSolt}</div>
//       </div>
//     )
//   }
// }

// export default class NavBarExample extends React.Component {
//   render() {
//     let elementExample = {
//       leftSolt: <div>左边1</div>,
//       centerSolt: <div>中间2</div>,
//       rightSolt: <div>右边3</div>
//     }
//     return (
//       <NavBar {...elementExample}></NavBar>
//     )
//   }
// }
//#endregion