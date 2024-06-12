---
title: JavaScript-常用方法
author: 耶温
createTime: 2024/05/11 15:05:45
permalink: /JavaScript/ud9nzk83/
---
# JavaScript-常用方法

## 数据类型判断

```javascript
function myTypeof(data) {
  return Object.prototype.toString
    .call(data)
    .slice(8, -1)
    .toLowerCase();
}
```

## 数组去重

```javascript
//new Set() 集合
//ES6提供了新的数据结构Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。
function unique(arr) {
  return [...new Set(arr)];
}

//数组去重 filter
function unique(arr) {
  return arr.filter((item, index, array) => {
    return array.indexOf(item) === index;
  });
}

// 数组去重  forEach
function unique(arr) {
  let res = [];
  arr.forEach((item) => {
    res.includes(item) ? "" : res.push(item);
  });
  return res;
}
```

## 数组排序

```javascript
// 快排排序
function quickSort(arr) {
  // 数组长度为1 直接返回
  if (arr.length <= 1) return arr;
  var left = [],
    right = [];
  var centerIndex = Math.floor(arr.length / 2);
  // 定义中间值
  var center = arr[centerIndex];
  for (let i = 0; i < arr.length; i++) {
    // 小于中间值数据添加到left
    if (arr[i] < center) {
      left.push(arr[i]);
    } else if (arr[i] > center) {
      // 大于中间值数据添加到right
      right.push(arr[i]);
    }
  }
  // 递归返回 concat连接返回数据
  return quickSort(left).concat([center], quickSort(right));
}
// 冒泡排序
function bubbleSort(arr) {
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        var temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
      }
    }
  }
  return arr;
}
```

## 数组中第 k 个最大元素

```js
//全局排序  可以判断完成直接返回第 arr[k-1]即可

//局部排列 只排到第n个即可
function sortK(arr, k) {
  if (k > arr.length) return undefined;
  // 冒泡排序
  for (let i = 0; i < k; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] < arr[j]) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr[k - 1];
}
```

## 数组扁平化

```javascript
//使用 Infinity，可展开任意深度的嵌套数组
arr.flat(Infinity);

//适用JSON转换
JSON.parse("[" + JSON.stringify(arr).replace(/\[|\]/g, "") + "]");

//递归
function myFlat(arr) {
  let res = [];
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      res = res.concat(myFlat(item));
    } else {
      res.push(item);
    }
  });
  return res;
}
//some
function myFlat(arr) {
  while (arr.some((res) => Array.isArray(res))) {
    arr = [].concat(...arr);
  }
  return arr;
}
```

## 回文字符串相关

```js
//回文：正读和反读都一样的字符串。
//判断是否是回文字符串
function isPalindrome(str) {
  if (!str) return false;
  return (
    str ==
    str
      .split("")
      .reverse()
      .join("")
  );
}
//找出字符串中最长的回文字段
//循环暴力破解
function palindrome(str) {
  var len = str.length;
  var maxStr = "";
  if (isPalindrome(str)) return str;
  for (let i = 0; i <= len - 1; i++) {
    for (let j = i + 1; j <= len; j++) {
      var s = str.slice(i, j);
      if (!isPalindrome(s)) continue;
      if (s.length > maxStr.length) {
        maxStr = s;
      }
    }
  }
  return maxStr;
}
//改造方法  中心扩展法
function palindrome(str) {
  var len = str.length;
  var s = "";
  if (len < 2) return str;
  for (let i = 0; i < len; i++) {
    /**判断是否是回文,i作为回文中间值，有两种可能 */
    isPalindrome(i, i);
    isPalindrome(i, i + 1);
  }

  function isPalindrome(i, j) {
    while (i >= 0 && j <= len && str[i] == str[j]) {
      i--;
      j++;
    }
    // 判断是否是最长回文
    if (j - i - 1 > s.length) {
      s = str.slice(i + 1, j);
    }
  }

  return s;
}
```

## 深拷贝深克隆

```javascript
// 简单克隆 无法复制函数
var newObj = JSON.parse(JSON.stringify(obj));

// 深克隆  无法克隆特殊实例  Date等
function deepClone(target) {
  if (typeof target !== "object") {
    return target;
  }
  var result;
  if (Object.prototype.toString.call(target) == "[object Array]") {
    // 数组
    result = [];
  } else {
    // 对象
    result = {};
  }
  for (var prop in target) {
    if (target.hasOwnProperty(prop)) {
      result[prop] = deepClone(target[prop]);
    }
  }
  return result;
}

//复杂版深克隆
function deepClone(target) {
  if (typeof target !== "object") return target;
  // 检测RegDate类型创建特殊实例
  let constructor = target.constructor;
  if (/^(RegExp|Date)$/i.test(constructor.name)) {
    return new constructor(target);
  }
  // 判断类型
  var result =
    Object.prototype.toString.call(target) == "[object Array]" ? [] : {};
  // 迭代循环
  for (var prop in target) {
    if (target.hasOwnProperty(prop)) {
      // 递归
      result[prop] = deepClone(target[prop]);
    }
  }
  return result;
}
```

## 继承方法

原型链继承：

```javascript
// 原型链继承
// 问题：原型中的引用对象会被所有的实例共享，子类在实例化的时候不能给父类构造函数传参
function Father() {
  this.hobby = ["coding", "eat"];
}
Father.prototype.skill = function() {
  console.log("i will javascript");
};
function Son() {}
Son.prototype = new Father();

var father = new Father();
var son = new Son();
var son1 = new Son();
console.log(father.hobby); //[ 'coding', 'eat' ]

father.hobby.push("play");
console.log(father.hobby, son.hobby, son1.hobby);
//[ 'coding', 'eat', 'play' ] [ 'coding', 'eat' ] [ 'coding', 'eat' ]

son.hobby.push("hei");
console.log(father.hobby, son.hobby, son1.hobby);
//[ 'coding', 'eat', 'play' ] [ 'coding', 'eat', 'hei' ] [ 'coding', 'eat', 'hei' ]

son.skill(); //i will javascript
```

借用构造函数实现继承

```javascript
// 原型链继承
// 问题：方法需要定义在构造函数内，因此每次创建子类实例都会创建一边方法
function Father(name) {
  this.name = name;
  this.sayNmae = function() {
    return this.name;
  };
}

function Son(name) {
  Father.call(this, name);
}
Son.prototype = new Father();

var father = new Father("wenbo");
var son = new Son("zhijian");

console.log(father.name, son.name); //wenbo zhijian
console.log(father.sayNmae(), son.sayNmae()); //wenbo zhijian
```

组合继承

```javascript
//组合继承，结合原型链继承和借用构造函数，使用原型链继承原型上的属性和方法，借用构造函数继承实例属性。
//即可以把方法定义在原型上实现重用，又可以让每个实例都有自己的属性

// 组合继承
function Father(name) {
  this.name = name;
}
Father.prototype.sayName = function() {
  return this.name;
};

function Son(name, age) {
  Father.call(this, name);
  this.age = age;
}
Son.prototype = new Father();
Son.prototype.constructor = Son;

var son = new Son("yewen", 18);
console.log(son); //Son { name: 'yewen', age: 18 }
console.log(son.sayName()); //yewen
```

寄生式组合继承

```javascript
//寄生组合继承
// 组合继承会导致调用两次父类构造函数
function Father(name) {
  this.name = name;
}
Father.prototype.sayName = function() {
  return this.name;
};

function Son(name, age) {
  Father.call(this, name);
  this.age = age;
}

Son.prototype = Object.create(Father.prototype);
Son.prototype.constructor = Son;
```

class 实现继承

```javascript
// calss继承
class Father {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}

class Son extends Father {
  constructor(name, age) {
    super(name);
    this.age = age;
  }
  getAge() {
    return this.age;
  }
}
var son = new Son("heihei", 18);
console.log(son); //Son { name: 'heihei', age: 18 }
console.log(son.getName(), son.getAge()); //heihei 18
```

## 事件总线（发布订阅模式）

```javascript
class EventEmitter {
  constructor() {
    this.cache = {};
  }
  on(name, fn) {
    if (this.cache[name]) {
      this.cache[name].push(fn);
    } else {
      this.cache[name] = [fn];
    }
  }
  off(name, fn) {
    let tasks = this.cache[name];
    if (tasks) {
      const index = tasks.findIndex((f) => f === fn || f.callback === fn);
      index >= 0 ? tasks.splice(index, 1) : "";
    }
  }
  emit(name, once, ...args) {
    if (this.cache[name]) {
      // 创建副本
      let tasks = this.cache[name].slice();
      for (const fn of tasks) {
        fn(...args);
      }
      once ? delete this.cache[name] : "";
    }
  }
}

let demo = new EventEmitter();
demo.on("wenbo", function(data) {
  console.log("wenbo", data);
});
let fn1 = function(data) {
  console.log("hello:", data);
};
demo.on("wenbo", fn1);

demo.emit("wenbo", false, "world");
demo.off("wenbo", fn1);
demo.emit("wenbo", false, "world");

//wenbo world
//hello: world

//wenbo world
```

## 获得滚动距离

```javascript
function getScrollOffset() {
  if (window.pageXOffset) {
    return {
      x: window.pageXOffset,
      y: window.pageYOffset,
    };
  } else {
    return {
      x: document.body.scrollLeft + document.documentElement.scrollLeft,
      y: document.body.scrollTop + document.documentElement.scrollTop,
    };
  }
}
```

## 获得视口尺寸

```javascript
function getViewportOffset() {
  if (window.innerWidth) {
    return {
      w: window.innerWidth,
      h: window.innerHeight,
    };
  } else {
    // ie8及其以下
    if (document.compatMode === "BackCompat") {
      // 怪异模式
      return {
        w: document.body.clientWidth,
        h: document.body.clientHeight,
      };
    } else {
      // 标准模式
      return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight,
      };
    }
  }
}
```

## 防抖函数

```javascript
function debounce(fun, wait) {
  var timeId = null;
  return function() {
    var _this = this;
    var _arg = arguments;
    clearTimeout(timeId);
    timeId = setTimeout(function() {
      fun.apply(_this, _arg);
    }, wait);
  };
}
```

## 节流函数

```javascript
function throttle(fun, wait) {
  var lastTime = 0;
  return function() {
    var _this = this;
    var _arg = arguments;
    var nowTime = new Date().getTime();
    if (nowTime - lastTime > wait) {
      fun.apply(_this, _arg);
      lastTime = nowTime;
    }
  };
}
```

## 图片加载优化懒加载

```js
//   获取全部img元素 并且将类数组转化成数组
let imgList = [...document.querySelectorAll("img")];
let len = imgList.length;
// 图片懒加载
function imgLazyLoad() {
  let count = 0;
  return (function() {
    let isLoadList = [];
    imgList.forEach((item, index) => {
      let h = item.getBoundingClientRect();
      //  判断图片是否快要滚动道可视区域
      if (h.top < window.innerHeight + 200) {
        item.src = item.dataset.src;
        console.log(item.dataset.src);
        isLoadList.push(index);
        count++;
        // 全部加载 移出scroll事件
        if (len == count) {
          document.removeEventListener("scroll", imgLazyLoad);
        }
      }
    });
    // 移出已经加载完成的图片
    imgList = imgList.filter((img, index) => !isLoadList.includes(index));
  })();
}
// 节流函数
function throttle(fun, wait) {
  var lastTime = 0;
  return function() {
    var _this = this;
    var _arg = arguments;
    var nowTime = new Date().getTime();
    if (nowTime - lastTime > wait) {
      fun.apply(_this, _arg);
      lastTime = nowTime;
    }
  };
}
// 默认执行一次加载首屏图片
imgLazyLoad();
// 节流执行
document.addEventListener("scroll", throttle(imgLazyLoad, 200));
```

## 绑定事件

```javascript
function addEvent(elem, type, handle) {
  if (elem.addEventListener) {
    //非ie和ie9以上
    elem.addEventListener(type, handle, false);
  } else if (elem.attachEvent) {
    //ie8以下   ie6-8
    elem.attachEvent("on" + type, function() {
      handle.call(elem);
    });
  } else {
    // 其他
    elem["on" + type] = handle;
  }
}
```

## 解绑事件

```javascript
function removeEvent(elem, type, handle) {
  if (elem.removeEventListener) {
    //非ie和ie9以上
    elem.removeEventListener(type, handle, false);
  } else if (elem.detachEvent) {
    //ie8以下   ie6-8
    elem.detachEvent("on" + type, handle);
  } else {
    //其他
    elem["on" + type] = null;
  }
}
```

## 取消冒泡事件

```javascript
function stopBubble(e) {
  //兼容ie9以下
  if (e && e.stopPropagation) {
    e.stopPropagation();
  } else {
    window.event.cancelBubble = true;
  }
}
```

## JS 创建 Script

```javascript
function loadScript(url, callback) {
  var script = document.createElement("script");
  if (script.readyState) {
    // 兼容ie8及以下版本
    script.onreadystatechange = function() {
      if (script.readyState === "complete" || script.readyState === "loaded") {
        //   回调函数
        callback();
      }
    };
  } else {
    //   加载完成之后
    script.onload = function() {
      //   回调函数
      callback();
    };
  }
  script.src = url;
  //   添加标签
  document.body.appendChild(script);
}
```

## 管理操作 Cookie

```javascript
var cookie = {
  //设置cookie
  set: function(name, value, time) {
    document.cookie = `${name}=${value};expires=${time};path=/`;
    return this;
  },
  //获取cookie
  get: function(name) {
    var arr;
    var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if ((arr = document.cookie.match(reg))) {
      return unescape(arr[2]);
    } else {
      return null;
    }
  },
  //移出token
  remove: function(name) {
    return this.setCookie(name, "", -1);
  },
};
```

## 验证邮箱

```javascript
function isAvailableEmail(email) {
  var reg = /^([\w+\.])+@\w+([.]\w+)+$/;
  return reg.test(email);
}
```

## 封装 myForEach 方法

```javascript
// thisValue 可选参数。当执行回调函数 callback 时，用作 this 的值。
Array.prototype.myForEach = function(callback, thisValue) {
  var _this;
  // 当this为空抛出异常
  if (this == null) {
    throw new TypeError(" this is null or not defined");
  }
  //  var len = this.length
  //  this.length >>> 0  相当于 所有非数值转换成0 ,所有大于等于 0 等数取整数部分
  var len = this.length >>> 0;
  // callback不是函数时  抛出异常
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }
  // 判断是够有传参 thisValue
  if (arguments.length > 1) {
    _this = thisValue;
  }
  // 循环遍历
  for (var i = 0; i < len; i++) {
    // 回调函数
    callback.call(_this, this[i], i, this);
  }
};
```

## 封装 myFilter 方法

```javascript
Array.prototype.myFilter = function(callback, thisValue) {
  var _this;
  var arr = [];

  if (this == null) {
    throw new TypeError(" this is null or not defined");
  }

  var len = this.length >>> 0;

  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  if (arguments.length > 1) {
    _this = thisValue;
  }

  for (var i = 0; i < len; i++) {
    callback.call(_this, this[i], i, this) && arr.push(this[i]);
  }
  return arr;
};
```

## 封装 myMap 方法

```javascript
Array.prototype.myMAp = function(callback, thisValue) {
  var _this;
  var arr = [];

  if (this == null) {
    throw new TypeError(" this is null or not defined");
  }

  var len = this.length >>> 0;

  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  if (arguments.length > 1) {
    _this = thisValue;
  }

  for (var i = 0; i < len; i++) {
    arr.push(callback.call(_this, this[i], i, this));
  }
  return arr;
};
```

## 封装 myEvery 方法

```javascript
Array.prototype.myEvery = function(callback, thisValue) {
  var _this;

  if (this == null) {
    throw new TypeError(" this is null or not defined");
  }

  var len = this.length >>> 0;

  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  if (arguments.length > 1) {
    _this = thisValue;
  }

  for (var i = 0; i < len; i++) {
    if (!callback.call(_this, this[i], i, this)) {
      return false;
    }
  }
  return true;
};
```

## 封装 myReduce 方法

```javascript
Array.prototype.myEvery = function(callback, initialValue) {
  var value = 0;
  console.log(value);
  if (this == null) {
    throw new TypeError(" this is null or not defined");
  }
  var len = this.length >>> 0;
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  if (arguments.length > 1) {
    value = initialValue;
  }
  for (var i = 0; i < len; i++) {
    value = callback(value, this[i], i, this);
  }
  return value;
};
```

## 封装 call，apply，bind

```js
```

## 获取 URL 参数

```javascript
function getURLParam(url) {
  let obj = {};
  url.replace(/(?<=[?|&])(\w+)=(\w+)/g, function(data, key, value) {
    if (obj[key]) {
      obj[key] = [].concat(obj[key], value);
    } else {
      obj[key] = value;
    }
  });
  return obj;
}
```

## HTML 字符串模板

```js
function render(template, data) {
  return template.replace(/\{(\w+)}/g, function($1, key) {
    return data[key] ? data[key] : "";
  });
}

let html = "我叫{name},今年{id}岁。";
let data = {
  name: "Yevin",
  age: 18,
};
render(html, data); //我叫Yevin，今年18岁
```

## 利用 JSONP 实现跨域请求

```javascript
function jsonp(url, callbackName) {
  return new Promise((resolve, reject) => {
    var script = document.createElement("script");
    script.src = "demo.js";
    document.body.appendChild(script);

    window[callbackName] = function(res) {
      //移除remove
      script.remove();
      //返回数据
      resolve(res);
    };
  });
}
```

## 原生 JS 封装 AJAX

```javascript
function Ajax(method, url, callback, data, async = true) {
  var xhr;
  //同一转换method方法为大写
  method = method.toUpperCase();
  // 开启XMLHTTPRequest
  xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new activeXObject();
  // 监控状态变化 执行回调函数
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.readyState == 200) {
      // 回调函数返回参数
      callback(xhr.responseText);
    }
  };
  // 判断请求方式 get post或者其他
  if (method == "GET") {
    xhr.open("GET", url, async);
  } else if (method == "POST") {
    xhr.open("POST", url, async);
    // 设置请求头
    xhr.setRequestHeader("Content-Type", "application/json");
    // 发送参数
    xhr.send(data);
  }
}
```

## Fetch 兼容请求超时

```js
//fetch不支持timeout处理，需要自己手动设置添加
//使用Promise.race()实现
function myFetch(url, option) {
  //对比两个Promise谁先返回~默认5秒
  return Promise.race([
    fetch(url, option),
    new Promise(function(resolve, reject) {
      setTimeout(() => {
        reject(new Error("fetch timeout5"));
      }, option.timeout || 5);
    }),
  ]);
}
```

## 格式化时间

```javascript
// formatDate 时间格式，data默认为当前时间
function formatDate(formatDate, date = new Date()) {
  var obj = {
    yyyy: date.getFullYear(), //4位数年份
    yy: ("" + date.getFullYear()).slice(-2), //2位数年份，最后两位
    M: date.getMonth() + 1, //月份
    MM: ("0" + (date.getMonth() + 1)).slice(-2), //2位数月份
    d: date.getDate(), //日份
    dd: ("0" + date.getDate()).slice(-2), //2位数 日份
    H: date.getHours(), //小时 24小时制
    HH: ("0" + date.getHours()).slice(-2), //2位数小时 24小时制
    h: date.getHours() % 12, //小时 12小时制
    hh: ("0" + (date.getHours() % 12)).slice(-2), //2位数小时 12小时制
    m: date.getMinutes(), //分
    mm: ("0" + date.getMinutes()).slice(-2), //2位数分
    s: date.getSeconds(), //秒
    ss: ("0" + date.getSeconds()).slice(-2), //两位数秒
    w: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"][
      date.getDay()
    ], //星期
  };
  // 根据传入字符串使用正则替换相关数据
  return formatDate.replace(/([a-z]+)/gi, function($1) {
    return obj[$1];
  });
}
```

## 函数柯里化

```javascript
//把多个参数的函数变换成接受一个单一参数的函数，并且返回接受余下的参数且返回结果的新函数的技术
function curry(fun) {
  let fn = function(...arg) {
    if (arg.length == fun.length) return fun(...arg);
    return (...arg2) => fn(...arg, ...arg2);
  };
  return fn;
}

function demo(a, b) {
  return a * b;
}
console.log(demo(1, 2)); //2
console.log(curry(demo)(1)(2)); //2
```

## 偏函数

```js
// 偏函数，就是固定一个函数的一个或者多个参数，返回一个新的函数，这个函数用于接受剩余的参数。
function partial(fn, ...arg) {
  return function(...args) {
    return fn(...arg, ...args);
  };
}
function demo(a, b, c) {
  console.log(a, b, c); // 1, 2,3
}
var a = partial(demo, 1);
a(2, 3);
```

## 在元素后面插入新元素

```javascript
function insertAfter(target, ele) {
  //查看是否有兄弟元素
  var nextEle = ele.nextElementSibling;
  if (nextEle == null) {
    // 无兄弟元素，直接添加到当前元素之后
    this.appendChild(target);
  } else {
    // 若有兄弟元素，添加在下一个兄弟元素之前
    this.insertBefore(target, nextEle);
  }
}
```

## 版本号比较排序

```js
//类似于  ['1.0.0.1','1.1.0.2','2.1.3.1']
//实现
arr.sort((a, b) => {
  return a.replace(/\./g, "") - b.replace(/\./g, "");
});

//['1.0.0','2.222.2.22','3.0.0.1','5.0.0']
//实现
arr.sort((a, b) => {
  var arrA = a.split(".");
  var arrB = b.split(".");
  var s = 1;
  var i = 0;
  while (arrA[i] || arrB[i]) {
    if (!arrA[i] || !arrB[i]) {
      arrA[i] ? (s = 1) : (s = -1);
    }
    if (arrA[i] > arrB[i]) {
      s = 1;
      break;
    } else if (arrA[i] < arrB[i]) {
      s = -1;
      break;
    } else if ((arrA[i] = arrB[i])) {
      i++;
    }
  }
  return s;
});
```

## 二叉树中的所有路径

```js
```

## 二叉树中和为某一值的路径

```js
```
