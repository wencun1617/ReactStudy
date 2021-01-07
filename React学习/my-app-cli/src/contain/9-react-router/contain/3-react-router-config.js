

// 所有的路由定义都是直接使用Route组件，并且添加属性来完成的
// 但是这样的方式会让路由变得非常混乱，希望将所有的路由配置放到一个地方进行集中管理

//可以使用react-router-config来完成

import React,{PureComponent} from 'react'
import {NavLink,BrowserRouter} from 'react-router-dom'
import {renderRoutes} from 'react-router-config'
import routes from 'contain/9-react-router/contain/router/index.js'

export default class ReactRouterConfig extends PureComponent {
  
  render() {

    return(
      <BrowserRouter>
        <NavLink to="/" exact activeStyle={{color: "red"}}>Home主页  </NavLink>
        
        {/* 嵌套路由 */}
        <NavLink to="/about" exact activeStyle={{color: "red"}}>about  </NavLink>
        

        {/* 1.动态路由的方式 --->  路径后面直接加参数 */}
        <NavLink to="/detail/introduce vt.介绍,传入,引入"  activeStyle={{color: "red"}}>1.动态路由   </NavLink>
        
        {/* 2.search传递参数 ---> 在跳转的路径后面加query参数 */}
        <NavLink to="/detail2?name='温存'&age=18" activeStyle={{color: "red"}}>2.search传递参数   </NavLink>

        {/* 3.to传入对象 ---> NavLink的to属性里直接传入对象 */}
        <NavLink to={{
            pathname: "/detail3", 
            query: {name: "anxious", age: 22},
            state: {height: 1.98, address: "anxiety"},
            search: "?apikey=123",
          }} activeStyle={{color: "red"}}>
          3.to传入对象
        </NavLink>


        {/* 将之前的Switch配置，换成react-router-config中提供的renderRoutes函数 */}
        {renderRoutes(routes)}

      </BrowserRouter>
    )
  }
}