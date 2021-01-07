import React,{Fragment}from 'react';
import {BrowserRouter} from 'react-router-dom'

import Communication from 'contain/1-父子组件通信例子/Communication';
import NavBarExample from '@/contain/2-react插槽的实现/React插槽实现'
import Comment from 'contain/3-antd使用例子/Comment'
import CSSTransitionExample from 'contain/4-React过渡动画/例子/4-1-1-CSSTransition'
import SwitchTransitionExample from 'contain/4-React过渡动画/例子/4-2-1-SwitchTransition'
import TransitionGroupExample  from 'contain/4-React过渡动画/例子/4-3-1-TransitionGroup'
import ReduxTest from 'contain/5-Redux/1-Redux介绍'
import Home from 'contain/6-React结合redux/redux融入react代码/components/Home'
import Profile from 'contain/6-React结合redux/redux融入react代码/components/Profile'
import NewHome from 'contain/7-react-redux使用/components/NewHome'
import NewProfile from 'contain/7-react-redux使用/components/NewProfile'
import MidNewHome from 'contain/8-Redux(三)中间件/components/MidNewHome'
import MidNewProfile from 'contain/8-Redux(三)中间件/components/MidNewProfile'
// import { Button } from 'antd' // 按需加载的效果 --> 懒加载
// import RouterExample from 'contain/9-react-router/RouterExample' 
import Manually from 'contain/9-react-router/contain/1-手动跳转.js'
import TransmitParameter from 'contain/9-react-router/contain/2-传递参数三种方式.js'
import ReactRouterConfig from 'contain/9-react-router/contain/3-react-router-config'
import CountHook from 'contain/10-hook/useReducer-Hook.js'
import ContextHookExample from 'contain/10-hook/usecontext-Hook.js'
class App extends React.Component {
  
  render() {
    let word = {
      initialCount: 67
    }
    return (
      <Fragment> 
        <h4 style={{textAlign: 'center'}}>父子组件通信例子</h4>
        <Communication />
        <hr/>

        <h4 style={{textAlign: 'center'}}>css模块化测试与插槽例子</h4>
        {/* 测试得知,插槽实现例子的css不是独立的模块,属于全局的css，样式之间会相互影响 css模块化后就不起作用了*/}
        <div className='navBar'>
          <div className="itemLeft">css模块化?</div>
        </div>
        {/* React的脚手架已经内置了css modules的配置 ---> 这样css便模块化不会全局生效了*/}
        {/* .css/.less/.scss 等样式文件都修改成 .module.css/.module.less/.module.scss */}
        {/* 引用的类名，不能使用连接符(.home-title)，在JavaScript中是不识别的 */}
        <NavBarExample></NavBarExample>
        <hr/>

        <h4 style={{textAlign: 'center'}}>Antd 评论例子</h4>
        <Comment/>
        <hr/>

        <h4 style={{textAlign: 'center'}}>React过滤动画例子</h4>
        <h5>1.CSSTransition</h5>
        <CSSTransitionExample/>
        <hr/>

        <h5>2.SwitchTransition</h5>
        <SwitchTransitionExample/>
        <hr/>

        <h5>3.TransitionGroup</h5>
        <TransitionGroupExample/>
        <hr/>

        <h5>5-Redux 1-Redux介绍例子</h5>
        <ReduxTest/>
        <hr/>

        <h5>6-React结合redux redux融入react代码(自定义connect函数,store的context处理)</h5>
        <Home/>
        <Profile/>
        <hr/>

        <h5>7-react-redux使用</h5>
        <NewHome/>
        <NewProfile/>
        <hr/>

        <h5>8-Redux(三)中间件</h5>
        <MidNewHome/>
        <hr/>
        <MidNewProfile/>
        <hr/>

        {/* <h5>react-router例子简单演示下使用</h5>
        <RouterExample/>
        <hr/> */}

        <h5>手动跳转 -- 使用到withRouter高阶组件</h5>
        {/* 手动跳转,希望在需要的组件里获取到history
          该组件必须包裹在Router组件之内；
          该组件使用withRouter高阶组件包裹 */}
        <BrowserRouter>
          <Manually/>
        </BrowserRouter>
        <hr/>

        <h5>传递参数三种方式</h5>
        <TransmitParameter/>
        <hr/>

        <h5>使用react-router-config</h5>
        <h5>将所有的路由配置放到一个地方进行集中管理 -- 代替Route组件</h5>
        <ReactRouterConfig>
        </ReactRouterConfig>
        <hr/>

        <h5>useReducer</h5>
        <CountHook initialCount={word.initialCount}></CountHook>
        <hr/>

        <h5>useContext</h5>
        <ContextHookExample/>
        <hr/>


      </Fragment>
    )
  }

}

export default App;