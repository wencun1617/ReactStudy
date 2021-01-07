import axios from 'axios'
//函数, 接收实参后返回 store.dispatch的对象参数
const addAction = (count) => {
  return (
    {
      type: 'ADD_NUMBER',
      num: count
    }
  )
};

const subAction = (count) => ({
  type: 'SUB_NUMBER',
  num: count
})

//#region 组件中发送网络请求使用的action,单只用下面两个
const changeBannersAction = (banners) => {
  return (
    {
      type: 'CHANGE_BANNER',
      banners//ES6增强写法
      //banner n.旗帜,横幅,标语
    }
  )
}

const changeRecommendsAction = (recommends) => ({
  type: 'CHANGE_RECOMMEND',
  recommends
})

//#endregion

//redux中发送网络请求使用的action
//定义返回一个函数的action
    // 注意: 这里不是返回一个对象了，而是一个函数;
    // 该函数在dispatch之后会被执行;
const getHomeMultidataAction = () => {
  // 由于action 是个函数, 触发dispatch就触发该action函数,并且会传给这个函数一个dispatch函数和getState函数
  // (此处的dispatch 和 组件里的映射行为的dispatch没有关系,不是那里传的?) 该是与redux的applyMiddleware方法和中间件(redux-thunk)有关，源码瞧一瞧
  return (dispatch) => {
    axios.get("http://123.207.32.32:8000/home/multidata").then(res => {
      const data = res.data.data;
      dispatch(changeBannersAction(data.banner.list));
      dispatch(changeRecommendsAction(data.recommend.list));
    })
  }
}



export {
  addAction,
  subAction,
  changeBannersAction,
  changeRecommendsAction,
  getHomeMultidataAction
}