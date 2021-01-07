
import Home from   'contain/9-react-router/pages/home.js'
import About from 'contain/9-react-router/pages/about.js'
import AboutMessage from 'contain/9-react-router/pages/aboutMessage'
import AboutMessage2 from 'contain/9-react-router/pages/aboutMessage2'
import Detail from 'contain/9-react-router/pages/detail.js'
import Detail2 from 'contain/9-react-router/pages/detail2.js'
import Detail3 from 'contain/9-react-router/pages/detail3.js'

const routes = [
  {
    path: '/',
    exact: true,
   component:Home
  },
  {
    path: "/about",
    component: About,
    // exact: true, 这里不能加此, 否则在渲染嵌套路由时就不会匹配到about,而嵌套的路由又是在about中,便全消失了
    routes: [
      {
        path: "/about/message",
        component: AboutMessage
      },
      {
        path: "/about/message2",
        component: AboutMessage2
      },
    ]
  },
  {
    path: '/detail',
   component: Detail
  },
  {
    path: '/detail2',
   component: Detail2
  },
  {
    path: '/detail3',
   component: Detail3
  }
]
export default routes;