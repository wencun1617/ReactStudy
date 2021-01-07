import React, {Component} from 'react'
import ReacctDOM from 'react-dom'
import PropTypes from 'prop-types'

// 父组件通过 属性 = 值的形式来传递给子组件数据
// 子组件通过props 参数获取父组件传递过来的数据

class ChildCpn1 extends Component {

  render() {
    const {word,mean,age} = this.props

    return (
      <div>
        <h3>子组件</h3>
        <p>展示父组件传递过来的数据</p>
        <p> {word + ' ' + mean + ' ' + age}</p>
      </div>
    )
  }
}

//参数验证propTypes
// 出于性能考虑,仅在开发模式下进行检查
ChildCpn1.propTypes = {
  word: PropTypes.string,
  mean: PropTypes.string,
  age: PropTypes.number,
}

// defaultProps 默认值
ChildCpn1.defaultProps = {
  word: 'progress',
  mean: '进步的,逐步的,渐进的',
  age: 21
}

let words = {
  word: 'side effect',
  mean: '副作用',
  age: 21
}

//子组件 向父组件传递消息
// React中同样是通过props传递消息
// 只是让父组件给子组件传递一个回调函数, 在子组件内中调用这个函数即可
// 子组件回调 函数,便是子组件在某个操作后向父组件传递消息
function CounterButton(props) {
  const {operate,btnClick} = props
  return <button onClick={btnClick}>{operate}</button>
}


class App extends Component {
  constructor() {
    this.state = {
      count: 0
    }
  }
  changeCount(count) {
    this.setState({
      count: this.state.count + count
    })
  }

  render() {
    return (
      <div>
        <h3>当前计数 {this.state.count}</h3>
        <CounterButton operate = '+1' btnClick = {e => this.changeCount(1)}></CounterButton>
        <CounterButton operate = '-1' btnClick = {e => this.changeCount(-1)}></CounterButton>
      </div>
    )
  }
}

let myDiv = <div>
  <ChildCpn1 {...words}></ChildCpn1>
  <hr/>
  <App></App>
</div>

ReactDOM.render(myDiv,document.getElementById('app'))