/**
 * 闭包实现一个函数累加；例：curry(1)(2)(3) => 6
 * @param {*} a
 */
const curry = (a) => {
  let fn = (b) => {
    a = a + b;
    return fn;
  };

  fn.toString = function () {
    return a;
  };
  return fn;
};

/**
 * 函数柯里化实现一个函数累加；例：currying(add, 1,2,3,4) => 10
 * @param {*} a
 */
const currying = (fn, ...arg) => {
  return fn.apply(null, arg);
};

const add = (...arg) => {
  return arg.reduce((a, b) => a + b);
};

console.log(currying(add, 1, 2, 3, 4, 5)); // 15 // 这样写很蠢 直接用add(1, 2,3,4,5) 不就好了？
console.log(add(1, 2, 3, 4, 5)); // 15

/**
 * 函数柯里化实现一个函数累加；例：currying(add, 1,2,3,4)(1, 2, 3, 4) => 20
 * @param {*} a
 */
const currying2 = (fn, ...arg) => {
  return (...newArg) => {
    return fn.apply(null, [...arg, ...newArg]);
  };
};

let add2 = currying2(add, 1, 2, 3, 4);

console.log(add2(1, 2, 3, 4)); // 20 // 好像很简单 那么 无限追加呢？

/**
 * 函数柯里化实现一个函数累加；例：currying(add, 1,2,3,4)(1, 2, 3, 4)(1, 2)(3, 4) => 30
 * @param {*} fn 累加函数
 */
const currying3 = (fn, ...arg) => {
  let newFn;
  newFn = (...newArg) => {
    let newArr = [...arg, ...newArg];
    return typeof fn === "function"
      ? fn.apply(null, newArr)
      : currying3.apply(null, newArr);
  };
  newFn.toString = () => {
    return fn.apply(null, arg);
  };
  return newFn;
};

/**
 * 闭包实现一个函数累加，且参数不固定；例：curry(1)(2)(3, 4) => 10
 * @param {*} a
 */
const currys = (...arg) => {
  let fn = function (...newArg) {
    return currys.apply(null, [...arg, ...newArg]);
  };
  fn.toString = () => {
    return arg.reduce((a, b) => a + b);
  };
  return fn;
};

console.log(currying3(currys, 1, 2, 3, 4)(1, 2, 3, 4)(1, 2)(3, 4)); // 30
