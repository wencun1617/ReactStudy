import React from 'react';

import TabControl from './TabControl'

class Communication extends React.Component {
  constructor(props) {
    super(props)

    this.titles = ["流行","新款","精选"]

    this.state = {
      currentType: '流行'
    }
  }

  render() {
    return (
      <div>
        {/* 子传父 ---> 让父组件给子组件传递一个回调函数, 在子组件内中调用这个函数即可 */}
        {/* 此处父组件传递过去的回调函数实际是 --> () => this.itemClick() 子组件传 实参 实际是传给外面的 "壳",然后壳再给里面的函数实参 所以"壳"的形参index不可省略*/}
        <TabControl titles = {this.titles} itemClick = {index => this.itemClick(index)}></TabControl>
        <h2>{this.state.currentType}</h2>
      </div>
    )
  }

  itemClick(index) {
    this.setState({
      currentType : this.titles[index]
    })
  }
}



export default Communication;
