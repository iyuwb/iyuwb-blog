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
对象的方法使用函数类型描述。

```typescript
const obj: {
  x: number;
  y: number;
  add(x: number, y: number): number; // 或者写成 add: (x:number, y:number) => number;
} = {
  x: 1,
  y: 1,
  add(x, y) { return x + y; },
};
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
## 类型读取

对象类型可以使用方括号读取属性的类型。

```typescript

type Person = {
    name: string;
    age: number;
}
type name = Person["name"]; // 类型为 string
```


## 可选属性
如果某个属性是可选的（即可以忽略），需要在属性名后面加一个问号。
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
在使用可选属性的时候，需要注意对其进行判断是否为undefined。不然直接使用可能会引起报错。
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

user.email.toLocaleLowerCase(); // 错误：属性可能为 undefined
// 或者可以写成下面形式
user.email?.toLocaleLowerCase()

if (user.email) {
    console.log(user.email); // 正确
} else {
    console.log("Email not provided");
}
```


## 只读属性
属性名前面加上readonly关键字，表示这个属性是只读属性，不能修改。只读属性只能在对象初始化期间赋值，此后就不能修改该属性。
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
需要注意的是，如果一属性值是一个对象，那么readonly修饰符并不禁止修改该对象的属性，只是禁止完全替换这个对象。

```typescript
interface User {
    readonly id: number; // 只读属性
    name: string;
    email?: string; // 可选属性
    readonly address: {
        street: string;
        city: string;
    };
}

const user: User = {
    id: 1,
    name: "Bob",
    address: {
        street: "123 Main St",
        city: "New York",
    },
};

user.address.street = "456 Main St"; // 正确：可以修改嵌套对象的属性
user.address = { // 错误：不能修改只读属性
    street: "456 Main St",
    city: "Los Angeles",
}; 
```
添加只读的另一种方法是使用`as const`关键字。
```typescript
const myUser = {
  name: "Sabrina",
} as const;
myUser.name = "Cynthia"; // 报错

// 需要注意以下，当明确了类型之后 会已声明的类型为准
const myUser: { name: string } = {
  name: "Sabrina",
} as const;
myUser.name = "Cynthia"; // 正确
```

关于只读属性还有一个注意点，如果一个对象有两个引用，即两个变量对应同一个对象，其中一个变量是可写的，另一个变量是只读的，那么从可写变量修改属性，会影响到只读变量。
```typescript
interface Person {
  name: string;
  age: number;
}

interface ReadonlyPerson {
  readonly name: string;
  readonly age: number;
}

let w: Person = {
  name: "Vicky",
  age: 42,
};

let r: ReadonlyPerson = w;

w.age += 1;
r.age; // 43
```

## 属性名的索引类型 


