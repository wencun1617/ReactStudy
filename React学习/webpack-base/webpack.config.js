const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')//去node对应的包里找
module.exports = {
  mode: 'development',
  //loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）
  module: {   
    rules: [
      {
        test: /\.js|jsx$/,//jsx文件
        //exclude:排除   ES6转ES5
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          // options: {
          //   presets: ['@babel/preset-env']
          // }
        }
      },
      {
        //正则表达式里.有特殊含义，所以以用\进行转义 $表示结尾
        test: /\.css$/,
        //css-loader只负责将css文件进行加载，不负责解析，也不负责将css具体样式嵌入到文档中
        //style-loader 将模块的导出作为样式添加到 DOM 中
        //使用多个loader时，从右向左读取
        // modules 为普通css样式表,启用模块化 
        // localIdentName 自定义生成类名的格式, 参数 如下
        // [path] 表示样式表相对于 项目根目录 所在路径
        // [name] 表示样式表文件名称
        // [local] 表示样式表类定义名称
        // [hash:length] 表示32位的hash值需要几位
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]-[local]-[hash:6]'
              }
            }
          }
        ]
      },
    ]
  },
  plugins: [
    //当使用 webpack打包时，创建一个 html 文件，
    //并把 webpack 打包后的静态文件自动插入到这个 html 文件当中
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  devServer: {//开发阶段  把整个项目以一个localhost服务器形式运行起来，托管到内存    小型的Express服务器
    contentBase: './dist',//为哪一个文件夹提供本地服务，默认是根文件夹
    inline: true,//表示是否需要实时的监听(实时刷新界面)

    //把命令参数写在配置文件里  也可以修改package.json脚本直接加参数
    port:8086,  //更改运行端口，默认8080
    open:true  //编译完自动打开浏览器 第一次
  },
  resolve: {
    alias: {//通过别名 把原导入路径 映射成一个新的导入路径
      //@ 项目根目录下中的src 目录
      '@' : path.resolve(__dirname,'src')//动态的获取绝对路径,通过path.resolve对两个路径进行拼接 __dirname--node上下文自带的全局变量，其保存着当前所在文件的路径

    },
    extensions: ['.js', '.jsx', '.json']
  }
}