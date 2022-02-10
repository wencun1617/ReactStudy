import React from "react";
// React.PureComponent

//React.PureComponent 与 React.Component 很相似。
// 两者的区别在于 React.Component 并未实现 shouldComponentUpdate()，
// 而 React.PureComponent 中以浅层对比 prop 和 state 的方式来实现了该函数。

// 如果赋予 React 组件相同的 props 和 state，render() 函数会渲染相同的内容，
// 那么在某些情况下使用 React.PureComponent 可提高性能

// React.PureComponent 中的 shouldComponentUpdate() 仅作对象的浅层比较。
// 如果对象中包含复杂的数据结构，则有可能因为无法检查深层的差别，产生错误的比对结果

// 仅在你的 props 和 state 较为简单时，才使用 React.PureComponent，
// 或者在深层数据结构发生变化时调用 forceUpdate() 来确保组件被正确地更新。

// 此外，React.PureComponent 中的 shouldComponentUpdate() 将跳过所有子组件树的 prop 更新。
// 因此，请确保所有子组件也都是“纯”的组件。

// React.memo  高阶组件

// 如果你的组件在相同 props 的情况下渲染相同的结果，那么你可以通过将其包装在 React.memo 中调用，
//以此通过记忆组件渲染结果的方式来提高组件的性能表现。
// 这意味着在这种情况下，React 将跳过渲染组件的操作并直接复用最近一次渲染的结果。

// React.memo 仅检查 props 变更。
// 如果函数组件被 React.memo 包裹，且其实现中拥有 useState，useReducer 或 useContext 的 Hook，
// 当 state 或 context 发生变化时，它仍会重新渲染。

// 默认情况下其只会对复杂对象做浅层对比，如果你想要控制对比过程，那么请将自定义的比较函数通过第二个参数传入来实现。

function MyComponent(props) {
  /* 使用 props 渲染 */
}
function areEqual(prevProps, nextProps) {
  /*
    如果把 nextProps 传入 render 方法的返回结果与
    将 prevProps 传入 render 方法的返回结果一致则返回 true，
    否则返回 false
    */
}
export default React.memo(MyComponent, areEqual);


// 与 class 组件中 shouldComponentUpdate() 方法不同的是，
// 如果 props 相等，areEqual 会返回 true(意味着跳过渲染组件的操作并直接复用最近一次渲染的结果)；
// 如果 props 不相等，则返回 false(重新渲染组件)

// 这与 shouldComponentUpdate 方法的返回值相反。
// props 相等, 返回false 无需渲染  
// 不相等， 返回true 重新渲染