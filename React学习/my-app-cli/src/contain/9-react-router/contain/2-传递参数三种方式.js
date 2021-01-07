import React,{PureComponent} from 'react'
import {NavLink,Route,Switch,BrowserRouter} from 'react-router-dom'

import Home from   'contain/9-react-router/pages/home.js'
import Detail from 'contain/9-react-router/pages/detail.js'
import Detail2 from 'contain/9-react-router/pages/detail2.js'
import Detail3 from 'contain/9-react-router/pages/detail3.js'

// 传递参数

// 传递参数有三种方式：
// 动态路由的方式；
// search传递参数；
// to传入对象


//#region 1.动态路由的方式 ---> 路径后面直接加参数
  // 动态路由的概念指的是路由中的路径并不会固定
    // eg: /detail的path对应一个组件Detail
    // 将path在Route匹配时写成/detail/:id，那么 /detail/abc、/detail/123都可以匹配到该Route，并且进行显示
    // 这个匹配规则，我们就称之为动态路由

  // 动态路由方式传递参数,之后在props.match.params里去获得

//#endregion

//#region 2.search传递参数  ---> 路径后面加query参数,
    // search传递参数,之后在props.location.search里去获得
    // 只是search属性里是字符串,需要自行去解析获取参数
//#endregion

//#region 3.to传入对象 ---> NavLink的to属性里直接传入对象
  //传入的对象属性名好像是固定的不可以乱写
//#endregion

export default class TransmitParameter extends PureComponent {
  render() {
    return(
      <BrowserRouter>
        <NavLink to="/" exact activeStyle={{color: "red"}}>Home主页  </NavLink>
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

        {/* NavLink和Route均有exact属性 */}
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/detail/:word" component={Detail} ></Route>
          <Route path="/detail2" component={Detail2}/>
          <Route path="/detail3" component={Detail3}></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}