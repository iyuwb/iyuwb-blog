---
title: TypeScript-装饰器
author: 耶温
createTime: 2024/09/19 14:42:08
permalink: /TypeScript/r3rlxn6o/
---

# TypeScript-装饰器

在TypeScript 中，装饰器是一种特殊类型的声明，它能够被附加到类声明，方法，访问符，属性或参数上。装饰器使用 `@expression` 这种形式，`expression` 必须能够求值得到一个函数，它会在运行时被调用，被装饰的声明信息作为参数传入。

简单来说，装饰器就是一个函数，可以用来修改类的行为。


装饰器的使用需要开启 `experimentalDecorators` 选项。

```json
// tsconfig.json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

装饰器：

-   第一个字符是 `@` 符号，后面是一个表达式。
-   表达式求值后必须是一个函数。
-   函数接受两个参数，分别是 `target` 和 `context`。
    -   `target` 是被装饰的类或类的属性。
    -   `context` 是装饰器上下文，包含了被装饰的类或类的属性的信息。

-   函数返回值可以是 `void`，也可以是一个 `PropertyDescriptor` 对象。
    -   如果返回 `void`，则表示不修改被装饰的类或类的属性。
    -   如果返回一个 `PropertyDescriptor` 对象，则表示修改被装饰的类或类的属性。


## 简单示例

```typescript
function hello(target: any) {
  console.log('hello')
}

@hello
class Person {
}       // hello
```
如上，装饰器 `hello` 会在 `Person` 类被定义时被调用，输出 `hello`。

装饰器函数可以接受参数。
```typescript
function hello(target: any, context: any) {
  console.log('hello', target, context)
}

@hello
class Person {
}   // hello [Function: Person] undefined
```

## 装饰器结构

装饰器函数的类型定义如下。
```typescript
    
```
