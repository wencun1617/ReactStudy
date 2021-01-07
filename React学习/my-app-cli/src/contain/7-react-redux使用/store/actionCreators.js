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

export {
  addAction,
  subAction
}