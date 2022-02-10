//class关键字  实现面向对象编程的新形式

function Person(name,age) {//普通的function创建一个对象
  this.name = name
  this.age = age
}

const p1 = new Person('温存',22) 
console.log(p1)
//p1.name p1.age  通过实例访问到的属性 称为实例属性

Person.info = 'aaa'
//info属性 直接挂载给了构造函数，为静态属性  实例._proto_.constructor
// 通过 构造函数 直接访问到的属性 , 叫做静态属性


//----------------------------------------------------------------------

//创建动物类
class Animal {
  constructor(name,age) {  //类中的构造器(覆盖默认),     (没有指定,默认有个隐藏的空的构造器)
    //构造器的作用: 创建类实例时，优先执行构造器中的代码
    this.name = name
    this.age = age
  }

  //静态属性  class内部,通过 static 修饰的属性
  static info = '温存'

  //#region 
    // 1. 类中可以直接写赋值语句，则所有实例对象上都会追加该属性
  //#endregion
  a = 1
}

//实例
const a1 = new Animal('蜗牛',6)
console.log(a1,Animal.info, a1.info)
// a1.info undefined
//a1.name 实例属性
//Animal.info 静态属性
