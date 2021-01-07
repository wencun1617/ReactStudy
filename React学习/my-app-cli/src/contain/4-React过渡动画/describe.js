
// 给组件的显示和消失添加某种过渡动画,增加用户体验
// 可以通过原生的CSS来实现这些过渡动画，但是React社区为我们提供了react-transition-group用来完成过渡动画

// react-transition-group
// 方便的实现组件的 入场 和 离场 动画，使用时需要进行额外的安装 npm install react-transition-group --save

// react-transition-group主要包含四个组件
    // 1. Transition
      // 该组件是一个和平台无关的组件（不一定要结合CSS）；
      // 在前端开发中，我们一般是结合CSS来完成样式，所以比较常用的是CSSTransition
    // 2. CSSTransition
      // 在前端开发中，通常使用CSSTransition来完成过渡动画效果
    // 3. SwitchTransition
      // 两个组件显示和隐藏切换时，使用该组件
    // 4. TransitionGroup
      // 将多个动画组件包裹在其中，一般用于列表中元素的动画；