import React,{ PureComponent} from 'react'

import { CSSTransition } from 'react-transition-group';
import { Card, Avatar, Button } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import './4-1-2-CSSTransition.css'

const { Meta } = Card; //更灵活的内容展示   Card.Meta
//#region Card
  // extra	卡片右上角的操作区域	类型: string | ReactNode	
  // size  	card 的尺寸	         类型: default | small	         默认值:default
  // cover	卡片封面	           类型: ReactNode
  // loading	当卡片内容还在加载中时，可以用 loading 展示一个占位 	类型: boolean	false
  // actions	卡片操作组，位置在卡片底部	                         类型: Array<ReactNode>
//#endregion

//#region  CSSTransition   ---> 基于Transition组件构建的

// CSSTransition (全部)执行过程 中，有三个状态(类型)：appear、enter、exit；
// 它们有三种状态(完成动画整个过程的三类,编写对应的css样式)，需要定义对应的CSS样式：
// 第一类，开始状态：对于的类是-appear、-enter、exit；                         初次开始进入              开始进入              开始退出
// 第二类：执行动画：对应的类是-appear-active、-enter-active、-exit-active；   初次执行进入动画          执行进入动画          执行退出动画
// 第三类：执行结束：对应的类是-appear-done、-enter-done、-exit-done；         初次进入动画执行结束      进入动画执行结束      退出动画执行结束

// CSSTransition常见对应的属性:
  // in：触发进入或者退出状态
      // 如果添加了unmountOnExit={true}，那么该组件会在执行退出动画结束后被移除掉；
      // 当in为true时，触发进入状态，会添加-enter、-enter-acitve的class开始执行动画，当动画执行结束后，会移除两个class，并且添加-enter-done的class；
      // 当in为false时，触发退出状态，会添加-exit、-exit-active的class开始执行动画，当动画执行结束后，会移除两个class，并且添加-enter-done的class；
  // classNames：动画class的名称  ---> 给出编写css类名标志
      // 决定了在编写css时，对应的class名称：比如card-enter、card-enter-active、card-enter-done；
  // timeout：
      // 过渡动画的时间
  // appear：
  // 是否在初次进入添加动画（需要和in同时为true）

// CSSTransition对应的钩子函数：主要为了检测动画的执行过程，来完成一些JavaScript的操作
  // onEnter：在进入动画之前被触发；
  // onEntering：在应用进入动画时被触发；
  // onEntered：在应用进入动画结束后被触发；

//#endregion

 class CSSTransitionExample extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isShowCard: true
    }
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={e => this.setState({isShowCard: !this.state.isShowCard})}>显示/隐藏</Button>
        <CSSTransition in={this.state.isShowCard}
                       classNames="card"
                       timeout={1000}
                       unmountOnExit={true}
                       onEnter={el => console.log("进入动画前")}
                       onEntering={el => console.log("进入动画")}
                       onEntered={el => console.log("进入动画后")}
                       onExit={el => console.log("退出动画前")}
                       onExiting={el => console.log("退出动画")}
                       onExited={el => console.log("退出动画后")}
        >
          <Card
            style={{ width: 300 }}
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title="Card title"
              description="This is the description"
            />
          </Card>
        </CSSTransition>
      </div>
    )
  }
}

export default CSSTransitionExample