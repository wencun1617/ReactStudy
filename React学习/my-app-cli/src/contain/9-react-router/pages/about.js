import React,{PureComponent} from 'react'
import {NavLink} from 'react-router-dom'
import {renderRoutes,matchRoutes} from 'react-router-config'

class About extends PureComponent {
  render() {

    // console.log("该组件是通过路由直接跳转过来的,可以直接获取history、location、match对象")
    // console.log(this.props.history)
    const {routes} = this.props.route
    
    // 实际上react-router-config中还提供了一个matchRoutes辅助函数：
    // matchRoutes(routes, pathname)传入一个路由对象数组，获取所有匹配的路径
    console.log("辅助函数matchRoutes ", matchRoutes(routes,"/about/message"))
    return (
      <>
        <div>About主页面</div>
        <NavLink to="/about/message"  activeStyle={{color: "red"}}>aboutMessage(嵌套路由)  </NavLink>
        <NavLink to="/about/message2"  activeStyle={{color: "red"}}>aboutMessage2 </NavLink>


        {/* 如果是子组件(本例子是about的子组件)中，需要路由跳转，那么需要在子组件中使用renderRoutes函数： */}
        {/* 在 跳转到的路由组件 中会多一个 this.props.route 属性； */}
        {/* 该route属性代表当前跳转到的路由对象(便是router/index 里配置的about路由对象)，可以通过该属性获取到 routes(该名字可以随意取) */}
        {renderRoutes(routes)}
      </>
    )
  }
  
}

export default About