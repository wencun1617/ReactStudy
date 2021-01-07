import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import {EventEmitter} from 'events'

// Context主要实现的是数据的共享
// 开发中跨组件之间的事件传递 ---> 在React中,可以依赖使用较多的库 events

// evevts常用API
// 创建EventEmitter对象: eventBus对象
// 发出事件: eventBus.emit('事件名称',参数列表)
// 监听事件: eventBus.addListener('事件名称',监听函数)
// 移除函数: eventBus.removeListener('事件名称', 监听函数)

const eventBus = new EventEmitter();

class ProfileHeader extends Component{
  render() {
    return (
      <div>
        <button onClick = {e => this.btnClick()}>按钮</button>
      </div>
    )
  }

  //实例方法
  btnClick() {
    //发出事件: eventBus.emit('事件名称',参数列表)
    eventBus.emit('headerClick',{word: 'derive', mean: 'v.起源,获取，得自'})
  }
}

//中间组件
class Profile extends Component {
  render() {
    return (
      <div>
        <ProfileHeader/>
        <div>中间组件</div>
      </div>
    )
  }
}

class App extends Component {
  // 组件已经挂载到DOM上
  componentDidMount() {
    // 监听事件: eventBus.addListener('事件名称',监听函数)
    eventBus.addListener('headerClick',this.headerClickHandle )
  }

  headerClickHandle(value) {
    console.log(value)
  }

  // 组件将要卸载
  componentWillUnmount() {
    // 移除函数: eventBus.removeListener('事件名称', 监听函数)
    eventBus.removeListener('headerClick',this.headerClickHandle);
  }

  render() {
    return (
      <div>
        <Profile></Profile>
        <div>其他内容</div>
      </div>
    )
  }
}

ReactDOM.render(<App/>,document.getElementById('app'))