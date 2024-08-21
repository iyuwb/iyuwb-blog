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

在 TypeScript 中，属性名可以是字符串或数字，也可以是一个索引类型。索引类型可以用于定义对象的属性名和属性类型。

```typescript
type MyObj = {
    [property: string]: string | number;
    [property: number]: string | number;
};

const obj: MyObj = {
    1: "a",
    bar: 12,
    baz: "c",
};
```
在上面的例子中，我们定义了一个 MyObj 类型，其中的属性名可以是字符串或数字，属性类型可以是字符串或数字。我们还定义了一个 obj 对象，其中的属性名和属性类型都是符合 MyObj 类型的。

需要注意的是`property`属性名是可以随意起的。


我们还可以把固定的属性名和索引类型结合起来使用。
```typescript
type MyObj = {
    [property: string]: string | number;
    [property: number]: string | number;
    name: string;
    age: number;
};

const obj: MyObj = {
    1: "a",
    bar: 12,
    baz: "c",
    name: "Alice",
    age: 25,
};
```

## 解构赋值

解构赋值是一种将对象或数组的属性值赋值给变量的方式。它可以简化对象或数组的访问和赋值操作。

```typescript
type Person = {
    name: string;
    age: number;
};

const person:Person = {
    name: "Alice",
    age: 25,
};

const { name, age }:Person = person;

console.log(name); // 输出 "Alice"
console.log(age); // 输出 25
```
上面的例子中，我们定义了一个 Person 类型，其中包含了 name 和 age 属性。然后，我们使用解构赋值将对象 person 中的属性值赋值给变量 name 和 age。

需要注意的是，目前不能给解构变量添加指定类型。因为解构赋值的冒号，在JavaScript有其他用途。

```typescript
type Person = {
    name: string;
    age: number;
};

const person: Person = {
    name: "Alice",
    age: 25,
};

const { name:userName, age:userAge }= person;
// 相当于
// const userName = person.name;
// const userAge = person.age;
```
上面的例子中，我们使用了对象的解构赋值，将对象 person 中的 name 和 age 属性赋值给变量 userName 和 userAge。实现了 解构赋值的重命名。

我们可以给解构变量添加默认值。
```typescript
const { name, age = 20 } = person;

function fun({name:userName = 'yuwb', age:userAge = 20}) {
    // 不能使用 name 和 age
    console.log(userName) 
    console.loh(userAge)
}
```
需要注意，在解构赋值中冒号`:`为变量重命名，不是指定类型，在开发中要避免弄错。

## 结构类型原则

在 TypeScript 中，类型的兼容性是基于其属性的。只要一个类型包含另一个类型所需的所有属性，它就被认为是兼容的。

1. 类型兼容性。在 TypeScript 中，类型的兼容性是基于其属性的。只要一个类型包含另一个类型所需的所有属性，它就被认为是兼容的。
```typescript
interface Person {
  name: string;
  age: number;
}

const person: Person = { name: "Alice", age: 30 };

// 兼容性示例
const anotherPerson = { name: "Bob", age: 25, gender: "male" }; // 额外的属性不会影响兼容性
const compatible: Person = anotherPerson; // 这是合法的
```
2. 函数参数。在函数参数中，结构类型原则也适用。只要传入的对象具有所需的属性，TypeScript 就会允许它。
```typescript
interface Point {
  x: number;
  y: number;
}

function logPoint(point: Point) {
  console.log(`x: ${point.x}, y: ${point.y}`);
}

const point = { x: 10, y: 20, z: 30 }; // 额外的属性不会影响
logPoint(point); // 合法
```

## 严格字面量检查

在 TypeScript 中，如果对象使用字面量创建，那么它的属性必须是对象声明时指定的属性。否则会报错。
```typescript
const person: {
    name: string;
    age: number;
} = {
    name: "Alice",
    age: 30,
    car: 'BMW'
}; // 报错
```
如上例中，person对象使用了字面量创建，但是属性car是不存在的，所以会报错。

我们可以根据结构类型原则，将字面量等号右边的字面量改成一个变量，就不会报错了。
```typescript
const person = {
    name: "Alice",
    age: 30,
    car: 'BMW'
}

const person1: {
    name: string;
    age: number;
} = person // 正确
```
但是，需要注意的是如果我们属性名不小心写错了，并且当前属性还是可选属性时，也不会报错。
```typescript
const person = {
    name: "Alice",
    age1: 30,
}

const person1: {
    name: string;
    age?: number;
} = person // 正确
```

## 空对象

在 TypeScript 中，空对象是一种特殊的对象类型，表示没有任何属性。空对象的类型是`{}`。

```typescript
const obj = {}

// 相当于
const obj:{} = {}
```

因此我们应该避免直接使用`{}`来创建空对象。

```typescript
const obj = {}
obj.name = 'yuwb'  // 错误


const obj ={
    name: 'yuwb'    // 正确
}
```









