//class关键字  实现面向对象编程的新形式

function Person(name,age) {//普通的function创建一个对象
  this.name = name
  this.age = age
  this.say = function() {
    console.log("实例方法")
  }
}
Person.info = '静态属性'

//挂载到原型对象上, 实例方法
Person.prototype.say = () => {  
  console.log('Person 实例的say 方法')
}
//静态方法  _proto_.constructor
Person.show = () => {
  console.log('Person 的静态方法  show')
}

const p1 = new Person('温存',22) 
console.log("实例对象",p1)

p1.say() //实例方法
// Person.show() //静态方法

console.log('函数式组件原型对象',Person.prototype)
//----------------------------------------------------------------------

//创建动物类
//class {} 内 只能写构造器, 静态属性, 实例方法和静态方法
// class 关键字内部, 仍是使用构造函数形式 来实现, 故 class 关键字可称为 语法糖 
class Animal {
  constructor(name,age) {  //类中的构造器(覆盖默认),     (没有指定,默认有个隐藏的空的构造器)
    //构造器的作用: 创建类实例时，优先执行构造器中的代码
    this.name = name
    this.age = age
    console.log(this,"类式组件构造器中的this(实例对象)")
  }

  static info = '静态属性'

  //实例方法，治愈类的原型对象上
  say() {
    console.log('动物类的实例方法')
  }

  // 实例上添加属性
  yyyy = "实例上添加属性"

  //静态方法   _proto_.constructor
  static show() {
    console.log('动物类的静态方法')
  }
}

//实例
const a1 = new Animal('蜗牛',6)
// console.log('类式组件', Animal)
// console.log(a1)
// Animal.show()

