let obj1 = 1
let obj2 = 'str'
let obj3 = true
let obj4 = NaN
let obj5 = {
  a: 1,
  bool: false
}
let obj6 = undefined
let obj7 = null
let obj8 = () => {
  return '2'
}
let obj9 = [1, 2, 3]
class Person {
  constructor(name) {
    this.name = name
  }
}
let son = new Person('son')

/**
 * typeof
 * 局限性 null => object;
 * NaN => number
 * 引用类型 => object
 */
for (let i = 0; i < 9; i++) {
  console.log(eval(`obj${i+1}`), typeof eval(`obj${i+1}`))
}
console.log(Person, typeof Person) // function
console.log(son, typeof son) // object

/**
 * Object.prototype.toString 方法 返回[object [[class]]]
 * 局限性 
 */
for (let i = 0; i < 9; i++) {
  console.log(eval(`obj${i+1}`), Object.prototype.toString.call(eval(`obj${i+1}`)))
}

console.log(Person, Object.prototype.toString.call(Person)) // [object Function]
console.log(son, Object.prototype.toString.call(son)) // [object Object]


console.log(obj1 instanceof Number)
console.log(obj2 instanceof String)
console.log(obj3 instanceof Boolean)
console.log(obj4 instanceof Number)
console.log(obj5 instanceof Object)
console.log(obj8 instanceof Object) // Object true  Function true
console.log(obj9 instanceof Array) // Object true  Function false Array true
console.log(son instanceof Person) // Object true  Function false Person true
console.log(Person instanceof Object) // Object true  Function true