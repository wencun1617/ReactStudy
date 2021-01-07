import React,{PureComponent} from 'react'
import {Route,Switch,withRouter} from 'react-router-dom'

import Home from 'contain/9-react-router/pages/home.js'
import Profile from 'contain/9-react-router/pages/profile.js'

// 实现的跳转主要是通过Link或者NavLink进行跳转的，实际上也可以通过JavaScript代码进行跳转
// 通过JavaScript代码进行跳转有一个前提：必须获取到history对象
  // 获取到history对象的两种方式
      // 方式一：如果该组件是通过路由直接跳转过来的，那么可以直接获取history、location、match对象;
      // 方式二：如果该组件是一个普通渲染的组件，那么不可以直接获取history、location、match对象
    
    // 普通的组件也希望获取对应的对象属性 ----> react-router通过高阶组件为组件添加相关的属性的
      // 希望在某个组件中获取到history对象，必须满足以下两个条件：
        // 该组件必须包裹在Router组件之内；
        // 该组件使用withRouter高阶组件包裹

// mamually adv.体力地,手动地,用手
class Manually extends PureComponent {
  render() {
    // console.log("手动跳转的history",this.props.history);
    return (
      <>
        <button onClick={() => this.pushToProfile()}>跳转到Profile页面</button>
        <button onClick={() => this.pushToHome()}>跳转到Home页面</button>
        <Switch>
          {/* 路径的跳转是使用Link/NavLink组件，最终会被渲染成a元素 */}
          {/* Route用于路径的匹配, 匹配到路径后渲染对应的组件  */}
          <Route exact path="/" component={Home} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </>
    )
  }
  pushToProfile() {
    this.props.history.push("/profile");
  }
  pushToHome() {
    this.props.history.push("/");
  }
}

// 使用withRouter高阶组件包裹
export default withRouter(Manually)
