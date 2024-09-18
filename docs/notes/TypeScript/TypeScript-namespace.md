---
title: TypeScript-namespace
author: 耶温
createTime: 2024/09/18 15:15:18
permalink: /TypeScript/t4tqbzq7/
---

# TypeScript-namespace

## 命名空间

命名空间（namespace）是组织代码的一种方式，它可以将代码封装在一个命名空间中，避免命名冲突。命名空间可以嵌套，也可以使用 `export` 和 `import` 关键字来导出和导入模块。

不过，现在 TypeScript 中的命名空间已经被模块取代，模块是更好的组织代码的方式。

## 基本用法

namespace 用来建立一个容器，内部所有的变量和函数都放在这个容器中使用，避免全局污染。

```typescript
namespace Utils {
  function isString(value: any) {
    return typeof value === "string";
  }

  // 正确
  isString("yes");
}

Utils.isString("no"); // 报错    类型“typeof Utils”上不存在属性“isString”。
```
如上，命名空间中的函数 `isString` 只能在命名空间 `Utils` 内部使用，外部无法直接访问。

如果要在外部使用命名空间中的函数，可以使用 `export` 关键字导出。

```typescript
namespace Utils {
  export function isString(value: any) {
    return typeof value === "string";
  }
}

Utils.isString("no"); // 正确
```

namespace 内部可以使用 `import` 命令输入外部成员，相当于为外部成员起了一个别名。

```typescript
namespace Utils {
  export function isString(value: any) {
    return typeof value === "string";
  }
}

namespace MyNamespace {
  import isString = Utils.isString;
  isString("no"); // 正确
}
```
我们也可以在 namespace 外部使用 `import` 命令输入 namespace 内部的成员。

```typescript
namespace Utils {
  export function isString(value: any) {
    return typeof value === "string";
  }
}

import isString = Utils.isString;
isString("no"); // 正确
```

namespace 可以嵌套使用，内部可以访问外部的成员。

```typescript
namespace Utils {
  export function isString(value: any) {
    return typeof value === "string";
  }

  namespace SubUtils {
    export function isNumber(value: any) {
      return typeof value === "number";
    }
  }
}

Utils.isString("no"); // 正确
Utils.SubUtils.isNumber(123); // 正确
```

namespace 还可以包括类型相关的定义，例如接口、类、枚举等。

```typescript
namespace Utils {
  export interface Person {
    name: string;
    age: number;
  }

  export class PersonClass implements Person {
    name: string;
    age: number;

    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }
  }

  export enum Gender {
    Male,
    Female,
  }
}
```
总的来说，namespace 与模块的作用基本相同，都是用来把相关代码组织在一起，对外输入接口。不过，模块是更好的组织代码的方式，因为模块可以更好地支持模块化开发，还不需要额外的编译转换。

如果 namespace 代码放在一个单独的文件中，那么引入这个文件时，需要使用 `/// <reference path="utils.ts" />` 来声明依赖关系。
```typescript

/// <reference path="utils.ts" />

Utils.isString("no"); // 正确
```

## namespace 的输出


namespace 本身可以使用 `export` 关键字导出，这样就可以在其他文件中引用这个 namespace。

```typescript
export namespace Utils {
  export function isString(value: any) {
    return typeof value === "string";
  }
}
```

然后在其他文件中，使用 `import` 命令来引用这个 namespace。

```typescript
// 写法1
import { Utils } from "./utils";

Utils.isString("no"); 

// 写法2
import * as Utils from "./utils";

Utils.isString("no"); 
```

## namespace 的合并

TypeScript 允许 namespace 合并，即多个 namespace 可以合并成一个 namespace。合并的 namespace 必须有相同的命名空间名。

```typescript
namespace Utils {
  export function isString(value: any) {
    return typeof value === "string";
  }
}

namespace Utils {
  export function isNumber(value: any) {
    return typeof value === "number";
  }
}

Utils.isString("no"); // 正确
Utils.isNumber(123); // 正确
```
需要注意的是，合并的 namespace 中 非 `export` 的成员不会被合并，但是他们只能在各自的 namespace 中使用。

```typescript
namespace Utils {
  function isString(value: any) {
    return typeof value === "string";
  }
  isString("no"); // 正确
}

namespace Utils {
  export function isNumber(value: any) {
    return typeof value === "number";
  }
}

Utils.isString("no"); // 报错
Utils.isNumber(123); 
```

namespace 可以与同名的函数、Class、枚举合并，但是不能与变量合并。但是相关的函数、Class 必须在 namespace 之前定义。

```typescript
// 函数
function Utils() {
  return "Utils";
}

namespace Utils {
  export function isString(value: any) {
    return typeof value === "string";
  }
}

Utils.isString("no"); 
Utils(); 
```
```typescript
// 类
class Person {
  constructor(public name: string) {}
}

namespace Person {
  export function isPerson(value: any) {
    return value instanceof Person;
  }
}

Person.isPerson(new Person("no")); 
new Person("no"); 
```
```typescript
// 枚举
enum Color {
  Red,
  Green,
  Blue
}

namespace Color {
  export function isColor(value: any) {
    return Color[value] !== undefined;
  }
}

Color.isColor(Color.Red); 
Color.Red;
}

```