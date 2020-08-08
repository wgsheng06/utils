/**
 * 闭包实现一个函数累加；例：curry(1)(2)(3) => 6
 * @param {*} a 
 */
const curry = (a) => {
  let fn = (b) => {
    a = a + b
    return fn
  }

  fn.toString = function () {
    return a
  }
  return fn
}

/**
 * 闭包实现一个函数累加，且参数不固定；例：curry(1)(2)(3, 4) => 10
 * @param {*} a 
 */
const currys = (...arg) => {
  let fn = function (...newArg) {
    return currys.apply(null, [...arg, ...newArg])
  }
  fn.toString = () => {
    return arg.reduce((a, b) => a + b)
  }
  return fn
}

/**
 * 函数柯里化实现一个函数累加；例：currying(add, 1,2,3,4) => 10
 * @param {*} a 
 */
const currying = (fn, ...arg) => {
  return fn.apply(null, arg)
}

const add = (...arg) => {
  return arg.reduce((a, b) => a + b)
}

console.log(currying(add, 1, 2, 3, 4, 5)) // 15