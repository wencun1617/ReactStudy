import React, { PureComponent } from 'react'

class Detail extends PureComponent {
  render() {
    // console.log(this.props.match.params.word);
    return (
      <div>
        {/* 可以直接通过match对象中获取id*/}
        {/* 没有使用withRouter，原因是因为Detail本身就是通过路由(NavList)进行的跳转,非手动跳转*/}
        <h3>动态路由方式传递参数,之后在props.match.params里去获得</h3>
        <h4>{this.props.match.params.word}</h4>
      </div>
    )
  }
}

export default Detail