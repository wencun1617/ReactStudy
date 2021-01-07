import React,{PureComponent} from 'react'

// search传递参数
// Detail2中是需要在location中获取search的
// search没有被解析，需要自己来解析

export default class Detail2 extends PureComponent {
  render() {
    // console.log(this.props.location.search); // ?name=why&age=18

    return (
      <div>
        <h3>search传递参数,之后在props.location.search里去获得</h3>
        <h3>只是search属性里是字符串,需要自行去解析获取参数</h3>
        <h4>{this.props.location.search}</h4>
      </div>
    )
  }
}