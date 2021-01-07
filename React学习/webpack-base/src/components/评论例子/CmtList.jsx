import React from 'react'

//date 每一项子组件
import CmtListItem from '@/components/评论例子/CmtListItem'
//引用某个包时, 包已经被安装到node_modules目录中,则直接以包名开始引入自己的模块或样式表

// //样式对象和UI结构分离
// const h1Style = {color: 'red',fontSize: '24px',textAlign: 'center'}



// 直接导入css层叠样式表,默认在全局,整个项目都生效(样式表默认没有独立作用域)
// 需在 webpack.config.js配置css启用模块化, CmtListobj 不再是空对象,而是有具体对象了
// 且css 模块化,只针对 类选择器 和 id选择器生效(CmtListobj里有对应的属性)
// 但不会将标签选择器模块化
// :local包裹的类名,是被模块化的类名,默认
// :global包裹的类名,是全局生效的,不会被模块化
import CmtListobj from '@/css/CmtList.css' 
console.log(CmtListobj)

// 使用class 关键字 定义父组件
class CmtList extends React.Component {
  constructor() {
    super()

    this.state = {
      CommentList: [
        {id: 1, user: '星期一', content: 'Monday'},
        {id: 2, user: '星期二', content: 'Tuesday'},
        {id: 3, user: '星期三', content: 'Wednesday'},
        {id: 4, user: '星期四', content: 'Thursday'},
        {id: 5, user: '星期五', content: 'Friday'},
      ]
    }
  }

  //join() 方法将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串。如果数组只有一个项目，那么将返回该项目而不使用分隔符
  render() {
    return (
      <div>
        {/* <h1 style={h1Style}>展示信息</h1> */}
        <h1 className = {[CmtListobj.title,'test'].join(' ')}>展示信息</h1>
        {this.state.CommentList.map(item => {
          return <CmtListItem {...item} key={item.id}></CmtListItem>
        })}
      </div>
    )
  }
}

export default CmtList