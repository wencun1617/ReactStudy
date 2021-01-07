import React from 'react'



// const itemDivStyle = {border: '1px solid #ccc',margin: '6px',paddingLeft: '6px',boxShadow: '0 0 10px #ccc'}


import CmtListItemobj from '@/css/CmtListItem.css'

//不需要私有数据 定义为 无状态组件
function CmtListItem(props) {
  return (
    // <div style={itemDivStyle}>
    <div className ={CmtListItemobj.itemDiv}>
      <h3>data:{props.user}</h3>
      <p>{props.content}</p>
    </div>
  )
}

export default CmtListItem