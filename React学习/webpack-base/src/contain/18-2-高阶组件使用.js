import React, { PureComponent,createContext } from 'react';
import ReactDOM from 'react-dom'

// 高阶组件的使用

//#region props的增强

//不修改原有代码的情况下，添加新的props ----> 原来的props传递和接收方式没有改变, 新的props传递不通过父组件,而是通过高阶组件对某个组件增强props
// class Header extends PureComponent {
//   render() {
//     const { name, age, height } = this.props;
//     return <h2>Header {name + ' ' + age + ' ' + height}</h2>
//   }
// }

// class App extends PureComponent {
//   render() {
//     return (
//       <div>
//         <Header  name="aaa" age={18}/>
//         <EnhanceHeader name="aaa" age={18}/>
//       </div>
//     )
//   }
// }

//通过一个高阶组件，让使用者在不破坏 原有结构(props的提供者) 的情况下对某个组件增强props：
// 原来该怎么传就怎么传, 新的props通过高阶组件来传
function enhanceProps(WrapperCpn, otherProps) {
  return (
    // props 便是 传给 EnhanceHeader的props  {name: "aaa",age: 18}     {test: "test", nickname: "why", level: 90}(下面的利用高阶组件来共享Context)
    props => {
      console.log("props增强",props)
      //HOC 透传（pass through）所有 props({test: "test", nickname: "why", level: 90}) 到其包裹的组件 
      // otherProps ---> 增强props
      return <WrapperCpn {...props} {...otherProps} />
    }
  )
 }
 
// const EnhanceHeader = enhanceProps(Header, {height: 1.88})

//#endregion


//#region 利用高阶组件来共享Context ----> 高阶组件打结构,减少重复的代码
const UserContext = createContext({
  nickname: "默认",
  level: -1
})

// 高阶组件打结构
function withUser(WrapperCpn) {
  return props => {
    console.log('高阶组件',props) // {test: "test"}

    return (
      <UserContext.Consumer>
        {
          // Provider提供的参数value {nickname: "why", level: 90} 
          // 父组件通过 props传进来的参数 test = 'test' --->   <UserHeader test = 'test'/>
          value => {
            return <WrapperCpn {...props} {...value}/>
          }
        }
      </UserContext.Consumer>
    )
  }
}

//#region 没用高阶组件较麻烦,重复的结构代码
// function Header(props) {
//   return (
//     <UserContext.Consumer>
//       {
//         value => {
//           const { nickname, level } = value;
//           return <h2>Header {"昵称:" + nickname + "等级" + level}</h2>
//         }
//       }
//     </UserContext.Consumer>
//   )
// }
//#endregion
function Header(props) {
  const { nickname, level } = props;
  return <h2>Header {"昵称:" + nickname + "等级:" + level}</h2>
}

function Footer(props) {
  const { nickname, level } = props;
  return <h2>Footer {"昵称:" + nickname + "等级:" + level}</h2>
}

// props增强
const EnhanceHeader = enhanceProps(Header, { height: 1.88 })

const UserHeader = withUser(EnhanceHeader);
const UserFooter = withUser(Footer);

class App extends PureComponent {
  render() {
    return (
      <div>
        <UserContext.Provider value={{ nickname: "kkk", level: 90 }}>
          <UserHeader test = 'test'/>
          <UserFooter />
        </UserContext.Provider>
      </div>
    )
  }
}
//#endregion

//#region 渲染判断鉴权
// 场景
// 某些页面是必须用户登录成功才能进行进入；
// 如果用户没有登录成功，那么直接跳转到登录页面

// function LoginPage() {
//   return <h2>LoginPage</h2>
// }

// function CartPage() {
//   return <h2>CartPage</h2>
// }

// 高阶组件判断渲染
// function loginAuth(Page) {

//   // props 为 {isLogin: true}
//   return props => {
//     if (props.isLogin) {
//       console.log("3",props)
//       return <Page {...props}/>
//     } else {
//       return <LoginPage/>
//     }
//   }
// }

// const AuthCartPage = loginAuth(CartPage);

// class App extends PureComponent {
//   render() {
//     return (
//       <div>
//         <AuthCartPage isLogin={true}/>
//       </div>
//     )
//   }
// }

//#endregion

//#region 生命周期劫持  ---> 高阶函数抽离公共代码
/*
function logRenderTime(WrapperCpn) {
  console.log(WrapperCpn.name)
  return class extends PureComponent {
    UNSAFE_componentWillMount() {
      this.begin = Date.now();
    }

    componentDidMount() {
      this.end = Date.now();
      const interval = this.end - this.begin;
      console.log(`${WrapperCpn.name}渲染使用时间:${interval}`)
    }

    render() {
      // console.log(this)
      return <WrapperCpn {...this.props}/>
      // return props => { //不行 ---> 这是高阶组件里用的。。。
      //     console.log(props,"propssss")
      //     return (
      //       <WrapperCpn {...props}/>
      //     )
      // }
    }
  }
}

class Home extends PureComponent {
  render() {
    return (
      <div>
        <h2>Home</h2>
        <p>我是home的元素,哈哈哈</p>
      </div>
    )
  }
}

class Detail extends PureComponent {
  render() {
    return (
      <div>
        <h2>Detail</h2>
        <p>我是detail的元素,哈哈哈</p>
      </div>
    )
  }
}

const LogHome = logRenderTime(Home);
const LogDetail = logRenderTime(Detail);

class App extends PureComponent {
  render() {
    return (
      <div>
        <LogHome mean = 'home组件'/>
        <LogDetail mean = 'detail组件'/>
      </div>
    )
  }
}
*/

//#endregion

//#region 高阶组件的意义  ---> 个人感觉 :组件的代加工厂,抽取组件间相同的代码...

// 其实早期的React有提供组件之间的一种复用方式是mixin，目前已经不再建议使用：
// Mixin 可能会相互依赖，相互耦合，不利于代码维护
// 不同的Mixin中的方法可能会相互冲突
// Mixin非常多时，组件是可以感知到的，甚至还要为其做相关处理，这样会给代码造成滚雪球式的复杂性

// 当然，HOC也有自己的一些缺陷：
// HOC需要在原组件上进行包裹或者嵌套(增加包裹或者嵌套标签?)，如果大量使用HOC，将会产生非常多的嵌套，这让调试变得非常困难；
// HOC可以劫持props，在不遵守约定的情况下也可能造成冲突；

// Hooks的出现，是开创性的，它解决了很多React之前的存在的问题，比如this指向问题、比如hoc的嵌套复杂度问题等等

//#endregion

ReactDOM.render(<App/>,document.getElementById('app'))