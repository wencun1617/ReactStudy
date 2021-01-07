import React, { PureComponent } from 'react';

import CommentListItem from 'contain/3-antd使用例子/children/CommentListItem';
import CommentTextArea from 'contain/3-antd使用例子/children/CommentTextArea';

class Comment extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      //存放所有评论的数据
      commentList: []
    }
  }

  render() {
    return (
      <div style={{width: "300px", padding: "20px"}}>
        {
          this.state.commentList.map((item, index) => {
            // key:对性能优化 comment: 传给子组件的数据 index: ????
            return <CommentListItem key={item.id} comment={item} index={index} removeItem={e => this.removeItem(index)}/>
          })
        }
        {/* 子传父 ---> 让父组件给子组件传递一个回调函数, 在子组件内中调用这个函数即可 */}
        {/* 此处父组件传递过去的回调函数实际是 --> () => this.submitComment() 子组件传 实参 实际是传给外面的 "壳",然后壳再给里面的函数实参 所以"壳"的形参comment不可省略*/}
        <CommentTextArea submitComment={comment => this.submitComment(comment)}/>
      </div>
    )
  }

  submitComment(comment) {
    // 添加新的数据,页面不会发生刷新
    // because继承自PureComponent,会进行浅层比较,浅层比较过程中两个commentList是相同的对象,
    // 继承自Component便会刷新,性能优化的选择呗
    // this.state.commentList.push(comment)
    // this.setState({
    //   commentList: this.state.commentList
    // })

    this.setState({
      commentList: [...this.state.commentList, comment] //会生成一个新的数组引用,在进行浅层比较时, 两个引用的是不同的数组, 便是不相同的
    })
  }

  removeItem(index) {
    const newCommentList = [...this.state.commentList];
    newCommentList.splice(index, 1);
    this.setState({
      commentList: newCommentList
    })
  }
}
export default Comment