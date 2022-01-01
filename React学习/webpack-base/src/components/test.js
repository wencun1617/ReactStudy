function Person(name, age) {
  //普通的function创建一个对象
  this.name = name;
  this.age = age;
  this.say = function () {
    console.log("696969");
  };
  console.log(this,"实例化时才执行,this便是代表该实例化对象")
}

Person.prototype.info = "oooo";
Person.aa = "参加"

// let p1 = new Person("好的",18)
// let p2 = new Person("好的1",18)

// console.log(p1.age,p1.info)
// p1.say()

function Test(name, age) {
  console.log(this,"对象的this还未劫持,此时代表的是空的实例对象");
  Person.call(this, name, age);
  
}

let t = new Test("看看",55)
console.log(t.info,对象劫持无法继承原型链上的对象和方法)

