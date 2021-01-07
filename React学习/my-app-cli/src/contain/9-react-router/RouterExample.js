import React,{PureComponent} from 'react'
import {BrowserRouter,Route,NavLink} from 'react-router-dom'

import Home from './pages/home';
import About from './pages/about';
import Profile from './pages/profile';
import './RouterExample.css'

export default class RouterExample extends PureComponent {
  render() {
    return(
      //Router中包含了对路径改变的监听，并且会将相应的路径传递给子组件 ??
      // BrowserRouter使用history模式
      <>
      <BrowserRouter>
        {/* 通常路径的跳转是使用Link组件，最终会被渲染成a元素 */}
        {/* to属性：Link中最重要的属性，用于设置跳转到的路径 */}
        {/* <Link to="/about">关于List   </Link> */}
        
        
        
        {/* NavLink是在Link基础之上增加了一些样式属性 */}
        {/* activeStyle：活跃时（匹配时）的样式； */}
        {/* activeClassName：活跃时添加的class (默认的activeClassName a.active) */}
        {/* exact：是否精准匹配 */}
        <NavLink exact to="/" activeStyle={{color: "red"}}>首页  </NavLink>
        <NavLink to="/about"  activeClassName="link-active">关于  </NavLink>
        <NavLink to="/profile" activeStyle={{color: "red"}}>我的  </NavLink>

        {/* Route用于路径的匹配 */}
        {/* path属性：用于设置匹配到的路径 */}
        {/* component属性：设置匹配到路径后，渲染的组件 */}
        {/* exact：精准匹配，只有精准匹配到完全一致的路径，才会渲染对应的组件 */}
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/profile" component={Profile} />
      </BrowserRouter>
      </>
    )
  }

  //#region Switch的作用
  // 默认情况下，react-router中只要是路径被匹配到的Route对应的组件都会被渲染；
    // 实际开发中 --> 排他的思想
    // 只要匹配到了第一个，那么后面的就不应该继续匹配了
    // 使用Switch来将所有的Route进行包裹即可

    // <Switch>
    //   <Route exact path="/" component={Home} />
    //   <Route path="/about" component={About} />
    //   <Route path="/profile" component={Profile} />
    //   <Route path="/:userid" component={User} />
    //   <Route component={NoMatch} />
    // </Switch>

  //#endregion

  //#region Redirect的使用
    // Redirect用于路由的重定向，当这个组件出现时，就会执行跳转到对应的to路径中
  //#endregion
}