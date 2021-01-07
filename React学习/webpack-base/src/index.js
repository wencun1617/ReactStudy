import React from 'react'
import ReactDOM from 'react-dom'

// import '@/contain/12-绑定文本框的值'
// import '@/contain/13-父子组件通信'
// import '@/contain/14-非父子组件的通信'
// import '@/contain/14-1-动态Context'
// import '@/contain/14-2-在嵌套组件中更新 Context'
// import '@/contain/14-3-消费多个Context'
// import '@/contain/15-事件总线'
// import '@/contain/16-refs的使用'
// import '@/contain/17-受控非受控组件'
// import '@/contain/18-1-高阶组件基本'
import '@/contain/18-2-高阶组件使用'
// import '@/contain/18-3-组件补充'
// import '@/contain/19-React中的css'


//#region some
  // some() 方法测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值
  // 用一个空数组进行测试，在任何情况下它返回的都是false

  // 数组中有至少一个元素通过回调函数的测试就会返回true；所有元素都没有通过回调函数的测试返回值才会为false
  // 一为true立即返回,回调函数也不会再执行了
  // some() 被调用时不会改变原数组

  // const arr = [1,3,4,9,7]
  // const booleanTest = arr.some(item => {
  //   console.log(item) // 1,3,4,9
  //   return item > 8
  // })
  // console.log(booleanTest) // true
//#endregion

//#region find
  // find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined
  // 当找到了这样一个元素后，该方法会立即返回这个元素的值，之后回调函数也不会再执行了
  // find() 被调用时不会改变原数组

  // const arr = [1,3,4,9,7]
  // const elementTest = arr.find(item => {  //箭头函数
  //   console.log(this) 
  //   console.log(item) // 1,3,4,9
  //   return item > 8
  // },arr)
  // console.log(elementTest) // 9

  // const arr = [1,3,4,9,7]
  // const elementTest = arr.find(function (item) {  //普通函数
  //   console.log(this) // [1,3,4,9,7]
  //   console.log(item) // 1,3,4,9
  //   return item > 8
  // },arr)
  // console.log(elementTest) // 9

//#endregion

//#region findIndex
  // findIndex()方法返回数组中满足提供的测试函数的第一个元素的索引。否则返回-1
  // 当找到了这样一个元素后，该方法会立即返回这个元素的索引，之后回调函数也不会再执行了
  // findIndex() 被调用时不会改变原数组

  // const arr = [1,3,4,9,7]
  // const indexTest = arr.findIndex(item => {  //箭头函数
  //   console.log(item) // 1,3,4,9
  //   return item > 8
  // })
  // console.log(indexTest) // 索引 3
  
//#endregion

//#region filter
  // filter() 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。  
  // 一个新的、由 通过测试的元素 组成的数组，如果没有任何数组元素通过测试，则返回空数组
  // 遍历整个数组
  // filter 不会改变原数组，它返回过滤后的新数组。

  // const arr = [1,3,4,9,7]
  // const arrTest = arr.filter(item => {
  //   console.log(this) // undefined
  //   console.log(item) // 1,3,4,9,7
  //   return item < 8
  // })
  // console.log(arrTest) // [1,3,4,7]

//#endregion

//#region map
  // 方法创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值。
  // 一个由原数组每个元素执行回调函数的结果组成的新数组
  // 遍历整个数组
  // map 不修改调用它的原数组本身

  // const arr = [1,3,4,9,7]
  // const arrTest = arr.map(item => {
  //   console.log(item) // 1,3,4,9,7
  //   return item + 1
  // })
  // console.log(arrTest) // [2,4,5,10,8]
//#endregion

