import React from 'react'
import ReactDOM from 'react-dom'

//条件渲染
//React中, 所有的条件判断和普通的JavaScript代码一致
class Example extends React.Component {
  constructor() {
    super()

    this.state = {
      isLogin: true,
      message: 'access v.进入,访问 n.进入,使用权,通道'
    }
  }
  render() {
    const {isLogin,message} = this.state
    let nameDisplay = isLogin ? 'block' : 'none'
    return (
      <div>
        {/* 1. 条件渲染 - 条件判断语句 */}
        <div>{this.getTitleJsx()}</div>
        <hr/>

        {/* 2. 条件渲染 - 三元运算符 */}
        <div>
          {isLogin ? "welcome":'未登陆'}
          ----
          <button onClick={e => this.loginClick()}>按钮</button>
        </div>
        <hr/>

        {/* 3. 条件渲染 - 与运算符&& */}
        <div>
          {isLogin && <div>条件成立渲染一个组件,否则什么也不做</div>}
        </div>
        <hr/>

        {/* 4. 条件渲染 - v-show效果 */}
        <div style={{display: nameDisplay}}>
          通过display的属性控制显示和隐藏
        </div>
      </div>
    
    )
  }

  //实例方法
  getTitleJsx() {
    let titleJsx = null
    if(this.state.isLogin) {
      titleJsx = <div>{this.state.message}</div>
    } else {
      titleJsx = <div>未登录</div>
    }
    return titleJsx
  }

  loginClick() {
    this.setState({
      isLogin: !this.state.isLogin
    })
  }
}

//创建虚拟DOM元素
let mydiv = <div>
  温存
  <hr/>
  <Example></Example>
</div>

//使用render函数渲染
let divApp = document.getElementById('app')
ReactDOM.render(mydiv,divApp)