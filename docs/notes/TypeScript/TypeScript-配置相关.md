---
title: TypeScript-配置相关
author: 耶温
createTime: 2024/10/12 16:11:38
permalink: /TypeScript/97zdlo92/
---
TypeScript 配置相关内容，包括注释指令、 tsc 命令行工具、d.ts 文件、tsconfig.json 文件中的配置项等。
## 注释指令

TypeScript 支持使用特殊的注释指令来控制编译器的行为。这些指令以 `//` 或 `/*` 开头，以 `*/` 结尾。

### // @ts-nocheck

`@ts-nocheck` 指令告诉 TypeScript 编译器忽略该文件中的所有类型检查错误。

```typescript
// @ts-nocheck
const element = document.getElementById(123);
```

### // @ts-check

`@ts-check` 指令告诉 TypeScript 编译器对该文件进行类型检查。

```typescript
// @ts-check
const element = document.getElementById(123); // 报错
```

### // @ts-ignore

`@ts-ignore` 指令告诉 TypeScript 编译器忽略下一行代码中的类型检查错误。

```typescript
const element = document.getElementById(123); // 报错
// @ts-ignore
const element2 = document.getElementById(123); // 忽略错误
```

## JSDoc

JSDoc 是一种用于注释 JavaScript 代码的规范，TypeScript 也支持使用 JSDoc 注释来提供类型信息。

基本语法：使用 `/**` 开头，以 `*/` 结尾，中间可以包含多个注释块。

需要注意：JSDoc注释必须放在函数声明之前，否则编译器无法识别。
### @param
`@param` 指令用于指定函数参数的类型和描述，可以在 JSDoc 注释中使用。
```typescript
/**
 * 这是一个函数的注释
 * @param {number} a - 参数 a 的描述
 * @param {string} b - 参数 b 的描述
 * @returns {string} 返回值的描述
 */
function foo(a: number, b: string): string {
  return b;
}
```



### @typedef

`@typedef` 指令用于定义自定义类型，可以在 JSDoc 注释中使用。

```typescript
/**
 * @typedef {Object} Person
 * @property {string} name - 人的名字
 * @property {number} age - 人的年龄
 */

/**
 * @param {Person} person - 一个人
 */
function greet(person: Person) {
    
}
```

### @type

`@type` 指令用于指定变量的类型，可以在 JSDoc 注释中使用。

```typescript
/**
 * @type {number} 
 * */
let count = 0;

// 其他
/**@type {true | false} */
let a;

/** @type {number[]} */
let b;

/** @type {Array<number>} */
let c;

/** @type {{ readonly x: number, y?: string }} */
let d;

/** @type {(s: string, b: boolean) => number} */
let e;
```
### @returns 和 @return

`@returns` 和 `@return` 指令用于指定函数的返回值类型和描述，可以在 JSDoc 注释中使用。

```typescript
/**
 * 这是一个函数的注释
 * @param {number} a - 参数 a 的描述
 * @param {string} b - 参数 b 的描述
 * @returns {string} 返回值的描述
 */
function foo(a: number, b: string): string {
    return b;
}
```
### @extends

`@extends` 指令用于指定类的父类，可以在 JSDoc 注释中使用。

```typescript
/**
 * @extends {HTMLElement}
 */
class MyElement extends HTMLElement {
    // ...
}


```
### @public、@private、@protected

`@public`、`@private`、`@protected` 指令用于指定类的成员的访问级别，可以在 JSDoc 注释中使用。

```typescript
class Base {
  /**
   * @public
   * @readonly
   */
  x = 0;

  /**
   *  @protected
   */
  y = 0;
}
```
## tsconfig.json

`tsconfig.json` 是 TypeScript 项目的配置文件，用于指定编译选项和项目结构。可以通过 `tsc -p  ./filename` 指定配置文件。如果不指定位置，则会从当前目录开始向上查找 `tsconfig.json` 文件。

我们可以通过 `tsc --init` 命令来生成一个默认的 `tsconfig.json` 文件。


```json
{
  "compilerOptions": { // 编译选项
    "outDir": "./dist", // 指定输出目录
    "allowJs": true, // 允许编译 JavaScript 文件
    "target": "es5", // 指定 ECMAScript 目标版本
    "module": "commonjs", // 指定模块代码生成方式
    "strict": true, // 启用所有严格类型检查选项
    "esModuleInterop": true, // 启用对 CommonJS 和 ES 模块的默认导入支持
    "skipLibCheck": true, // 跳过库文件的类型检查
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"], // 指定要编译的文件
  "exclude": ["node_modules", "**/*.spec.ts"] // 指定要排除的文件
}
```

### exclude

`exclude` 必须与 `include` 属性一起使用。 用于指定在编译过程中要排除的文件或文件夹。支持通配符。

```json
{
  "include": ["**/*.ts"], // 指定要编译的文件  
  "exclude": ["node_modules", "**/*.spec.ts"] // 排除 node_modules 文件夹和所有以 .spec.ts 结尾的文件
}
```

### extends

`extends` 用于指定当前配置文件继承另一个配置文件。可以用于共享配置，避免重复配置。

```json
{
  "extends": "./tsconfig.base.json", // 继承 ./tsconfig.base.json 文件中的配置
  "compilerOptions": {
    "outDir": "./dist"
  }
}
```
`extends` 指定的配置文件会先加载，然后再加载当前配置文件中的配置。如果两个配置文件中有相同的配置项，则当前配置文件中的配置会覆盖继承的配置文件中的配置。

### files

`files` 用于指定要编译的文件。可以指定一个或多个文件，也可以使用通配符。如果文件不存在，则会报错。如果文件较多，建议使用 `include` 属性。

```json
{
  "files": ["src/index.ts", "src/app.ts"] // 指定要编译的文件
}
```

### include

`include` 用于指定要编译的文件或文件夹。可以指定一个或多个文件或文件夹，也可以使用通配符。

```json
{
  "include": ["src/**/*", "tests/**/*"] // 指定要编译的文件或文件夹
}
```
`include` 和 `exclude` 属性支持三种通配符：
- `*`：匹配任意字符（不包括路径分隔符）。
- `?`：匹配单个字符。
- `**`：匹配任意目录层级。

如果不指定文件后缀名，默认包括 `*.ts`、`*.tsx`、`*.d.ts` 文件。如果打开了 `allowjs`，还包括 `*.js`、`*.jsx` 文件。

### references

`references` 用于指定当前项目依赖的其他项目。可以指定一个或多个项目，每个项目对应一个 `tsconfig.json` 文件。

```json
{
  "references": [
    { "path": "../project-a" },
    { "path": "../project-b" }
  ]
}
```
`references` 数组成员对象的 `path` 属性，既可以是含有文件 `tsconfig.json` 的目录，也可以直接是该文件。


### compilerOptions

`compilerOptions` 是 TypeScript 编译器的配置选项，用于指定编译过程中的行为。

#### `allowJs`

`allowJs` 用于指定是否允许编译 JavaScript 文件。默认值为 `false`。编译时，会将JS文件一起拷贝到输出目录。

```json
{
  "compilerOptions": {
    "allowJs": true // 允许编译 JavaScript 文件
  }
}
```

#### `alwaysStrict`

`alwaysStrict` 用于指定是否在编译过程中始终启用严格模式。默认值为 `false`。因此可以省略 `use strict`。



#### `allowSyntheticDefaultImports`

`allowSyntheticDefaultImports` 用于指定是否允许从没有默认导出的模块中默认导入。默认值为 `false`。


打开之后，可以默认导入没有默认导出的模块。例如：
```typescript

import React from 'react'; // React 没有默认导出，但是可以默认导入
// 原本
import * as React from "react";
```

#### `allowUnreachableCode`

`allowUnreachableCode` 用于指定是否允许编译过程中出现不可达代码。默认值为 `false`。编译时，如果出现不可达代码，会报错。

- `true`：允许编译过程中出现不可达代码。忽略。
- `false`：不允许编译过程中出现不可达代码。报错。
- `undefined`：默认值，编译器显示经高

```typescript
function foo() {
  return 1;
  console.log('never'); // 不可达代码
}
```

#### `allowUnusedLabels`

`allowUnusedLabels` 用于指定是否允许编译过程中出现未使用的标签。默认值为 `false`。编译时，如果出现未使用的标签，会报错。

- `true`：允许编译过程中出现未使用的标签。忽略。
- `false`：不允许编译过程中出现未使用的标签。报错。
- `undefined`：默认值，编译器显示警告。



#### `baseUrl`

`baseUrl` 用于指定模块解析的基准目录。默认值为 `.`。编译时，会将 `baseUrl` 指定的目录作为基准目录，来解析模块。

```json
{
  "compilerOptions": {
    "baseUrl": "./src" // 指定模块解析的基准目录
  }
}
```
```typescript
import { foo } from 'bar'; // 解析为 ./src/bar
```


#### `checkJs`

`checkJs` 用于指定是否对 JavaScript 文件进行类型检查。默认值为 `false`。编译时，会对 JavaScript 文件进行类型检查。

相当于在 JS 脚本的第一行加上 `// @ts-check`。
```json
{
  "compilerOptions": {
    "checkJs": true // 对 JavaScript 文件进行类型检查
  }
}
```
#### `composite`
`composite` 用于指定当前项目是否是一个复合项目。默认值为 `false`。编译时，会将当前项目及其依赖的项目一起编译。

```json
{
  "compilerOptions": {
    "composite": true // 当前项目是一个复合项目
  }
}
```

#### `declaration`

`declaration` 用于指定是否生成 `.d.ts` 声明文件。默认值为 `false`。编译时，会生成 `.d.ts` 声明文件。

```json
{
  "compilerOptions": {
    "declaration": true // 生成 .d.ts 声明文件
  }
}
```

#### `declarationDir`

`declarationDir` 用于指定 `.d.ts` 声明文件的输出目录。默认值为 `.`。编译时，会将 `.d.ts` 声明文件输出到 `declarationDir` 指定的目录。

```json
{
  "compilerOptions": {
    
    "declarationDir": "./types" // 指定 .d.ts 声明文件的输出目录
  }
}
```

#### `declarationMap`

`declarationMap` 用于指定是否生成 `.d.ts` 声明文件的源映射。默认值为 `false`。编译时，会生成 `.d.ts` 声明文件的源映射。

```json
{
  "compilerOptions": {
    "declarationMap": true // 生成 .d.ts 声明文件的源映射
  }
}
```
#### `emitBOM`

`emitBOM` 用于指定是否在输出文件中添加 字节顺序标志 BOM（Byte Order Mark）。


#### `emitDeclarationOnly`

`emitDeclarationOnly` 用于指定是否只生成 `.d.ts` 声明文件，而不生成 `.js` 文件。

```json
{
  "compilerOptions": {
    "emitDeclarationOnly": true // 只生成 .d.ts 声明文件，而不生成 .js 文件
  }
}
```
#### `esModuleInterop`

`esModuleInterop` 用于指定是否启用 ES 模块互操作。修复了一些 CommonJS 和 ES6 模块之间的兼容性问题。

#### `exacrOptionalPropertyTypes`

`exacrOptionalPropertyTypes` 用于指定是否严格检查可选属性的类型。默认值为 `false`。编译时，如果可选属性的类型不正确，会报错。

即设置可选属性不能赋值为 `undefined`。
```typescript
interface Foo {
  bar?: string;
}

const foo: Foo = {
  bar: undefined, // 报错
};
```
#### `forceConsistentCasingInFileNames`

`forceConsistentCasingInFileNames` 用于指定是否强制在文件名中使用一致的大小写。默认值为 `false`。编译时，如果文件名的大小写不一致，会报错。

#### `incremental`

`incremental` 用于指定是否启用增量编译。默认值为 `false`。编译时，会将上一次编译的结果保存下来，下次编译时，只会编译有变化的文件。

#### `inlineSourceMap`

`inlineSourceMap` 用于指定是否将源映射嵌入到输出文件中。默认值为 `false`。编译时，会将源映射嵌入到输出文件中。

#### `inlineSources`

`inlineSources` 用于指定是否将源代码嵌入到源映射中。默认值为 `false`。编译时，会将源代码嵌入到源映射中。

#### `isolatedModules`

`isolatedModules` 用于指定是否将每个文件作为一个独立的模块。默认值为 `false`。编译时，会将每个文件作为一个独立的模块。

#### `jsx`

`jsx` 用于指定 JSX 代码的编译方式。默认值为 `preserve`。编译时，会将 JSX 代码编译为 JavaScript 代码。

- `preserve`：保留 JSX 代码，不进行编译。
- `react`：将 JSX 代码编译为 React 代码。
- `react-native`：将 JSX 代码编译为 React Native 代码。

#### `lib`

`lib` 用于指定编译时使用的库。

```json
{
  "compilerOptions": {
    "lib": ["ES2015"] // 指定编译时使用的库
  }
}
```



## tsc 命令行工具

tsc 是 TypeScript 的编译器，可以通过命令行工具来编译 TypeScript 代码。

1. 下载 TypeScript：在命令行中运行 `npm install -g typescript` 来安装 TypeScript。
```bash
npm install -g typescript
```
2. 编译 TypeScript 文件：在命令行中运行 `tsc <filename>.ts` 来编译 TypeScript 文件。例如，`tsc app.ts` 将编译 `app.ts` 文件。
```bash
tsc app.ts
```


