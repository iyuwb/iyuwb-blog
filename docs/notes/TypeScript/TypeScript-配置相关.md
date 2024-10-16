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

#### allowJs

`allowJs` 用于指定是否允许编译 JavaScript 文件。默认值为 `false`。编译时，会将JS文件一起拷贝到输出目录。

```json
{
  "compilerOptions": {
    "allowJs": true // 允许编译 JavaScript 文件
  }
}
```

#### alwaysStrict

`alwaysStrict` 用于指定是否在编译过程中始终启用严格模式。默认值为 `false`。因此可以省略 `use strict`。



#### allowSyntheticDefaultImports

`allowSyntheticDefaultImports` 用于指定是否允许从没有默认导出的模块中默认导入。默认值为 `false`。


打开之后，可以默认导入没有默认导出的模块。例如：
```typescript

import React from 'react'; // React 没有默认导出，但是可以默认导入
// 原本
import * as React from "react";
```

#### allowUnreachableCode

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

#### allowUnusedLabels

`allowUnusedLabels` 用于指定是否允许编译过程中出现未使用的标签。默认值为 `false`。编译时，如果出现未使用的标签，会报错。

- `true`：允许编译过程中出现未使用的标签。忽略。
- `false`：不允许编译过程中出现未使用的标签。报错。
- `undefined`：默认值，编译器显示警告。



#### baseUrl

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


#### checkJs

`checkJs` 用于指定是否对 JavaScript 文件进行类型检查。默认值为 `false`。编译时，会对 JavaScript 文件进行类型检查。

相当于在 JS 脚本的第一行加上 `// @ts-check`。
```json
{
  "compilerOptions": {
    "checkJs": true // 对 JavaScript 文件进行类型检查
  }
}
```
#### composite
`composite` 用于指定当前项目是否是一个复合项目。默认值为 `false`。编译时，会将当前项目及其依赖的项目一起编译。

```json
{
  "compilerOptions": {
    "composite": true // 当前项目是一个复合项目
  }
}
```

#### declaration

`declaration` 用于指定是否生成 `.d.ts` 声明文件。默认值为 `false`。编译时，会生成 `.d.ts` 声明文件。

```json
{
  "compilerOptions": {
    "declaration": true // 生成 .d.ts 声明文件
  }
}
```

#### declarationDir

`declarationDir` 用于指定 `.d.ts` 声明文件的输出目录。默认值为 `.`。编译时，会将 `.d.ts` 声明文件输出到 `declarationDir` 指定的目录。

```json
{
  "compilerOptions": {
    
    "declarationDir": "./types" // 指定 .d.ts 声明文件的输出目录
  }
}
```

#### declarationMap

`declarationMap` 用于指定是否生成 `.d.ts` 声明文件的源映射。默认值为 `false`。编译时，会生成 `.d.ts` 声明文件的源映射。

```json
{
  "compilerOptions": {
    "declarationMap": true // 生成 .d.ts 声明文件的源映射
  }
}
```
#### emitBOM

`emitBOM` 用于指定是否在输出文件中添加 字节顺序标志 BOM（Byte Order Mark）。


#### emitDeclarationOnly

`emitDeclarationOnly` 用于指定是否只生成 `.d.ts` 声明文件，而不生成 `.js` 文件。

```json
{
  "compilerOptions": {
    "emitDeclarationOnly": true // 只生成 .d.ts 声明文件，而不生成 .js 文件
  }
}
```
#### esModuleInterop

`esModuleInterop` 用于指定是否启用 ES 模块互操作。修复了一些 CommonJS 和 ES6 模块之间的兼容性问题。

#### exacrOptionalPropertyTypes

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
#### forceConsistentCasingInFileNames

`forceConsistentCasingInFileNames` 用于指定是否强制在文件名中使用一致的大小写。默认值为 `false`。编译时，如果文件名的大小写不一致，会报错。

#### incremental

`incremental` 用于指定是否启用增量编译。默认值为 `false`。编译时，会将上一次编译的结果保存下来，下次编译时，只会编译有变化的文件。

#### inlineSourceMap

`inlineSourceMap` 用于指定是否将源映射嵌入到输出文件中。默认值为 `false`。编译时，会将源映射嵌入到输出文件中。

#### inlineSources

`inlineSources` 用于指定是否将源代码嵌入到源映射中。默认值为 `false`。编译时，会将源代码嵌入到源映射中。

#### isolatedModules

`isolatedModules` 用于指定是否将每个文件作为一个独立的模块。默认值为 `false`。编译时，会将每个文件作为一个独立的模块。

#### jsx

`jsx` 用于指定 JSX 代码的编译方式。默认值为 `preserve`。编译时，会将 JSX 代码编译为 JavaScript 代码。

- `preserve`：保留 JSX 代码，不进行编译。
- `react`：将 JSX 代码编译为 React 代码。
- `react-native`：将 JSX 代码编译为 React Native 代码。

#### lib

`lib` 用于指定编译时使用的库。

```json
{
  "compilerOptions": {
    "lib": ["ES2015"] // 指定编译时使用的库
  }
}
```
#### listEmittedFiles

`listEmittedFiles` 用于指定是否在编译时输出已生成的文件列表。

#### listFiles

`listFiles` 用于指定是否在编译时输出已解析的文件列表。

#### mapRoot

`mapRoot` 用于指定源映射文件的根目录。

#### module

`module` 指定编译产物的模块格式。它的默认值与 `target` 属性有关，如果 `target` 是 ES3 或 ES5，它的默认值是 `commonjs` ，否则就是 `ES6/ES2015`。

```json
{
  "compilerOptions": {
    "module": "commonjs" // 指定编译产物的模块格式
  }
}
```
值：`commonjs`、`amd`、`umd`、`es6`、`es2015`、`es2020`、`esnext`、`none`等。
#### moduleResolution

`moduleResolution` 用于指定模块解析策略。

- `node`：使用 Node.js 的模块解析策略。
- `classic`：使用 TypeScript 1.6 之前的模块解析策略。

#### moduleSuffixes

`moduleSuffixes` 用于指定模块的后缀名。

#### newLine

`newLine` 用于指定换行符的样式。

- `crlf`：回车符 + 换行符。 (Windows 风格)
- `lf`：换行符。 (Unix 风格)
- `cr`：回车符。

#### noEmit

`noEmit` 用于指定是否不生成编译产物。如果不生成编译产物，编译器只会进行类型检查。

#### noEmitHelpers

`noEmitHelpers` 用于指定是否不生成编译辅助函数。

#### noEmitOnError

`noEmitOnError` 用于指定是否在编译出错时不生成编译产物。

#### noFallthroughCasesInSwitch

`noFallthroughCasesInSwitch` 用于指定是否在 switch 语句中检查是否有遗漏的 case 分支。

#### noImplicitAny

`noImplicitAny` 用于指定是否在编译时检查隐式的 `any` 类型。

#### noImplicitReturns

`noImplicitReturns` 用于指定是否在编译时检查隐式的返回值。

#### noImplicitThis

`noImplicitThis` 用于指定是否在编译时检查隐式的 `this` 类型。

#### noUnusedLocals

`noUnusedLocals` 用于指定是否在编译时检查未使用的局部变量。

#### noUnusedParameters

`noUnusedParameters` 用于指定是否在编译时检查未使用的参数。

#### outDir

`outDir` 用于指定编译产物的输出目录。如果没有指定 `outDir`，编译产物将输出到与源文件相同的目录。

#### outFile

`outFile` 用于指定编译产物的输出文件。如果指定了 `outFile`，编译产物将输出到指定的文件中。将所有非模块的全局文件，编译成一个文件。

#### paths

`paths` 用于指定模块路径的映射关系。`paths` 基于 `baseUrl` 进行加载，所以必须同时设置后者。

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```
#### preserveConstEnums

`preserveConstEnums` 用于指定是否保留 `const enum` 的定义。

#### pretty

`pretty` 用于指定是否在编译时输出格式化的错误信息。

#### removeComments

`removeComments` 用于指定是否在编译时移除注释。

#### resolveJsonModule

`resolveJsonModule` 用于指定是否解析 JSON 模块。

#### rootDir

`rootDir` 用于指定编译源文件的根目录。如果没有指定 `rootDir`，编译器将使用当前目录作为根目录。

#### rootDirs

`rootDirs` 用于指定多个根目录。编译器会将这些目录视为一个根目录，从而进行模块解析。

```json
{
  "compilerOptions": {
    "rootDirs": ["src", "out"]
  }
}
```
#### sourceMap

`sourceMap` 用于指定是否生成源映射文件。

#### sourceRoot

`sourceRoot` 用于指定源文件的根目录。源映射文件中会使用 `sourceRoot` 来定位源文件。


#### strict

`strict` 用于指定是否启用严格模式。启用严格模式后，编译器将进行更严格的类型检查。

#### strictBindCallApply

`strictBindCallApply` 用于指定是否在编译时检查 `bind`、`call` 和 `apply` 方法的参数类型。


#### strictFunctionTypes

`strictFunctionTypes` 用于指定是否在编译时检查函数类型的参数和返回值类型。更加严格地检查函数类型。

#### strictNullChecks

`strictNullChecks` 用于指定是否在编译时检查 `null` 和 `undefined` 类型。启用后，编译器将严格检查 `null` 和 `undefined` 类型，从而避免一些常见的错误。

#### strictPropertyInitialization
`strictPropertyInitialization` 用于指定是否在编译时检查类的属性是否已初始化。启用后，编译器将严格检查类的属性是否已初始化，从而避免一些常见的错误。

#### suppressImplicitAnyIndexErrors

`suppressImplicitAnyIndexErrors` 关闭对象字面量的多余参数的报错.
#### target

`target` 用于指定编译产物的目标版本。默认值为 `ES3`。编译时，会将 TypeScript 代码编译为 JavaScript 代码，并指定目标版本。

```json
{
  "compilerOptions": {
    "target": "ES6" // 指定编译产物的目标版本
  }
}
```
####  traceResolution

`traceResolution` 用于指定是否在编译时输出模块解析的详细信息。

#### typeRoots

`typeRoots` 用于指定类型定义文件的根目录。编译器会在这些目录中查找类型定义文件。默认情况下，编译器会在 `node_modules/@types` 目录中查找类型定义文件。

```json
{
  "compilerOptions": {
    "typeRoots": ["./typings"] // 指定类型定义文件的根目录
  }
}
```

#### types

`types` 用于指定要包含的类型定义文件。编译器会在 `typeRoots` 中查找这些类型定义文件。

```json
{
  "compilerOptions": {
    "types": ["node", "express"] // 指定要包含的类型定义文件
  }
}
```

#### useUnknownInCatchVariables

`useUnknownInCatchVariables` 用于指定是否在 `catch` 语句中检查 `error` 变量的类型。启用后，编译器会将 `catch` 语句中的 `error` 变量的类型设置为 `unknown`，从而避免一些常见的错误。


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

### 基本命令


```bash
# 使用 tsconfig.json 的配置
tsc

# 只编译 index.ts
tsc index.ts

# 编译 src 目录的所有 .ts 文件
tsc src/*.ts

# 指定编译配置文件
tsc --project tsconfig.production.json

# 只生成类型声明文件，不编译出 JS 文件
tsc index.js --declaration --emitDeclarationOnly

# 多个 TS 文件编译成单个 JS 文件
tsc app.ts util.ts --target esnext --outfile index.js
```

### 命令行参数
`tsc` 的命令行参数，大部分与 `tsconfig.json` 的属性一一对应。




`--all`：输出所有可用的参数。

`--allowJs`：允许 TS 脚本加载 JS 模块，编译时将 JS 一起拷贝到输出目录。

`--allowUnreachableCode`：如果 TS 脚本有不可能运行到的代码，不报错。

`--allowUnusedLabels`：如果 TS 脚本有没有用到的标签，不报错。

`--alwaysStrict`：总是在编译产物的头部添加`use strict`。

`--baseUrl`：指定非相对位置的模块定位的基准 URL。

`--build`：启用增量编译。

`--checkJs`：对 JS 脚本进行类型检查。

`--declaration`：为 TS 脚本生成一个类型生成文件。

`--declarationDir`：指定生成的类型声明文件的所在目录。

`--declarationMap`：为`.d.ts`文件生成 SourceMap 文件。

`--diagnostics`：构建后输出编译性能信息。

`--emitBOM`：在编译输出的 UTF-8 文件头部加上 BOM 标志。

`--emitDeclarationOnly`：只编译输出类型声明文件，不输出 JS 文件。

`--esModuleInterop`：更容易使用 import 命令加载 CommonJS 模块。

`--exactOptionalPropertyTypes`：不允许将可选属性设置为`undefined`。

`--experimentalDecorators`：支持早期的装饰器语法。

`--explainFiles`：输出进行编译的文件信息。

`--forceConsistentCasingInFileNames`：文件名大小写敏感，默认打开。

`--help`：输出帮助信息。

`--importHelpers`：从外部库（比如 tslib）输入辅助函数。

`--incremental`：启用增量构建。

`--init`：在当前目录创建一个全新的`tsconfig.json`文件，里面是预设的设置。

`--inlineSourceMap`：SourceMap 信息嵌入 JS 文件，而不是生成独立的`.js.map`文件。

`--inlineSources`：将 TypeScript 源码作为 SourceMap 嵌入编译出来的 JS 文件。

`--isolatedModules`：确保每个模块能够独立编译，不依赖其他输入的模块。

`--jsx`：设置如何处理 JSX 文件。

`--lib`：设置目标环境需要哪些内置库的类型描述。

`--listEmittedFiles`：编译后输出编译产物的文件名。

`--listFiles`：编译过程中，列出读取的文件名。

`--listFilesOnly`：列出编译所要处理的文件，然后停止编译。

`--locale`：指定编译时输出的语言，不影响编译结果。

`--mapRoot`：指定 SourceMap 文件的位置。

`--module`：指定编译生成的模块格式。

`--moduleResolution`：指定如何根据模块名找到模块的位置。

`--moduleSuffixes`：指定模块文件的后缀名。

`--newLine`：指定编译产物的换行符，可以设为`crlf`或者`lf`。

`--noEmit`：不生成编译产物，只进行类型检查。

`--noEmitHelpers`：不在编译产物中加入辅助函数。

`--noEmitOnError`：一旦报错，就停止编译，没有编译产物。

`--noFallthroughCasesInSwitch`：Switch 结构的`case`分支必须有终止语句（比如`break`）。

`--noImplicitAny`：类型推断只要为`any`类型就报错。

`--noImplicitReturns`：函数内部没有显式返回语句（比如`return`）就报错。

`--noImplicitThis`：如果`this`关键字是`any`类型，就报错。

`--noImplicitUseStrict`：编译产生的 JS 文件头部不添加`use strict`语句。

`--noResolve`：不进行模块定位，除非该模块是由命令行传入。

`--noUnusedLocals`：如果有未使用的局部变量就报错。

`--noUnusedParameters`：如果有未使用的函数参数就报错。

`--outDir`：指定编译产物的存放目录。

`--outFile`：所有编译产物打包成一个指定文件。

`--preserveConstEnums`：不将`const enum`结构在生成的代码中，替换成常量。

`--preserveWatchOutput`： watch 模式下不清屏。

`--pretty`：美化显示编译时的终端输出。这是默认值，但是可以关闭`--pretty false`。

`--project`（或者`-p`）：指定编译配置文件，或者该文件所在的目录。

`--removeComments`：编译结果中移除代码注释。

`--resolveJsonModule`：允许加载 JSON 文件。

`--rootDir`：指定加载文件所在的根目录，该目录里面的目录结构会被复制到输出目录。

`--rootDirs`：允许模块定位时，多个目录被当成一个虚拟目录。

`--skipDefaultLibCheck`：跳过 TypeScript 内置类型声明文件的类型检查。

`--skipLibCheck`：跳过`.d.ts`类型声明文件的类型检查。这样可以加快编译速度。

`--showConfig`：终端输出编译配置信息，而不进行配置。

`--sourcemap`：为编译产生的 JS 文件生成 SourceMap 文件（.map 文件）。

`--sourceRoot`：指定 SourceMap 文件里面的 TypeScript 源码根目录位置。

`--strict`：打开 TypeScript 严格检查模式。

`--strictBindCallApply`：bind, call、apply 这三个函数的类型，匹配原始函数。

`--strictFunctionTypes`：如果函数 B 的参数是函数 A 参数的子类型，那么函数 B 不能替代函数 A。

`--strictNullChecks`：对`null`和`undefined`进行严格类型检查。

`--strictPropertyInitialization`：类的属性必须进行初始值，但是允许在构造函数里面赋值。

`--suppressExcessPropertyErrors`：关闭对象字面量的多余参数的报错。

`--target`：指定编译出来的 JS 代码的版本，TypeScript 还会在编译时自动加入对应的库类型声明文件。

`--traceResolution`：编译时在终端输出模块解析（moduleResolution）的具体步骤。

`--typeRoots`：设置类型模块所在的目录，替代默认的`node_modules/@types`。

`--types`：设置`typeRoots`目录下需要包括在编译之中的类型模块。

`--version`：终端输出 tsc 的版本号。

`--watch`（或者`-w`）：进入观察模式，只要文件有修改，就会自动重新编译。
