---
title: TypeScript-模块
author: 耶温
createTime: 2024/09/12 21:14:57
permalink: /TypeScript/r62fvxh4/
---

# TypeScript-模块

TypeScript 模块是一个强大的特性，它允许你将代码组织成独立的文件和命名空间，从而促进更好的代码管理、重用和封装。

## 简介

通俗来讲，任何包含 `import` 或 `export` 的文件都是模块。相反，没有这些声明的文件是非模块的，它们就是一个个全局脚本文件。


模块本身有一个单独的作用域，模块中的变量、函数、类等都是私有的，除非明确地使用 `export` 导出，否则它们在模块外部是不可见的。如果其他文件需要使用这些变量、函数或类，就需要使用 `import` 导入。



如果一个文件不包括 `export` 但是希望把其作为一个模块，可以使用 `export {}` 的语法来显式地声明该文件是一个模块。


在 Typescript 中支持所有的 ES 模块语法。除此之外还支持导入导出类型，以及模块别名等特性。
```typescript
// a.ts 导出类型
export type A = number;

// b.ts 导入类型
import { A } from './a';
// 使用类型
let a: A = 1;
```

当我们编译上面代码时，可以只编辑 `b.ts` 即可。因为 `tsc` 会自动检测到 `b.ts` 依赖了 `a.ts` ，然后编译 `a.ts` 。

当然我们也可以使用 `tsc` 同时编译两个文件。
```shell
tsc b.ts

// 同时编译两个文件
tsc a.ts b.ts
```

## import type

`import` 在一条语句中，可以同时输入类型 和 正常内容。

```typescript
// a.ts 导出类型和值
export type A = number;
export const a = 1;

// b.ts 导入类型和值
import { A, a } from './a';
// 使用类型
let b: A = 1;
// 使用值
console.log(a , b);
```
如上，`import` 语句中同时导入了类型和值，这样不利于我们区分哪些是类型哪些是变量方法。

TypeScript 提供了 `import type` 语法，可以解决这个问题。我们可以在 `import` 导入的类型前面加上 `type` 关键字来表示这是一个类型导入。

```typescript
// a.ts 导出类型和变量
export type A = number;
export const a = 1;

// b.ts 导入类型和值
import { type A, a } from './a';
// 使用类型
let b: A = 1;
// 使用值
console.log(a , b);
```

除此之外我们还可以直接使用 `import type` 来导入多个类型。不过需要注意的是，`import type` 只能导入类型，不能导入其他变量方法等。
```typescript
// a.ts 导出类型和变量
export type A = number;
export type B = string;
export const a = 1;

// b.ts 
// 导入类型
import type { A, B} from './a';
// 导入值
import { a } from './a';

// 使用类型
let b: A = 1;
// 使用值
console.log(a , b);
```

`import type` 语句也可以输入默认类型。

```typescript
import type defaultType from './a';
```
`import type` 在名称空间中，输入所有类型。

```typescript
import type * as types from './a';
```

同时，导出类型 `export` 也有两种方式，一种是 `export type` ，另一种是 `export { type }` 。表示导出的内容都是类型。

```typescript
// a.ts 导出类
type A = number;

// 方法1
export { type A };

// 方法2
export type { A };
```



## CommonJS 模块

TypeScript 提供了 `module` 选项来指定模块系统。默认情况下，TypeScript 使用 ES6 模块系统，但是你也可以选择其他模块系统，比如 CommonJS 或 AMD。

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "module": "commonjs"
  }
}
```

Common JS 是 Node.js 的模块系统，与 ES 模块格式不同。

在TypeScript 中，使用 `import = ` 以及 `require` 来导入 CommonJS 模块。

```typescript
import obj = require('./a');
// or
const fs = require('fs');
```

需要注意的是，`import = ` 语法是 TypeScript 特有的，它允许我们使用 `import` 语句来导入 CommonJS 模块。


除此之外，TypeScript 还支持 `import * as [接口名] from "模块文件"` 。

```typescript
import * as fs from "fs";
// 等同于
import fs = require("fs");
```

同样的，TypeScript 也支持 `export = ` 语句，输出 CommonJS 模块。等同于 `export default` 。

```typescript
let obj = { foo: 123 };

export = obj;
```
需要注意的是，`export =` 语句导出的内容，只能使用 `import =` 语句导入。

```typescript
import obj = require('./a');
```

## 模块定位

模块定位（module resolution） 是 TypeScript 编译器用来查找模块文件的过程。TypeScript 编译器会根据模块的路径来查找模块文件，如果找不到模块文件，编译器会报错。



1. 相对模块

相对模块的路径是相对于当前文件的路径。相对模块的路径以 `./` 、 `../` 或 `./` 开头。

```typescript
import { A } from './a';
```

2. 非相对模块

非相对模块指的是不带有路径信息的模块。下面 `import` 语句加载的模块，都是非相对模块。

```typescript
import * as $ from "jquery"
import { Component } from "@angular/core";
```

模块定位有两种方法，一种为 Classic，另一种为 Node。可以使用 `moduleResolution` 选项来指定模块定位方法。如果没有指定，TypeScript 会根据模块系统的不同，自动选择 Classic 或 Node。

1. Classic 方法

-   相对模块：编译器会从当前文件所在的目录开始，根据相对路径查找模块文件。
-   非相对模块：从当前脚本的路径为起点，一层一层向上查找，直到找到模块文件或者到达根目录。

2. Node 方法

-   相对模块：编译器会从当前文件所在的目录开始，根据相对路径查找模块文件。
    -   当前目录是否包含目标文件
    -   当前目录是否包含目标文件名的同名目录，该目录下是否存在文件 `package.json` ，该文件的 `types` 字段是否指定了入口文件，如果是的就加载该文件。
    -   当前目录是否包含目标文件名的同名目录，该目录下是否存在文件 `index.d.ts` 、 `index.ts` 。 

-   非相对模块：以当前脚本的路径为起点，一层一层向上查找是否存在目录 `node_modules`。如果存在，则在该目录下查找目标文件。如果不存在，则继续向上查找，直到找到模块文件或者到达根目录。

    -   当前目录是否包含 `node_modules` 目录，目录是否包含 `x.ts` 、 `x.d.ts`。
    -   当前目录是否包含 `node_modules` 目录，目录是否包含 `package.json` ，该文件的 `types` 字段是否指定了入口文件，如果是的就加载该文件。
    -   当前目录的子目录 `node_modules` 里面，是否包含子目录 `@types`，在该目录中查找文件 `x.d.ts` 。
    -   当前目录的子目录 `node_modules` 里面，是否包含子目录 `x`，在该目录中查找 `index.ts` 、 `index.tsx` 、`index.d.ts` 。
    -   进入上一级目录，重复上述步骤。

## 路径映射







