---
title: JavaScript-基础
author: 耶温
createTime: 2024/05/11 21:14:32
permalink: /JavaScript/cc86z3zu/
---


# JavaScript-基础

## 语言基础

### 浏览器内核

- Chrome：Blink、V8

  > Node.js 是一个基于 Chrome V8 引擎 的 JavaScript 运行时。

- Firefox：Gecko、SpiderMonkey
- Safari：Webkit、JavaScriptCore
- 微软：Trident、EdgeHtml、Cha kra

### ECMAScript6

> ES6 正式支持了 类、模块、迭代器、生成器、箭头函数、期约、反射、代理和众多的新数据类型

### script 元素

#### asyncs 属性：

- 可选，表示应该立即开始下载脚本，但不能阻止其他页面动作，比如下载资源或等待脚本加载，只对外部脚本有效
- 不能保证标记为 `anync` 的脚本按照出现次序执行

#### defer 属性：

- 可选，表示脚本可以延迟到文档完全被解析和显示之后再执行。同样只对外部文件有效、

### 关键字和保留字

> 关键字（es6）：

```txt
    break         do            in             typeof
    case          else          instanceof     var
    catch         export        new              void
    class         extends      return          while
    const         finally      super           with
    continue     for           switch          yield
    debugger     function     this
    default      if             throw
    delete        import        try

```

> 保留字（es6）：

```txt
    始终保留：
    enum
    严格模式下保留：
    implements   package      public
    interface    protected    static
    let           private
    模块代码中保留：
    await
```

### 变量

### let 和 var 和 const

#### let

- `let` 声明的范围是块作用域，`var` 声明的范围是函数作用域
- `let` 不允许同一个块作用域中出现多次声明，对多次声明的报错不会因为混用 `let` 和 `var` 而受影响
- let 每次迭代声明一个变量实例的行为适用于所有风格的 `for` 循环 包括 `for in` 和 `for of`

#### const

- `const` 声明限制只适用于他指向的变量引用。简单来说就是只限制简单数据类型，不限制引用类型数据的修改，只限制引用类型的引用地址不可改变
- `const` 不能用来声明迭代变量，因为迭代变量会自增

::: details 点击显示代码

```js
// 使用var
for (var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i); // 5 5 5 5 5
  }, 0);
}

// 适用let
for (let i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i); // 0 1 2 3 4
  }, 0);
}
```

:::

### 暂时性死区

`let` 声明的变量不会在作用域中被提升。

在 `let` 声明之前的执行瞬间被称为“暂时性死区”，在此阶段引用任何后面才声明的变量都会报错。

### 全局声明

`var` 在全局作用域中声明的变量会成为 `window` 的属性，而 let 声明的则不会。

### 数据类型

简单数据类型（原始类型）：`undefined`，`Null`，`Boolean`，`Number`，`String` 和 `Symbol`（符号），以及后面 ES 标准加的 `bigint`。

原始值大小固定，保存在栈内存上

复杂数据类型（引用类型）：`Object`

引用值是对象，存储在堆内存上

### typeof 操作符

会返回以下字符串之一（`typeof` 不能区分 `object` 和 `null`，并且不能细致区分 `object`）：

- `undefined` 表示值未定义
- `boolean` 表示布尔值
- `string` 表示字符串
- `number` 表示数值
- `object` 表示对象或者 `null`
- `function` 表示函数
- `symbol` 表示符号

> `null` 被认为是一个空对象的引用，所以为 object

### undefined

> 表示使用 `var` 或 `let` 声明了变量但是没有初始化值，就相当于给变量赋值了 `undefined。`

::: tip 注意
`undefined` 值是由 `null` 值派生而来的，表面相等
:::
::: details 点击显示代码

```js
console.log(undefined == null); //true
```

:::

### null

> 任何时候，变量保存对象，而当时又没有值可以保存是，就可以用 `null` 来填充变量

### Boolean

将一个其他类型的值转换为布尔值时，可以调用特定的 `Boolean()` 转型函数

::: tip 注意
转换规则：除了布尔类型的 `false` ，`""` (空字符串)，`0，NaN，null，undefined` 会转换成 `false` 之外，其他数值皆转换为 `true`
:::

### Number

Number 使用 IEEE754 格式表示 整数和浮点值，双精度值。

整数值：

可以使用八进制或者十六进制字面量表示

- 八进制：第一个数必需为 0，如：070
- 十六进制：前缀为 0x，如：0x1f

::: tip 注意
在严格模式下，字面量八进制是无效的 会报错
:::

浮点值：因为浮点值使用内存是整数的两倍，所以 ECMAScript 总是想法吧浮点值转成整数
::: details 点击显示代码

```js
//比如：
let a = 1.0;
//会被当成整数1处理;
```

:::
浮点值还可以用科学计数法表示

- 3.124e7 表示 31240000
- 3.124e-7 表示 0.0000003124

值得范围：
最小为 `Number.MIN_VALUE`,最大为 `Nunber.MAX_VALUE`
超出范围会转为特殊值，征服无穷大（`infinity`），无法进行任何运算

### NaN

> 特殊值，意思是不是数值。用于表示本来要返回数值的操作失败了

> 可以用`isNaN`判断是否是 `NaN`

::: tip 注意
NaN 不等于包括自己本身在内的任何值
:::

### 数值转换

`Number()`转换规则：

- 布尔值：`false` 为 0，`true` 为 1
- 数值，直接返回
- `null`，返回 0
- `undefined`，返回 `NaN`
- 字符串，空字符串返回 0，其他只返回数字型字符串，带有正负号与小数点的都可以返回数值
- 对象，调用 `valueOf()`方法，在按照上述对比
- 除此之外的字符返回 `NaN`

`valueOf()`：返回各种对象的原始值
::: details 点击显示代码

```js
let obj = {
  name: "Yevin",
  age: 18,
};
let arr = [12, 213, 123];
console.log(obj.valueOf());
console.log(arr.valueOf());

// { name: 'Yevin', age: 18 }
// [ 12, 213, 123 ]
```

:::
`parseInt()`转换规则：

从第一个非空格字符开始转换，如果第一个不是数字符号或者正负号，会立即返回 NaN。后续依次检测，到非数字字符则返回之前整数。`parseInt()`能识别十六进制八进制。第二个参数可以指定进制数。

`parseFloat()`与 `parseInt()`规则基本一直，唯一区别为前者可以检测到第一个小数点返回浮点数，但是检测到第二个小数点的时候就会无效了直接返回值。

### String

字符串可以用双引号("")单引号('')或者反引号(``)标示

::: tip 注意
ECMAScript 中的字符串是不可以改变的，一旦创建，值就不能修改了
:::

::: details 点击查看代码

```js
var s = "abc";
console.log(s[2]); // 'c'
s[2] = "a";
console.log(s); // 'abc'
```

`toString()`：可以将数值布尔值对象和字符串值转成字符串。可接收传值，转换数字的进制。但是不能转 `null` 和`undefined`
可以适用`String()`来转换 `unll` 和 `undefined`

### 模板字符串

> 模板字符串可以保留换行符号，可以跨行定义字符串

> 可以字符串差值

::: details 点击查看代码

```js
var a = "abc\nedf";
var b = `abc
edf`;
console.log(a === b); //true

var c = "Yevin";
var d = "Zhi";

var e = `hello:${c},${d}`;
console.log(e); // hello:Yevin,Zhi
```

:::

### Symbol

> 更多 Symbol 详细信息见 [Symbol 详细介绍](https://developer.mozilla.org/zh-cn/docs/web/javascript/reference/global_objects/symbol)

> Symbol 符号的用途是确保对象属性使用唯一标识符，不会发生属性冲突的危险

> Symbol()函数不能与 new 关键字一起作为构造函数使用。

```js
var a = Symbol();
var b = Symbol();
console.log(a == b); //false
```

注册全局符号注册表

使用`Symbol.for()`注册
使用`Symbol.keyFor()`查看全局注册表，该方法接收符号，返回该全局符号对应的字符串键

::: details 点击查看代码

```js
var a = Symbol.for("yevin");
var b = Symbol.for("yevin");
console.log(a === b); //true

console.log(Symbol.keyFor(a)); / yevin
```

:::

使用符号作为属性

> 凡是可以使用字符串或者数值作为属性的地方都可以使用符号,包括 `Object.defineProperty` 和 `Object.defineProperties()`定义的属性

```js
var name = Symbol("name");
var obj = {
  [name]: "yevin",
};
//或者可以 obj[name]='yevin'
console.log(obj); //{ [Symbol(name)]: 'yevin' }
console.log(obj[name]); // yevin
```

`Object.defineProperty`和`Object.defineProperties()`

> 这两个方法直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

::: details 点击查看代码

```js
var obj = {};
//defineProperty
Object.defineProperty(object1, "property1", {
  value: 42,
  writable: false,
});

//defineProperties
Object.defineProperties(obj, {
  property2: {
    value: true,
    writable: true,
  },
  property3: {
    value: "Hello",
    writable: false,
  },
});
```

:::

`Object.getOwnPropertyNames()` 返回对象实例的常规属性数组

`Object.getOwnPropertySymbols()` 返回对象实例的符号属性数组

`Object.getOwnPropertyDescriptors()` 返回同时包含常规和符号属性描述符的对象

`Reflect.ownKeys()` 返回两种类型的键
::: details 点击查看代码

```js
var a = Symbol("a");
var b = Symbol("b");
var obj = {
  [a]: "aaa",
  [b]: "bbb",
  c: "ccc",
};

console.log(Object.getOwnPropertyNames(obj)); //[ 'c' ]
console.log(Object.getOwnPropertySymbols(obj));
//[ Symbol(a), Symbol(b) ]
console.log(Object.getOwnPropertyDescriptors(obj));
// {
//   c: {
//     value: 'ccc',
//     writable: true,
//     enumerable: true,
//     configurable: true
//   },
//   [Symbol(a)]: {
//     value: 'aaa',
//     writable: true,
//     enumerable: true,
//     configurable: true
//   },
//   [Symbol(b)]: {
//     value: 'bbb',
//     writable: true,
//     enumerable: true,
//     configurable: true
//   }
// }
console.log(Reflect.ownKeys(obj));
//[ 'c', Symbol(a), Symbol(b) ]
```

:::

### Object

> ECMAScript 中的对象其实就是一组数据和功能的集合。

属性和方法

- `constructor`：用于创建当前对象的函数
- `hasOwnproperty(propertyname)`：用于判断当前对象实例上是否存在给定的属性
- `isPrototypeOf(object)`：用于判断当前对象是否为另一个对象的原型
- `propertyEnumerable(propertyname)` ：用于判定给的属性是否能够使用 for-in 语句枚举
- `toLocaleString()`：返回对象的字符串表示，该字符串反应对象所在的本地化执行环境
- `toString()`：返回对象的字符串表示
- `valueOf()`：返回对象对应的字符串，数值或者布尔表示

:::tip 主题
在 ECMAScript 中 Object 是所有对象的基类，所以任何对象中都有上述的属性和方法

:::

### 操作符

### 位运算

#### 按位非（~）

返回数值的补数（反码）

```js
let num1 = 10; // 二进制 0000 0000 0000 0000 0000 0000 0000 1010
let num2 = ~num1; //二进制 1111 1111 1111 1111 1111 1111 1111 0101

console.log(num2); // -11

//类似于 对num1取负值并减1
```

#### 按位与（&）

有两个操作数，将两个数的每一位对齐，只有两个位值都为 1 取 1，否则取 0 计算。

#### 按位与（|）

有两个操作数，将两个数的每一位对齐，只要有一个位值为 1 取 1，否则取 0 计算。

#### 按位异或（^）

有两个操作数，将两个数的每一位对齐，有且只有一个位值为 1 取 1，否则取 0 计算。（两个都为 1 或者 0 时取 0）

#### 左移（<<）

按照指定的位数将数值所有位向左移动，移位空出位置以 0 填充

```js
let a = 2; //二进制 10
let b = a << 5; // 二进制 1000000
console.log(b); //64
```

::: tip 注意
左移（<<）会保留它所操作数值的符号
:::

#### 有符号右移（>>）

按照指定的位数将数值所有位向右移动，移位空出位置以 0 填充，保存符号

#### 无符号右移

按照指定的位数将数值所有位向右移动，移位空出位置以 0 填充，不保存符号

### 布尔操作符

#### 逻辑与（\$\$）

当操作数是布尔值：两个操作数都为真是为真

当操作数不是布尔值：

- 当第一个操作数位对象，返回第二个操作数
- 当二个操作数是对象，则只有第二个操作数求值为 true 时才会返回该对象
- 两个操作都为对象，返回第二个操作数
- 有一个操作数为 `null`,`NaN` 或者 `undefined`，则返回 `null`，`NaN` 或者 `undefined`

#### 逻辑与（||）

当操作数是布尔值：两个操作数有一个为真则为真

当操作数不是布尔值：

- 当第一个操作数位对象，返回第一个操作数
- 当第一个操作数求值为 `false`，则返回第二个操作数
- 当二个操作数是对象，则返回第一个操作数
- 有一个操作数为 `null`,`NaN`或者 `undefined`，则返回 `null`，`NaN` 或者 `undefined`

### 关系操作符

::: tip 注意

如果操作数都是数值，则执行数值比较。

如果操作数都是字符串，则逐个比较字符串中对应字符的编码。

如果有任一操作数是数值，则将另一个操作数转换为数值，执行数值比较。

如果有任一操作数是对象，则调用其 `valueOf()`方法，取得结果后再根据前面的规则执行比较。如果没有 `valueOf()`操作符，则调用 `toString()`方法，取得结果后再根据前面的规则执行比较。

如果有任一操作数是布尔值，则将其转换为数值再执行比较

:::

### 相等操作符

::: tip 注意 （==）

如果任一操作数是布尔值，则将其转换为数值再比较是否相等。`false` 转换为 0, `true` 转换为 1。

如果一个操作数是字符串，另一个操作数是数值，则尝试将字符串转换为数值，再比较是否相等。

如果一个操作数是对象，另一个操作数不是，则调用对象的 `valueOf()`方法取得其原始值，再根据前面的规则进行比较。在进行比较时，这两个操作符会遵循如下规则。

- `null` 和`undefined` 相等。

- `null` 和 `undefined` 不能转换为其他类型的值再进行比较。

- 如果有任一操作数是 `NaN`，则相等操作符返回 `false`，不相等操作符返回 `true`。记住：即使两个操作数都是 `NaN`，相等操作符也返回`false`，因为按照规则，`NaN` 不等于 `NaN`。

如果两个操作数都是对象，则比较它们是不是同一个对象。如果两个操作数都指向同一个对象，则相等操作符返回 `true`。否则，两者不相等。

:::

### 语句

### for-in 语句

> for-in 语句是一种严格的迭代语句，用于枚举对象中的非符号键属性(对象可以是非迭代对象)

### for-of 语句

> for-of 语句是一种严格的迭代语句，用于遍历可迭代对象的元素

### switch

::: details 点击查看代码，也可以这样 实现

```js
var a = 76;

switch (true) {
  case a > 90:
    console.log("优秀");
    break;
  case a > 70:
    console.log("良好");
    break;
  case a > 60:
    console.log("及格");
    break;
  default:
    console.log("不及格");
}
```

:::

:::tip 注意
switch 语句在比较每个条件的值时会使用全等操作符，因此不会强制转换数据类型（比如，字符串"10"不等于数值 10）
:::

### 函数

函数返回值
:::tip 注意
最佳实践是函数要么返回值，要么不返回值。只在某个条件下返回值的函数会带来麻烦。

不指定返回值的函数实际上会返回特殊值 `undefined`。
:::

### 严格模式下对函数有一些限制

:::tip 注意

- 函数不能以 `eval` 或 `arguments` 作为名称；
- 函数的参数不能叫 `eval` 或 `arguments`；
- 两个命名参数不能拥有同一个名称。

:::

:::tip 注意
ECMAScript 中函数的参数就是局部变量。
:::

## 变量作用域和内存

### instanceof 判断类型

```js
var a = [1, 2, 3];
console.log(a instanceof Array); //true
console.log(a instanceof RegExp); //false
```

### 执行上下文

> 变量或函数的上下文决定了他们可以访问那些数据，以及他们的行为。每个上下文都有一个关联的变量对象（variable object），该上下文中定义的所有变量和函数都存在这个对象上。（该对象无法通过代码访问变量对象）

包括：全局上下文，函数上下文和块级上下文

代码执行流没进入一个新上下文，都会创建一个作用域链，用于搜索变量和函数

### 全局上下文

> 最外层的上下文，在浏览器中，全局上下文就是 window 对象（根据 ECMAScript 实现的宿主环境，便是全局上下文的对象可能不一样）。

::: tip 注意
上下文在其所有代码都执行完毕后会被销毁，包括定义在它上面的所有变量和函数
全局上下文，会在应用程序退出前才会被销毁
:::

### 上下文栈

- 每个函数调用都有自己的上下文
- 当代码执行流进入函数时，函数的上下文被推到一个上下文栈上
- 当函数执行完之后，上下文栈会弹出该函数上下文
- 将控制权返还给之前的执行上下文

### 作用域链

> 上下文中的代码在执行的时候，会创建变量对象的一个作用域链。该作用域链决定了各级上下文中的代码在访问变量和函数时的顺序。

::: tip 注意

代码正在执行的上下文的变量对象始终位于作用域链的最前端。

如果上下文是函数，则其活动对象（activation object）用作变量对象。
活动对象最初只有一个定义变量：arguments。（全局上下文中没有这个变量。）
作用域链中的下一个变量对象来自包含上下文，再下一个对象来自再下一个包含上下文。以此类推直至全局上下文。

全局上下文的变量对象始终是作用域链的最后一个变量对象。

:::

### 作用域链增强

> 一些语句会导致在作用域链前端临时添加一个上下文，这个上下文在代码执行后会被删除。

- `try/catch` 语句的 `catch` 块：会创建一个新的变量对象，这个变量对象包含要抛出错误对象的声明。
- `with` 语句：会向作用域前端添加指定的对象

### 变量声明

- 使用 var 的声明变量，会被自动添加到最接近的上下文
- 在函数中，最接近的上下文就是函数上下文。
- 如果变量未经声明被初始化，会被自动添加到全局上下文

- let 声明变量，作用域是块级的（块级作用域由最近的一堆含花括号`{}`界定）

### 垃圾回收

> 通过自动内存管理实现内存分配和限制资源回收
> 基本思路：确定哪个变量不会再使用，然后释放它占用的内存,周期性，即垃圾回收程序每隔一定事件就会自动运行。

- 离开作用域的值会被自动标记为可回收，然后再垃圾回收期间被删除

### 标记清理

标记变量，没有被使用的，在上下文中的变量都访问不到的变量进行回收。

> 主流的垃圾回收算法是标记清理，即先给当前不适用的值加上标记，在回来回收他们的内存

### 引用计数

标记引用次数，每次被引用，标记引用次数就加 1，引用被覆盖的时候，减 1.当为 0 的时候说明，说明没有办法在访问到这个值了，就会被垃圾回收程序释放回收。

::: tip 注意
当出现循环引用的时候，就会出现一直无法被清理回收，因为引用数一直为 2

JavaScript 引擎不再使用这种算法，但某些旧版本的 IE 仍然会受这种算法的影响，原因是 JavaScript 会访问非原生 JavaScript 对象（如 DOM 元素）

解决：需要手动设置引用为 `null`
:::

::: warning 注意

在某些浏览器中是有可能（但不推荐）主动触发垃圾回收的。在 IE 中，`window. CollectGarbage()`方法会立即触发垃圾回收。在 Opera 7 及更高版本中，调用 `window.opera.collect()`也会启动垃圾回收程序。
:::

### 内存管理

优化内存占用

- 解除引用 不用的数据设置为`null`
- 通过 `const` 和 `let` 声明 提升性能
- 避免内存泄漏 意外声明全局变量

::: tip 注意
接触变量的引用不仅可以消除循环引用，而且对垃圾回收也有帮助。为促进内存回收，全局对象，全局对象的属性和循环引用，都应该在不需要时解除引用。
:::

## 基本引用类型

引用类型：把数据和功能组织到一起的结构

::: tip 注意
函数也是一种引用类型
:::

### Date

`Date.parse()`：接收表示日期的字符串参数，转换为表示该日期的毫秒数

`Date.UTC()`

格式化日期方法

### RegExp

> 详情见 [正则表达式](http://iyuwb.cn/boke/JavaScript/JavaScript%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3-%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F.html)

### 原始值包装类型

Boolean，Number 和 String

```js
let s1 = "some text";
let s2 = s1.substring(2);

// 相当于
let s1 = new String("some text");
let s2 = s1.substring(2);
s1 = null;
```

> 以上行为可以让原始值拥有对象的行为（方法等等）。对于布尔值和数值而言，以上三步也会在后台发生，只不过使用 Boolean 和 Nunber 包装类型

::: details 点击查看代码

```js
// 使用new调用原始值包装类型的构造函数，与调用同名的转型函数不一样
let value = "25";
let number = Number(value); //转型函数
console.log(typeof number); //number

let obj = new Number(value); //构造函数
console.log(typeof obj); //object
```

:::

### Boolean

Boolean 的实例会重写 valueOf()方法，返回一个原始值 true 或者 false，toString() 方法被调用时也会被覆盖，返回字符串 true 或者 false。

```js
let obj = new Boolean(false);
console.log(obj && true); //true
```

### Number

Number 类型提供了几个用于将数值格式化为字符串的方法

- `toFixed()`:返回包含指定小数点位数的数值字符串，该方法会四舍五入。位数不够会自动填充 0。
- `toExponential()`：与`toFixed()`基本一直，但是返回科学计数法表示的数值字符串，接受一个参数表示结果中小数的位数。

::: details 点击查看代码

```js
var num = 123.126;
console.log(num.toFixed(2)); //123.13
console.log(num.toFixed(6)); //123.126000

console.log(num.toExponential(2)); //1.23e+2
console.log(num.toExponential(6)); //1.231260e+2
```

:::

`Number.isInteger()` （ES6 新增）：用来判断一个舒适是否保存整数

### String

> 每个 String 对象都有一个 length 属性，表示字符串中字符的数量
> JavaScript 字符串有 16 位 Code Unit 组成。每 16 位码元对应一个字符。

- `charAt()`：返回指定索引位置的字符。
- `charCodeAt()`：返回指定索引位置的字符的字符编码
- `fromCharCode()`：返回根据指定 UFT-16 码创建的字符串，可以接受多个数值

::: tip 注意

代理对(使用两个 16 位码元)编码字符：可以使用`codePointAt()`和`fromCodePoint()`代替
:::

字符串操作方法

- `concat()`：拼接多个字符串
- `slice()`：提取子字符串，第一个参数位开始，第二个参数位结束，可以为负数（从字符串尾部往前计数）
- `substring()`：与`slice()`一致，第二个参数为负值时，将转换成 0
- `substr()`：提取子字符串，第一个参数位开始，第二个参数用提取的长度

以上方法都不会更改原本字符串，只会返回一个新的字符串

字符串位置方法

- `indexOf()`从字符串开头开始搜索传入的字符串，并返回位置，没有找到返回-1
- `lastIndexOf()`：从字符串末尾开始搜索传入字符串，并返回位置，没有找到返回-1

字符串包含方法（ES6 新增）

用于判断字符串中是否包含另一个字符串的方法

- `startsWith()`：检查开始于索引 0 的匹配项，第二个参数表示开始搜索的位置
- `endsWith()`：检查开始于索引(string.length -substring.length)的匹配项
- `includes()`：检查整个字符串，第二个参数表示开始搜索的位置

::: details 点击显示代码

```js
var str = "qweasd";
console.log(str.startsWith("qwe")); //true
console.log(str.startsWith("qwe", 1)); //false
console.log(str.startsWith("we", 1)); //true

console.log(str.endsWith("asd")); //true

console.log(str.includes("we", 1)); //true
```

:::

去除字符串两端空格符

- `trim()`：去除字符串两端的空格，返回一个新的字符串
- `trimLeft()`：去除字符串中左边的空格
- `trimRight()`：去除字符串中右边的空格

字符串大小写转换

- `toLowerCase()`：转换小写
- `toLocaleLowerCase()`：转换小写
- `toUpperCase()`：转换大写
- `toLocaleUpperCase()`：转换大写

字符串正则匹配

> 详情见 正则方程式

其他方法

- `repeat()`：接受一个整数参数，将当前字符串复制多少次，并返回拼接字符串
- `padStart()`：接受一个整数参数，复制字符串，如果长度不够会填充字符，第二个参数为填充字符（默认为空格）
- `padEnd()`：与`padStart()`基本一致，填充字符是，一个填充在开始，一个填充在结束

- `localeCompare()`：两个字符串 对比字母表，字母表在前返回-1，在后返回 1，相等则返回 0

::: details 点击查看代码

```js
var str = "yewen";

console.log(str.padStart(10, "?")); //?????yewen
console.log(str.padEnd(10, "?")); //yewen?????
```

:::

字符串迭代与解构

> 字符串的原型上暴露了一个迭代器方法，表示可以迭代字符串中的每个字符

> 可以使用 for-of 语句

字符串可以使用解构语法

```js
let str = "abc";
console.log(...str); //a b c
console.log([...str]); //[ a , b , c ]
```

### 单例内置对象

> 内置对象：任何有 ECMAScritp 实现提供、与宿主环境无关，并在 ECMAScritp 程序开始执行时就存在的对象。

> 包括：Object，Array 和 String。以及 Global 和 Math

### Global

> 兜底对象：所针对的是不属于任何对象的属性和方法。

前面介绍的函数，包括 `isNaN()`、`isFinite()`、`parseInt()`和 `parseFloat()`，实际上都是 Global 对象的方法

URl 编码方法

- `encodeURI()`：对 URL 进行编码转换有效的 UTL 不能包含的字符，比如空格
- `encodeURIComponent()`：编码所有非标准字符
- `decodeURI()`
- `decodeURIComponent()`

eval()方法

> 一个完整的 ECMAScript 解释器，接收一个参数，即一个要执行的字符串

- eval() 定义的任何变量和函数都不会被提升

Global 对象属性

### window

> 浏览器将 window 对象实现为 Global 对象的代理，因此全局作用域中声明的变量和函数都变成了 window 属性

### Math

属性

方法

舍入方法

- `Math.ceil()` 向上舍入取整
- `Math.floor()` 向上舍入取整
- `Math.round()` 四舍五入取整
- `Math.fround()` 返回数值最接近的单精度浮点值表示

`random()`方法：返回 0~1 范围内的随机数，包括 0 但是不包括 1

## 集合引用类型

### Object

> 对象字面量`{}` 出现表达式上下文。表示期待返回值的上下文

> 语句上下文：if 等语句 `{}`中

### Array

> 一组有序的数据，每个曹伟可以存储任意类型的数据

`Array.from()`和 `Array.of()`(ES6 新增方法)

- `Array.from()`用于将类数据结构转换成为数组实例
  - 第二个参数可以是个增强函数，
  - 第三个参数为映射增强函数的 `this`指向
- `Array.of()`用于把一组参数转成数组

数组空位

创建空位数组：`let arr= [,,,,,]`

:::tip 注意
ES6 新增方法普遍将这些空位当成存在的元素，只不过值为 `undefined`

ES6 之前的方法则会忽略这个空位
:::

数组索引：可以修改

检测数组

- `value instanceof Array`
- `Array.isArray()`

迭代器方法

- `keys()` 返回数组索引的迭代器
- `values()` 返回数组元素的迭代器
- `entries()` 返回索引/值对的迭代器

可以适用 ES6 中的解构操作

```js
let arr = ["yewen", "yevin"];
for (let [index, item] of arr.entries()) {
  console.log(index);
  console.log(item);
}
```

复制和填充方法(ES6 新增)

- `copyWithin()` 批量复制
  - 第一个参数 插入位置
  - 第二个参数 复制原数组内容的开始位置
  - 第三个参数 复制原数组内容的结束位置

::: tip 注意
`copyWithin()` 忽略超出数组边界、零长度及方向相反的索引范围
:::

- `fill()` 填充数组
  - 第一个参数 填充的字符
  - 第二个参数 填充开始位置
  - 第三个参数 填充结束位置

::: details 点击查看代码

```js
//copyWithin
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

console.log(arr.copyWithin(4));
//[  1, 2, 3, 4, 1, 2, 3, 4, 5  ]
let arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(arr1.copyWithin(4, 2));
//[  1, 2, 3, 4, 3, 4, 5, 6, 7 ]
let arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(arr2.copyWithin(4, 2, 4));
// [ 1, 2, 3, 4, 3, 4, 7, 8, 9 ]

//fill
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(arr.fill(4));
//[4, 4, 4, 4, 4,4, 4, 4, 4 ]
let arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(arr1.fill(4, 2));
//[1, 2, 4, 4, 4, 4, 4, 4, 4]
let arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(arr2.fill(4, 2, 4));
//[(1, 2, 4, 4, 5, 6, 7, 8, 9)];
```

:::

转换方法

- `valueOf()` 返回的还是数组本身
- `toString()` 返回由逗号隔开的数组值得字符串
- `loLocaleString()`

栈方法

- `push()` 接收任意数量的参数，并将它们添加到数组末尾，返回数组的最新长度
- `pop()` 用于删除数组的最后一项，同时减少数组的 length 值，返回被删除的项

队列方法

- `shift()` 删除数组的第一项并返回它，然后数组长度减 1
- `unshift()` 数组开头添加任意多个值，然后返回新的数组长度

排序方法

- `reverse()` 翻转数组
- `sort()` 排序

操作方法

- `concat()` 连接多个数组
- `slice()` 创建一个包含原有数组中一个或多个元素的新数组，第一个参数开始索引，第二个结束索引
- `splice()` 第一个参数 开始位置，第二个参数删除数量，第三个参数以及后面参数为插入元素

操作和位置方法

- `indexOf` 返回要查找的元素在数组中的位置，如果没找到则返回-1
- `lastIndexOf()` 从后往前查找，返回要查找的元素在数组中的位置，如果没找到则返回-1
- `includes()` ECMAScript7 新增的，返回布尔值，表示是否查找到

::: tip 注意
以上方法按严格相等（===）搜索判断
:::

- `find()` 返回第一个匹配的元素
- `findIndex()` 返回第一个匹配元素的索引

迭代方法

- `every()` 数组每一项都运行传入的函数,都返回 `true` 这个方法返回 `true`
- `filter()` 数组每一项都运行传入的函数，函数返回 true 的项会组成数组之后返回
- `forEach()` 对数组每一项都运行传入的函数，没有返回值。
- `map()` 对数组每一项都运行传入的函数，返回由每次函数调用的结果构成的数组
- `some()`对数组每一项都运行传入的函数，如果有一项函数返回 true，则这个方法返回 true

归并方法

- `reduce()`迭代数组的所有项，并在此基础上构建一个最终返回值
- `reduceRight()`迭代数组的所有项，并在此基础上构建一个最终返回值,最后一项开始遍历至第一项

### 定型数组

> 定型数组（typed array）是 ECMAScript 新增的结构，目的是提升向原生库传输数据的效率

::: tip 注意
保存特殊类型数值的数组，方便直接传递给某些场景，即不需要再做类型转换，提升性能
:::

::: tip 注意
JavaScript 并没有“TypedArray”类型，它所指的其实是一种特殊的包含数值类型的数组
:::

WebGL：专用于 2D 和 3D 计算机图形的子集，开发者利用它能够编写设计负责图形的应用程序，他会被兼容 WebGL 的浏览器原生解释执行。但是 JavaScript 数组与其原生数组之间不匹配，因为 JavaScript 默认是双精度浮点格式的。

于是出现了`CanvasFloatArray`，最终变成`Float32Array`

> Float32Array 实际上是一种“视图”，可以允许 JavaScript 运行时访问一块名为 ArrayBuffer 的预分配内存。

#### ArrayBuffer

> ArrayBuffer 是所有定型数组及视图引用的基本单位。

> `ArrayBuffer()`是一个普通的 JavaScript 构造函数，可用于在内存中分配特定数量的字节空间

ArrayBuffer 创建之后不能在调整大小，但是可以使用`slice()`复制其全部或者部分到一个新的实例中

```js
const buf = new ArrayBuffer(16); //在内存中分配16字节
console.log(buf.byteLength); //16

console.log(buf.slice(4, 12)); //8
```

对 ArrayBuffer 的读取或写入，必须通过视图实现。

#### DataView

> DataView 允许读写 ArrayBuffer 的视图

> 对已有的 ArrayBuffer 读取或写入时才能创建 DataView 实例, 可以使用全部或部分 ArrayBuffer,且维护着对该缓冲实例的引用，以及视图在缓冲中开始的位置

::: details 点击查看代码

```js
const buf = new ArrayBuffer(16);
const fullDataView = new DataView(buf);
//const fullDataView = new DataView(buf,0,8 );
console.log(fullDataView.byteOffset); //0   //0
console.log(fullDataView.byteLength); //16   //8
console.log(fullDataView.buffer === buf); //true
```

:::

##### ElementType

> DataView 对存储在缓冲内的数据类型没有预设，它暴露的 API 强制开发者在读、写时指定一个 ElementType，然后 DataView 就会忠实地为读、写而完成相应的转换

- `Int8` 8 位有符号整数 -128-127
- `Uint8` 8 位无符号整数 0-255
- `Int16` 16 位有符号整数 -32768-32767
- `Uint16` 16 位无符号整数 0-65535
- `Int32` 32 位有符号整数 -2147483648-2147483647
- `Uint32` 32 位无符号整数 0-4294967295
- `Float32` 32 位 IEEE-754 浮点数 -3.4e+38 - +3.4e+38
- `Float64` 64 位 IEEE-754 浮点数 -1.7e+308 - +1.7e+308

#### 定型数组

> 定型数组是另一种形式的 ArrayBuffer 视图。虽然概念上与 DataView 接近，但定型数组的区别在于，它特定于一种 ElementType 且遵循系统原生的字节序。相应地，定型数组提供了适用面更广的 API 和更高的性能。

创建定型数组：

创建定型数组的方式包括读取已有的缓冲、使用自有缓冲、填充可迭代结构，以及填充基于任意类型的定型数组。另外，通过`<ElementType>.from()`和`<ElementType>.of()`

- 定型数组和普通数组相似，可以使用数组的部分相关操作符方法和属性
- 定型数组同样使用数组缓存（ArrayBuffer）来存储数组，因为无法适用相关合并，复制修改数组方法
- 但是定型数组提供了两个新的方法`set()`和`subarray()`

### Map

> Map 可以使用任何 Javascript 数据类型作为建，数据会按照创建顺序插入到实例，Map 是一个可迭代对象

::: tip 注意

[Map,Set,WeakMap 以及 WeakSet 详解](http://iyuwb.cn/boke/JavaScript/JavaScript%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3-Set%E3%80%81Map%E3%80%81WeakSet%E5%92%8CWeakMap.html)

:::

#### 创建 Map

可以给 Map 构造函数传入一个可迭代对象，需要包含键/值对数组。

```
const m1 = new Map([
    ["key": "123"],
    ["key": "123"],
    ["key": "123"]
]);
```

#### 相关方法属性

- `size` 属性，获取映射中的键值对数量
- `set()` 添加键值对
- `get()` 获取数据
- `has()` 查询数据
- `delete()` 删除数据
- `clear()` 清空数据

#### 与 Object 对比

- 内存占用，在给定内存的情况下 Map 多储存键值对
- 插入性能，大量插入操作，Map 性能更加
- 查找速度，大量查找 Object 会更好

### WeakMap

> WeakMap 中的键只能是 Object 或者继承自 Object 的类型

::: tip 注意
WeakMap 中的 weak 弱，描述的 是 JavaScript 垃圾回收程序对待 弱映射中键的方式
:::

```
const key1={id:1}
const key2={id:2}
const key3={id:3}

const m1 = new Map([
    [key1: "123"],
    [key2: "123"],
    [key3: "123"]
]);
```

相关属性方法与 Map 基本一致

#### 相关方法

- `set()` 添加键值对
- `get()` 获取数据
- `has()` 查询数据
- `delete()` 删除数据

#### 弱键

不属于正式的引用，不会阻止垃圾回收。

#### 不可迭代键

由于 WearkMap 中的键值对任何时候都可能被销毁，所以不能进行迭代遍历。也没有`clear()` 方法

#### 使用弱映射

- 可以实现真正的私有变量
- 可以保存节点元数据，当节点被删除，垃圾回收就会立即释放其内存

### Set

> 集合类型，Set 可以包含任何 JavaScript 数据类型作为值

#### 创建集合

```js
const s = new Set();

const s1 = new Set(["1", "2", "3"]);
```

#### 相关方法和属性

- `size` 返回元素数量
- `value()` 返回值
- `add()` 增加值
- `has()` 查询
- `delete()` 删除
- `clear()` 删除

#### 顺序与迭代

Set 会维护值插入时的顺序，因此支持按顺序迭代

### WeakSet

> 弱集合，所有的值必须用引用对象。同样与 WeakMap 一样不可迭代

```
const key1={id:1}
const key2={id:2}
const key3={id:3}

const ws = new WeakSet([key1，key2，key3]);
```

#### 相关方法和属性

- `add()` 增加值
- `has()` 查询
- `delete()` 删除

### 迭代和拓展操作

> ES6 新增的迭代器和拓展操作符对集合引用类型特别有用

#### 4 中原生集合类型定义了默认迭代器：

- Array
- 所有定型数据
- Map
- Set

上述所有类型都支持顺序迭代，可以传入 `for-of` 循环.

同样的，上述的类型都兼容拓展操作符

```js
let arr = [1, 2, 3];
console.log(...arr); //1,2,3

let arr2 = [...arr]; //复制数组
console.log(arr2); //[1,2,3]
console.log(arr === arr2); //false

let arr3 = [0, ...arr, 4, 5]; //[0,1,2,3,4,5]
```

## 迭代器与生成器

> ES6 新增迭代器和生成器，能够更加清晰高效方便的实现迭代

迭代器
::: tip 注意
迭代器是一个可以有任意对象实现的接口，支持连续获取对象产的每一个值。任何实现 Iterable 接口的对象都有一个 `Symbal.iterator` 属性，这个属性引用默认迭代器。默认迭代器就想一个迭代器工厂，也就是一个函数，调用之后会产生一个实现 Iterator 接口的对象

迭代器必需通过连续调用 `next()`方法才能连续取得值，这个方法返回一个 IterorObject。这个对象包含一个 Done 属性和一个 Value 属性。前者是布尔值，表示是否还有更多值可以访问，后者包含迭代器返回的当前值。

该接口可以通过反复调用 `nuxt()`方法来获取，也可以通过原生方法，比如 `for-of` 循环来自动获取
:::

生成器

::: tip 注意
生成器是一种特殊的函数，调用之后会返回一个生成器对象，生成器对象实现了 Iterable 接口，因此可用在任何适用可迭代对象的地方。

生成器支持 yield 关键字，该关键字能够暂停执行生成器函数。适用 yield 关键字可以通过`next()`方法接收输入和产生输出。在加上星号之后`(*)`,yield 关键字可以将跟在她后面的可迭代对象序列化为一连串值。
:::

### 理解迭代

简单来说，迭代就是循环遍历出数据集合的每一项。

- 循环是迭代机制的基础
- 迭代会在一个有序集合上进行

在早期，执行迭代必需适用循环或者其他辅助结构，现在解决方案：迭代器模式。

### 迭代器模式

> 描述一个方案，把有些结构成为：可迭代对象。因为他们实现了真正的 Iterable 结构，可以通过迭代器获取消费

通俗来讲，可迭代对象就是数组或者集合这样的对象，包含的元素都是有遍历顺序的

### 迭代器

> 迭代器（iterator）是按需创建的一次性对象。每个迭代器都会关联一个可迭代对象，而迭代器会暴露迭代其关联可迭代对象的 API。迭代器无须了解与其关联的可迭代对象的结构，只需要知道如何取得连续的值

### 可迭代协议

> 实现 Iterable 接口（可迭代协议）需要具备两种能力：支持迭代的自我识别能力和创建实现 Iterator 接口的对象的能力。

内置类型实现 Iterable 接口：

- 字符串 String
- 数组 Array
- 映射 Map
- 集合 Set
- arguments 对象
- Nodelist 等 DOM 集合类型

检测数据类型是否实现迭代器工厂函数：
::: details 点击查看代码

```js
const o = {
  name: "wenbo",
};
const a = [1, 2, 3];
const s = "heihei";
const n = 2;

console.log(o[Symbol.iterator]); //undefined
console.log(a[Symbol.iterator]); //[Function: values]
console.log(s[Symbol.iterator]); //[Function: [Symbol.iterator]]
console.log(n[Symbol.iterator]); //undefined

//调用工厂函数会生成一个迭代器

console.log(a[Symbol.iterator]); //Object [Array Iterator] {}
console.log(s[Symbol.iterator]); //Object [String Iterator] {}
```

:::

:::tip 注意
注意：实际工作当中，不需要显示调用这个工厂函数生成迭代器。实现可迭代协议的所有类型都会自动兼容接收可迭代对象的任何语言特性。
:::

接收可迭代对象的原生语言特性包括：

- `for-of` 循环
- 数组解构
- 拓展操作符
- `Array.from()`
- 创建集合
- 创建映射
- `Promise.all()` 接收由期约组成的可迭代对象
- `Promise.race()` 接收由期约组成的可迭代对象
- `yield *`操作符，在生成器中使用

原生语言解构会在后台调用提供的可迭代对象的这个工厂函数，从而返回一个迭代器：
:::details 点击查看代码

```js
let arr = ["hello", "world", "heihei"];

//for of
for (const item of arr) {
  console.log(item); // hello world heihei
}

//解构
let [a, b, c] = arr;
console.log(a, b, c); // hello world heihei

let arr2 = [...arr, "yewen"];
console.log(arr2); //[ 'hello', 'world', 'heihei', 'yewen' ]

//Array.from()
let arr3 = Array.from(arr);
console.log(arr3); //[ 'hello', 'world', 'heihei' ]

let set = new Set(arr);
console.log(set); //Set(3) { 'hello', 'world', 'heihei' }

let arr4 = [
  ["yewen", 1],
  ["zhijian", 2],
  ["wenbo", 3],
];
let map = new Map(arr4);
console.log(map); //Map(3) { 'yewen' => 1, 'zhijian' => 2, 'wenbo' => 3 }
```

:::

如果对象原型链上的父类实现了 Iterable 接口，那这个对象也实现了该接口：
:::details 点击查看代码

```js
class YewenArray extends Array {}
let wenbo = new YewenArray("1", "2", "3");
for (let item of wenbo) {
  console.log(item); // 1 2 3
}
```

:::

### 迭代器协议

迭代器是一种一次性使用的对象，用来迭代预期关联的可迭代对象：

- 迭代器 API 使用 `next()`方法可以迭代对象中遍历数据

  - 返回一个 IteratorResult 对象
  - IteratorResult 对象有两个属性 done 和 value
  - done：为一个布尔值，便是是否可以再次调用 `next()` 获取下一个值，done: true 状态称为“耗尽”。
  - value：包含可迭代对象的下一个值

- 迭代器使用游标记录遍历可迭代对象。如果在迭代过程中对象被修改，迭代器也会反映相应的变化

:::details 点击查看代码

```js
let arr = ["hei", "ha", "hu"];
let iter = arr[Symbol.iterator]();
console.log(iter);
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
//Object [Array Iterator] {}
//{ value: 'hei', done: false }
//{ value: 'ha', done: false }
//{ value: 'hu', done: false }
//{ value: undefined, done: true }

//迭代过程中修改
let arr = ["123", "456"];
let iter = arr[Symbol.iterator]();

console.log(iter.next());
arr.push("789");
console.log(iter.next());
console.log(iter.next());

//{ value: '123', done: false }
//{ value: '456', done: false }
//{ value: '789', done: false }
//{ value: undefined, done: true }
```

:::

::: tip 注意
迭代器维护着一个指向可迭代对象的引用，因此迭代器会阻止垃圾回收程序回收可迭代对象。
:::

### 自定义迭代器

::: details 点击查看代码

```js
class Counter {
  constructor(limit) {
    this.limit = limit;
  }
  [Symbol.iterator]() {
    (letcount = 1), (limit = this.limit);
    return {
      next() {
        if (count <= limit) {
          return { done: false, value: count++ };
        } else {
          return { done: true, value: undefined };
        }
      },
    };
  }
}
let counter = new Counter(3);
for (let i of counter) {
  console.log(i);
}
// 1
// 2
// 3
```

:::

### 提前终止迭代器

- `return()`用于指定在迭代器提前关闭时执行的逻辑
- 必需返回一个有效的 IteratorResult 对象，可简单返回`{done:true}`

### 生成器

> ES 6 新增一个结构，拥有在一个函数块内暂停和恢复代码执行的能力

### 生成器基础

生成器的形式是一个函数，函数名称前面加一个星号`(*)`表示。

```js
//生成器声明

function* generatorFn() {}

//or
let generatorFn = function*() {};

//or
class Wen {
  *generatorFn() {}
}
console.log(generatorFn);

//[GeneratorFunction: generatorFn]
```

::: tip 注意
箭头函数不能用来定义生成器函数

表示生成器的星号不受两侧空格的影响
:::

调用生成器函数会产生一个生成器对象：生成器对象一开始处于暂停执行（suspended）的状态。与迭代器相似，生成器对象也实现了 Iterator 接口，因此具有 next()方法。调用这个方法会让生成器开始或恢复执行。

```js
let g = function*() {};
console.log(g);
console.log(g().next());
//[GeneratorFunction: g]
//{ value: undefined, done: true }
```

生成器对象实现了 Iterable 接口，他们默认的迭代器是自引用的。

### 通过 yield 中断执行

> `yield`关键字可以让生成器停止和开始执行。

- 生成器函数在遇到 yield 关键字之前回正常执行。
- 遇到 yield 之后，执行回停止，函数作用域的状态会被保留。
- 只能通过在生成器对象上调用 next()

:::details 点击查看代码

```js
function* generatorfn() {
  yield "wenbo01";
  yield "wenbo02";
  return "returns";
}
let g = generatorfn();
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());

//{ value: 'wenbo01', done: false }
//{ value: 'wenbo02', done: false }
//{ value: 'returns', done: true }
//{ value: undefined, done: true }
```

:::

::: tip 注意
生成器函数内部的执行流程会针对每个生成器对象区分作用域。
在一个生成器对象上调用 next()不会影响其他生成器。
:::

::: tip 注意
yield 关键字只能在生成器函数内部使用，用在其他地方会抛出异常。
:::

::: tip 注意
可以使用星号增强 yield 的行为，让他能够迭代一个可迭代对象，从而一次产出一个值

```js
function* generatorfn() {
  yield* [1, 2, 3];
}
let g = generatorfn();
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());
//{ value: 1, done: false }
//{ value: 2, done: false }
//{ value: 3, done: false }
//{ value: undefined, done: true }
```

:::

### 提前终止生成器

强制生成器进入关闭状态

- `return()` 所有生成器都有`return()`方法，进入关闭无法恢复
- `throw()`

:::details 点击查看代码

```js
//return
function* generatorfn() {
  yield* [1, 2, 3];
}

let g = generatorfn();
console.log(g.next());
console.log(g.return(4));
console.log(g.next());
//{ value: 1, done: false }
//{ value: 4, done: true }
//{ value: undefined, done: true }

//throw
```

:::

## 对象，类与面向对象编程

> 对象：ECMA-262 将对象定义为一组属性的无序集合

### 对象属性

描述对象内部特性的属性

- 数据属性：包含一个保存数据值的位置，值会从这个位置读取，也会写入到这个位置。数据属性有 4 个特性描述它们的行为。
- 访问器属性：不包括数值，只包括 getter 获取和 setter 设置函数。
  - setter：在写入访问器属性的时候调用,会调用设置函数并传入新值，这个函数必须决定对数据做出什么修改
  - getter：在读取访问器属性的时候调用

::: tip 注意
ECMA-262 使用一些内部特性来描述属性的特征。这些特性是由为 JavaScript 实现引擎的规范定义的。因此，开发者不能在 JavaScript 中直接访问这些特性。
:::

#### 数据属性

- 「configurable」：表示属性是否可以通过`delete`删除并重新定义
- 「enumerable」：表示是否可以通`for-in`循环返回
- 「writable」：表示属性的值是否可以修改
- 「value」：包含属性实际的值
- 以上属性除了 value，默认都为`true`

#### 设置数据属性

> 需要修改属性的默认特性，就必须使用 Object.defineProperty()方法
> ::: details 点击查看代码

```js
let demo = {};
Object.defineProperty(demo, "name", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: "Yevin",
});
```

:::

#### 访问器属性

- 「set」：设置函数，在写入属性时调用。默认值为 undefined
- 「get」：获取函数，在读取属性时调用。默认值为 undefined。

#### 设置访问器属性

访问器属性不能直接定义，需要借助`Object.defineProperty()`
::: details 点击查看代码

```js
let demo = {
  _name: "wenbo",
};
console.log(demo, demo._name, demo.name);
//{_name:'wenbo'}   wenbo  undefined
let test = "";
//监听demo的name值，使其在改变和获取的时候改变和返回_name的值
//实际上，并没有直接改变或者获取demo对象上name的值，而是返回和改变demo上_name的值
Object.defineProperty(demo, "name", {
  get() {
    return this._name;
  },
  set(val) {
    this._name = val;
    test = val;
  },
});
console.log(demo, demo._name, demo.name);
//{_name:'wenbo'}   wenbo  wenbo
demo.name = "zhijian";
console.log(demo, demo.name, test);
//{_name:'zhijian'}  zhijian  zhijian
```

:::

#### 获取属性的特性

> 使用 Object.getOwnPropertyDescriptor()方法可以取得指定属性的属性描述符。

::: details 点击查看代码

```js
let demo = {};

Object.defineProperties(demo, {
  _name: {
    value: "zhijian",
    enumerable: false,
  },
  name: {
    get() {
      return this._name;
    },
    set(val) {
      this._name = val;
    },
  },
});

let test = Object.getOwnPropertyDescriptor(demo, "_name");
console.log(test.value);
console.log(test.configurable);
console.log(test.enumerable);
console.log(test.writable);
console.log(test.get);
console.log(test.set);
//zhijian
//false
//false
//false
//undefined
//undefined

let test1 = Object.getOwnPropertyDescriptor(demo, "name");
console.log(test1.value);
console.log(test1.configurable);
console.log(test1.enumerable);
console.log(test1.writable);
console.log(test1.get);
console.log(test1.set);
//undefined
//false
//false
//undefined
//[Function: get]
//[Function: set]
```

:::

### 对象方法

#### 合并对象

> 通过 ES6 新增方法 `Object.assign()`合并对象

> 方法会使用源对象上的[[Get]]取得属性的值，然后使用目标对象上的[[Set]]设置属性的值。

::: tip 注意
`Object.assign()`实际上对每个源对象执行的是浅复制。
并且该方法会改变源对象的数据,即第一个参数对象的数据
:::
::: details 点击查看代码

```js
let a = {
  name: "yewen",
};
let b = {
  name: "zhijian",
  age: "18",
};
console.log(Object.assign(a, b), a, b);
//{ name: 'zhijian', age: '18' } { name: 'zhijian', age: '18' } { name: 'zhijian', age: '18' }

let a1 = {
  name: "yewen",
  age: "18",
};
let b1 = {
  name: "zhijian",
};
console.log(Object.assign(a1, b1), a1, b1);
//{ name: 'zhijian', age: '18' } { name: 'zhijian', age: '18' } { name: 'zhijian' }
```

:::

#### 相等判定

> ECMAScript 6 规范新增了`Object.is()`，方法必须接收两个参数。

#### 增强对象语法

- 属性值简写
- 可计算属性
- 方法名简写

::: details 点击查看代码

```js
//属性值简写
let name = "zhijian";
const obj = {
  name,
};
//可计算属性
let name = "yewen";
const obj = {
  [name]: "zhijian",
};
//方法名简写
const obj = {
  eat: function() {},
};
const obj = {
  eat() {},
};
```

:::

#### 对象解构

> 解构，ES6 新增语法，可以在一个语句中使用潜逃数据实现一个或者多个赋值操作

```js
const obj = {
  a: 1,
  b: 2,
};
const { a, b } = obj;
console.log(obj, a, b); // {a:1,b:2}   1   2

let { a: c, b: d } = obj;
console.log(c, b); // 1  2
```

- 解构复制可以值复制需要的属性
- 如果引用的属性不存在，则该变量的值为 undefined
- 解构复制的同时也可以定义默认值，当属性不存在，变量就为默认值

### 对象创建

- 字面量
- 构造函数

> ES6 正式开始支持类和继承

#### 工厂模式

一种按照特定接口创建对象的方式

- 解决创建多个类似对象的问题
- 没有解决对象标识问题，新创建的对象是什么类型

```js
function creatPerson(name, age, job) {
  let o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function() {
    console.log(this.name);
  };
  return o;
}

let person1 = creatPerson("zhijian", 18, "code");
```

#### 构造函数模式

构造函数是用于构造特定类型对象。

- 按照惯例，构造函数名称的首字母要大写。

```js
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function() {
    console.log(this.name);
  };
}
let person1 = new Person("zhijian", 18, "code");
```

创建 Person 实力时，应使用 new 操作符：

- 在内存中创建一个新对象
- 这个新对象内部的[[Prototype]]特性被赋值为构造函数的 property 属性
- 构造函数内部的 this 被赋值为这个新对象（this 指向新对象）
- 执行构造函数内部的代码（给新对象添加属性）
- 如果构造函数返回非空对象，则返回该对象，否则返回刚创建的新对象

::: tip 注意

- 构造函数也是函数，构造函数需要用 new 调用
- 问题：定义的方法会在每个实例上创建一遍
- 解决方法：可以把函数定义转移刀构造函数外部
- 也可以通过原型来处理
  :::

#### 原型模式

> 每个函数都会创建一个 prototype 属性，这个属性是一个对象，包含应该由特定引用类型的实例共享的属性和方法

实际上，这个对象就是通过调用构造函数创建的对象的原型。使用原型对象的好处是，在它上面定义的属性和方法可以被对象实例共享。

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.property.sayName = function() {
  console.log(this.name);
};
```

::: tip 注意
原型链理解

- Object.isPrototypeOf
- Object.getPrototypeOf
- Object.setPrototypeOf
- Object.create()

in 操作符会在可以通过对象访问指定属性时返回 true，无论该属性是在实例上还是在原型上
operty()返回 false，就说明该属性是一个原型属性

Object.keys()和 Object.getOwnPropertyNames()不会从原型链上循环拿取属性
:::

#### 属性枚举顺序

> for-in 循环、Object.keys()、Object.getOwnPropertyNames()、Object.getOwnProperty-Symbols()以及 Object.assign()在属性枚举顺序方面有很大区别。for-in 循环和 Object.keys()的枚举顺序是不确定的，取决于 JavaScript 引擎，可能因浏览器而异。

> Object.getOwnPropertyNames()、Object.getOwnPropertySymbols()和 Object.assign()的枚举顺序是确定性的。先以升序枚举数值键，然后以插入顺序枚举字符串和符号键。在对象字面量中定义的键以它们逗号分隔的顺序插入。

#### 对象迭代

> ES 2017 新增两个静态方法

- `Object.values()` 返回对象值的数组
- `Object.entries()` 返回对象健值对的数组

其他原型语法

自定义 prototype 属性

:::details 点击显示代码

```js
function Person() {}

Person.prototype = {
  name: "zhijian",
  age: 18,
  sayName() {
    console.log(this.name);
  },
};
//注意这样设置后 prototype的constructor属性就不指向Person了，因为重写了默认的prototype对象。

//可以手动指向constructor

function Person() {}

Person.prototype = {
  constructor: Person,
  name: "zhijian",
  age: 18,
  sayName() {
    console.log(this.name);
  },
};
//注意：以这种方式恢复constructor属性会创建一个[[Enumerable]]为true的属性。而原生constructor属性默认是不可枚举的

//可以使用Object.defineProperty()方法来定义constructor属性

function Person() {}

Person.prototype = {
  constructor: Person,
  name: "zhijian",
  age: 18,
  sayName() {
    console.log(this.name);
  },
};
Object.defineProperty(Person.prototype, "constructor", {
  enumerable: false,
  value: Person,
});
```

:::

原型的动态性

> 因为从原型上搜索值的过程是动态的，所以即使实例在修改原型之前已经存在，任何时候对原型对象所做的修改也会在实例上反映出来。

- 简单来说就是定义实例之后，在原型上添加属性，通过实例仍然能够访问到。

::: tip 注意
如果实例定义之后，自己重写的原型，在原型上添加的属性则不能访问到。会进行报错

因为重写原型切断了最初原型和构造函数的联系，但是实例引用的仍然是最初的原型。
:::

::: details 点击查看代码

```js
function Person(){}
//
let p=new Person(){}
Person.prototype.sayHi=funciton(){
 console.log('hi~)
}
p.sayHi() // hi~     能够访问到不会报错


//重写原型之前创建会报错
#
let p=new Person(){}
Person.prototype={
 constructor:Person,
 name:'zhijian',
 age:'18',
 job:'coding',
 sayName(){
  console.log(this.name)
 }
}
p.sayName() //  报错

```

:::

原生对象原型

> 原型模式之所以重要，不仅体现在自定义类型上，而且还因为它也是实现所有原生引用类型的模式。所有原生引用类型的构造函数（包括 Object、Array、String 等）都在原型上定义了实例方法。

比如：

- Array
  - sort()
- String

  - substring()

- 同样可以该方法给原生引用类型添加自定义方法（但是不建议）

原型中存在的问题

- 多个实例共享属性

### 继承

> 很多对象语言支持两种继承：接口继承和实现继承。前者只继承方法签名，后者继承实际的方法。

> 实现继承是 ESMAScript 唯一支持的继承方式，主要通过原型链实现。

#### 原型链继承

::: tip 注意
原型链

默认情况下，所有引用类型都继承自 Object
:::

> 基本思想：通过原型继承多个引用类型的属性和方法

```js
function Father() {
  this.hobby = ["coding", "eat"];
}
Father.prototype.skill = function() {
  console.log("i will javascript");
};
function Son() {}
Son.prototype = new Father();
```

- 注意：原型中的引用对象会被所有的实例共享
- 子类有时候需要覆盖父类的方法，或者增加父类没有的方法。为此，这些方法必须在原型赋值之后再添加到原型上

```js
function Father() {
  this.hobby = ["coding", "eat"];
}
Father.prototype.skill = function() {
  console.log("i will javascript");
};
function Son() {}
Son.prototype = new Father();
Son.prototypr.sonSkill = function() {
  console.log("eat");
};
```

::: tip 注意
继承时，不能通过对象字面量方式添加新方法，这样会重写原型
:::

确定原型与实例关系

- instanceof
- isPrototypeOf() 原型链中包含改原型就返回 true

#### 借用构造函数继承

> 基本思想：在子类构造函数中调用父类构造函数

- 存在问题：方法定义子在构造函数内，因此每次创建子类实例都会创建一边方法

```js
function Father(name) {
  this.name = name;
  this.sayNmae = function() {
    return this.name;
  };
}

function Son(name, age) {
  Father.call(this, name);
  this.age = age;
}
Son.prototype = new Father();
```

#### 组合继承

> 基本思想：综合原型链和借用构造函数继承，将两者结合起来。

```js
function Father(name) {
  this.name = name;
}
Father.prototype.sayName = function() {
  return this.name;
};

function Son(name, age) {
  //继承属性
  Father.call(this, name);
  this.age = age;
}
//继承方法
Son.prototype = new Father();
```

#### 原型式继承

```js
//根本是对传入的对象进行一个浅复制。
function object(o){
 function F(){}
 F.prototype=o
 return New F()
}

```

::: tip 注意
ES5 通过增加 Object.create()将原型式继承的概念规范化了。

- 方法创建一个新对象，使用现有的对象来提供新创建的对象的**proto**。
- 该方法接受两个参数
- 1.作为新对象原型的对象
- 2.给新对象额外定义属性的对象 可选
  :::

#### 寄生式继承

> 基本思想：创建一个实现继承的函数，以某种方式增强对象，然后返回这个对象。

```js
function createAnother(o) {
  let clone = object(o);
  clone.sayHi = function() {
    console.log("hi");
  };
  return clone;
}
```

#### 寄生式组合继承

```js
//寄生组合继承
// 组合继承会导致调用两次父类构造函数
function Father(name) {
  this.name = name;
}
Father.prototype.sayName = function() {
  return this.name;
};

function Son(name, age) {
  Father.call(this, name);
  this.age = age;
}

Son.prototype = Object.create(Father.prototype);
Son.prototype.constructor = Son;
```

### 类

> ES6 引入 class 关键字，具有正式定义类的能力。

#### 定义类

```js
//类声明
class Person {}
//类表达式
const Animal = class {};
```

> 与函数表达式类似，类表达式在它们被求值前也不能引用。不过，与函数定义不同的是，虽然函数声明可以提升，但类定义不能

> 另一个跟函数声明不同的地方是，函数受函数作用域限制，而类受块作用域限制

类的构成

- 构造函数方法
- 实例方法
- 获取函数方法
- 设置函数方法
- 静态类方法

::: details 点击查看代码

```js
//空类定义
class Foo {}

//有构造函数的类
class Bar {
  constructor() {}
}
//有获取函数的类
class Baz {
  get myBaz() {}
}

//有静态方法的类
class Qux {
  static myQux() {}
}
```

:::

#### 类构造函数

> constructor 关键字用于在类定义块内部创建类的构造函数。方法名 constructor 会告诉解释器在使用 new 操作符创建类的新实例时，应该调用这个函数。

实例化

- 使用 new 操作符实例化，相当于使用 new 调用其构造函数

```js
class Person {
  constructor(name) {
    console.log("console:", name);
    this.name = name;
  }
}
let p = new Person("zhijian"); // console:zhijian
console.log(p.name); //zhijian
```

默认情况下，类构造函数会在执行之后返回 this 对象，构造函数返回的对象会被用作实例化的对象。

如果返回的不是 this 对象，而是其他对象，则该对象不会通过 instanceof 操作符检测出给类有关联。

类构造函数与构造函数的区别：

- 调用构造函数必须使用 new 操作符，否则会报错
- 普通构造函数不实用 new，则会以全局的 this 作为内部对象

把类当成特殊函数

> ECMAScript 类就是一种特殊函数。声明一个类之后，通过 typeof 操作符检测类标识符，表明它是一个函数

```js
class Person{}
console.log(Person)
console.log(typeof Person) function
```

- 类标识符 有 prototype 属性，而这个原型也有 constructor 属性，指向自身
- 类可以使用 instanceof 操作符检查构造函数原型是否存在于实例的原型链中
- 类中定义的 constructor 方法不会被当成构造函数

#### 实例，原型和类成员

实例成员

- 每个实例都对应一个唯一的成员对象。所有成员都不会在原型上共享
  原型方法与访问器
- 为了在实例间共享方法，类定于语法把在类块中定义的方法作为原型方法。
- 在 constructor 上添加的内容会存在于不同的实例上
- 在类块中定义的所有内容都会定义在类的原型上

```js
class Person {
  constructor() {
    this.test = () => {
      console.log("heihei");
    };
  }
  test() {
    console.log("prototype");
  }
}

let p = new Person();
p.test(); //heihei
Person.prototype.test(); //prototype
```

- 可以把方法定义在类构造函数中或者类块中，但是不能在类块中给原型添加原始值或者对象作为成员数据。
- 类方法等同于对象属性，因此可以使用字符串，符号（Symbol）或者计算的值作为健。
- 类定义支持获取和设置访问器

```js
class Person {
  set name(newName) {
    this.name_ = newName;
  }
  get name() {
    return this.name_;
  }
}
```

静态类方法

> 在类上定义静态方法，静态类成员在类定义中使用 statice 关键字作为前缀。在静态成员中，this 引用类自身

```js
class Person {
  constructor() {
    this.test = () => {
      console.log("heihei");
    };
  }
  test() {
    console.log("prototype");
  }
  static test() {
    console.log("static");
  }
}

let p = new Person();
p.test(); //heihei
Person.prototype.test(); //prototype
Person.test(); //static
```

非函数原型和类成员

> 类定义并不显式支持在原型或者类上添加成员数据，但在类定义外部，可以手动添加

迭代器和生成器方法

- 类定义语法支持在原型和类本身（static）上定义生成器方法
- 因为支持生成器方法，所以可以通过添加一个默认的迭代器，把类实例变成可迭代对象

```js
class Person{
//在原型上定义生成器方法
 * createTestIterator(){
  yield '123'
  yield '456'
  yield '789'
 }
 //在类本身上定义生成器方法
 static *createTest2Iterator(){
  yield 'abc'
  yield 'def'
  yield 'ghi'
 }

 //添加默认迭代器
class Person{
 constructor(){
  this.nicknames=['zhijian','yewen','yevin']
 }

 *[Symbol.iterator](){
  yeild * this.nicknames.entries()
 }
}
let p=new Person()
for (let [index,nickname] of p){
 console.log(nickname)
}
//zhijian
//yewen
//yevin

```

#### 继承

> 类继承使用的是新语法，但是背后依旧使用的是原型链

继承基础

ES6 支持单继承，使用 extends 关键字就可以继承任何拥有构造函数和原型的对象。不仅可以继承一个类，也可以继承普通的构造函数。

```js
class Father {}
class Son extends Father {}

let s = new Son();
console.log(s instanceof Son); //true
console.log(s instanceof Father); //true

//普通构造函数

function Father() {}
class Son extends Father {}
let s = new Son();
console.log(s instanceof Son); //true
console.log(s instanceof Father); //true
```

::: tip 注意
this 的值会反映调用响应方法的实例或者类
:::

##### super()

- 派生类：利用继承机制，新的类可以从已有的类中派生。那些用于派生的类称为这些特别派生出的类的“基类”。

> `super()`: 派生类可以通过该关键字引用他们的原型。注意：该关键字只能在派生类中使用。而且仅限于类构造函数，实例方法和静态方法内部。
> 在类构造函数中使用 super 可以调用父类构造函数

```js
class Father {
  constructor() {
    this.name = "zhijian";
  }
}
class Son extends Father {
  constructor() {
    super(); //相当于super.constructor()
  }
}

let s = new Son();
console.log(s.name); //zhijian
```

在静态方法中可以通过 super 调用继承的类上定义的静态方法

```js
class Father {
  constructor() {
    this.name = "zhijian";
  }
  static test() {
    console.log("test"); //test
  }
}
class Son extends Father {
  static test1() {
    super.test();
  }
}
Son.test1(); //test
```

::: tip 注意

- super 只能在派生类构造函数和静态方法中使用
- 不能单独引用 super 关键字，要么用它调用构造函数，要么用它引用静态方法
- 调用 super()会调用父类构造函数，并将返回的实例赋值给 this
- super()的行为如同调用构造函数，如果需要给父类构造函数传值，需要手动传入，比如：`super(name,age)`
- 在类构造函数中，不能在调用 super()之前引用 this
- 如果没有定义类构造函数，在实例化派生类是会自动调用 super(),而且会传入所有传给派生类的参数。
- 如果在派生类中显式定义了构造函数，则要么必须在其中调用 super()，要么必须在其中返回一个对象。
  :::

抽象基类

> 定义一个类，可供其他类继承，但是本身不会被实例化。

```js
//抽象基类
class Father {
  constructor() {
    if (new.targer === Father) {
      throw new Error("Father cannot be directly instantiated");
    }
  }
}

class Son extends Father {}
new Son();
new Father(); //会报错
```

继承内置类型

> ES6 类 为继承内置引用类型提供了顺畅的机制，开发者可以方便的扩展内置类型。

```js
class SuperArray extends Array {
  //洗牌算法
  shuffle() {
    for (let i = this.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this[i], this[j]] = [this[j], this[i]];
    }
  }
}

let arr = new SuperArray(1, 2, 3, 4, 5);
console.log(arr); //[1,2,3,4,5]
arr.shuffle();
console.log(arr);
```

类混入

> JS 里的 class 和函数一样，都是高阶的，也就是它可以作为参数，也可以作为返回值
> ::: tip 注意
> 很多 JavaScript 框架（特别是 React）已经抛弃混入模式，转向了组合模式（把方法提取到独立的类和辅助对象中，然后把它们组合起来，但不使用继承）。这反映了那个众所周知的软件设计原则：“组合胜过继承（compositionover inheritance）。”这个设计原则被很多人遵循，在代码设计中能提供极大的灵活性。
> :::

## 代理与反射

> ECMAScript 6 新增的代理和反射为开发者提供了拦截并向基本操作嵌入额外行为的能力。具体地说，可以给目标对象定义一个关联的代理对象，而这个代理对象可以作为抽象的目标对象来使用。在对目标对象的各种操作影响目标对象之前，可以在代理对象中对这些操作加以控制

缺点：

- 不支持向后兼容

优点：

- 通过捕获器，可以拦截 JS 绝大部分基本操作和方法，在遵从捕获器不变式的情况下，可以修改任何基本操作。

应用场景：
通过代理，可以创造出各种编码模式，比如跟踪你属性访问，隐藏属性，阻止修改或者删除属性，函数参数验证，数据绑定。

### 代理基础

代理：

- 目标对象的抽象
- 目标对象既可以直接被操作，也可以通过代理来操作

#### 创建代理

- 使用 Proxy 构造函数创建,构造函数接受两个参数：
  - 目标对象
  - 处理程序对象
- 两个参数缺一不可，不然会报错
- 如果创建空代理，可以传一个{}

创建空代理
::: details 点击查看代码

```js
const target = {
  id: "target",
};
const proxy = new Proxy(target, {});

console.log(target.id); // target
console.log(proxy.id); // target

target.id = "zhijian";
console.log(target.id); //zhijian
console.log(proxy.id); //zhijian

proxy.id = "yewen";
console.log(target.id); //yewen
console.log(proxy.id); //yewen
```

:::

#### 定义捕获器

> 捕获器：在处理程序对象中定义的基本操作拦截器

- 每个捕获器都对应一种基本操作，可以直接或者间接在代理对象上调用
- 每次在代理对象上调用这些基本操作时，代理可以在这些操作传播到目标对象之前先调用捕获器函数，从而拦截并修改响应的行为。

定义一个`get()`捕获器：

- 当通过代理对象执行 get 操作时，就会触发定义的 get 捕获器
- JavaScript 代码中可以通过多种形式触发并被 get 捕获器拦截到
  - proxy[property]
  - proxy.property
  - Object.create(proxy)[property]
  - 等等
    ::: details 点击查看代码

```js
const target = {
  foo: "bar",
};
const handler = {
  get() {
    return "get捕获器";
  },
};
const proxy = new Proxy(target, handler);

console.log(proxy.foo); //get捕获器
console.log(target.foo); //bar
```

:::

#### 捕获器参数

所有捕获器都可以访问响应的参数，基于这些参数可以重建被捕获方法的原始行为。

get()捕获器三个参数：

- 目标对象
- 要查询属性
- 代理对象
  ::: details 点击查看代码

```js
const target = {
 foo: 'bar'
}
const handler = {
 get(target2,property,receiver) {
  console.log(target2===target)
  console.log(property)
  console.log(receiver===proxy)

 }
}
const proxy = new Proxy(target, handler)
)
target.foo

//true
//foo
//true
```

:::

#### 反射 API：Reflect

处理程序对象中所有可以捕获的方法都有对象的反射 API 方法。

::: details 点击查看代码

```js
const target = {
  foo: "bar",
};
const handler = {
  get() {
    return Reflect.get(...arguments);
  },
};
const proxy = new Proxy(target, handler);

console.log(proxy.foo); //bar
console.log(target.foo); //bar

//以上可以简化为：
const target = {
  foo: "bar",
};
const handler = {
  get: Reflect.get,
};
const proxy = new Proxy(target, handler);

console.log(proxy.foo); //bar
console.log(target.foo); //bar

//还可以简化为：
const target = {
  foo: "bar",
};

const proxy = new Proxy(target, Reflect);
console.log(proxy.foo); //bar
console.log(target.foo); //bar
```

:::
反射 API 为开发者准备好了样板代码，再次基础上可以用最少的代码修改捕获的方法

#### 捕获器不变式

> 根据 ECMAScript 规范，捕获处理程序的行为必须遵循“捕获器不变式”（trapinvariant）。防止捕获器定义出现过于反常的行为。

例如：目标对象又一个不可配置切不可写的数据属性，那么捕获器返回一个与该属性不同的值时，会报错。

#### 可撤销代理

> Proxyb 暴露了`revocable()`方法，该方法支持撤销代理对象与目标对象的关联。需要注意：撤销代理的操作是不可逆的。

- `revoke()`

#### 实用反射 API

反射 API 与对象 API

在使用反射 API 时：

- 反射 API 并不限于捕获处理程序
- 大多数反射 API 方法在 Object 类型上有对应的方法
  Object 上的方法适用于通用程序，而反射方法适用于细粒度的对象控制与操作。

状态标记

- 很多反射方法返回 状态标记 的布尔值，表示执行操作是否成功。而在普通对象方法中会报错。

以下反射方法都会提供 状态标记

- Reflect.defineProperty()
- Reflect.preventExtensions()
- Reflect.setPrototype()
- Reflect.set()
- Reflect.deleteProperty()

反射方法

- Reflect.get() 可以替代对象属性访问操作符
- Reflect.set() 可以替代=赋值操作符
- Reflect.has() 可以替代 in 操作符或 with()
- Reflect.deleteProperty() 可以替代 delete 操作符
- Reflect.construct() 可以替代 new 操作符

反射函数

- Reflect.apply

#### 代理另一个代理

代理可以拦截反射 API 的操作，而这意味着完全可以创建一个代理，通过它去代理另一个代理

#### 代理的问题与不足

- 代理中的 this 值
- 内置引用类型 Date 类型

### 代理捕获器和反射方法

> 代理可以捕获 13 种不同的基本操作。这些操作有各自不同的反射 API 方法、参数、关联 ECMAScript 操作和不变式。

注意：捕获器也会拦截他们对应的反射 API 操作。所以可以使用代理去代理另一个代理对象。

#### get()

- `get()`捕获器会在获取属性值的操作中被调用。
- 反射 API：`Reflect.get()`。
- 无返回值
- 拦截操作：
  - `proxy.property`
  - `proxy[property]`
  - `Object.create(proxy)[property]`
  - `Reflect.get(proxy, property, receiver)`
- 拦截器函数传参：
  - `target`：目标对象
  - `property`：引用的目标对象上的字符串键属性
  - `receiver`：代理对象或者继承代理对象的对象
- 捕获不变式：
  - 如果`target.property`不可写且不可配置，则处理程序的返回值也必须于`target.property`匹配
  - 如果`target.property`不可配置，且[[Get]]特性为`undefined`，则处理程序的返回值也必须为`undefined`

#### set()

- `set()`捕获器会在设置属性值的操作中被调用。
- 反射 API：`Reflect.set()`。
- 返回值：true 表示成功，false 表示失败，严格模式下会抛出 TypeError
- 拦截操作：
  - `proxy.property = value`
  - `proxy[property] = value`
  - `Object.create(proxy)[property] = value`
  - `Reflect.set(proxy, property, value, receiver)`
- 拦截器函数传参：
  - `target`：目标对象
  - `property`：引用的目标对象上的字符串键属性
  - `value`：要赋给属性的值。
  - `receiver`：代理对象或者继承代理对象的对象
- 捕获不变式：
  - 如果`target.property`不可写且不可配置，则不能修改目标属性的值
  - 如果`target.property`不可配置，且[[Set]]特性为`undefined`，则处理程序的返回值也必须为`undefined`
  - 严格模式下，处理程序中返回 false 会抛出 TypeError

#### has()

- `has()`捕获器会在 in 操作符中被调用。
- 反射 API：`Reflect.has()`。
- 返回值：必须返回布尔值，表示属性是否存在，返回非布尔值，会被自动转型为布尔值
- 拦截操作：
  - `property in proxy`
  - `property in Object.create(proxy)`
  - `with(proxy){(property)}`
  - `Reflect.has(proxy, property)`
- 拦截器函数传参：

  - `target`：目标对象
  - `property`：引用的目标对象上的字符串键属性

- 捕获不变式：
  - 如果`target.property`存在且不可配置，则处理程序必须返回 True
  - 如果`target.property`存在且目标对象不可拓展，则处理程序必须返回 True

#### defineProperty()

- `defineProperty()`捕获器会在`Object.defineProperty()`中被调用。
- 反射 API：`Reflect.defineProperty()`。
- 返回值：必须返回布尔值，表示属性是否成功定义，返回非布尔值，会被自动转型为布尔值
- 拦截操作：
  - `Object.defineProperty(proxy,property,descriptor)`
  - `Reflect.defineProperty(proxy,property,descriptor)`
- 拦截器函数传参：

  - `target`：目标对象
  - `property`：引用的目标对象上的字符串键属性
  - `descriptor`：包含可选的`enumerable`、`configurable`、`writable`、`value`、`get`和`set`定义的对象。

- 捕获不变式：
  - 如果目标对象不可拓展，则无法定义属性
  - 如果目标对象有一个可配置的属性，则不能添加同名的不可配置属性
  - 如果目标对象又一个不可配置的属性，则不能添加同名的可配置属性

#### getOwnPropertyDescriptor()

- `getOwnPropertyDescriptor()`捕获器会在`Object.getOwnPropertyDescriptor()`中被调用。
- 反射 API：`Reflect.getOwnPropertyDescriptor()`。
- 返回值：必须返回对象，或者在属性不存在时返回 undefined
- 拦截操作：
  - `Object.getOwnPropertyDescriptor(proxy,property)`
  - `Reflect.getOwnPropertyDescriptor(proxy,property)`
- 拦截器函数传参：
  - `target`：目标对象
  - `property`：引用的目标对象上的字符串键属性
- 捕获不变式：
  - 如果自有的 target.property 存在且不可配置，则处理程序必须返回一个表示该属性存在的对象。
  - 如果自有的 target.property 存在且可配置，则处理程序必须返回表示该属性可配置的对象。
  - 如果自有的 target.property 存在且 target 不可扩展，则处理程序必须返回一个表示该属性存在的对象。
  - 如果 target.property 不存在且 target 不可扩展，则处理程序必须返回 undefined 表示该属性不存在。
  - 如果 target.property 不存在，则处理程序不能返回表示该属性可配置的对象。

#### deleteProperty()

- `deleteProperty()`捕获器会在`Object.deleteProperty()`中被调用。
- 反射 API：`Reflect.deleteProperty()`。
- 返回值：必须返回布尔值，表示删除是否成功，返回非布尔值，会被自动转型为布尔值
- 拦截操作：

  - `delete proxy.property`
  - `delete proxy[property]`
  - `Reflect.deleteProperty(proxy,property)`

- 拦截器函数传参：
  - `target`：目标对象
  - `property`：引用的目标对象上的字符串键属性
- 捕获不变式：
  - 如果自由的 target.property 存在且不可配置，则处理程序不能删除这个属性

#### ownKeys()

- `ownKeys()`捕获器会在`Object.Keys()`中被调用。
- 反射 API：`Reflect.ownKeys()`。
- 返回值：必须返回包含字符串或者符号的可枚举
- 拦截操作：

  - `Object.getOwnPropertyNames(proxy)`
  - `Object.getOwnPropertyNames(proxy)`
  - `Object.keys(proxy)`
  - `Reflect.ownKeys(proxy)`

- 拦截器函数传参：
  - `target`：目标对象
  - `property`：引用的目标对象上的字符串键属性
- 捕获不变式：
  - 返回的可枚举对象必须包含 target 所有不可配置的自有属性
  - 如果 target 不可扩展，则返回可枚举对象必须准确的包含自由属性键

#### getPropertyOf()

- `getPropertyOf()`捕获器会在`Object.getPropertyOf()`中被调用。
- 反射 API：`Reflect.getPropertyOf()`。
- 返回值：必须返回对象或者 null
- 拦截操作：
  - `Object.getPropertyOf(proxy)`
  - `Reflect.getPropertyOf(proxy)`
  - `proxy.__proto__`
  - `Object.prototype.isPrototypeOf(proxy)`
  - `proxy instanceof Object`
- 拦截器函数传参：

  - `target`：目标对象

- 捕获不变式：
  - 如果 target 不可扩展，则`Object.getPropertyOf(proxy)`唯一有效的返回值，就是`Object.getPropertyOf(proxy)`的返回值

#### setPropertyOf()

- `setPropertyOf()`捕获器会在`Object.setPropertyOf()`中被调用。
- 反射 API：`Reflect.setPropertyOf()`。
- 返回值：必须返回布尔值，表示原型复制是否成功。返回非布尔值会被转型为布尔值。
- 拦截操作：
  - `Object.setPropertyOf(proxy)`
  - `Reflect.setPropertyOf(proxy)`
- 拦截器函数传参：
  - `target`：目标对象
  - `prototype`:target 的替代原型，如果是顶级原型则为 null
- 捕获不变式：
  - 如果 target 不可扩展，则唯一有效的返回值，就是`Object.getPropertyOf(proxy)`的返回值

#### isExtensible()

- `isExtensible()`捕获器会在`Object.isExtensible()`中被调用。
- 反射 API：`Reflect.isExtensible()`。
- 返回值：必须返回布尔值，表示 target 是否可扩展。返回非布尔值会被转型为布尔值。
- 拦截操作：
  - `Object.isExtensible(proxy)`
  - `Reflect.isExtensible(proxy)`
- 拦截器函数传参：
  - `target`：目标对象
- 捕获不变式：
  - 如果 target 不可扩展，则处理程序必须返回 false
  - 如果 target 可扩展，则处理程序必须返回 true

#### preventExtensions()

- `preventExtensions()`捕获器会在`Object.preventExtensions()`中被调用。
- 反射 API：`Reflect.preventExtensions()`。
- 返回值：必须返回布尔值，表示 target 是否以及不可扩展。返回非布尔值会被转型为布尔值。
- 拦截操作：
  - `Object.preventExtensions(proxy)`
  - `Reflect.preventExtensions(proxy)`
- 拦截器函数传参：
  - `target`：目标对象
- 捕获不变式：
  - 如果 Object.isExtensible(proxy)是 false，则处理程序必须返回 true

#### apply()

- `apply()`捕获器会在调用函数时中被调用。
- 反射 API：`Reflect.apply()`。
- 返回值：必须返回布尔值，表示 target 是否以及不可扩展。返回非布尔值会被转型为布尔值。
- 拦截操作：
  - `proxy(...argumentslList)`
  - `Function.prototypr.apply(thisArg,argumentslList)`
  - `Function.prototypr.call(thisArg,argumentslList)`
  - `Reflect.apply(target,thisArg,argumentslList)`
- 拦截器函数传参：

  - `target`：目标对象
  - `thisArg`：调用函数的 this 参数
  - `argumentslList`：调用函数时的参数列表

- 捕获不变式：
  - target 必须是一个函数对象

#### construct()

- `construct()`捕获器会在 new 操作符中被调用。
- 反射 API：`Reflect.construct()`。
- 返回值：必须返回一个对象
- 拦截操作：
  - `new proxy(...argumentslList)`
  - `Reflect.construct(target,argumentslList,newTarget)`
- 拦截器函数传参：

  - `target`：目标对象
  - `argumentslList`：传给目标构造函数的参数列表
  - `newTarget`：最初被调用的构造函数

- 捕获不变式：
  - target 必须可以用作构造函数

### 代理模式

#### 跟踪属性访问

- 通过捕获器等操作，可以知道对象属性什么时候进行过什么操作。

#### 隐藏属性

- 通过捕获器，拦截到相关操作，返回 undefined 等，用来隐藏对象属性。

#### 属性验证

- 通过捕获器 set(),根据所赋值内容判断是够允许赋值。
- 比如只允许一个属性赋值为 number 类型，当判断为其他类型时，不进行赋值。

#### 函数与构造函数参数验证

- 对函数和构造函数参数进行审查判断，可以让函数只接受固定类型的值

#### 数据绑定和可观察对象

- 通过代理可以把运行时原本不相关的部分联系在一起，这样就可以实现各种模式，从而让不同的代码相互操作。

## 函数

::: tip 注意
函数实际上也是对象。每个函数都是 Function 类型的实例，而 Function 也有相关属性和方法。

函数名实际上就是指向函数对象的指针。
:::

函数声明方法：

```js
//函数声明
function fn(data){
console.log('hello'，data)
}

//函数表达式
let fn = function(data) {
 console.log('hello'，data)
};

//箭头函数
let fn=(data)=>{
 onsole.log('hello'，data)
};
```

### 箭头函数

> ES6 新增，使用箭头愈发定义函数表达式

::: tip 注意

- 箭头函数不能使用 arguments，super，new.target
- 不能作为构造函数，没有 this 指向，箭头函数中的 this 指向 window
- 箭头函数没有 prototy 属性
  :::

```js
//箭头函数
let fn = (data)=>{
 onsole.log('hello'，data)
};
```

只有一个参数时，可以不使用括号：

```js
let fn = data=>{
 onsole.log('hello'，data)
};
```

当没有参数，可以使用空括号表示：

```js
let fn = ()=>{
 onsole.log('hello'，data)
};
```

::: tip 注意
箭头函数可以不实用大括号，但会改变函数的行为。

- 使用大括号，表明包含函数体，可以在一个函数中包含多个语句
- 不使用打括号，那么箭头后面就只能有一行代码，并且省略大括号会隐式返回这行代码的值
  :::

::: details 点击查看代码

```js
let fn = (a) => {
  return a * 2;
};
console.log(fn(2)); //4

let fn1 = (a) => a * 2;
console.log(fn1(2)); //4
```

:::

### 函数名

- 函数名实际上就是指向函数对象的指针。
- 因此一个函数可以有多个名称

### 函数参数

::: tip 注意
实际上，函数并不关心传参个数以及传参类型

ES 函数的参数只是为了方便才写出来，并不是必须。

不写参数的情况下可以通过 arguments[0],arguments[1]等来获取数据。
:::

- 函数内部 arguments（类数组）对象，储存函数传入的每个参数值。
- 在定义函数时，没有定义参数，在调用函数时传参，照样可以使用 arguments 获取到。
- 可以通过 arguments.length 获取传参个数
- arguments 可以和命名参数混用

::: tip 注意
箭头函数中不能使用 arguments 关键字访问，只能通过定义的命名参数访问
:::

### 没有重载

- ES 函数不能像传统编程一样重载。
- 在 ES 中定义两个同名函数，则后定义的会覆盖掉先定义的。

### 默认参数值

ES5.1 及以前需要判断参数是否等于 undefined

```js
function fn(name) {
  name = typeof name !== "undefined" ? name : "yewen";
  return name;
}
```

ES6 之后，可以直接显示定义默认参数

```js
function fn(name = "yewen") {
  return name;
}
```

::: tip 注意
需要注意的是，arguments 对象的值不反映，函数的默认的参数传值，
:::

- 默认参数值，不限制与原始值和对象类型，也可以使用调用函数返回值
- 需要注意的是：使用函数返回值，只有在调用的时候才会执行函数

### 参数拓展与收集

```js
function fn(...values) {
  console.log(arguments);
}

function fn(name, ...values) {
  console.log(name);
  console.log(arguments);
}
```

### 函数声明与函数表达式

- 函数声明，会在 Javascript 引擎在任何代码执行之前读取，并在执行上下文中生成函数定义
  - 函数声明提升，提升到顶部。
- 函数表达式，会在代码执行到函数表达式的哪一行，才会在执行上下文中生成函数定义
  - 在函数表达式之前调用函数，会报错

### 函数作为值

- 函数在 ES 中就是变量
- 函数可以用在任何可以使用变量的地方
- 可以在函数中返回另一个函数

### 函数内部

ES 中，函数中有两个特殊的对象：

- arguments
  - 类数组
  - 有 length 方法
  - 只存在与 funciton 关键字定义的函数中
  - callee 方法：指向 arguments 对象所在函数的指针
- this
  - this 引用的是把函数当成方法调用的上下文对象
  - 在网页的全局上下文调用函数时，this 指向 windows
  - 箭头函数中的 this 会保留定义该函数时的上下文
- caller
  - 该属性引用的是调用当前函数的函数
    ES6 中新增：
- new.target
  - 检测函数是否使用 new 关键字调用的 new.target 属性
  - 函数正常调用 new.target 返回 undefined
  - 使用 new 关键字调用的，new.target 返回被调用的构造函数

### 函数属性和方法

- length
  - 保存函数定义的命名参数个数
- prototype
  - 保存引用类型所有的实例方法
- call()
  - 以指定的 this 调用函数
  - 第一个值 this
  - 后面是函数传参数
- apply()
  - 以指定的 this 调用函数
  - 第一个值 this
  - 第二个值为传参数组
- bind()
  - 创建一个新的函数实例，this 值会被绑定到传给 bind()的对象

### 函数表达式

匿名函数：创建一个函数再把它赋值给一个变量

### 递归

递归函数：一个函数通过名称在函数内部调用自己

- 不可以给函数赋值给其他变量
- 解决方法
  - 通过 arguments.callee()在函数内部调用自己

### 尾调用优化

- 尾调用：即外部函数的返回值是一个内部函数的返回值
- ES6 规则新增了恶意相内存管理优化机制，使用尾调用，不会造成大量消耗性能。

### 闭包

> 闭包：引用了另一个函数作用域中变量的函数

- 闭包在被函数返回之后，其作用域一直保存在内存中，直到闭包被销毁。
  ::: details 点击查看代码

```js
function createFcuntion(name) {
  return function(obj1, obj2) {
    let v1 = obj1[name];
    let v2 = obj2[name];
    if (v1 < v2) return -1;
    else return 1;
  };
}
```

以上代码在，匿名函数内部，引用了外部函数的变量，内部函数被返回后，仍然引用着该变量。
:::

::: tip 注意
闭包会保留他们包含函数的作用域，所以比其他函数更占用内存，过度使用闭包可能导致内存过度占用。
:::

#### this 对象

- 在闭包中使用 this 会让代码变复杂
- 如果内部函数没有使用箭头函数定义，this 指向运行时绑定到执行函数的上下文
- 在全局函数中调用 this 指向 window，严格模式下 this 为 undefined
- 作为某个对象的方法调用，this 指向 window，严格模式下指向 undefined

#### 内存泄漏

- IE9 之前不同的垃圾回收机制造成

### 立即调用函数

```js
(function() {
  //code
  //块级作用域
})();
```

::: tip 注意
在 ES6 之后，可以直接创建块级作用域

```js
{
  //code
  //块级作用域
}
```

:::

### 私有变量

> 任意定义在函数或块中的变量，都可以认为是私有的。

- 特权方法：能够访问函数私有变量的公有方法
- 静态私有变量：可以通过私有作用域定义私有变量和函数实现（可通过匿名函数实现）
- 模块模式：在单例对象实现隔离和封装
- 模块增强模式：利用模块模式在返回对象之前先对其进行增强，添加额外属性和方法。

## 期约与异步函数

### 过去异步编程

- 通过回调函数（当代码越来越复杂，需要嵌套很多回调函数）（回调地狱）
- 错误处理，需要`try catch`

### 期约 Promise

> ES6 增加了对 Promises/A+规范的完善支持，即 Promise 类型。

- 现在浏览器都支持 ES6 期约，很多浏览器 API 也以期约为基础。（fetch 等）

#### 创建 Promise

> Promise 对象是由关键字 new 及其构造函数来创建的。

- 该构造函数会把一个叫做“处理器函数”（executor function）的函数作为它的参数。
- 这个“处理器函数”接受两个函数——resolve 和 reject ——作为其参数。
- 当异步任务顺利完成且返回结果值时，会调用 resolve 函数；
- 而当异步任务失败且返回失败原因（通常是一个错误对象）时，会调用 reject 函数

```js
new Promise((resolve, reject) => {
  //处理操作  返回resolve或者reject
  if (flag) resolve(data);
  eles(reject(data));
});
```

#### Promise 状态

- 待定：pending 初始状态
- 兑现：fulfilled（resolved）代表成功
- 拒绝：rejected 代表失败

::: tip 注意
Promise 的状态是私有的，不能直接通过 Javascript 检测到

- Promise 在落定状态之后，与之相关的处理程序会被排期，不会立刻执行，跟在添加这个处理程序之后的同步代码一定会在处理程序之前执行。（处理程序，promise 中的 then 等等）
  :::

#### Promise.resolve(data)

> 返回一个状态由给定 data 决定的 Promise 对象

```js
Promise.resolve("test-resolve")
  .then((res) => {
    console.log(res); //test-resolve
  })
  .catch((e) => {
    console.log(e);
  });
```

#### Promise.reject(data)

> Promise.reject(data)方法返回一个带有拒绝原因的 Promise 对象。（状态为失败的 Promise）

```js
Promise.reject("test-reject")
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e); //test-reject
  });
```

#### Promise.prototype.then(onFulfilled, onRejected)

> Promise.prototype.then()是为契约实例，添加处理程序的主要方法

> then() 方法返回一个 新的 Promise。它最多需要有两个参数：Promise 的成功和失败情况的回调函数。当只穿一个值得时候默认是 Promise 成功的回调函数

- 该方法接受两个参数：
- onFulfilled 处理程序 - 兑现状态是执行
- onRejected 处理程序 - 拒绝状态时执行
  ::: details 点击查看代码

```js
//默认一个参数
var promise = new Promise((resolve, reject) => {
  resolve("成功~");
  //or
  // reject('失败~')
});

promise.then(
  (res) => {
    console.log(res); //成功~
  },
  (error) => {
    console.log(error); // 失败~
  }
);
```

:::

#### Promise.prototype.catch(onRejected)

> catch() 方法返回一个 Promise ，并且处理拒绝的情况

- 实际上 catch 的行为与调用 Promise.prototype.then(undefined, onRejected) 相同
- `obj.catch(onRejected)` 内部 `calls`了 `obj.then(undefined, onRejected)`

::: details 点击查看代码

```js
var promise = new Promise((resolve, reject) => {
  throw "出现了错误~";
});
promise.then(
  (res) => {
    console.log(res);
  },
  (e) => {
    console.log(e); //出现了错误~
  }
);

promise
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e); //出现了错误~
  });
```

:::

#### Promise.prototype.finally(onFinally)

> finally() 方法返回一个 Promise。在 promise 结束时，无论结果是 fulfilled 或者是 rejected，都会执行指定的回调函数。

- 需要注意的是 finally 无法知道该期约是成功还是失败

::: details 点击查看代码

```js
var promise = new Promise((resolve, reject) => {
  resolve("成功~");
  //or
  // reject('失败~')
});

promise
  .then(
    (res) => {
      console.log(res); //成功~
    },
    (error) => {
      console.log(error); // 失败~
    }
  )
  .finally((res) => {
    console.log("finally~");
  });
```

:::

#### 拒绝期约与拒绝错误处理

- 无论是使用 `reject()`还是 `throwError()`都会在期约的执行函数或者处理程序中抛出错误，导致拒绝。
- 对应的错误对象会成为拒绝的原因
- 通常在 Javascript 运行时的错误处理机制，回停止执行抛出错误之后的任何指令
- 但是在 Promise 中抛出错误时，不会阻止继续执行的同步指令

#### 期约连锁与期约合成

期约连锁

- 由于每个 Promise 的实例方法(`then catch finally`)等都会返回一个新的 Promise 对象，新的 Promise 又有自己新的实例方法。这样连续方法调用构成期约连锁，链式调用。
- 可以解决回调地狱

#### Promise.all()和 Promise.race()

Promise.all()

> 传参需要是一个可迭代对象 Promise.all 返回一个 Promise 对象（解决值数组对象）。 该 Promise 对象会在 Promise.all 的 iterable 参数对象里的所有 Promise 对象都成功才会触发。

- 简单来说就是只有 Promise.all 参数里的所有 Promise 成功才会触发
- 有一个失败就不会触发,返回失败。
- 如果有期约失败，则第一个失败的期约回将自己的理由作为合成期约的拒绝理由，之后在拒绝的期约不会影响最终期约的拒绝理由

Promise.race()

> 传参需要是一个可迭代对象 Promise.race 返回一个 Promise 对象。 接收一个 Promise 对象的集合，当其中的一个 promise 成功或者失败时，就返回那个成功或者失败的 promise 的值。

- 同样的，如果有期约失败，则第一个失败的期约回将自己的理由作为合成期约的拒绝理由，之后在拒绝的期约不会影响最终期约的拒绝理由

#### 期约拓展

ES6 不支持取消期约和进度通知

- 期约取消
- 期约进度通知

### 异步函数

> ES8 的 async 和 await 旨在解决利用异步结构阻止代码的问题。为此，ECMAScript 对函数进行了拓展，新增加了两个关键字 async 和 await

#### async

> 用于声明异步函数。可以用在函数声明，函数表达式，箭头函数和方法。

::: tip 注意
如果加了 async 的函数使用 return 关键字返回了值，这个值会被 Promise.resolve()包装成一个 Promise 对象。

- 异步函数始终返回 Promise 对象
  :::

::: details 点击查看代码

```js
//无返回值
async function foo() {
  console.log(1);
}
foo();
console.log(2);
//1
//2

//有返回值
async function foo() {
  console.log(1);
  return 2;
}
foo().then((res) => {
  console.log(res);
});
console.log(3);
//1
//3
//2
```

:::

#### await

> 使用 await 关键字可以暂停异步函数代码的执行，等待期约解决
> ::: tip 注意
> await 关键字会暂停执行异步函数后面的代码，当异步函数有值返回后，再恢复异步函数后面代码的执行

- await 必须在异步函数中使用
- 不能在顶级上下文如 script 标签或者模块中使用
- 但是可以定义并立即调用异步函数
  :::

#### 异步函数策略

实现 sleep()

```js
async function sleep(delay) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}
```

利用平行执行
串行执行期约
栈追踪与内存管理

## BOM

- BOM 核心-window 对象
- 控制窗口以及弹窗
- 通过 location 对象获取页面信息
- 通过 navigator 对象了解浏览器
- 通过 history 对象操作浏览器历史

在 HTML5 规范中有一部分涵盖了 BOM 的主要内容。

### Window 对象

> BOM 的核心是 window 对象，表示浏览器的实例。

- window 对象在浏览器中有两重身份 - ECMAScript 中的 Global 对象 - 浏览器窗口的 Javascript 接口
  ::: tip 注意
  因为 window 对象的属性在全局作用域汇总有效，因此很多浏览器 API 以及相关构造函数都以 Window 对象属性的形式暴露出来。
- 因为实现不同，在不同浏览器 window 对象可能存在差异
  :::

#### Global 作用域

- 通过 var 声明的所有全局变量和方法都会变成 window 对象的属性和方法
  - 通过 let 和 const 定义的则不会给变量添加给全局对象

通过 window 查询是否存在可能未声明的变量

```js
var newValue = oldValue; //会报错，如果为定义oldValue

var newValue = window.oldValue; //不会操作，如果oldValue为定义，newValue的值为undefined
```

#### 窗口关系

- `window.self`
- `window.parent`
- `window.top`
- `window.open()`

#### 窗口位置与像素比

- `window.screenLeft`： 窗口相当于屏幕左侧的位置，返回值单位是 CSS 像素
- `window.screenTop`：窗口相当于屏幕顶部的位置，返回值单位是 CSS 像素

- `window.moveTo(x,y)`： 移动窗口，接受两个参数，绝对左边 x 和 y
- `window.moveBy(x,y)`： 移动窗口，接受两个参数，相对与当前位置移动的像素数

* `window.devicePixelRatio`： 像素比

#### 窗口大小

- `window.innerWidth`：返回浏览器窗口的大小
- `window.innerHeight`：返回浏览器窗口的大小

- `window.outerWidth`：返回浏览器页面窗口的大小
- `window.outerHeight`：返回浏览器页面窗口的大小

* `document.documentElement.clientWidth`： 返回页面视口宽度
* `document.documentElement.clientHeight`： 返回页面视口高度

* `document.compatMode`
  - 值为`BackCompat`时，浏览器客户区宽度是`document.body.clientWidth`；
  - 值为`CSS1Compat`时，浏览器客户区宽度是`document.documentElement.clientWidth`;
  - 高度同理

- `resizeTo()`： 调整窗口大小，接受两个值，新的宽度和高度
- `resizeBy()`： 调整窗口大小，接受两个值，宽度和高度各缩放多少

#### 视口位置

- `window.pageXoffset/window.scrollX`：返回相对于视口滚动距离
- `window.pageYoffset/window.scrollY`：返回相对于视口滚动距离

- `window.scroll()`：滚动页面，接受两个值，要滚动到的坐标
- `window.scrollTo()`：滚动页面，接受两个值，要滚动到的坐标
- `window.scrollBy()`：滚动页面，接受两个值，要滚动的距离
  - 以上方法可以接受一个`ScrollToOptions`字典
  - 通过`behavior`属性表示是否平滑滚动`auto,smooth`
  ```js
  window.scrollTo({ left: 100, top: 100, behavior: "auto" });
  ```

#### 导航与打开新窗口

- `window.open()`：打开新的浏览器窗口
  - 4 个参数：要加载的 URL、目标窗口、特性字符串和表示新窗口在浏览器历史记录中是否替代当前加载页面的布尔值

#### 定时器

- `setTimeout()`：使用定时器在某个时间之后执行代码
  - 接受两个参数，要执行的代码字符串或者函数，和等待时间
  - 返回值：一个表示该定时器的数值 ID
  - `clearTimeout()`，传入定时器 ID，清除定时器，可以在执行之前清除
  - 在该方法中 this 指向 window
- `setInterval()`：指定每隔一段时间执行某些代码
  - 接受两个参数，要执行的代码字符串或者函数，和等待时间
  - 返回值：一个表示该定时器的数值 ID
  - `clearInterval()`，传入定时器 ID，清除计时器
  - 在该方法中 this 指向 window

#### 系统对话框

- `alert()`：弹出指定内容的系统对话框
- `comfirm()`：弹出指定内容的系统对话框，带有确认与取消
  - 返回值，确认为 true，取消为 false
- `prompt()`：弹出提示输入框，
  - 返回值为输入内容

### location 对象

> location 对象是一个特殊的对象，它既是 window 的属性，也是 document 的属性。

- `window.location`和`document.location`指向同一个对象
- `location`不仅保存这当前加载文档的信息，也保存着吧 URL 解析为离散片段后通过属性访问的信息

以`http://foouser:barpassword@www.wrox.com:80/WileyCDA/?q=javascript#contents`

为例：

- `location.hash`： URL 散列值，#后面跟着的自负，没有则为空字符串
  - `#contents`
- `location.host`： 域名(服务器名)以及端口号
  - `www.wrox.com:80`
- `location.hostname`： 域名(服务器名)
  - `www.wrox.com`
- `location.href`： 当前加载页面的完整 URL
  - `http://www.wrox.com:80/WileyCDA/?q=javascript#contents`
- `location.port`： 请求的端口号
  - `80`
- `location.portocol`： 页面使用协议
  - `http：`
- `location.search`： URL 的查询字符串，这个字符串以问号开头
  - `?q=javascript`
- `location.username`： 域名前指定的用户名
  - `foouser`
- `location.password`： 域名前指定的密码
  - `barpassword`
- `location.origin`： URL 的原地址（只读）
  - `http://www.wrox.com`

::: tip 注意
除了 hash 之外，只要修改 location 的一个属性，就会导致页面重新加载 URL
:::

#### 查询字符串

> URLSearchParams 提供了一组标准 API 方法，通过他们可以检查和修改查询字符串

- `new URLSearchParams('?key=name&id=123')`
  - `get(key)`
  - `set(key,value)`
  - `delete(key)`

#### 操作地址

- `location.assing(url)`： 跳转到新 URL，同时添加一条历史记录

  - 使用`location.href`和`window.location`时，都会执行与显示调用`assign()`一样的操作

- `location.replace(url)`： 跳转到新 URL 但是不会增加历史记录
- `location.reload()`： 重新加载
- `location.reload(true)`： 重新加载，从服务器加载

### navigator 对象

> 客户端标识，只要浏览器启用 Javascript，navigator 对象就一定存在。

- 与其他 BOM 对象一样，每个浏览器都支持自己的属性
- navigator 具体相关属性不再列举

::: tip 注意
navigator 对象的属性通常用于确定浏览器的类型
:::

#### 检测插件

#### 注册处理程序

### screen 对象

> 编程中很少使用，对象中保存的纯粹是客户端能力信息。也就是浏览器窗口外面的客户端显示器的信息，比如像素宽度，和像素高度等等。

### history 对象

> 表示当前窗口首次使用以来用户的导航历史记录。history 是 window 的属性。

#### 导航

- `history.go()`：前进或者后退，根据传参判断多少步
- `history.back()`： 后退一页
- `history.forward()`：前进一页
- `history.length`：表示历史记录中有多个条目，反应历史记录的数量。

#### 历史状态管理

- `history.pushState()` ：让边页面 URL 而不会加载页面
  - 接受三个参数 state 对象，一个新状态的标题和一个相对 URL，
  - 会创建新的历史记录

## 客户端检测

> 由于各个浏览器厂商对于浏览器接口相关实现不太一致，因为会存在不同的问题，需要用各种方法来检测客户端，用来避免这些问题。

### 能力检测

直接判断浏览器是否支持某种特性：

```js
//IE之前不支持该方法
if (document.getElementById) {
  return true;
}
```

#### 安全能力检测

检测是否存在，并且是自己想要的功能：

- 进行能力检测时应该尽量使用 typeof 操作符

```js
function isSortable(object) {
  return typeof object.sort === "function";
}
```

#### 基于能力检测进行浏览器分许

- 检测特性
- 检测浏览器

### 用户代理检测

> 用户代理检测通过浏览器的用户代理字符串确定使用的是什么浏览器,以及浏览器的先关信息

- 在 JavaScript 中可以适用`navigator.userAgent`访问

### 软件与硬件检测

> 现代浏览器提供了一组与页面指向环境相关的信息，包括浏览器，操作系统，硬件和周边设备信息，这些信息可以通过暴露在 window.navigator 上的一组 API 获得。

- 建议在获取相关信息之前，先检测这些 API 是否存在

#### 识别浏览器和操作系统

- `navigator.oscpu`：获取操作系统，系统架构相关信息
- `navigator.vendor`：获取浏览器开放商信息
- `navigator.platform`：获取浏览器所在操作系统

#### 浏览器元数据

- `navigator.geolocation`： 获取当前设备的地理位置

```js
//通过getCurrentPosition()

navigator.geolocation.getCurrentPosition((position) => {
  console.log(position);
});
```

- `navigator.onLine`： 获取浏览器的联网状态，返回一个布尔值
  - `online` 事件：设备连接到网络时触发
  - `offline` 事件：设备断开网络时触发
- `navigator.getBattery()`：返回一个 Promise， 获取电池及充电状态的信息

#### 硬件

- `navigator.hardwareConcurrency` ：返回浏览器支持的逻辑处理器核心数
- `navigator.deviceMemory` ：返回设备系统内存代销
- `navigator.maxTouchPoints` ：返回触屏支持的最大关联触电数量
