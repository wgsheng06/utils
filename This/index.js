var obj = {
  data: [1, 2, 3, 4, 5],
  data2: [1, 2, 3, 4, 5],
  fn: function () {
    console.log("--test--");
    console.log(this); //{data: Array(5), data2: Array(5), fn: ƒ, fn2: ƒ}
    return this.data.map(function (item) {
      console.log(this); //  -->  window
      return item * 2;
    });
  },
  fn2: function () {
    console.log("---test2---");
    console.log(this); //{data: Array(5), data2: Array(5), fn: ƒ, fn2: ƒ}
    return this.data2.map(item => {
      console.log(this); //  --> obj {data: Array(5), data2: Array(5), fn: ƒ, fn2: ƒ}
      return item * 2;
    });
  }
};
obj.fn();
// test
// obj
// window

obj.fn2();

// test2
// obj
// obj

/**第一题 */
var b = {
  a: 23,
  c: 3,
  d: {
    a: 78,
    e: {
      a: 100,
      f: function () {
        console.log(this.a);
      }
    }
  }
}
var fn = b.d.e.f;
fn();
b.d.e.f();

// 修改$对象里面的代码，使得以下代码运行正常
var $ = {
  fn: function () {
    console.log(1);
    return this
  },
  fn2: function () {
    console.log(2);
  }
}
$.fn().fn2();

// 答案：
// var $ = {
//   fn:function(){
//       console.log(1);
//       return this; // 返回this，可以继续调用函数
//   },
//   fn2:function(){
//       console.log(2);
//   }
// }
// $.fn().fn2();


var o = {
  a: 10,
  b: {
    a: 12,
    fn: function () {
      console.log(this.a);
      console.log(this);
    }
  }
}
//调用
o.b.fn(); // 12 b


var o = {
  a: 10,
  b: {
    fn: function () {
      console.log(this.a);
      console.log(this);
    }
  }
}
//调用
o.b.fn(); // undefined b


var o = {
  a: 10,
  b: {
    a: 12,
    fn: function () {
      console.log(this.a);
      console.log(this);
    }
  }
}
var j = o.b.fn;
j(); // undefined window



var point = {
  x: 0,
  y: 0,
  moveTo: function (x, y) {
    this.x = this.x + x;
    this.y = this.y + y;
    console.log(this.x);
    console.log(this.y);
  }
};
point.moveTo(1, 1) // 1 1


function someFun(x) {
  this.x = x;
}
someFun(5);
console.log(x); // 5





var point = {
  x: 0,
  y: 0,
  moveTo: function (x, y) {
    // 内部函数
    var moveX = function (x) {
      this.x = x;
    };
    // 内部函数
    var moveY = function (y) {
      this.y = y;
    };
    moveX(x); // 这里是全局调用
    moveY(y);
  }
};
point.moveTo(1, 1);
console.log(point.x); // 0
console.log(point.y); // 0



var point = {
  x: 0,
  y: 0,
  moveTo: function (x, y) {
    this.x = x;
    console.log(this.x); // 1
    console.log(this); // point

    // 内部函数
    var moveX = function (x) {
      this.x = x;
    };
    // 内部函数
    var moveY = function (y) {
      this.y = y;
    }
    moveX(x);
    moveY(y);
  }
};
point.moveTo(1, 1); // 1 point 
console.log(point.x); // 1
console.log(point.y); // 0
console.log(x); // 1
console.log(y); // 1


var point = {
  x: 0,
  y: 0,
  moveTo: function (x, y) {

    var that = this;

    // 内部函数
    var moveX = function (x) {
      that.x = x;
    };
    // 内部函数
    var moveY = function (y) {
      that.y = y;
    }
    moveX(x);
    moveY(y);
  }
};
point.moveTo(1, 1);
console.log(point.x); // 1
console.log(point.y); // 1
console.log(x) // undefined
console.log(y) // undefined



var point = {
  x: 0,
  y: 0,
  moveTo: {
    // 内部函数
    moveX: function (x) {
      console.log(this)
      this.x = x;
    },
    // 内部函数
    moveY: function (y) {
      this.y = y;
    }
  }
};
point.moveTo.moveX(1); // moveTo
point.moveTo.moveY(1); // 
console.log(point.moveTo); // {x 1, y 1, moveX, moveY}
console.log(point.x); // 0
console.log(point.y); // 0
console.log(x) // undefined
console.log(y) // undefined


function Point(x, y) {
  console.log(this);
  this.x = x;
  this.y = y;
  this.moveTo = function (x, y) {
    this.x = x;
    this.y = y;
    console.log(this.x);
    console.log(this.y);
  }
}
var p1 = new Point(0, 0); // window 

var p2 = {
  x: 0,
  y: 0
}
p1.moveTo(1, 1); // 1 1
p1.moveTo.apply(p2, [10, 10]); // 10 10

console.log(x); // undefined
console.log(y); // undefined




var a = 10;
var foo = {
  a: 20,
  fn: (function () {
    console.log(this);
    console.log(this.a);
  })()
}
// window 10


var a = 10;
var oTimer1 = setInterval(function () {
  var a = 20;
  console.log(this.a);
  clearInterval(oTimer1);
}, 100);

// 10



(function () {
  eval("console.log(this)");
})();

// window

function Foo() {
  this.bar = function () {
    eval("console.log(this)");
  }
}
var foo = new Foo();
foo.bar(); // foo

var a = 10;
var foo = {
  a: 20,
  fn: function () {
    console.log(this.a);
  }
};
var bar = {
  a: 30
}
foo.fn.apply(); // 10
foo.fn.apply(foo); // 20
foo.fn.apply(bar); // 30