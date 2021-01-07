import React, { PureComponent, createRef, forwardRef,Fragment} from 'react';
import ReactDOM from 'react-dom'

//#region   ref转发
// Ref 转发是一个可选特性，其允许某些组件接收 ref，并将其向下传递（换句话说，"转发"它）给子组件
// 子组件接收ref, 以便访问其 DOM 节点

//Home 用 React.forwardRef 来获取传递给它的 ref，然后转发到它渲染的 DOM button
// React.forwardRef 接受一个渲染函数，其接收 props 和 ref 参数并返回一个 React 节点
/*
const Home = forwardRef(function(props, ref) {
  // console.log(props,ref) // {} {current: null}
  return (
    <div>
      <h2 ref={ref}>Home</h2>
      <button>按钮</button>
    </div>
  )
})

//#region 类Home
// class Home extends PureComponent {
//   render() {
//     return (
//       <div>
//         <h2>Home</h2>
//         <button>按钮</button>
//       </div>
//     )
//   }
// }
//#endregion

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.homeTitleRef = createRef();
  }

  render() {
    return (
      <div>
        <Home ref={this.homeTitleRef}/>
        <button onClick={e => this.printInfo()}>打印ref</button>
      </div>
    )
  }

  printInfo() {

    //当 ref 属性用于自定义 class 组件时，ref 对象接收组件的挂载实例作为其 current 属性
    // if Home是类组件 ----> this.homeTitleRef.current 拿到的是 Home实例    (用于获取组件中的实例方法)
    
    // 函数式组件是没有实例的，所以无法通过ref获取他们的实例 ---> 通过 React.forwardRef获取函数式组件中的某个DOM元素
    // this.homeTitleRef.current 拿到的是接收 ref转发的 DOM元素      (用于获取函数式组件中的DOM元素)
    console.log(this.homeTitleRef.current); // <h2>Home</h2>

    // 步骤如下
    // 1. 通过调用 React.createRef 创建了一个 React ref 并将其赋值给实例属性 this.homeTitleRef
    // 2. 通过指定 ref 为 JSX (Home组件)属性，将其向下传递给 <Home ref={this.homeTitleRef}/>
    // 3. React 传递 ref 给 forwardRef 内函数 (props, ref) => ...，作为其第二个参数
    // 4. 向下转发该 ref 参数到 <h2 ref={ref}>Home</h2>，将其指定为 JSX 属性
    // 5. 当 ref 挂载完成，this.homeTitleRef.current 将指向 <h2> DOM 节点

    // 第二个参数 ref 只在使用 React.forwardRef 定义组件时存在。常规函数和 class 组件不接收 ref 参数，且 props 中也不存在 ref。
    // Ref 转发不仅限于 DOM 组件，你也可以转发 refs 到 class 组件实例中
  }
}
*/
//#endregion

//#region 在高阶组件中转发 refs

// “logProps” HOC 透传（pass through）所有 props 到其包裹的组件，所以渲染结果将是相同的
// LogProps 传所有props  ---> FancyButton
// refs 将不会透传下去。这是因为 ref 不是 prop 属性。就像 key 一样，其被 React 进行了特殊处理。

//#region 对 HOC 添加 ref，该 ref 将引用最外层的容器组件，而不是被包裹的组件
// function logProps(WrappedComponent) {
//   class LogProps extends React.Component {
//     componentDidUpdate(prevProps) {
//       console.log('old props:', prevProps);
//       console.log('new props:', this.props);
//     }

//     render() {
//       console.log(this)
//       return <WrappedComponent {...this.props} />;
//     }
//   }

//   return LogProps;
// }
//#endregion

//使用 React.forwardRef API 明确地将 refs 转发到内部的 FancyButton 组件
//React.forwardRef 接受一个渲染函数，其接收 props 和 ref 参数并返回一个 React 节点
// function logProps(Component) {
//   class LogProps extends React.Component {
//     componentDidUpdate(prevProps) {
//       console.log('old props:', prevProps);
//       console.log('new props:', this.props);
//     }

//     render() {
//       console.log(this.props) // {mean: "judge v.判决,审判 n. 法官,裁判员", forwardedRef: {…}}

//       // const {forwardedRef} = this.props;
//       // // 将自定义的 prop 属性 "forwardedRef" 传递给 ref
//       // // {...this.props} 这样子把this.props全解构出来, 这样props里的forwardedRef便多余了
//       // return <Component ref={forwardedRef} {...this.props} />;
      
//       // 推荐
//       const {forwardedRef,...aaa} = this.props;
//       // aaa便是 this.props里除去forwardedRef的部分
//       // 将自定义的 prop 属性 "forwardedRef" 传递给 ref
//       return <Component ref={forwardedRef} {...aaa} />;
//     }
//   }

//   // 注意 React.forwardRef 回调的第二个参数 "ref"。
//   // 我们可以将其作为常规 prop 属性传递给 LogProps，例如 "forwardedRef"
//   // 然后它就可以被挂载到被 LogProps 包裹的子组件上。
//   // return React.forwardRef((props, ref) => {
//   //   // DevTools 里不会把forwardedRef弄到便签上
//   //   return <LogProps {...props} forwardedRef={ref} />;
//   // });


//   // 在 DevTools 中显示自定义名称
//   function judgemental(props, ref) {
//     return <LogProps {...props} forwardedRef={ref} />;
//   }
//   // judgemental.displayName = 'liquid'
//   judgemental.displayName = `${Component.name}kkk`
//   return React.forwardRef(judgemental)


// }

// class FancyButton extends React.Component {
//   focus() {
//     console.log(" FancyButton 的focus方法")
//   }
//   render() {
//     return (
//       <div> FancyButton组件</div>
//     )
//   }
// }

// const UseLogProps = logProps(FancyButton)

// class App extends PureComponent {
//   constructor(props) {
//     super(props)

//     this.refTest = React.createRef()
//   }
//   render() {
//     return (
//       <div>
//         {/* 对 HOC 添加 ref，该 ref 将引用最外层的容器组件，而不是被包裹的组件, */}
//         {/* 意味着用于我们 UseLogProps组件的 refs 实际上将被挂载到 LogProps 组件 */}
//         <UseLogProps mean="judge v.判决,审判 n. 法官,裁判员" ref={this.refTest}/>
//       </div>
//     )
//   }
// }

//#endregion

//#region portal   ---> 父组件里拿数据后渲染到别的地方？
// 将子节点渲染到存在于父组件以外的 DOM 节点  ?? 

// 创建 portal。Portal 将提供一种将子节点渲染到 DOM 节点中的方式，该节点存在于 DOM 组件的层次结构之外
// ReactDOM.createPortal(child, container)
// 第一个参数（child）是任何可渲染的 React 子元素，例如一个元素，字符串或 fragment   ----> 用来渲染的
// 第二个参数（container）是一个 DOM 元素    ----> 渲染到的地方


// class Modal extends PureComponent {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     console.log(this.props.children)
//     //脱离了父组件(Modal), 渲染到了父组件以外的 DOM 节点
//     // 创建 portal。Portal 将提供一种将子节点渲染到 DOM 节点中的方式，该节点存在于 DOM 组件(Modal) 的层次结构之外
//     return ReactDOM.createPortal(
//       this.props.children,
//       document.getElementById("modal")
//     )
//   }

//   // render() {
//   //   console.log(this.props.children)
//   //   return (
//   //     <div>
//   //       <h4>Modal里的</h4>
//   //       {this.props.children}
//   //     </div>
//   //   )
//   // }
// }

// class App extends PureComponent {
//   render() {
//     return (
//       <div>
//         <Modal>
//           {/* 相当于传递props给子组件 children为属性名,子组件接收但 没有使用便不会渲染*/}
//           <h2>测试Portals</h2>
//         </Modal>
//       </div>
//     )
//   }
// }

// 没作用 ？？
// ReactDOM.createPortal(
//   "哈哈",
//   document.getElementById("app")
// )

//#endregion

//#region Fragment ----> 去掉多余的包裹的根标签(div...)   <React.Fragment> </React.Fragment> / 短语法声明 Fragments (<> </>)

// Fragments 允许将子列表分组，而无需向 DOM 添加额外节点(多余的根节点div)
// key 是唯一可以传递给 Fragment 的属性。未来可能会添加对其他属性的支持，例如事件

// 新的,更简短的语法 (短语法) 来声明 Fragments。它看起来像空标签 ---->  <> </>
// 可以像使用任何其他元素一样使用 <> </>，除了它不支持 key 或属性。
// class App extends PureComponent {
//   render() {
//     return (
//       <Fragment>
//         <li>concern n.关系,担忧 vt.涉及,关系到,使担心</li>
//         <li>show concern for sb.  对某人关心</li>
//         <li>concern the future 关系到未来</li>
//         <li>concern one's health 担心某人的健康</li>
//         <li>express concern over... 表达对...的担忧</li>
//       </Fragment>
//     )
//   }
// }

//#endregion

//#region StrictMode(严格模式)  https://zh-hans.reactjs.org/docs/strict-mode.html#gatsby-focus-wrapper
// StrictMode 是一个用来突出显示应用程序中潜在问题的工具
// 1. 与 Fragment 一样，StrictMode 不会渲染任何可见的 UI。
// 2. 它为其后代元素触发额外的检查和警告。
// 3. 严格模式检查仅在开发模式下运行; 它们不会影响生产构建

//#region  可以为应用程序的任何部分启用严格模式, eg:

//不会对 Header 和 Footer 组件运行严格模式检查。但是 ComponentOne 和 ComponentTwo 以及它们的所有后代元素都将进行检查
// function ExampleApplication() {
//   return (
//     <div>
//       <Header />
//       <React.StrictMode>
//         <div>
//           <ComponentOne />
//           <ComponentTwo />
//         </div>
//       </React.StrictMode>
//       <Footer />
//     </div>
//   );
// }
//#endregion

// StrictMode 目前有助于: 
// 1. 识别不安全的生命周期
    // 某些过时的生命周期方法在异步 React 应用程序中使用是不安全的

// 2. 关于使用过时字符串 ref API 的警告
// 3. 关于使用废弃的 findDOMNode 方法的警告

// 4.检测意外的副作用
    // 严格模式采用故意重复调用方法（如组件的构造函数...）的方式，使得这种 bug 更容易被发现

    // 严格模式不能自动检测到你的副作用，但它可以帮助你发现它们，使它们更具确定性。通过故意重复调用以下函数来实现的该操作
        //class 组件的 constructor，render 以及 shouldComponentUpdate 方法
        // class 组件的生命周期方法 getDerivedStateFromProps
        // 函数组件体
        // 状态更新函数 (即 setState 的第一个参数）
        // 函数组件通过使用 useState，useMemo 或者 useReducer
    // 这仅适用于开发模式。生产模式下生命周期不会被调用两次

class Home extends PureComponent {
  constructor(props) {
    super(props);
    // 打印了两次
    // 严格模式下故意进行的操作，让你来查看在这里写的一些逻辑代码被调用多次时，是否会产生一些副作用
    console.log("home constructor");
  }

  UNSAFE_componentWillMount() {
    // 过时的生命周期方法
    console.log("home componentWillMount");
  }

  render() {
    // 过时字符串 ref API
    return <h2 ref="home">Home</h2>
  }
}
class App extends PureComponent {
  render() {
    return (
      <div>
        <h3>app组件</h3>
        <React.StrictMode>
          <Home />
        </React.StrictMode>
      </div>
    )
  }
}
// 5.检测过时的 context API
    // 过时的 context API 容易出错，将在未来的主要版本中删除
//#endregion

ReactDOM.render(<App/>,document.getElementById('app'))