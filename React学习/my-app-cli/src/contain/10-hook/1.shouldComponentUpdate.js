

// 根据 shouldComponentUpdate() 的返回值，判断 React 组件的输出是否受当前 state 或 props 更改的影响
// 默认行为是 state 每次发生变化组件都会重新渲染

// 当 props 或 state 发生变化时，shouldComponentUpdate() 会在渲染执行之前被调用。返回值默认为 true。
// 首次渲染或使用 forceUpdate() 时不会调用该方法


// 此方法仅作为性能优化的方式而存在。不要企图依靠此方法来“阻止”渲染，因为这可能会产生 bug。
// 应该考虑使用内置的 PureComponent 组件，而不是手动编写 shouldComponentUpdate()。
// PureComponent 会对 props 和 state 进行浅层比较，并减少了跳过必要更新的可能性。

// shouldComponentUpdate(nextProps, nextState)
//如果你一定要手动编写此函数，可以将 this.props 与 nextProps 以及 this.state 与nextState 进行比较，并返回 false 以告知 React 可以跳过更新。
// 请注意，返回 false 并不会阻止子组件在 state 更改时重新渲染
