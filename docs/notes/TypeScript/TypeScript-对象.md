---
title: TypeScript-对象类型
author: 耶温
createTime: 2024/08/09 14:25:49
permalink: /TypeScript/78auqnpo/
---

在 TypeScript 中，对象是一个非常重要的概念。对象可以用来表示复杂的数据结构，通常由键值对组成。TypeScript 提供了多种方式来定义和使用对象。

## 对象定义

直接定义，在定义对象属性类型的时候，可以使用`;`或者`,`

```typescript
const person: {
    name:string,  // or  name:string;
    age:number,     // or  age:number;
} = {
    name: "Alice",
    age: 25,
};
```

也可以使用接口（interface）或类型别名（type）来定义对象的结构。

```typescript
// 使用接口定义对象类型
interface Person {
    name: string;
    age: number;
}
// 使用类型别名定义对象类型
type Car = {
    brand: string;
    model: string;
};
```
需要注意的是，如果对象声明了类型，在赋值时，就不能缺少或增加指定的属性，也不能改变对象属性的类型，否则会报错。
```typescript
type Person = {
    name: string;
    age: number;
}

const person: Person = {   // 报错， 缺少属性 "age"
    name: "Alice",   
};     
const person1: Person = {
    name: "Alice",
    age: 25,
    gender: "female", // 报错，不能添加属性
};
const person3: Person = {
    name: 123, // 错误，类型不匹配
    age: 25,
};
```
在完成定义以及赋值之后的对象，我们只能访问和修改对象的属性，不能添加或删除属性。也不能访问未定义的属性。

```typescript
type Person = {
    name: string;
}

const person: Person = {
    name: "Alice"
};

person.name = "female"; //  正确
console.log(person.age) // 错误
delete person.name // 错误  
```

## 函数属性

## 类型读取

## 可选属性

```typescript
interface User {
    readonly id: number; // 只读属性
    name: string;
    email?: string; // 可选属性
}

const user: User = {
    id: 1,
    name: "Bob",
};

// user.id = 2; // 错误：不能修改只读属性
```

## 只读属性

```typescript
interface User {
    readonly id: number; // 只读属性
    name: string;
    email?: string; // 可选属性
}

const user: User = {
    id: 1,
    name: "Bob",
};

// user.id = 2; // 错误：不能修改只读属性
```

## 对象嵌套

对象可以嵌套其他对象。
```typescript
interface Address {
    street: string;
    city: string;
}

interface UserProfile {
    username: string;
    address: Address; // 嵌套对象
}

const userProfile: UserProfile = {
    username: "Charlie",
    address: {
        street: "123 Main St",
        city: "New York",
    },
};
```

