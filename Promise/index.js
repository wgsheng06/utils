class HD {
  static PADDING = 'padding'
  static FUFILLED = 'fufilled'
  static REJECTED = 'rejected'

  constructor(executor) {
    this.status = HD.PADDING;
    this.value = null;
    this.callbacks = []; // 放入异步监听回调
    try {
      executor(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error)
    }
  }

  resolve(value) {
    if (this.status === HD.PADDING) {
      this.status = HD.FUFILLED;
      this.value = value;
      setTimeout(() => {
        this.callbacks.map(callback => {
          callback.onFufilled((value))
        })
      })
    }
  }

  reject(reason) {
    if (this.status === HD.PADDING) {
      this.status = HD.REJECTED;
      this.value = reason;
      setTimeout(() => {
        this.callbacks.map(callback => {
          callback.onRejected((reason))
        })
      })
    }

  }

  then(onFufilled, onRejected) {

    if (typeof onFufilled !== 'function') {
      onFufilled = () => this.value // 实现值穿透
    }

    if (typeof onRejected !== 'function') {
      onRejected = () => this.value // 实现值穿透
    }

    let promise = new HD((resolve, reject) => {
      if (this.status === HD.PADDING) {
        this.callbacks.push({
          onFufilled: value => {
            this.parse(promise, onFufilled(value), resolve, reject)
          },
          onRejected: value => {
            this.parse(promise, onRejected(value), resolve, reject)
          }
        })
      }

      if (this.status === HD.FUFILLED) {
        setTimeout(() => {
          this.parse(promise, onFufilled(this.value), resolve, reject)
        })
      }
      if (this.status === HD.REJECTED) {

        setTimeout(() => {
          this.parse(promise, onRejected(this.value), resolve, reject)
        })
      }
    })

    return promise
  }




  parse(promise, result, resolve, reject) {
    if (promise == result) {
      throw new TypeError("不能return原promise")
    }
    try {
      if (result instanceof HD) { // 实现then函数中返回的是promise的时候，值穿透的是新promise.then中return的值
        result.then(resolve, reject) // 优化
      } else {
        resolve(result)
      }
    } catch (error) {
      reject(error)
    }
  }


  static resolve(value) {
    return new HD((resolve, reject) => {
      if (value instanceof HD) {
        value.then(resolve, reject) // 优化
      } else {
        resolve(value)
      }
    })
  }
  static reject(reason) {
    return new HD((resolve, reject) => {
      if (reason instanceof HD) {
        reason.then(resolve, reject) // 优化
      } else {
        reject(reason)
      }
    })
  }


  /**
   * All
   */
  static all(promises) {
    let values = []
    return new HD((resolve, reject) => {
      promises.forEach(promise => {
        promise.then(
          value => {
            values.push(value);
            if (values.length === promises.length) {
              resolve(values)
            }
          },
          reason => {
            reject(reason)
          })
      })
    })
  }


  /**
   * race:返回第一个返回的promise
   */
  static race(promises) {
    return new HD((resolve, reject) => {
      promises.forEach(promise => {
        promise.then(
          value => {
            resolve(values)
          },
          reason => {
            reject(reason)
          })
      })
    })
  }
}

let p1 = new HD((resolve, reject) => {
  setTimeout(() => {
    reject(111)
  }, 1000)
})
let p2 = new HD((resolve, reject) => {
  setTimeout(() => {
    reject(222)
  }, 200)
})

HD.race([p1, p2]).then(v => {
  console.log(v)
}, err => {
  console.log(err)
})