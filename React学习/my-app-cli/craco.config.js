//craco.config.js位置要放对哦, 不然package里配置了,运行时会出错哦
//高级配置  --> 类似vue 的 vue.config.js --> 借助craco
// 对主题等相关的高级特性进行配置，需要修改create-react-app 的默认配置。
// 可以通过yarn run eject 来暴露出来对应的配置信息进行修改
// 对于webpack并不熟悉的人来说，直接修改 CRA 的配置是否会给你的项目带来负担，甚至会增加项目的隐患和不稳定性呢？
// 所以，在项目开发中是不建议大家直接去修改 CRA 的配置信息的

//配置主题
// 按照 配置主题 的要求，自定义主题需要用到类似 less-loader 提供的 less 变量覆盖功能：
// 我们可以引入 craco-less 来帮助加载 less 样式和修改变量
const CracoLessPlugin = require('craco-less')

const path = require("path")
const resolve = dirPath => path.resolve(__dirname,dirPath) 
module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // 利用 less-loader 的 modifyVars 来进行主题配置  --->改变默认的样式呗
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  webpack: {
    // 配置别名
    alias: {
      //回调函数
      '@':resolve('src'),
      'contain': resolve("src/contain")
    }
  }
}