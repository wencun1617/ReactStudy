class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  // 实例方法  _proto_._proto_
  sayHello () {
    console.log('creature 人,生物,动物')
  }
}


class Brazilian extends Person{
  //空构造器导致
  //Must call super constructor in derived class before accessing 'this' or returning from derived constructor

  // 子类通过 extends 关键字继承父类,必须在 constructor 构造函数中 先调用下 super()
  // super 是函数, 为父类的构造器, 子类中的super 便是父类中 constructor 的引用
  // 执行构造器中的代码 super(),便没有将 实参 传给父类构造器,故会导致name age实例属性为undefined
  // 若本身(子类)没有构造器, 则实参会默认传给 父类的构造器
  constructor(name,age) {
    super(name,age)
  }
}
const p1 = new Brazilian ('Brazil',18 ) 
console.log(p1)
//子类访问父类的实例方法
p1.sayHello()


class Chinese extends Person{
  constructor(name,age,IDNumber) {
    super(name,age)

    //子类挂载独有的实例属性
    this.IDNumber = IDNumber
    
  }

  //子类挂载独有的实例方法
  showHaHa() {
    console.log('derive v.起源,获得,得自')
  }
}
const p2 = new Chinese('温存', 22,1617)
p2.showHaHa()
console.log(p2)