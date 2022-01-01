import React,{PureComponent} from 'react'

export default class Detail3 extends PureComponent {
  render() {
    // console.log(this.props.location);
    return (
      <>
        <h3>to传入对象 --- NavLink的to属性里直接传入对象</h3>
        <h3>之后在props的location便可以获取到传入的对象了</h3>
        <h3>传入的对象属性名好像是固定的不可以乱写</h3>
      </>
    )
  }
}