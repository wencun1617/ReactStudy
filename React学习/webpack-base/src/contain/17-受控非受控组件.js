import React, { PureComponent,createRef } from 'react'
import ReactDOM from 'react-dom'

// 受控 非受控组件 ----> 处理表单元素的数据方式

// 在React中，HTML表单的处理方式和普通的DOM元素不太一样：表单元素(值value) 通常会保存在一些内部的state

// 在 HTML 中，表单元素（如<input>、 <textarea> 和 <select>）之类的表单元素通常自己维护 state(value)，并根据用户输入进行更新(就是一输入便显示出来)
// 而在 React 中，可变状态（mutable state）通常保存在组件的 state 属性中，并且只能通过使用 setState()来更新

// 例如, React中表单元素(<input>、 <textarea> 和 <select> .....), 没有onChange会有警告(设置为只读也可消除), 且输入值不会显示 (不会像HTML里,一输入就显示出来), 
// value必须保存在组件的 state 属性中(既value的值来自组件的state ---> React的state成为"唯一数据源"), 
// 然后自己手动通过setState()来更新 --> 渲染表单的 React 组件还控制着用户输入过程中表单发生的操作 --> 被 React 以这种方式控制取值的表单输入元素就叫做"受控组件"


// 受控组件提交表单

//#region input
// class App extends PureComponent {
//   constructor(props) {
//     super(props);

//     this.state = {
//       username: ""
//     }
//   }

//   render() {
//     const {username} = this.state;

//     return (
//       <div>
//         <form onSubmit={e => this.handleSubmit(e)}>
//           <label htmlFor="username">
//             用户名: 
//             <input type="text" 
//                    id="username" 
//                    onChange={e => this.handleUsernameChange(e)} 
//                    value={username}/>
//           </label>
//           <input type="submit" value="提交"/>
//         </form>
//       </div>
//     )
//   }

//   handleUsernameChange(event) {
//     this.setState({
//       // 通过事件参数 e 来获取  ref也可以哦
//       username: event.target.value
//     })
//   }

//   handleSubmit(event) {
//     console.log(event.target)
//     console.log(this.state.username);
//     event.preventDefault();
//   }
// }
//#endregion

//#region textarea标签
// class App extends PureComponent {
//   constructor(props) {
//     super(props);

//     this.state = {
//       article: "请编写你喜欢的文章"
//     }
//   }

//   render() {
//     return (
//       <div>
//         <form onSubmit={e => this.handleSubmit(e)}>
//           <label htmlFor="article">
//             <textarea id="article" cols="30" rows="10"
//                       value={this.state.article}
//                       onChange={e => this.handleArticelChange(e)}/>
//           </label>
//           <div>
//             <input type="submit" value="发布文章"/>
//           </div>
//         </form>
//       </div>
//     )
//   }

//   handleArticelChange(event) {
//     this.setState({
//       article: event.target.value
//     })
//   }

//   handleSubmit(event) {
//     console.log(this.state.article);
//     event.preventDefault();
//   }
// }

//#endregion

//#region select标签
// 不需要通过selected属性来控制哪一个被选中，它可以匹配state的value来选中
// state的value 和 <option value="apple"></option> 里的value 便是选中
// class App extends PureComponent {
//   constructor(props) {
//     super(props);

//     this.state = {
//       fruits: "orange"
//     }
//   }

//   render() {
//     return (
//       <div>
//         <form onSubmit={e => this.handleSubmit(e)}>
//           <label htmlFor="fruits">
//             <select id="fruits" 
//                     value={this.state.fruits}
//                     onChange={e => this.handleFruitsChange(e)}>
//               <option value="apple">苹果</option>
//               <option value="orange">橘子</option>
//               <option value="banana">香蕉</option>
//             </select>
//           </label>
//           <div>
//             <input type="submit" value="提交"/>
//           </div>
//         </form>
//       </div>
//     )
//   }

//   handleFruitsChange(event) {
//     this.setState({
//       fruits: event.target.value
//     })
//   }

//   handleSubmit(event) {
//     console.log(this.state.fruits);
//     event.preventDefault();
//   }
// }
//#endregion 

//#region ES6语法:计算属性名  []
// let i = 0
// let a = {
//   ['foo' + ++i]: i,
//   ['foo' + ++i]: i,
//   ['foo' + ++i]: i
// }

// console.log(a.foo1) // 1
// console.log(a.foo2) // 2
// console.log(a.foo3) // 3

// let param = 'size'
// let config = {
//   [param]: 12,
//   ['mobile' + param.charAt(0).toUpperCase() + param.slice(1)]: 4
// }

// console.log(config) // {size: 12, mobileSize: 4}
//#endregion

//#region 处理多个输入 ---> 使用计算属性名,减少相似函数的书写
// class App extends PureComponent {
//   constructor(props) {
//     super(props);

//     this.state = {
//       username: "",
//       password: ""
//     }
//   }

//   render() {
//     const {username, password} = this.state;

//     return (
//       <div>
//         <form onSubmit={e => this.handleSubmit(e)}>
//           <label htmlFor="username">
//             用户: 
//             <input type="text" 
//                    id="username" 
//                    name="username"
//                    onChange={e => this.handleChange(e)} 
//                    value={username}/>
//           </label>
//           <div style={{marginBottom: '20px'}}>
//             <hr/>
//           </div>
//           <label htmlFor="password">
//             密码: 
//             <input type="text" 
//                    id="password" 
//                    name="password"
//                    onChange={e => this.handleChange(e)} 
//                    value={password}/>
//           </label>
//           <hr/>
//           <input type="submit" value="提交"/>
//         </form>
//       </div>
//     )
//   }

//   handleChange(event) {
//     this.setState({
//       [event.target.name]: event.target.value
//     })
//   }

//   handleSubmit(event) {
//     console.log(this.state.username, this.state.password);
//     event.preventDefault();
//   }
// }

//#endregion

//#region 非受控组件
// React推荐大多数情况下使用 受控组件 来处理表单数据

// 一个受控组件中，表单数据是由 React 组件来管理的(state)
// 另一种替代方案是使用非受控组件，这时表单数据将交由 DOM 节点来处理  ---> 使用defaultValue来设置默认值
// <input type="checkbox"> 和 <input type="radio"> 支持 defaultChecked，<select> 和 <textarea> 支持 defaultValue
class App extends PureComponent {
  constructor(props) {
    super(props);

    this.usernameRef = createRef();
  }

  render() {
    return (
      <div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor="">
            用户:<input defaultValue="username" type="text" name="username" ref={this.usernameRef}/>
          </label>
          <input type="submit" value="提交"/>
        </form>
      </div>
    )
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.usernameRef.current.value);
  }
}

//#endregion

ReactDOM.render(<App/>,document.getElementById('app'))