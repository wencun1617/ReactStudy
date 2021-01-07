import React, { PureComponent} from 'react';

// 评论, 头像, 文字提示
import {Comment,Avatar,Tooltip} from "antd";

// icon 图标 --> 从 4.0 开始，antd 不再内置 Icon 组件，请使用独立的包 @ant-design/icons
// 语义化的矢量图形。使用图标组件，你需要安装 @ant-design/icons 图标组件包
import { DeleteOutlined } from "@ant-design/icons";

// https://ant.design/components/icon-cn/#components-icon-demo-iconfont
//对于使用 iconfont.cn 的用户，通过设置 createFromIconfontCN 方法参数对象中的 scriptUrl 字段， 即可轻松地使用已有项目中的图标

class CommentListItem extends PureComponent {
  render() {
    const { comment } = this.props;

    //#region  Comment 评论组件
      // author	  要显示为注释作者的元素         类型: string | ReactNode
      // avatar	  要显示为评论头像的元素 - 通常是 antd Avatar 或者 src	类型: string | ReactNode
      // content	评论的主要内容                 类型: string | ReactNode
      // datetime	展示时间描述                   类型: string | ReactNode
      // actions	在评论内容下面呈现的操作项列表  类型: Array<ReactNode>   React元素数组
    //#endregion

    //#region Tooltip 文字提示组件
        // title 鼠标移入则显示提示，移出消失，气泡浮层不承载复杂文本和操作    类型: string | ReactNode | () => ReactNode
        // placement 气泡框位置
        // arrowPointAtCenter	箭头是否指向目标元素中心	类型:boolean	默认: false
        // color 气泡框背景颜色
    //#endregion
    return (
      <Comment
        author={<a href="/#">{comment.name}</a>}
        avatar={
          <Avatar
            src={comment.avatar}
            alt={comment.name}
          />
        }
        content={comment.content}
        datetime={
          <Tooltip title={`评论时间: ${comment.datetime.format('YYYY-MM-DD HH:mm:ss')}`} placement='top' arrowPointAtCenter color="cyan">
            <span>{comment.datetime.fromNow()}</span>
          </Tooltip>
        }
        actions={ this.getActions() }
      />
    )
  }

  getActions() {
    return [
      <span onClick={this.props.removeItem}><DeleteOutlined/> 删除</span>,

    ]
  }
}

export default CommentListItem