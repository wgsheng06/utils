let doPromise = (arr) => {
  let promise = Promise.resolve()
  arr.forEach(n => {
    promise = promise.then(_ => {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log(n)
          resolve()
        }, 1000)
      })
    })
  });
}

let doPromise2 = (arr) => {
  arr.reduce((promise, n) => {
    return promise.then(res => {
      return new Promise(resovle => {
        setTimeout(() => {
          console.log(n)
          resovle()
        }, 1000)
      })
    })
  }, Promise.resolve())
}
doPromise2([1, 2, 3, 4])