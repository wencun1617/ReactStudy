import React, { PureComponent} from 'react'

import {Button, Input} from 'antd'; //按需引入 --> 懒加载
// JS日期处理类库
const moment = require('moment')

class CommentTextArea extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      value: ""
    }
  }

  render() {
    return(
      <>
        {/* 用不到this,直接传入函数的时候,才可以不用传 e,就可以获取到event对象 */}
        <Input.TextArea rows={4} onChange={e => this.onChange(e)} value={this.state.value} style={{marginBottom:"20px"}} />
        {/* 按钮组件用了废弃的 findDOMNode 方法, 会有警告 */}
        <Button onClick={() => this.onSubmit()} type="primary">
          添加评论
        </Button>
      </>
    )
  }

  onChange(e) {
    this.setState({
      value: e.target.value
    })
  }

  onSubmit() {
    // moment() 当前时间
    // moment().fromNow() 相对时间,monent里还可以传参
    // moment().format() 日期格式化

    // Date.now() javascript中的内置函数, 返回自 1970 年 1 月 1 日 00:00:00 (UTC) 到当前时间的毫秒数
    // now()是Date对象的静态方法，所以它将始终用作date.now()
    
    console.log(this.state.value, moment().fromNow(),Date.now());
    const commentInfo = {
      id: Date.now(),
      name: "温存",
      avatar: "https://upload.jianshu.io/users/upload_avatars/1102036/c3628b478f06.jpeg?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240",
      content: <p>{this.state.value}</p>,
      datetime: moment()
    }

    // 父组件给子组件传递一个回调函数, 在子组件内中调用这个函数即可
    // 子组件调用 该回调函数, 便是子组件在某个操作后向父组件传递消息
    this.props.submitComment(commentInfo);

    //重置文本域
    this.setState({
      value: ""
    });
  }
}
export default CommentTextArea