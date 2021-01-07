import React,{PureComponent} from 'react'

class AboutMessage extends PureComponent {
  render() {
    // console.log("该组件是通过路由直接跳转过来的,可以直接获取history、location、match对象")
    // console.log(this.props.history)
    return (
      <>
        <div>AboutMessage页面</div>
        <div>路由之间存在嵌套关系</div>

        {/* <div>
          <Link to="/about">About</Link>
          <Link to="/about/message">AboutMessage</Link>

          <Switch>
            <Route exact path="/about" component={About} />
            <Route path="/about/message" component={AboutMessage} />
          </Switch>
        </div> */}
      </>
    )
  }
}



export default AboutMessage