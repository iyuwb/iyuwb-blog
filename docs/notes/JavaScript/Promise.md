---
title: Promise
author: 耶温
createTime: 2024/05/11 15:05:45
permalink: /JavaScript/e6uvtokj/
---

# JavaScript 深入理解之 Promise

## Promise 介绍

> Promise 对象表示一个异步操作的最终完成（或失败）及其结果值。

状态：

> 一个 promise 必然处于以下几种状态之一

- 待定：初始状态(pending)
- 已兑现：操作成功完成(fulfilled)
- 已拒绝：操作失败(reject)

## 创建 Promise

> Promise 对象是由关键字 new 及其构造函数来创建的。该构造函数会把一个叫做“处理器函数”（executor function）的函数作为它的参数。这个“处理器函数”接受两个函数——resolve 和 reject ——作为其参数。当异步任务顺利完成且返回结果值时，会调用 resolve 函数；而当异步任务失败且返回失败原因（通常是一个错误对象）时，会调用 reject 函数。

```js
new Promise((resolve, reject) => {
  //处理操作  返回resolve或者reject
  if (flag) resolve(data);
  eles(reject(data));
});
```

需要某个自定义的函数，变成 Promise 只需返回一个 Promise 即可

```js
function myFun(flag) {
  return new Promise((resolve, reject) => {
    //处理操作  返回resolve或者reject
    if (flag) resolve(data);
    eles(reject(errorData));
  });
}
```

在具体项目中，使用 Promise 封装获取当前配置方法。

```js
/**
 * 获取字典列表
 * axios : axios
 * lang : 当前传入语言 ，根据不同语言，获取配置不同
 *
 * 判断sessionStorage里是否获取到当前所需要字典配置。
 * 如果有返回该配置，获取不到再从接口中获取数据，并保存到sessionStorage。
 */
function getDictionary(axios, lang) {
  // 查看sessionStorage
  const dic = sessionStorage.getItem("dictionary_data_" + lang) || null;
  // 返回一个Promise对象
  return new Promise((resolve, reject) => {
    if (dic) resolve(JSON.parse(dic));
    else {
      axios
        .get(`/api/dictionary?language=${lang}`)
        .then((res) => {
          const dic_data = {};
          if (res.data.code === 0 && res.data.result) {
            res.data.result.forEach((r) => (dic_data[r.itemName] = r));
            //存放sessionStorage
            sessionStorage.setItem(
              "dictionary_data_" + lang,
              JSON.stringify(dic_data)
            );
            // 返回数据
            resolve(dic_data);
          } else reject();
        })
        .catch((error) => reject());
    }
  });
}
```

## 静态方法

### Primise.all(iterable)

> 传参需要是一个可迭代对象
> Promise.all 返回一个 Promise 对象。
> 该 Promise 对象会在 Promise.all 的 iterable 参数对象里的所有 Promise 对象都成功才会触发。

> 简单来说就是只有 Promise.all 参数里的所有 Promise 成功才会触发，有一个失败就不会触发。

例如：

```js
var promise1 = Promise.resolve("heihei");
var promise2 = "wenbo";
var promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve([1, 2, 3]);
  }, 2000);
});

Promise.all([promise1, promise2, promise3]).then((res) => {
  console.log(res);
});
```

上面代码 会在大约两秒之后 打印输出 `[ 'heihei', 'wenbo', [ 1, 2, 3 ] ]`
因为 `Promise.all` 需要等待 `promise3` 中的 `setTimeout` 完成后才会触发返回 Promise 对象

又例如：

```js
var promise1 = Promise.reject("heihei");
var promise2 = "wenbo";
var promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve([1, 2, 3]);
  }, 2000);
});

Promise.all([promise1, promise2, promise3])
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });
```

上面代码，并不会在等待 2 秒左右输出`[ 'heihei', 'wenbo', [ 1, 2, 3 ] ]`，而会直接输出`heihei`因为在 `promise1` 中返回的是一个 `reject`，`Promise.all`认为`promise1`失败(rejected)。`Promise.all`会异步的将失败的结果返回，而不管其它 `promise` 是否完成。

在某些特定的场合，需要 `Promise.all` 返回的数据，才让继续执行代码。因为`Promise.all`是异步的，我们可以借助 `async` 与 `await` 实现。

```js
var promise1 = Promise.resolve("heihei");
var promise2 = "wenbo";
var promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve([1, 2, 3]);
  }, 2000);
});

function demo() {
  Promise.all([promise1, promise2, promise3]).then((res) => {
    console.log(res);
  });
  console.log("heihei");
}
demo();
```

以上代码会在执行之后 先打印"heihei"，之后 2 秒左右才会打印输出`[ 'heihei', 'wenbo', [ 1, 2, 3 ] ]`

```js
var promise1 = Promise.resolve("heihei");
var promise2 = "wenbo";
var promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve([1, 2, 3]);
  }, 2000);
});

async function demo() {
  await Promise.all([promise1, promise2, promise3]).then((res) => {
    console.log(res);
  });
  console.log("heihei");
}
demo();
```

上方在使用了 `async` 和 `await`之后 会等在 `Promise.all` 执行完成之后才会打印输出`heihei`。在实际项目中可以在下面使用`Promise.all`返回的数据进行操作。

### Promise.allSettled(iterable)

> 传参需要是一个可迭代对象
> Promise.allSettled 返回一个 Promise 对象。
> 该 Promise 对象会在 Promise.allSettled 的 iterable 参数对象里的所有 Promise 对象都成功或者失败才会触发。

> 简单说就是等所有的 Promise 执行完成才会触发，无论成功还是失败。

```js
var promise1 = Promise.reject("heihei");
var promise2 = "wenbo";
var promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve([1, 2, 3]);
  }, 2000);
});

Promise.allSettled([promise1, promise2, promise3])
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });
```

输出为：

```js
[
  { status: "rejected", reason: "heihei" },
  { status: "fulfilled", value: "wenbo" },
  { status: "fulfilled", value: [1, 2, 3] },
];
```

可以看到`Promise.allSettled`的返回值为一个数组，数组里包括每个 Promise 的状态`status`,返回值`value`,和 `rejected` 的值`reason`

和`Promise.all()` 相比，`Promise.all()`更适合彼此相互依赖或者在其中任何一个 `reject` 时立即结束。

### Promise.any(iterable)

> 传参需要是一个可迭代对象
> Promise.any 返回一个 Promise 对象。
> 接收一个 Promise 对象的集合，当其中的一个 promise 成功，就返回那个成功的 promise 的值。

```js
var promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve([4000]);
  }, 4000);
});
var promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve([1000]);
  }, 1000);
});

Promise.any([promise1, promise2])
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });
```

简单来说, Promise.any 像是竞速模式，那个 Promise 先成功，就返回哪一个 Promise

> Promise.any 和 Promise.all 是相反的，一个是全部成功才触发，一个只要有一个成功就触发。

```js
var promise1 = Promise.reject("error");
var promise2 = Promise.reject("error2");
Promise.any([promise1, promise2])
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });

//输出

//AggregateError: All promises were rejected
```

如上代码，当所有 Promise 都没有成功时，将返回一个 Error 的 Promise

### Promise.race(iterable)

> 传参需要是一个可迭代对象
> Promise.any 返回一个 Promise 对象。
> 接收一个 Promise 对象的集合，当其中的一个 promise 成功或者失败时，就返回那个成功或者失败的 promise 的值。

和 Promise.any 对比，Promise.any 为当有一个成功时，返回成功的 promise，Promise.race 则是不论成功失败都返回

```js
var promise1 = Promise.resolve("resolve");
var promise2 = Promise.reject("error");
Promise.race([promise1, promise2])
  .then((res) => {
    console.log(res); //resolve
  })
  .catch((e) => {
    console.log(e);
  });
// 输出为resolve
var promise1 = Promise.reject("error");
var promise2 = Promise.resolve("resolve");

Promise.race([promise1, promise2])
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e); //error
  });

//输出为 error
```

### Promise.reject(reason)

> 返回一个状态为失败的 Promise 对象，并将给定的失败信息传递给对应的处理方法
> Promise.reject()方法返回一个带有拒绝原因的 Promise 对象。

```js
Promise.reject("test-reject")
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e); //test-reject
  });
```

### Promise.resolve(value)

> 返回一个状态由给定 value 决定的 Promise 对象

> 如果这个是一个 Promise 对象，则返回这 Promise 对象。
> 如果这个值是 thenable（即带有"then" 方法），返回的 promise 会“跟随”这个 thenable 的对象，采用它的最终状态

```js
Promise.resolve("test-resolve")
  .then((res) => {
    console.log(res); //test-resolve
  })
  .catch((e) => {
    console.log(e);
  });
```

当 Resolve 是一个 Promise 对象，则返回这个 Promise 对象。

```js
var promise = Promise.resolve({
  name: "resolve",
});

Promise.resolve(promise)
  .then((res) => {
    console.log(res); //{name:resolve}
  })
  .catch((e) => {
    console.log(e);
  });
//reject情况
var promise = Promise.reject({
  name: "reject",
});

Promise.resolve(promise)
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e); //{name:reject}
  });
```

当 Resolve 是一个 thenable 对象时

```js
var p1 = Promise.resolve({
  then: function(resolve, reject) {
    resolve("hello ~!");
  },
});
p1.then((res) => {
  console.log(res); //hello ~!
});
```

注意：要在解析为自身的 thenable 上调用 Promise.resolve。这将导致无限递归。

## Promise 原型方法

### Promise.prototype.catch(onRejected)

> catch() 方法返回一个 Promise ，并且处理拒绝的情况
> 实际上 catch 的行为与调用 Promise.prototype.then(undefined, onRejected) 相同
> obj.catch(onRejected) 内部 calls obj.then(undefined, onRejected)

```js
var promise = new Promise((resolve, reject) => {
  throw "出现了错误~";
});
promise.then(
  (res) => {
    console.log(res);
  },
  (e) => {
    console.log(e); //出现了错误~
  }
);

promise
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e); //出现了错误~
  });
```

以上两种方法 都可以实现异常的捕获

### Promise.prototype.then(onFulfilled, onRejected)

> then() 方法返回一个 Promise。它最多需要有两个参数：Promise 的成功和失败情况的回调函数。

> 当只穿一个值得时候默认是 Promise 成功的回调函数

```js
//默认一个参数
var promise = new Promise((resolve, reject) => {
  resolve("成功~");
  //or
  // reject('失败~')
});

promise.then(
  (res) => {
    console.log(res); //成功~
  },
  (error) => {
    console.log(error); // 失败~
  }
);
```

### Promise.prototype.finally(onFinally)

> finally() 方法返回一个 Promise。在 promise 结束时，无论结果是 fulfilled 或者是 rejected，都会执行指定的回调函数。这为在 Promise 是否成功完成后都需要执行的代码提供了一种方式。
> 这避免了同样的语句需要在 then()和 catch()中各写一次的情况。

```js
var promise = new Promise((resolve, reject) => {
  resolve("成功~");
  //or
  // reject('失败~')
});

promise
  .then(
    (res) => {
      console.log(res); //成功~
    },
    (error) => {
      console.log(error); // 失败~
    }
  )
  .finally((res) => {
    console.log("finally~");
  });
```

如以上代码所示，无论 Promise 返回 resolve 还是 reject，都会执行 finally 里的内容。

## 链式使用

> 由于 promise.then()，promise.catch() 和 promise.finally()可以对已完成(成功或者失败)的 Promise 进行操作，还会返回一个新的 Promise 对象，在新的 Promise 对象上我们还可以使用这些方法进行操作，形成一个链式操作。

```js
var promise = new Promise((resolve, reject) => {
  resolve("成功~");
});

promise
  .then((res) => {
    console.log(res); //成功
    return new Promise((resolve, reject) => {
      resolve("成功01~");
    });
  })
  .then((res) => {
    console.log(res); //成功01~
    return new Promise((resolve, reject) => {
      resolve("成功02~");
    });
  })
  .then((res) => {
    console.log(res); //成功02~
    throw "error~";
  })
  .catch((e) => {
    console.log(e); //error~
  });
```
