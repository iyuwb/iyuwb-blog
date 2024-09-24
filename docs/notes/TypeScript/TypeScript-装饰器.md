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
    -   `context` 是装饰器上下文，包含了被装饰值的信息。

-   返回值：装饰器函数可以返回一个值，这个值会被用作装饰器的返回值。
    -   如果返回值是 `void`，那么装饰器函数没有返回值。


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
type Decorator = (
  value: DecoratedValue, // 被装饰的值，可以是类、属性、方法等。
  // 装饰器上下文，包含了被装饰的值的信息。
  context: { // ClassMethodDecoratorContext 
    kind: string; 
    name: string | symbol;
    addInitializer?(initializer: () => void): void;
    static?: boolean;
    private?: boolean;
    access: {
      get?(): unknown;
      set?(value: unknown): void;
    };
  }
) => void | ReplacementValue; // 返回值可以是 void，也可以是一个 ReplacementValue 对象。
    
```
如上，装饰器函数接受两个参数，分别是 `value` 和 `context` 。 `value` 是被装饰的值，可以是类、属性、方法等。`context` 是装饰器上下文，包含了被装饰的值的信息，TypeScript 提供了 `ClassMethodDecoratorContext` 接口来描述装饰器上下文。

```typescript
function hello(target: any, context: ClassMethodDecoratorContext) {
  console.log('hello', target, context)
}
```

**`context` 对象**属性介绍：

-   `kind`：被装饰的值的类型，可以是 `class`、`method`、`getter`、`setter`、`field`、`accessor` 等。
-   `name`：被装饰的值的名称。字符串或者Symbol。
-   `addInitializer`：添加一个初始化函数，在类实例化时调用。
    -    `addInitializer` 函数接受一个函数作为参数，这个函数会在类实例化时被调用。
-   `static`：是否是静态装饰器。
-   `private`：是否是私有装饰器。
-   `access`：访问器对象，包含 `get` 和 `set` 方法，用于获取和设置被装饰的值的值。

## 类装饰器

类装饰器的类型定义如下。
```typescript
type ClassDecorator = (
  value: Function, // 被装饰的类
  context: {
    kind: "class"; // 装饰器类型  类装饰器固定为 "class"
    name: string | undefined; // 类名
    addInitializer(initializer: () => void): void; // 添加初始化函数
  }
) => Function | void; // 返回值可以是 Function 或者 void
```

类装饰器使用示例。
```typescript
function Greeter(value, context) {
  if (context.kind === "class") {
    // value 是被装饰的类
    value.prototype.greet = function () {
      console.log("你好");
    };
  }

}

@Greeter
class User {}

let u = new User();
u.greet(); // "你好"      // hello
```
如上，装饰器 `Greeter` 会在 `User` 类被定义时被调用，给 `User` 类添加了一个 `greet` 方法。

除此之外，类构造器还可以返回一个函数，这个函数会被用来替换原来的类。

```typescript
function Greeter(value, context) {
  if (context.kind === "class") {
    // value 是被装饰的类
    return class extends value {
      greet() {
        console.log("你好");
      }
    };
  }
}

@Greeter
class User {}

let u = new User();
u.greet(); // "你好"
```
如上，装饰器 `Greeter` 会在 `User` 类被定义时被调用，返回了一个新的类，这个类继承了 `User` 类，并添加了一个 `greet` 方法。

```typescript
function countInstances(value: any, context: any) {
  let instanceCount = 0;

  const wrapper = function (...args: any[]) {
    instanceCount++;
    const instance = new value(...args);
    instance.count = instanceCount;
    return instance;
  } as unknown as typeof MyClass;

  wrapper.prototype = value.prototype; // A
  return wrapper;
}

@countInstances
class MyClass {}

const inst1 = new MyClass();
inst1 instanceof MyClass; // true
inst1.count; // 1
```
如上，装饰器 `countInstances` 会在 `MyClass` 类被定义时被调用，返回了一个新的类，这个类继承了 `MyClass` 类，并添加了一个 `count` 属性，用于记录实例的数量。


## 方法装饰器

方法装饰器的类型定义如下。
```typescript
type ClassMethodDecorator = (
  value: Function, // 被装饰的方法
  context: {
    kind: "method"; // 装饰器类型  方法装饰器固定为 "method"
    name: string | symbol; // 方法名
    addInitializer(initializer: () => void): void; // 添加初始化函数
    static: boolean; // 是否是静态装饰器
    private: boolean; // 是否是私有装饰器
    access: { get: () => any; set: (value: any) => void } | undefined; // 访问器对象
  }
) => Function | void; // 返回值可以是 Function 或者 void
```
方法装饰器会改写类的原始方法。如果方法装饰器返回一个新的函数，就会替代所装饰的原始函数。

```typescript
function replaceMethod() {
  return function () {
    return `How are you, ${this.name}?`;
  };
}

class Person {
  constructor(name) {
    this.name = name;
  }
  // `@replaceMethod` 等同于
  // C.prototype.hello = replaceMethod(C.prototype.hello);
  @hello
  hello() {
    return `Hi ${this.name}!`;
  }
}

const robin = new Person("Robin");

robin.hello(); // 'How are you, Robin?'
```
如上，装饰器 `replaceMethod` 会在 `hello` 方法被定义时被调用，返回了一个新的函数，这个函数会替代 `hello` 方法，并返回一个新的字符串。

我们可以在方法装饰器内部使用 `originalMethod.call()` 完成对原始方法的调用。

```typescript
// originalMethod.call()
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  @log
  greet() {
    console.log(`Hello, my name is ${this.name}.`);
  }
}

function log(originalMethod: any, context: ClassMethodDecoratorContext) {
  const methodName = String(context.name);

  function replacementMethod(this: any, ...args: any[]) {
    console.log(`LOG: Entering method '${methodName}'.`);
    const result = originalMethod.call(this, ...args);
    console.log(`LOG: Exiting method '${methodName}'.`);
    return result;
  }

  return replacementMethod;
}

const person = new Person("张三");
person.greet();
// "LOG: Entering method 'greet'."
// "Hello, my name is 张三."
// "LOG: Exiting method 'greet'."
```
利用方法装饰器，我们可以轻松地实现日志记录、性能监控等功能。

## 属性装饰器

属性装饰器的类型定义如下。
```typescript
type ClassFieldDecorator = (
  value: undefined, 
  context: {
    kind: "field"; // 装饰器类型  属
    name: string | symbol; // 属性名
    addInitializer(initializer: () => void): void; // 添加初始化函数
    static: boolean; // 是否是静态装饰器
    private: boolean; // 是否是私有装饰器
    access: { get: () => unknown; set: (value: unknown) => void } | undefined; // 访问器对象
  }
) => (initialValue: unknown) => unknown | void; 
```

属性装饰器要么返回一个函数，要么返回 `void`。如果返回一个函数，这个函数会作为属性的初始化函数，用于初始化属性值。

```typescript
function logged(value, context) {
  const { kind, name } = context;
  if (kind === "field") {
    return function (initialValue) {
      console.log(`initializing ${name} with value ${initialValue}`);
      return initialValue;
    };
  }
}

class Color {
  @logged name = "green";
}

const color = new Color();
// "initializing name with value green"
```
上面示例中，属性装饰器 `@logged` 装饰属性 `name` 。 `@logged` 的返回值是一个函数，该函数用来对属性 `name` 进行初始化，它的参数 `initialValue` 就是属性 `name` 的初始值 `green` 。新建实例对象 `color` 时，该函数会自动执行。

属性装饰器的返回值函数，可以用来更改属性的初始值。
```typescript
function twice() {
  return (initialValue) => initialValue * 2;
}

class C {
  @twice
  field = 3;
}

const inst = new C();
inst.field; // 6
```

属性装饰器的上下文对象 `context` 的 `access`属性，提供所装饰属性的存取器。


## getter 和 setter 装饰器

getter 和 setter 装饰器用于装饰类的存取器。它们的类型定义如下。
```typescript
type ClassGetterDecorator = (
  value: Function, 
  context: {
    kind: "getter"; // 或者 "setter"
    name: string | symbol; // 属性名
    addInitializer(initializer: () => void): void; // 添加初始化函数
    static: boolean; // 是否是静态装饰器
    private: boolean; // 是否是私有装饰器
    access: { get: () => unknown }; // 访问器对象
    // 或者 { set: (value: unknown) => void }
}
) => (initialValue: unknown) => unknown | void; 
```

getter 和 setter 装饰器要么不返回值，要么返回一个函数，取代原来的存取器。

```typescript
 // Getter 装饰器
function LogGetter(target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const originalGetter = descriptor.get;

    descriptor.get = function () {
        console.log(`Getting value of ${propertyName}`);
        return originalGetter?.call(this);
    };
}

// Setter 装饰器
function LogSetter(target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const originalSetter = descriptor.set;

    descriptor.set = function (value: any) {
        console.log(`Setting value of ${propertyName} to: ${value}`);
        originalSetter?.call(this, value);
    };
}

class Example {
    private _name: string;

    constructor(name: string) {
        this._name = name;
    }

    @LogGetter
    get name(): string {
        return this._name;
    }

    @LogSetter
    set name(value: string) {
        this._name = value;
    }
}

// 使用示例
const example = new Example('TypeScript');

// 触发 getter 装饰器
console.log(example.name); // 输出: Getting value of name \n TypeScript

// 触发 setter 装饰器
example.name = 'JavaScript'; // 输出: Setting value of name to: JavaScript

// 再次触发 getter 装饰器
console.log(example.name); // 输出: Getting value of name \n JavaScript
   
```

## accessor 装饰器
装饰器语法引入了一个新的属性修饰符 `accessor` 。
 
`accessor` 修饰符等同于为属性 `x` 自动生成取值器和存值器，它们作用于私有属性 `x` 。
```typescript
class C {
  accessor x = 1;
}
// 想当于
class C {
  #x = 1;
  get x() { return this.#x; }
  set x(value) { this.#x = value; }
}
```
`accessor` 也可以于静态属性和私有属性一起使用。
```typescript
class C {
  static accessor x = 1;
  accessor #x = 1;
}
```
accessor 装饰器的类型结构。
```typescript
type ClassAutoAccessorDecorator = (
  value: {
    get: () => unknown;
    set: (value: unknown) => void;
  },
  context: {
    kind: "accessor";
    name: string | symbol;
    access: { get(): unknown; set(value: unknown): void };
    static: boolean;
    private: boolean;
    addInitializer(initializer: () => void): void;
  }
) => {
  get?: () => unknown;
  set?: (value: unknown) => void;
  init?: (initialValue: unknown) => unknown;
} | void;
```
`accessor` 装饰器的 `value` 参数，是一个包含 `get()` 方法和 `set()` 方法的对象。该装饰器可以不返回值，或者返回一个新的对象，用来取代原来的 `get()` 方法和 `set()`方法。此外，装饰器返回的对象还可以包括一个 `init()` 方法，用来改变私有属性的初始值。

```typescript
class C {
  @logged accessor x = 1;
}

function logged(value, { kind, name }) {
  if (kind === "accessor") {
    let { get, set } = value;

    return {
      get() {
        console.log(`getting ${name}`);

        return get.call(this);
      },

      set(val) {
        console.log(`setting ${name} to ${val}`);

        return set.call(this, val);
      },

      init(initialValue) {
        console.log(`initializing ${name} with value ${initialValue}`);
        return initialValue;
      },
    };
  }
}

let c = new C();

c.x;
// getting x

c.x = 123;
// setting x to 123
```
上面示例中，装饰器 `@logged` 为属性 `x` 的存值器和取值器，加上了日志输出。

## 装饰器的执行顺序

装饰器的执行分为两个阶段。
- 评估阶段：计算 `@` 符号后面的表达式，得到装饰器函数。
- 应用阶段：将装饰器函数应用到目标对象上。

所以，装饰器的执行顺序是，先评估所有装饰器表达式的值，在将其们应用到目标对象上。

应用装饰器是，按照以下顺序执行：方法装饰器、属性装饰器、然后是类装饰器。

示例：
```typescript
function d(str: string) {
  console.log(`评估 @d(): ${str}`);
  return (value: any, context: any) => console.log(`应用 @d(): ${str}`);
}

function log(str: string) {
  console.log(str);
  return str;
}

@d("类装饰器")
class T {
  @d("静态属性装饰器")
  static staticField = log("静态属性值");

  @d("原型方法")
  [log("计算方法名")]() {}

  @d("实例属性")
  instanceField = log("实例属性值");
}
```
运行输出：
```typescript
// "评估 @d(): 类装饰器"
// "评估 @d(): 静态属性装饰器"
// "评估 @d(): 原型方法"
// "计算方法名"
// "评估 @d(): 实例属性"  
// "应用 @d(): 静态属性装饰器"
// "应用 @d(): 实例属性"
// "应用 @d(): 类装饰器"
// "静态属性值"
```
如上，可以看出：

- 装饰器评估：这一步计算装饰器的值，首先是类装饰器，然后是类内部的装饰器，按照它们出现的顺序。
- 装饰器应用：实际执行装饰器函数，将它们与对应的方法和属性进行结合
    
原型方法的装饰器首先应用，然后是静态属性和静态方法装饰器，接下来是实例属性装饰器，最后是类装饰器。

注意，“实例属性值”在类初始化的阶段并不执行，直到类实例化时才会执行。

如果一个方法或属性有多个装饰器，则内层的装饰器先执行，外层的装饰器后执行。







