function ajax(url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.send();
  xhr.onload = function () {
    if (res.status == 200) {
      callback(JSON.parse(this.response))
    } else {
      throw new Error('加载失败')
    }
  }
  xhr.onerror = function () {
    throw new Error('加载失败')
  }
}

function ajaxPromise(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();
    xhr.onload = function () {
      if (res.status == 200) {
        resolve(JSON.parse(this.response))
      } else {
        reject('加载失败')
      }
    }
    xhr.onerror = function () {
      reject(this + 'errrrr')
    }
  })
}


// ajax请求错误处理方式推荐： https://www.bilibili.com/video/BV15J411G7FG?p=16


/**
 * 封装一个promise队列
 */


let queue = [1, 2, 3, 4, 5];

// 数组循环遍历式执行
let doPromise = (queue) => {
  let promise = Promise.resolve();
  queue.forEach(n => {
    promise = promise.then(_ => {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log(n)
          resolve()
        }, 1000)
      })
    })
  })
}

// doPromise(queue)


// reduce执行
let doPromise2 = (queue) => {
  queue.reduce((promise, n) => {
    return promise.then(_ => {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log(n)
          resolve()
        }, 1000)
      })
    })
  }, Promise.resolve())
}

// doPromise2(queue)