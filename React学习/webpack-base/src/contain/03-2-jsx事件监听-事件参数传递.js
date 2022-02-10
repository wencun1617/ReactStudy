import React from 'react'
import ReactDOM from 'react-dom'

//#region 类中的实例方法中的this undefined的原因
/*

  // 1. 实例方法放在类的原型对象上，供实例使用
  // 2. 通过类的实例调用实例方法，实例方法中的this便是该实例对象
  
  // 3. 由于实例方法(btnClick) 是作为onClick的回调，所以不是通过实例调用的而是直接调用
        又由于类中的方法默认开启了严格模式，所以实例方法中的this便不为window，而是undefined

    bing 生成新的函数，改变函数中的this指向
*/
//#endregion



//jsx 事件监听
// React 中的事件监听 两点区别
// 1.React事件的命名采用小驼峰式
// 2.需要通过 {} 传入事件处理函数, 该函数会在事件发生时被执行

class Example extends React.Component {
  constructor() {
    super()

    this.state = {
      message: 'valid adj. 有效的, 合理的, 有根据的'
    }

    //子类挂载独有的实例属性 法一
    // this.btnClick = this.btnClick.bind(this)
  }
  render() {
    //this 表示当前组件的实例对象
    return (
      <div>
        {this.state.message}
        <hr/>
        {/* <button onClick={this.btnClick}></button> */}
        {/* 法三 <button onClick={() => this.btnClick()}></button> */}
        <button onClick={e => this.btnClick(e)}></button>
      </div>
    )
  }

  //#region  //this ----> undefined 原因
  // 正常DOM操作, 监听点击, 监听函数中的this其实是节点对象(eg button 对象)
  //#endregion

  //解决 this --> undefined
  //法一:
  //bind 给btnclick函数显示绑定this  (在传入函数时,给函数直接绑定 this)
  //<button onClick={this.btnClick.bind(this)}></button>

  // btnClick() {
  //   this.setState({
  //     message: 'stamp n.印,章,邮票 v.盖章,标出,表示,跺脚'
  //   }) 
  // }

  //法二:
  //ES6 class field语法
  //此处 将btnClick的定义变成一种赋值语句  ------->  ES6中给类定义属性的方法 称为 class field语法
  //赋值时使用了箭头函数, 当前函数中的this会去上一个作用域中查找

  // btnClick = () => {
  //   this.setState({
  //     message: 'stamp n.印,章,邮票 v.盖章,标出,表示,跺脚。。'
  //   }) 
  // }

  //法三:
  //事件监听时传入箭头函数(recommend v.推荐,介绍,劝告,建议)
  // 直接定义一个箭头函数传入，没有执行
  //传入箭头函数的函数体是需要执行的代码,直接执行 this.btnClick()
  // 当点击时, 执行该箭头函数的函数体,而该箭头函数的函数体是 执行函数调用
  //<button onClick={() => this.btnClick()}></button>
  btnClick(e) {
    
    //e 事件的参数传递
    //用不到this,直接传入函数便可获取到event对象
    //<button onClick={this.btnClick}></button>

    // 有更多参数时，传入一个箭头函数,箭头函数的函数体为 主动执行的事件函数,并传入相关的其他参数
    //<button onClick={e => this.btnClick(e[,item,index...])}></button>
    console.log(e)

    //#region 深入理解setState

    // setstate方法是从Component中继承过来的
    // 当调用setState时,会重新执行render函数,根据最新的 state 来创建 ReactElement 对象
    // 再根据最新的 ReactElement 对象, 对DOM 进行修改

    // setState 为何设计为异步?
      // 显著提升性能
          // if 每次调用setState都进行一次更新,那么意味着 render函数会频繁被调用,界面重新渲染,这样效率很低
          // 最好的办法应该是获取到多个更新, 之后进行批量更新
      // 如果同步更新了state,但还没有执行render函数, 那么state 和 props 不能保持同步 
          // state 和 props 不能保持一致,会在开发中产生很多问题
    
    // setState 一定是异步？
    // 分为两种情况
        // 在组件生命周期或 React 合成事件中, setState 是异步的
        // 在setTimeout或者原生 dom 事件中, setState 是同步的
    // React中是通过一个函数来确定的 ----> enqueueSetState
    // Sync是优先级最高的,既创建就更新
    
    //#region setState 的合并

      //1.数据的合并
          // 只会更改对应的state状态,而不会覆盖其他的 state 状态
          // 原因:源码中其实 有对原对象和新对象进行合并的     ----> Object.assign(target,...sources)

      //2.多个setState合并

          //2.1 
          // eg:counter只会是 + 1,因为它会对多个state进行合并
          // 在源码的processUpdateQueue.js中有一个do...while循环，就是从队列中取出多个state进行合并的
          // increment() {
          //   this.setState({
          //     counter: this.state.counter + 1
          //   });

          //   this.setState({
          //     counter: this.state.counter + 1
          //   });

          //   this.setState({
          //     counter: this.state.counter + 1
          //   });
          // }

          //2.2
          // eg: 如何可以做到，让counter +3 呢？
          // 原因是多个state进行合并时，每次遍历，都会执行一次函数 (传入的函数被多次执行)
          // increment() {
          //   this.setState((state, props) => {
          //     return {
          //       counter: state.counter + 1
          //     }
          //   })

          //   this.setState((state, props) => {
          //     return {
          //       counter: state.counter + 1
          //     }
          //   })

          //   this.setState((state, props) => {
          //     return {
          //       counter: state.counter + 1
          //     }
          //   })
          // }

    //#endregion

    // setState性能优化
      //React更新机制

        //React的渲染流程
            // JSX ----> 虚拟DOM ----> 真实DOM (jsx到虚拟DOM到真实DOM)
        //React的更新流程 
            // props/state改变 ----> render函数重新执行 ----> 产生新的DOM树----> 新旧DOM树进行diff ----> 计算出差异进行更新 ----> 更新到真实DOM
            // React在props或state发生改变时，会调用React的render方法，会创建一颗不同的树。

            // React需要基于这两颗不同的树之间的差别来判断如何有效的更新UI
            // 如果一棵树参考另外一棵树进行完全比较更新，那么即使是最先进的算法，该算法的复杂程度为 O(n^3)，其中 n 是树中元素的数量
                //eg:如果在 React 中使用了该算法，那么展示1000个元素所需要执行的计算量将在十亿的量级范围；这个开销太过昂贵了，React的更新性能会变得非常低效
            // React对这个算法进行了优化，将其优化成了O(n)
              //同层节点之间相互比较，不会垮节点比较；
              // 不同类型的节点，产生不同的树结构；
              // 开发中，可以通过key来指定哪些节点在不同的渲染下保持稳定

          //#region Diffing算法

              //#region 1.对比不同类型的元素 
                // 当节点为不同的元素，React会拆卸原有的树，并且建立起新的树
                  //<1> 当一个元素从 <a> 变成 <img>，从 <Article> 变成 <Comment>，或从 <Button> 变成 <div> 都会触发一个完整的重建流程
                  //<2>当卸载一棵树时，对应的DOM节点也会被销毁，组件实例将执行 componentWillUnmount() 方法
                  //<3>当建立一棵新的树时，对应的 DOM 节点会被创建以及插入到 DOM 中，组件实例将执行 constructor --> getDerivedStateFromProps --> render -->componentDidMount
                // React 会销毁 Counter 组件并且重新装载一个新的组件，而不会对Counter进行复用
                  // <div>
                  //   <Counter />
                  // </div>
                  
                  //<span>
                  //   <Counter />
                  // </span>
              
              //#endregion

              //#region 2.对比同一类型的元素
                // 当比对两个相同类型的 React 元素时，React 会保留 DOM 节点，仅比对及更新有改变的属性
                  // 通过比对这两个元素，React 知道只需要修改 DOM 元素上的 className 属性
                    // <div style={{color: 'red', fontWeight: 'bold'}} />
                    // <div style={{color: 'green', fontWeight: 'bold'}} />
                  // 当更新 style 属性时，React 仅更新有所更变的属性
                  // 通过比对这两个元素，React 知道只需要修改 DOM 元素上的 color 样式，无需修改 fontWeight
                    // <div style={{color: 'red', fontWeight: 'bold'}} />
                    // <div style={{color: 'green', fontWeight: 'bold'}} />

                //如果是同类型的组件元素
                  // 组件会保持不变，React会更新该组件的props，并且调用 getDerivedStateFromProps() 方法
                  // 下一步，ShouldComponentUpdate --> render，diff 算法将在之前的结果以及新的结果中进行递归
              //#endregion

              //#region  3.对子节点进行递归 
                //在默认条件下，当递归 DOM 节点的子元素时，React 会同时遍历两个子元素的列表；当产生差异时，生成一个 mutation
                  // 在最后插入一条数据的情况 ---> 最后一个比较，产生一个mutation，将其插入到新的DOM树中即可
                  // 在中间插入一条数据 ---> React会对每一个子元素产生一个mutation，而不是保持 <li>星际穿越</li>和<li>盗梦空间</li> 的不变,这种低效的比较方式会带来一定的性能问题
                //  keys的优化 ---> 当子元素(这里的li)拥有 key 时，React 使用 key 来匹配原有树上的子元素以及最新树上的子元素：
                  // 在下面这种场景下，key为111和222的元素仅仅进行位移，不需要进行任何的修改,将key为333的元素插入到最前面的位置即可
                  // key的注意事项：
                  // 1.key应该是唯一的；
                  // 2.key不要使用随机数（随机数在下一次render时，会重新生成一个数字）；
                  // 3.使用index作为key，对性能是没有优化的
              //#endregion

              //#region SCU的优化 --> shouldComponentUpdate
                // 只要是修改了App中的数据，所有的组件都需要重新render，进行diff算法，性能必然是很低的
                // 事实上，很多的组件没有必须要重新render；
                // 它们调用render应该有一个前提，就是依赖的数据（state、props）发生改变时 ---> getDerivedStateFromProps --> shouldComponentUpdate ---> render

                //  shouldComponentUpdate
                  // 这个方法接受参数，并且需要有返回值
                  // 该方法有两个参数：
                      // 参数一：nextProps 修改之后，最新的props属性
                      // 参数二：nextState 修改之后，最新的state属性
                  // 该方法返回值是一个boolean类型
                      // 返回值为true，那么就需要调用render方法；
                      // 返回值为false，那么久不需要调用render方法；
                      //默认返回的是true，也就是只要state发生改变，就会调用render方法

                // 如果所有的类，我们都需要手动来实现 shouldComponentUpdate，那么会给开发者增加非常多的工作量
                // shouldComponentUpdate中的各种判断的目的 ---> 根据props/state中的数据是否发生了改变，来决定shouldComponentUpdate返回true或者false
                // React已经默认帮我们实现好 ---> 将 class 继承自 PureComponent
                // PureComponent的原理 ---> 对props和state进行浅层比较
                // 函数式组件 ---> 使用高阶组件memo
                // eg: const MemoHeader = memo(function() {
                    //   console.log("Header Render 被调用");
                    //   return <h2>Header</h2>
                    // })
                    
              //#endregion
          //#endregion

    //#endregion
    this.setState({
      message: 'stamp n.印,章,邮票 v.盖章,标出,表示,跺脚'

    },() => {//回调函数, 或者也可在生命周期函数componentDidUpdate里   ------> 获取到更新后的 state 的值
      console.log(this.state.message) 
    })
  }
}




//创建虚拟DOM元素
let mydiv = <div>
  <Example></Example>
</div>

//使用render函数进行渲染
let divApp = document.getElementById('app')
ReactDOM.render(mydiv,divApp)