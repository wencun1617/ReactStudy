import React from 'react'



class Example extends React.Component {
  constructor() {
    super()

    this.state = {
      message: 'anxious adj. 焦急的,担心的,渴望的 anxiety n.焦虑,担心 ',
      tip: 'tip n.小费，提示，尖端, v.轻击，翻倒'
    }
  }

  render() {
    return (
      <div>
        <button onClick = {() => {this.btnClick()}}> 更改message </button>
        <div style = {{fontSize: '14px',marginBottom: '30px'}}>{this.state.message}</div>
        {/* readOnly */}
        <input type="text" style = {{width: '80%'}} value={this.state.tip} onChange = {e => this.txtChange(e)} ref="txt"></input>
      </div>
    )
  }
  btnClick() {
    //vue 动态绑定
    this.setState({
      tip: 'otherwise adv.否则,除此之外 conj. 否则, 不然'
    }) 
  }
  txtChange(e) {
    //获取文本框的值

    //#region 一: 通过事件参数 e 来获取
    console.log(e.target)
    //#endregion

    // 二: 使用ref获取DOM元素的引用
    // vue 里 ref    this.#refs
    // react 里 ref  this.refs
    console.log(this.refs.txt)
    
    this.setState({
      tip: this.refs.txt.value
    })
  }
}

export default Example