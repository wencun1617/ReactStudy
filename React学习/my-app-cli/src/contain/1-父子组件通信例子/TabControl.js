import "./TabControl.css"


import React,{Component} from 'react'

export default class TabControl extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentIndex: 0
    }
  }
  
  render() {
    const {titles} = this.props
    const {currentIndex} = this.state

    return (
      <div className = 'tab-control'>
        {
          // 渲染jsx元素数组
          titles.map((item,index) => {
            return (
              <div className = "tab-item" onClick = {e => this.tabItemClick(index)} key = {index}>
                <span className={"title-item " + (index === currentIndex ? "active" : "")}>{item}</span>
                {/* <span className={ ["title-item ", (index === currentIndex ? "active" : "")].join(' ')}>{item}</span> */}
              </div>
            )
          })
        }
      </div>
    )
  }

  tabItemClick(index) {
    this.setState({
      currentIndex: index
    })
    // 让父组件给子组件传递一个回调函数, 在子组件内中调用这个函数即可
    this.props.itemClick(index)
  }
  
}