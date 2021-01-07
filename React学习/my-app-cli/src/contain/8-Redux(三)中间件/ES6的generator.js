
// saga中间件使用了 ES6的generator语法

//#region  1.普通的函数，进行调用会立即拿到这个函数的返回结果
// function foo() {
//   return "Hello World";
// }

// console.log(foo()) // Hello World
//#endregion

//-----------------------------------------------------------------------------

//#region  2.将这个函数编写成一个生成器函数
// function *foo() {
//   yield "Hello";
//   yield "World";
// }

// const iterator = foo();
// console.log(iterator, typeof iterator); // 一个object类型的iterator对象

// // 调用iterator的next函数，会销毁一次迭代器，并且返回一个yield的结果
// // 调用一次next()是消耗一次迭代器
// console.log(iterator.next()); // {value: "Hello", done: false}
// console.log(iterator.next()); // {value: "World", done: false}
// console.log(iterator.next()); // {value: undefined, done: true}
//#endregion

//-----------------------------------------------------------------------------

//#region 3.foo生成器函数代码的执行顺序
// function *foo1() {
//   console.log("111111");
//   yield "Hello";
//   console.log("222222");
//   yield "World";
//   console.log("333333");
// }

// const iterator = foo1()

// // 调用一次next()是消耗一次迭代器
// next 方法调用,遇到yield便停止
// console.log(iterator.next()); // 打印111111 {value: "Hello", done: false}

// console.log(iterator.next()); // 打印222222 {value: "World", done: false}

// console.log(iterator.next()); // 打印333333 {value: undefined, done: true}

//#endregion

//-----------------------------------------------------------------------------

//#region 4. generator和promise一起使用
function *bar() {
  const result = yield new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Hello Generator");
      return "Hello";
    }, 2000);
  });
  console.log(result);
}

const bIterator = bar();

// bIterator.next().value 便是result,既返回的Promise对象
bIterator.next().value.then(res => { //第一次bIterator.next()为: { value: Promise { <pending> }, done: false }

  bIterator.next(res);  //第二次bIterator.next()为: { value: undefined, done: true }再传入res   --->   最终为: Hello Generator
});
//#endregion