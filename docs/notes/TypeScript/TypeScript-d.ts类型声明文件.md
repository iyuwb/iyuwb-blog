---
title: TypeScript-d.ts类型声明文件
author: 耶温
createTime: 2024/10/08 16:43:17
permalink: /TypeScript/7nzwlsgi/
---

在TypeScript 中，类型声明文件（ `.d.ts` 文件）用于为 JavaScript 模块提供类型信息。这些文件允许 TypeScript 编译器理解 JavaScript 模块的接口和类型，从而在开发过程中提供更好的类型检查和代码补全功能。

-   类型声明：`.d.ts` 文件包含类型声明，描述了模块、函数、类、接口等的类型信息。
-   不包含实现：这些文件只包含类型信息，不包含实际的实现代码。
-   通常用于为没有 TypeScript 类型定义的 JavaScript 库或者插件提供类型支持。

## 类型声明文件

创建一个 `math.js` 文件：
```js
// math.js
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

module.exports = { add, subtract };
```
为上述 `math.js` 文件创建一个类型声明文件 `math.d.ts`：
```ts
// math.d.ts
declare module 'math' {
    export function add(a: number, b: number): number;
    export function subtract(a: number, b: number): number;
}
```
我们可以在 `math.d.ts` 文件中声明 `math` 模块，并使用 `declare module` 语法来定义模块的导出函数的类型。
```ts
// app.ts
import { add, subtract } from 'math';

const sum = add(5, 3);
const difference = subtract(5, 3);
const difference1 = subtract(5, '3'); // 报错


console.log(`Sum: ${sum}`); // 输出: Sum: 8
console.log(`Difference: ${difference}`); // 输出: Difference: 2

```
如上所示，我们可以在 TypeScript 文件中导入 `math` 模块，并使用 `add` 和 `subtract` 函数，TypeScript 编译器将根据 `math.d.ts` 文件中的类型声明进行类型检查和代码补全。




##  `///` 三斜杠命令

在 TypeScript 中，三斜杠命令（Triple-Slash Directives）是一种特殊的注释语法，用于在 TypeScript 文件中引入其他类型声明文件或模块。这些命令以 `///` 开头，通常用于提供编译器指令。

 **1. `/// <reference path="" />`**

`/// <reference path="" />` 命令用于引入其他 TypeScript 文件。它告诉编译器在编译当前文件时，需要包含指定的文件。这通常用于在同一个项目中引用其他模块或类型声明文件。


例如，假设我们有一个 `math.ts` 文件和一个 `math.d.ts` 文件，我们可以在 `math.ts` 文件中使用 `/// <reference path="math.d.ts" />` 命令来引入 `math.d.ts` 文件：
```ts
/// <reference path="math.d.ts" />

import { add, subtract } from 'math';

const sum = add(5, 3);
const difference = subtract(5, 3);

console.log(`Sum: ${sum}`); // 输出: Sum: 8
console.log(`Difference: ${difference}`); // 输出: Difference: 2
```

 **2. `/// <reference types="" />`**

`types` 参数用来告诉编译器当前脚本依赖某个 DefinitelyTyped 类型库，通常安装在 `node_modules/@types` 目录。

`types` 参数的值是类型库的名称，也就是安装到 `node_modules/@types` 目录中的子目录的名字。
```ts
/// <reference types="lodash" />

import _ from 'lodash';

const array = [1, 2, 3, 4, 5];
const doubled = _.map(array, (num) => num * 2);

console.log(doubled); // 输出: [2, 4, 6, 8, 10]
```

**3. `/// <reference lib="" />`**

`lib` 参数用来告诉编译器当前脚本依赖某个内置类型库，通常不需要手动指定，编译器会自动根据目标 ECMAScript 版本选择合适的内置类型库。

`lib` 参数的值是内置类型库的名称，例如 `es2015`、`es2016`、`es2017` 等。

```ts
/// <reference lib="es2015" />

```


