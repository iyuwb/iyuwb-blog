---
title: TypeScript-常用复用方案
author: 耶温
createTime: 2024/08/21 15:15:42
permalink: /TypeScript/94p2d7nx/
---

在我们使用TypeScript开发过程中，类型复用非常重要。不然就会有大量的重复类型定义，造成代码冗余，也不利于代码的维护。让我们在使用TypeScript时，感觉越来越麻烦。下面我们介绍一些减少重复类型一的方法。



## 类型复用：新增属性

当新增了一个属性时，我们需要在原来的类型上新增一个属性，这样就会导致原来的类型也需要新增一个属性。我们可以新增一个类型，然后将原来的类型和新类型合并。

1. `type`定义类型，使用`&`交叉类型合并。也可以使用`extends`继承类型。
```typescript
type Person = {
  name: string;
  age: number;
};

type PersonWithAddress = Person & {
  address: string;
};

// 或者
interface PersonWithAddress extends Person {
  address: string;
}
```
2. `interface`定义类型，使用`extends`继承类型。也使用`type`和`&`交叉类型合并。
```typescript
interface Person {
  name: string;
  age: number;
}

interface PersonWithAddress extends Person {
  address: string;
}

// 或者

type PersonWithAddress = Person & {
  address: string;
}
```

## 类型复用：剔除属性

在 TypeScript 中，`Omit` 是一个内置的工具类型，用于从一个类型中排除指定的属性。我们可以使用 `Omit` 来创建一个新的类型，将指定的属性从原来的类型中剔除，然后再添加一些属性。
```typescript
interface Person {
  name: string;
  age: number;
  address: string;
}

interface Person2 extends Omit<Person, 'address'> {
  car: string;
}
```
在 TypeScript 中，Pick 是一个内置的工具类型，用于从一个类型中选择特定的属性，创建一个新的类型。我们可以使用 Pick 来创建一个新的类型，将指定的属性从原来的类型中选择，然后再添加一些属性。

```typescript
interface Person {
  name: string;
  age: number;
  address: string;
}

interface Person2 extends Pick<Person, 'name' | 'age'> {
  car: string;
}
```