import axios from "axios";
//函数, 接收实参后返回 store.dispatch的对象参数
const addAction = (count) => {
  return {
    type: "ADD_NUMBER",
    num: count,
  };
};

const subAction = (count) => ({
  type: "SUB_NUMBER",
  num: count,
});

//#region 组件中发送网络请求使用的action,单只用下面两个
const changeBannersAction = (banners) => {
  return {
    type: "CHANGE_BANNER",
    banners, //ES6增强写法
    //banner n.旗帜,横幅,标语
  };
};

const changeRecommendsAction = (recommends) => ({
  type: "CHANGE_RECOMMEND",
  recommends,
});

//#endregion

//#region redux-thunk 中间件 使得action 可以是一个函数

// 同步action指action的值为Objec类型的一般对象
// 异步action指action的值为函数， 异步action中一般都会调用同步action
const getHomeMultidataAction = () => {
  // 经过 redux-thunk 的中间件后
  // 在dispatch 的 action为函数时，store会自动回调，便传入两个对应的参数
  // dispatch函数用于我们派发action  --> 异步action中一般都会调用同步action  此时的action便是对象,里面存放类型和请求过来的数据
  // 就像 vuex里 actions 里面最终还是 commit 相应的 mutations
  // getState函数考虑到我们之后的一些操作需要依赖原来的状态，用于让我们可以获取之前的一些状态；
  return (dispatch, getState) => {
    let temp = axios.get("http://123.207.32.32:8000/home/multidata").then((res) => {
      const data = res.data.data;
      console.log(data,"redux-thunk")
      dispatch(changeBannersAction(data.banner.list));
      dispatch(changeRecommendsAction(data.recommend.list));
    });
    console.log("axios返回结果",temp)
  };
};

//#endregion

//#region redux-promise 
//  1.使得action 可以是一个Promise对象  
//  2. 由 redux-promise通过 (Promise对象).then得到返回的action, 并自动进行dispatch


// 同步action指action的值为Objec类型的一般对象
// 异步action指action的值为函数， 异步action中一般都会调用同步action
// const getHomeMultidataAction = async () => {
//   // 经过 redux-thunk 的中间件后
//   // 在dispatch 的 action为函数时，store会自动回调，便传入两个对应的参数
//   // dispatch函数用于我们派发action  --> 异步action中一般都会调用同步action  此时的action便是对象,里面存放类型和请求过来的数据
//   // 就像 vuex里 actions 里面最终还是 commit 相应的 mutations
//   // getState函数考虑到我们之后的一些操作需要依赖原来的状态，用于让我们可以获取之前的一些状态；

//   let res = await axios.get("http://123.207.32.32:8000/home/multidata")

//   let data = res.data.data;

//   console.log("redux-promise",data)

//   return changeBannersAction(data.banner.list); // 被async修饰，返回的便是promise对象

// };
//#endregion

export {
  addAction,
  subAction,
  changeBannersAction,
  changeRecommendsAction,
  getHomeMultidataAction,
};
