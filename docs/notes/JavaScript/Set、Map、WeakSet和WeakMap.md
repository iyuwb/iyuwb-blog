---
title: Set、Map、WeakSet和WeakMap
author: 耶温
createTime: 2024/05/11 15:05:45
permalink: /JavaScript/aesr75yu/
---

# JavaScript 深入理解之 Set、Map、WeakSet 和 WeakMap

## Set

> Set 对象允许储存任何类型的唯一值，无论是原始值或者是对象引用
> 本质：构造函数，用来生成 Set 数据结构

**描述**

> Set 对象是值的集合,你可以按照插入的顺序迭代它的元素。Set 中的元素只会出现一次，即 Set 元素是唯一的。
> 相当于集合，可以进行并集交集运算。

**值的相等**

> 对于原始数据类型（boolean，number，string，null，undefined），如果储存相同值则只保存一个，对于引用类型,引用地址完全相同则只会存一个。

- +0 与-0 在存储判断唯一性的时候是恒等的，所以不可以重复。
- undefined 和 undefined 是恒等的，所以不可以重复。
- NaN 与 NaN 是不恒等的，但是在 Set 中只能存一个不能重复。

**属性方法**

- size 属性：返回集合元素个数（类似于数组的长度 length）
- add(value)方法：想集合中添加一个元素。如果添加的元素已存在，则不会进行操作。
- delete(value)方法：从集合中删除元素 value
- has(value)方法：判断 value 是否在合集中，返回 true 或者 false
- clear()方法：清空集合
- forEach()方法：根据集合中元素的插入顺序，依次执行提供的回调函数

**应用场景**
数组去重，交集，并集，差集等等

```javascript
//数组去重
...new Set([1,1,2,2,3])

//并集
let arr1 = [1, 2, 3]
let arr2 = [2, 3, 4]
let newArr = [...new Set([...arr1, ...arr2])]
//交集
let arr1 = [1, 2, 3]
let arr2 = [2, 3, 4]
let set1 = new Set(arr1)
let set2 = new Set(arr2)
let newArr = []
set1.forEach(item => {
    set2.has(item) ? newArr.push(item) : ''
})
console.log(newArr)
//差集
let arr1 = [1, 2, 3]
let arr2 = [2, 3, 4]
let set1 = new Set(arr1)
let set2 = new Set(arr2)
let newArr = []
set1.forEach(item => {
    set2.has(item) ? '' : newArr.push(item)
})
set2.forEach(item => {
    set1.has(item) ? '' : newArr.push(item)
})
console.log(newArr)
```

## Map

> Map 对象保存键值对，并且能够记住键的原始插入顺序，任何值（对象或者原始值）都可以左右一个键或者一个值

**描述：**

> 一个 Map 对象在迭代时会根据对象中元素的插入顺序来进行，一个`for of` 循环在每次迭代后会返回一个形式为`[key,value]`的数组

**键的相等**

> 对于原始数据类型（boolean，number，string，null，undefined），如果储存相同值则只保存一个，对于引用类型,引用地址完全相同则只会存一个。

- +0 与-0 在存储判断唯一性的时候是恒等的，所以不可以重复。
- undefined 和 undefined 是恒等的，所以不可以重复。
- NaN 与 NaN 是不恒等的，但是只能存一个不能重复。

**Map 和 Object 的区别**

|          | Map                                                                        | Object                                                                                                                                 |
| -------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| 额外的键 | Map 默认情况下不包含任何键，只包含插入的键                                 | 一个 Object 有一个原型，原型链上的键名有可能和自己在对象上设置的键名产生冲突,ES5 可以适用 `Object.create(null)`,创建一个没有原型的对象 |
| 键的类型 | 一个 Map 的键可以是任意值，包括函数，对象或者任意基本类型                  | 一个 Object 的键必需是一个 String 或者 Symbol                                                                                          |
| 键的顺序 | Map 中的 key 是有序的，因此当迭代的时候，一个 Map 对象以插入的顺序返回键值 | 一个 Object 的键是无序的                                                                                                               |
| Size     | 通过 size 属性获取                                                         | Objec 的键值只能手动计算                                                                                                               |
| 迭代     | 可迭代，可以直接被迭代                                                     | 需要某种方式获取到键才能被迭代                                                                                                         |
| 性能     | 在频繁增删键值对的场景下表现更好                                           | 未作出优化                                                                                                                             |

**属性方法**

- size 属性：返回字典长度（类似于数组的长度 length）
- values()方法：返回一个可迭代对象，包含按顺序插入 Map 对象中每个元素的 value 值
- set(key,value)方法：向字典中添加新元素
- get(key)方法：通过键查找特定数值并返回
- has(key)方法：判断字典中是否存在键 key
- delete(key)方法：通过键 key 从字典中移出对应的数据
- clear()方法：清空字典
- forEach()方法：根据集合中元素的插入顺序，依次执行提供的回调函数

**遍历**

```javascript
var myMap = new Map();
myMap.set("0", "foo");
myMap.set(1, "bar");
myMap.set({}, "baz");

for (const [key, value] of myMap) {
  console.log(key, value);
}

myMap.forEach((value, key) => {
  console.log(value, key);
});
```

**转换**

```javascript
var arr = [
  [1, 2],
  [3, 4],
  [5, 6],
];

var map = new Map(arr);
console.log(map); //Map { 1 => 2, 3 => 4, 5 => 6 }
console.log(Array.from(map)); //[ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ] ]
```

**复制**
`let mapV=newMap(map)`

## WeakSet

> WeakSet 对象允许将弱引用对象存在一个集合中

**WeakSet 和 Set 区别：**

- WeakSet 只能储存对象引用，不能存放值，而 Set 对象都可以
- WeakSet 对象中储存的对象值都是被弱引用的，即垃圾回收机制不考虑 WeakSet 对该对象的引用，如果没有其他的变量或者属性引用这个对象值，则这个对象将会被垃圾回收掉。（不考虑该对象还存在与 WeakSet 中），所以 WeakSet 对象里有多少个成员元素，取决于垃圾回收机制有没有运行，运行前后成员个数可能不一致，遍历结束之后，有的成员可能取不到，被垃圾回收了。因此 ES6 规定，WeakSet 对象是无法被遍历的，也没有办法拿到它包含的所有元素。

**属性：**
constructor：构造函数
**方法：**

- add(value)方法：在 WeakSet 中添加一个元素。如果添加的元素已存在，则不会进行操作。
- delete(value)方法：删除元素 value
- has(value)方法：判断 WeakSet 对象中是否包含 value
- clear()方法：清空所有元素

## WeakMap

> WeakMap 对象是一组键值得集合，其中的键是弱引用。注意：键必需是弱引用，而值可以是任意。
> 注意：WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。

**WeakMap 和 Map 区别：**
WeakMap 中，每个键对自己所引用对象的引用都是弱引用，在没有其他引用和该键引用同一对象，这个对象将会被垃圾回收，相对应的 key 则变成无效的，所以，WeakSet 的 key 是不可枚举的。
**属性：**
constructor：构造函数
**方法：**

- set(key,value)方法：设置一组 key 关联对象
- delete(key)方法：移出 key 的关联对象
- has(value)方法：判断 WeakSet 对象中是否包含 value
- get(key)方法：返回 key 关联对象，没有则返回 undefined

## 总结

- Set
  - 成员唯一，无序且不会重复
  - 类似于数组集合，键值和键名是一致的（只有键值。没有键名）
  - 可以遍历，方法有 add，delete，has
- WeakSet
  - 只能存储对应引用，不能存放值
  - 成员都是弱引用，会被垃圾回收机制回收
  - 不能遍历，方法有 add，delete，has
- Map
  - 键名唯一不可重复
  - 类似于集合，键值对的集合，任何值都可以作为一个键或者一个值
  - 可以遍历，可以转换各种数据格式，方法 get，set，has，delet
- WeakMap
  - 只接受对象为键名，不接受其他类型的值作为键名，键值可以是任意
  - 键名是拖引用，键名所指向的对象，会被垃圾回收机制回收
  - 不能遍历，方法 get，set，has，delete
