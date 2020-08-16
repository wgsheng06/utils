let obj = {
  a: 0,
  b: "1",
  c: NaN,
  d: {
    x: 100,
  },
  e: [1, 10, 100],
};
// 浅拷贝
const clone = (obj) => {
  let obj2 = {};
  for (let key in obj) {
    // 非私有属性
    if (!obj.hasOwnProperty(key)) break;
    obj2[key] = obj[key];
  }
  return obj2;
};

// 浅拷贝, 方法一
let obj2 = obj;
// 浅拷贝, 方法二
let obj2 = { ...obj };
// 浅拷贝, 方法三
let obj2 = Object.assign({}, obj);
// 浅拷贝, 方法四
let obj2 = new Object(obj);

// 深拷贝，方法一
let obj2 = JSON.parse(JSON.stringify(obj)); // 弊端 function null

// 深拷贝 方法二
const deepClone = (obj) => {
  // 不是引用类型
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  if (obj instanceof Array) {
    return new Array(obj);
  }
  if (obj instanceof Date) {
    return new Date(obj);
  }
  if (obj instanceof Functon) {
    return new Functon(obj);
  }
  // 不直接创建空对象
  let newObj = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 过滤特殊情况
      newObj[key] = deepClone(obj[key]);
    }
  }
  return newObj;
};
