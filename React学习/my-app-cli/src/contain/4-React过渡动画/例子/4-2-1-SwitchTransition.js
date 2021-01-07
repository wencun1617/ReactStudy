import React,{PureComponent} from 'react'
import { SwitchTransition, CSSTransition } from "react-transition-group";

import './4-2-2-SwitchTransition.css'
//#region  SwitchTransition

// SwitchTransition可以完成两个组件之间切换的炫酷动画
// eg: 有一个按钮需要在on和off之间切换，希望看到on先从左侧退出，off再从右侧进入
// 这个动画在vue中被称之为 vue transition modes 
// react-transition-group中使用SwitchTransition来实现该动画

// SwitchTransition中主要有一个属性：mode，有两个取值
    // in-out：表示新组件先进入，旧组件再移除；
    // out-in：表示新组件先移除，新组建再进入；

// 使用SwitchTransition
    // SwitchTransition组件里面要有CSSTransition或者Transition组件，不能直接包裹你想要切换的组件
    // SwitchTransition里面的CSSTransition或Transition组件不再像以前那样接受in属性来判断元素是何种状态，取而代之的是key属性
//#endregion

class SwitchTransitionExample extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOn: true
    }
  }

  render() {
    const {isOn} = this.state;

    return (
      <SwitchTransition mode="out-in">
        <CSSTransition classNames="btn"
                       timeout={500}
                       key={isOn ? "on" : "off"}>
          {
          <button onClick={e => this.btnClick()}>
            {/* 更改了childred便是新组件了 */}
            {isOn ? "on": "off"}
          </button>
        }
        </CSSTransition>
      </SwitchTransition>
    )
  }

  btnClick() {
    this.setState({
      isOn: !this.state.isOn
    })
  }
}

export default SwitchTransitionExample