import React from 'react'
import ReactDOM from 'react-dom'

import Example from '@/components/BindInputValue'

let mydiv = <div>
  绑定文本框与state的值
  <Example></Example>
</div>

let myApp = document.getElementById('app')
ReactDOM.render(mydiv,myApp)