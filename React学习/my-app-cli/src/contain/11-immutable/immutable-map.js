import React, { Component } from 'react'

import {fromJS} from 'immutable'

//#region immutable  Map  set  get  toJS 试用简单的嵌套对象，多层要重复套用Map, 不方便
/*
let obj = {
    name: 'old',
    age: '16'
}

// set

let oldImmutableObj = Map(obj)
let newImmutableObj = oldImmutableObj.set('name', 'new').set('age',17) // 返回新的immutable对象，可链式调用

// get

console.log(oldImmutableObj,newImmutableObj,newImmutableObj.get('name'))

// immutable对象 ==> 普通对象 

console.log(oldImmutableObj.toJS(),newImmutableObj.toJS())
*/
//#endregion

//#region immutable List
    /*
    let oldArr = [1,2,3]
    let newArr = List(oldArr).push(...[4,5,6]) // 不影响原始对象结构
    console.log(oldArr,newArr,newArr.toJS())
    */
//#endregion

//#region fromJS ==> 复杂对象直接转immutable对象   setIn ==> 层级key数组 (key支持数组的索引)  
// updateIn ==> 适合数组,第二个参数是回调函数,并传入旧的值作为参数
    let oldComplexObj = {
        info: {
            name: 'wencun',
            location: {
                province:'福建',
                city:'莆田'
            },
            favor:['code1','code2','code3']
        }
    }

    let newComplexObj = fromJS(oldComplexObj).setIn(["info","location","city"],'福州').setIn(["info","favor",4],"newCode").updateIn(["info","favor"],(oldParams) => {
        return oldParams.splice(3,1,"updateIn-splice")
    }).toJS()

    console.log("old",oldComplexObj)
    console.log("new",newComplexObj)
//#region 


export default class immutableMap extends Component {
  render() {
    return (
      <></>
    )
  }
}
