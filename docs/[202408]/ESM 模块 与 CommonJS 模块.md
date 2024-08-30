---
title: ESM 模块 与 CommonJS 模块
author: 耶温
createTime: 2024/08/29 22:00:42
permalink: /article/cprm0p8o/
---
# JavaScript-ESM 与 CommonJS 模块

## 介绍示例
**ES模块（ECMAScript Modules）**：ES 模块是 avaScript 的模块化标准，它允许开发者将代码分割成多个文件，每个文件都是一个模块，模块之间可以相互导入和导出。ES 模块使用 `import` 和 `export` 关键字来导入和导出模块。



```js
// 导出模块
export const myFunction = () => {
  // ...
}

export const myVariable = 42

// 导入模块
import { myFunction, myVariable } from './myModule.js'
```


**CommonJS模块**：CommonJS 模块是 Node.js 的模块化标准，它允许开发者将代码分割成多个文件，每个文件都是一个模块，模块之间可以相互导入和导出。CommonJS 模块使用 `require` 和 `module.exports` 关键字来导入和导出模块。


```js
// 导出模块
const myFunction = () => {
  // ...
}

const myVariable = 42

module.exports = {
  myFunction,
  myVariable
}

// 导入模块
const myModule = require('./myModule.js')

const myFunction = myModule.myFunction
const myVariable = myModule.myVariable
```

## 特点区别

ES模块：
- ES模块是 JavaScript 的官方模块化标准，由 ECMAScript 规范定义。
- ES模块使用 `import` 和 `export` 关键字来导入和导出模块。
- ES模块是静态的，即在编译时确定模块的依赖关系和导出/导入的变量。
- ES模块支持循环依赖，即一个模块可以在导入另一个模块之前导出变量。
- ES模块支持异步加载，可以使用 `import()` 函数来动态加载模块。
- ES模块文件的扩展名通常是 `.mjs` 或者 `.js` 。需要注意的是使用 `Node.js` 运行项目的话，一般需要在 `package.json` 中设置 `"type": "module"` 使用。

CommonJS模块：
- CommonJS模块是Node.js的模块化标准，由Node.js社区定义。
- CommonJS模块使用 `require` 和 `module.exports` 关键字来导入和导出模块。
- CommonJS模块是动态的，即在运行时确定模块的依赖关系和导出/导入的变量。
- CommonJS模块不支持循环依赖，即一个模块不能在导入另一个模块之前导出变量。
- CommonJS模块不支持异步加载，只能同步加载模块。
- CommonJS模块文件的扩展名通常是 `.js` 。

## 使用场景

ES 模块：
- 适用于现代 Web 开发、前端框架、需要模块化和动态导入的场景，逐渐成为主流选择，尤其是在浏览器中。


CommonJS 模块：
- 主要用于 Node.js 应用，适合需要同步加载和与现有工具兼容的场景。

## 动态加载与异步加载

- **ESM**：支持动态加载，使用 `import()` 语法。这是一个异步操作，返回一个 Promise。

```js
// 动态加载模块
import('./myModule.js')
  .then((module) => {
    // 使用模块
    console.log(module
  })
  .catch((error) => {
    // 处理错误
  });
```
我们可以使用 `await` 关键字来等待模块加载完成。

```js
async function loadModule() {
  const module = await import('./myModule.js');
  // 使用模块
  console.log(module);
}
```

- **CommonJS**：不支持异步加载，只能同步加载模块。但是我们可以根据条件动态加载模块。

```js
// 动态加载模块
if (condition) {
  const module = require('./myModule.js');
  // 使用模块
  console.log(module);
}
```

## 导出内容是否能被修改？

- **ES 模块**导出的内容是只读的，不能被修改。如果尝试修改导出的内容，会导致错误。但是如果导出的内容是一个对象，那么可以通过修改对象的属性来改变它的状态。

`esm.js`:
```js
export let version = '1.0.0'

export let versionData = {
    name:'yuwb',
    version:'1.0.0',
    date:'2022-01-01'
}
```
使用 `esm.js` 模块：
```html
<script type="module">
    import {version,versionData} from './m.js'
    console.log(version)
    version = 111 // 报错 Uncaught TypeError: "version" is read-only

    console.log(versionData)  
    // Object { name: "yuwb", version: "1.0.0", date: "2022-01-01" }
    versionData.version = '1.0.1' 
    console.log(versionData)
    // Object { name: "yuwb", version: "1.0.1", date: "2022-01-01" }

</script>
```
由于第一次导入一个模块时，模块的代码会被执行，并且其导出的内容会被缓存。后续的导入将使用这个缓存的内容，而不会重新执行模块的代码。

因此，如果模块的导出内容在当前页面代码中被修改，那么这个修改会影响到当前页面的其他导入，因为它们共享同一个导出内容。但是不会影响到其他页面，因为它们有自己的缓存。

```html
<script type="module">
  // 导入
  import {versionData} from './m.js'
  versionData.version = '1.0.2'
  console.log(versionData)
  // Object { name: "yuwb", version: "1.0.2", date: "2022-01-01" }

  // 重新导入
  import {versionData as versionData2} from './m.js'
  console.log(versionData2)
  // Object { name: "yuwb", version: "1.0.2", date: "2022-01-01" }
</script>
```
如上所示，在第一次导入 `m.js` 模块后，我们修改了 `versionData` 对象的 `version` 属性。然后我们重新导入 `m.js` 模块，发现 `versionData2` 对象的 `version` 属性也被修改了。这是因为 `versionData` 和 `versionData2` 实际上引用的是同一个对象。

因此，如果需要确保模块的导出内容不会被修改，可以使用 `Object.freeze()` 函数来冻结导出的对象。。


- **CommonJS 模块**导出的内容是可以被修改的，因为它们是对象的引用。

`m.js`:
```js
const a = 10;
const add = (a, b) => a + b;

// 导出模块
module.exports = {
    a,
    add,
};

```

使用 `m.js` 模块：
```js
// CommonJS 模块
const math = require('./m.js')

console.log(math.a)
math.a = 2
console.log(math.a)

console.log(math.add(2, 3))  // 5
math.add = function (a, b) {
    return `结果为：${a + b}`
}
console.log(math.add(2, 3))  // 结果为5
```
同 ESM 一样，在 CommonJS 模块中，模块的导出是共享的，但这仅适用于同一个 Node.js 进程或同一个 JavaScript 执行上下文。

如下，在 Node.js 中，如果你在一个模块中修改了导出的内容，所有导入该模块的其他文件都会看到这些修改，因为它们共享同一个模块实例。

```js
const math = require('./m.js')
math.add = function (a, b) {
    return `结果为：${a + b}`
}

const math2 = require('./m.js')
console.log(math2.add(2, 3)) // 结果为5
```

## 循环引用问题
循环引用是指两个或多个模块相互引用对方，形成一个引用闭环。在 ES 模块和 CommonJS 模块中，循环引用的处理方式有所不同。

**ES 模块**

在 ES 模块中，如果两个模块相互引用，那么在导入时，其中一个模块的导出内容可能会是 `undefined`，因为另一个模块的导出内容还没有被完全初始化。但是需要使用 `var` 声明变量，否则会报错。


`moduleA.js`：
```js
import { b } from './moduleB.js';

export const a = 'This is module A';
console.log('Module A:', a);
console.log('Module B:', b); 
```
`moduleB.js`：
```js
import { a } from './moduleA.js';

export const b = 'This is module B';
console.log('Module B:', b);
console.log('Module A:', a); 
```
导入 `moduleA.js` 或者 `moduleB.js` ：
```js
import { a } from './moduleA.js';
// Module B: This is module B         --moduleB.js
// 报错 Uncaught (in promise) ReferenceError: can't access lexical declaration 'a' before initialization    --moduleB.js

// or 
import { b } from './moduleB.js';
// Module B: This is module B       --moduleA.js
// 报错 Uncaught (in promise) ReferenceError: can't access lexical declaration 'a' before initialization      --moduleA.js
```
如上所示，在导入 `moduleA.js` 或者 `moduleB.js` 时，会报错。

如果我们把 `const` 改为 `var`，则不会报错。这是因为 `const` 声明的变量是暂时性死区（Temporal Dead Zone，TDZ），在声明之前访问该变量会导致 ReferenceError 。

```js
import { a } from './moduleA.js';
// Module B: This is module B      --moduleB.js 
// Module A: undefined             --moduleB.js
// Module A: This is module A      --moduleA.js
// Module B: This is module B      --moduleA.js

// or 
import { b } from './moduleB.js';
// Module A: This is module A       --moduleA.js
// Module B: undefined              --moduleA.js
// Module B: This is module B       --moduleB.js
// Module A: This is module A       --moduleB.js
```

**CommonJS**

在 CommonJS 模块中，如果两个模块相互引用，那么在导入时，其中一个模块的导出内容可能会是 `undefined`，因为另一个模块的导出内容还没有被完全初始化。

```js
// moduleA.js
const { b } = require('./moduleB.js');
const a = 'This is module A'
module.exports = {
    a
}
console.log('Module A:', a);
console.log('Module B:', b); 
```
```js
const { a } = require('./moduleA.js');
const b = 'This is module B';
module.exports = {
    b
}
console.log('Module A:', a); 
console.log('Module B:', b);
```
导入 `moduleA.js` 或者 `moduleB.js` ：

```js
const { a } = require('./moduleA.js');
// Module B: This is module B      --moduleB.js 
// Module A: undefined             --moduleB.js
// Module A: This is module A      --moduleA.js
// Module B: This is module B      --moduleA.js

// or 
const { b } = require('./moduleB.js');
// Module A: This is module A       --moduleA.js
// Module B: undefined              --moduleA.js
// Module B: This is module B       --moduleB.js
// Module A: This is module A       --moduleB.js
```


