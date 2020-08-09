/**
 * 孰能生巧，再来一遍
 */

/**
 * 闭包实现一个函数累加；例：curry(1)(2)(3) => 6
 * 扩展 curry(1)(2)(3)() === 6 这个是确确实实的值
 */

let curry = (a) => {
  let fn = (b = 0) => {
    a = a + b;
    return b ? fn : a;
  };
  fn.toString = () => {
    return a;
  };
  return fn;
};

console.log(curry(1)(2)(3)); // function 6
console.log(curry(1)(2)(3)()); // 6

/**
 * 函数柯里化实现一个函数累加；例：currying(add, 1,2,3,4) => 10
 */

let currying = (fn, ...arg) => {
  return fn.apply(null, arg); // 错了一次，用了call 没用apply ，apply 第二个参数是数组
};

let add = (...arg) => {
  return arg.reduce((a, b) => a + b);
};
console.log(currying(add, 1, 2, 3, 4)); // 10

/**
 * 闭包实现一个函数累加，且参数不固定；例：currys(1)(2)(3, 4) => 10
 * 扩展 currys(1)(2)(3, 4)() === 10 这个是确确实实的值
 */

let currys = (...arg) => {
  let fn = (...newArg) => {
    return newArg.length
      ? currys.apply(null, [...arg, ...newArg])
      : arg.reduce((a, b) => a + b);
  };
  fn.toString = () => {
    return arg.reduce((a, b) => a + b);
  };
  return fn;
};
console.log(currys(1)(2)(3, 4)); // function 10
console.log(currys(1)(2)(3, 4)()); // 10

/**
 * 函数柯里化实现一个函数累加；例：currying(add, 1,2,3,4)(1, 2, 3, 4) => 20
 * @param {*} a
 */
let currying2 = (fn, ...arg) => {
  let newFn;
  newFn = (...newArg) => {
    let newArr = [...arg, ...newArg];
    return typeof fn === "function"
      ? fn.apply(null, newArr)
      : currying2.apply(null, newArr);
  };
  newFn.toString = () => {
    return fn.apply(null, arg);
  };
  return newFn;
};

console.log(currying2(add, 1, 2, 3, 4)(1, 2, 3, 4)(1)()); // 10

/**
 * 函数柯里化实现一个函数累加；例：currying(add, 1,2,3,4)(1, 2, 3, 4)(1, 2)(3, 4) => 30
 * @param {*} fn 累加函数
 */
