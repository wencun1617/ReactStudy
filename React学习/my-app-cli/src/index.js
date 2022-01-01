import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
// 自定义connect, 实现与react-redux 里的connect类似的功能
// import { StoreContext } from 'contain/6-React结合redux/redux融入react代码/store/context.js';
// import store from 'contain/6-React结合redux/redux融入react代码/store/store.js';

import { Provider } from 'react-redux'; // 将之前自己创建的Context的Provider，换成react-redux的Provider组件
// import store from 'contain/7-react-redux使用/store/store.js'
import store from 'contain/8-Redux(三)中间件/store/store'
//在index.js中引入全局的Antd样式
import 'antd/dist/antd.less'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  // <StoreContext.Provider value={store}>
  //   <App/>
  // </StoreContext.Provider>,
  
  // 传入的是store属性，而不是value属性
  <Provider store={store}> 
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


// create-react-app 项目名称(别包含大写字母)

// <!-- vue-cli 2          vue init webpack projectname -->
// <!-- vue-cli 3          vue create projectname -->

// package.json
// "start": "react-scripts start",
// "build": "react-scripts build",
// "test": "react-scripts test",
// "eject": "react-scripts eject"