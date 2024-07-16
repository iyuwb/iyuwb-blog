---
title: JavaScript-内置对象方法
author: 耶温
createTime: 2024/05/11 15:05:45
permalink: /JavaScript/0jfs3kpo/
---
# JavaScript-内置对象方法

## Array 对象属性

### constructor

> 返回对创建此对象的数组函数的引用

实例：

```javascript
var arr = [];
console.log(arr.constructor == Array); //true
```

### length

> 设置或返回数组中元素的数目

实例：

```javascript
var arr = [1, 2, 3];
console.log(arr.length); //3

arr.length = 5;
console.log(arr, arr.length);
//[ 1, 2, 3, <2 empty items> ] 5
//<2 empty items>  空 *2
```

### propertype

> 向对象添加属性和方法

## Array 对象方法

### cancat()

> 连接两个或更多的数组，并返回结果。
> 该方法不会改变现有的数组，而仅仅会返回连接数组的一个副本

语法：

> `arrayObject.concat(arrayX,arrayX,......,arrayX)`
> 参数：`arrayX`，必需，该参数可以为：具体值，数组。也可以是多个
> 返回值：两个数组合成的新数组

用法：

```javascript
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];

console.log(arr1.concat(7, 8));
console.log(arr1.concat(arr2));
console.log(arr1.concat(arr2, arr2));

//[ 1, 2, 3, 7, 8 ]
//[ 1, 2, 3, 4, 5, 6 ]
//[ 1, 2, 3, 4, 5, 6, 4, 5, 6 ]
```

### join()

> 把数组中的所有元素放入一个字符串
> 元素是通过指定的分隔符就行分割的

语法：

> ` arrayObject.join(``_separator_``) ` > `separator`：可选，指定要使用的分隔符。如果省略参数，则使用逗号作为分隔符
> 返回值：组成的字符串

用法：

```javascript
let arr = [1, 2, 3];

console.log(arr.join());
console.log(arr.join(""));
console.log(arr.join("-"));

//1,2,3
//123
//1-2-3
```

### pop()

> 删除并返回数组的最后一个元素，如果数组为空，则不改变数组，返回值为`undefined`

语法：

> `arrayObject.pop()`
> 返回值：`arrayObject`的最后一个元素

用法：

```javascript
var arr = [1, 2, 3];
console.log(arr.pop());
console.log(arr);
//3
//[ 1, 2 ]
```

### push()

> 向数组的末尾添加一个或多个元素，并返回新的长度

语法：

> `arrayObject.pop(newelement1,newelement2,...,newelementX)` > `newelement1`第一个参数必传。
> 返回值：新数组的长度

用法：

```javascript
var arr = [1, 2, 3];
console.log(arr.push(4));
console.log(arr);
console.log(arr.push(5, 6));
console.log(arr);

//4
//[ 1, 2, 3, 4 ]
//6
//[ 1, 2, 3, 4, 5, 6 ]
```

### reverse()

> 颠倒数组中元素的顺序

语法：

> `arrayObject.reverse()`
> 返回值：改变后的原数组
> 注意：该方法会改变原来的数组，而不会创建新的数组

用法：

```javascript
var arr = [1, 2, 3];
console.log(arr.reverse());
console.log(arr);

//[ 3, 2, 1 ]
//[ 3, 2, 1 ]
```

### shift()

> 删除数组中第一个元素，并返回第一个元素的值

语法：

> `arrayObject.shift()`
> 返回值：数组原来的第一个元素的值
> 注意：如果数组是空的，将不进行任何操作，返回值为`undefined`

用法：

```javascript
var arr = [1, 2, 3];
console.log(arr.shift());
console.log(arr);

//1
//[ 2, 3 ]
```

### slice()

> 从数组中返回选定的元素

语法：

> `arrayObject.slice(start,end)` > `start`：必须，规定从何处开始截取。如果是负数，则从末尾元素算起。-1 指最后一个元素。-2 指倒数第二个元素。
> `end`：可选。规定从何处结束。结束处的数组下标。如果没有参数，则切分数组 start 到结束的所有元素。如果是负责，则是从末尾元素算起。
> 返回值：一个新的数组，包括从 start 到 end（不包括该元素）的`arrayObject` 中的元素
> 注意：该方法不会修改原数组，而是返回一个新的数组。需要删除数组，可以使用`Array.splice()`。

用法：

```javascript
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(arr.slice(0, 2));
console.log(arr);
console.log(arr.slice(4));
console.log(arr.slice(-4));
console.log(arr.slice(-4, -2));

//[ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
//[ 5, 6, 7, 8, 9 ]
//[ 6, 7, 8, 9 ]
//[ 6, 7 ]
```

### sort()

> 对数组元素进行排序

语法：

> `_arrayObject.sort(sortby)_` > `_sortby _`：可选，规定排序顺序，必须是函数。
> 返回值：对数组的引用，数组在原数组上进行排序，不生成副本

注意：

- 调用方法时如果没有传参，将按字母顺序对数组中的元素进行排序（按照字符编码进行排序）。
- 如果需要按照其他标准进行排序，需要提供比较函数，该函数要比较两个值，然后返回一个说明这两个值的相对顺序的数字。
  - 若 a 小于 b，在排序侯 a 应该出现在 b 之前，则返回一个小于 0 的值
  - 若 a 等于 b，则返回 0,
  - 若 a 大于 b，则返回大于 0 的值

用法：

```javascript
var arr = [12, 21, 345, 4, 1235, 6, 7123, 811, 91];
console.log(arr.sort());
console.log(
  arr.sort((a, b) => {
    return a > b;
  })
);
console.log(
  arr.sort((a, b) => {
    return a < b;
  })
);

//[ 12, 1235, 21, 345, 4, 6, 7123, 811, 91 ]
//[ 4, 6, 12, 21, 91, 345, 811, 1235, 7123 ]
//[ 7123, 1235, 811, 345, 91, 21, 12, 6, 4 ]
```

### splice()

> 向数组中添加或者删除项目，然后返回被删除的项目。
> 该方法会改变原始数组

语法：

> `arrayObject.splice(index,howmany,item1,.....,itemX)` > `index`：必需，整数。规定添加或者删除项目的位置。可适用负数从数组结尾开始
> `howmany`：必需，要删除项目的数量。如果设置为 0，则不会删除项目
> `item1,...,itemX`：可选，想数组添加的新项目
> 返回值：包含被删除项目的新数组，如果删除的话

用法：

```javascript
var arr = [12, 21, 345, 4, 1235, 6, 7123, 811, 91];
console.log(arr.splice(0, 2, 1));
console.log(arr);
console.log(arr.splice(-2, 0, 1));
console.log(arr);

//[ 12, 21 ]
//[ 1, 345, 4, 1235, 6, 7123, 811, 91 ]
//[]
//[ 1, 345, 4, 1235, 6, 7123, 1, 811, 91 ]
```

### toSource()

> 返回对象的源代码
> 只支持 Gecko 核心的浏览器，其他浏览器均不支持该方法

语法：

> `object.toSource()`

### toString()

> 把数组转换成用`,`拼接的字符串，并返回结果

语法：

> `object.toSource()`
> 返回值：数组的字符串标识，数组之间的元素用逗号隔开

用法：

```javascript
var arr = [1, 2, 3, 4, 5, 6];
console.log(arr.toString());
console.log(arr);

//1,2,3,4,5,6
//[ 1, 2, 3, 4, 5, 6 ]
```

### toLocaleString()

> 把数组转成本地字符串标识
> 和`toString`区别：
> 当数字 4 位数以上时，会添加分隔符
> 转换时间格式有区别

语法：

> `arrayObject.toLocaleString()`
> 返回值：数组的本地字符串表示

用法：

```javascript
var arr = [11, 222, 3333, 44444, 55555, 6666666];
console.log(arr.toString());
console.log(arr.toLocaleString());
var date = new Date();
console.log(date.toString());
console.log(date.toLocaleString());

//11,222,3333,44444,55555,6666666
//11,222,3,333,44,444,55,555,6,666,666
//Tue Mar 23 2021 10:24:34 GMT+0800 (GMT+08:00)
//2021-3-23 10:24:34
```

### unshift()

> 想数组开头添加一个或多个元素，并返回新的数组长度

语法：

> `arrayObject.unshift(newelement1,newelement2,....,newelementX)` > `newelement1`：必需。向数组添加的第一个元素
> `newelement2,...`：可选，向数组添加的若干元素
> 返回值：新的数组长度

用法：

```javascript
var arr = [11, 222, 3333, 44444, 55555, 6666666];
console.log(arr.unshift("wenbo"));
console.log(arr);
console.log(arr.unshift("1", "2"));
console.log(arr);

//7
//[ 'wenbo', 11, 222, 3333, 44444, 55555, 6666666 ]
//9
//[ '1', '2', 'wenbo', 11, 222, 3333, 44444, 55555, 6666666 ]
```

### valueOf()

> 返回 Array 对象的原始值

语法：

> `arrayObject.valueOf()`

## Date 对象方法

### Date()

> 返回当日的日期和时间

### getDate()

> 从 Date 对象返回一个月中的某一天（1-31）

### getDay()

> 从 Date 对象返回一周中的某一天（0-6）

### getMonth()

> 从 Date 对象返回月份（0-11）

### getFullYear()

> 从 Date 对象以四位数字返回年份

### getHours()

> 返回 Date 对象的小时（0-24）

### getMinutes()

> 返回 Date 对象的分钟（0-59）

### getSeconds()

> 返回 Date 对象的秒数（0-59）

### getMilliseconds()

> 返回 Date 对象的毫秒数（0-999）

## Math 对象属性

| [E](https://www.w3school.com.cn/jsref/jsref_e.asp)             | 返回算术常量，即自然对数的底数（约等于 2.718） |
| -------------------------------------------------------------- | ---------------------------------------------- |
| [LN2](https://www.w3school.com.cn/jsref/jsref_ln2.asp)         | 返回 2 的自然对数（约等于 0.693）              |
| [LN10](https://www.w3school.com.cn/jsref/jsref_ln10.asp)       | 返回 10 的自然对数（约等于 2.302）             |
| [LOG2E](https://www.w3school.com.cn/jsref/jsref_log2e.asp)     | 返回以 2 为底的 e 的对数（约等于 1.414）       |
| [LOG10E](https://www.w3school.com.cn/jsref/jsref_log10e.asp)   | 返回以 10 为底的 e 的对数（约等于 0.434）      |
| [PI](https://www.w3school.com.cn/jsref/jsref_pi.asp)           | 返回圆周率（约等于 3.14159）                   |
| [SQRT1_2](https://www.w3school.com.cn/jsref/jsref_sqrt1_2.asp) | 返回返回 2 的平方根的倒数（约等于 0.707）      |
| [SQRT2](https://www.w3school.com.cn/jsref/jsref_sqrt2.asp)     | 返回 2 的平方根（约等于 1.414）                |

## Math 对象方法

| [abs(x)](https://www.w3school.com.cn/jsref/jsref_abs.asp)       | 返回数的绝对值。                                              |
| --------------------------------------------------------------- | ------------------------------------------------------------- |
| [acos(x)](https://www.w3school.com.cn/jsref/jsref_acos.asp)     | 返回数的反余弦值。                                            |
| [asin(x)](https://www.w3school.com.cn/jsref/jsref_asin.asp)     | 返回数的反正弦值。                                            |
| [atan(x)](https://www.w3school.com.cn/jsref/jsref_atan.asp)     | 以介于 -PI/2 与 PI/2 弧度之间的数值来返回 x 的反正切值。      |
| [atan2(y,x)](https://www.w3school.com.cn/jsref/jsref_atan2.asp) | 返回从 x 轴到点 (x,y) 的角度（介于 -PI/2 与 PI/2 弧度之间）。 |
| [ceil(x)](https://www.w3school.com.cn/jsref/jsref_ceil.asp)     | 对数进行上舍入。                                              |
| [cos(x)](https://www.w3school.com.cn/jsref/jsref_cos.asp)       | 返回数的余弦。                                                |
| [exp(x)](https://www.w3school.com.cn/jsref/jsref_exp.asp)       | 返回 e 的指数                                                 |
| [floor(x)](https://www.w3school.com.cn/jsref/jsref_floor.asp)   | 对数进行下舍入。                                              |
| [log(x)](https://www.w3school.com.cn/jsref/jsref_log.asp)       | 返回数的自然对数（底为 e）。                                  |
| [max(x,y,...)](https://www.w3school.com.cn/jsref/jsref_max.asp) | 返回多个值中的最高值。                                        |
| 在 ECMASCript v3 之前，该方法只有两个参数。                     |
| [min(x,y,...)](https://www.w3school.com.cn/jsref/jsref_min.asp) | 返回多个值中的最小值。                                        |
| 在 ECMASCript v3 之前，该方法只有两个参数。                     |
| [pow(x,y)](https://www.w3school.com.cn/jsref/jsref_pow.asp)     | 返回 x 的 y 次幂。                                            |
| [random()](https://www.w3school.com.cn/jsref/jsref_random.asp)  | 返回 0 ~ 1 之间的随机数。                                     |
| [round(x)](https://www.w3school.com.cn/jsref/jsref_round.asp)   | 把数四舍五入为最接近的整数。                                  |
| [sin(x)](https://www.w3school.com.cn/jsref/jsref_sin.asp)       | 返回数的正弦                                                  |
| [sqrt(x)](https://www.w3school.com.cn/jsref/jsref_sqrt.asp)     | 返回数的平方根。                                              |
| [tan(x)](https://www.w3school.com.cn/jsref/jsref_tan.asp)       | 返回角的正切                                                  |

## Number 对象方法

### MAX_VALUE

> 可以表示的最大的数

### MIN_VALUE

> 可以表示的最小的数

## Number 对象方法

### toFixed()

> 把 Number 四舍五入为指定小数位数的数字

语法：

> `NumberObject.toFixed(num)` > `num`：必需，规定小数的位数(0-20)

用法：

```javascript
var num = 12312.123123;
console.log(num.toFixed(2));
console.log(num.toFixed(0));

//12312.12
//12312
```

## String 对象方法

### charAt()和 charCodeAt()

> `charAt`返回指定位置的字符
> `charCodeAt()`返回指定位置的字符的 Unicode 编码

语法：

> `stringObject.charAt(index)` > `stringObject.charCodeAt(index)` > `index`：必需。表示字符中某个位置的数字，即字符串中的下标

```javascript
var num = "wenbo";
console.log(num.charAt(2)); //n
console.log(num.charCodeAt(2)); //110
```

### concat()

> 连接两个或者多个字符串

语法：

> `stringObject.concat(stringX,stringX,...,stringX)` > `stringX`：必需，将被连接为字符串的一个或多个字符串对象。
> 返回值：连接后的新的字符串，不会改变原字符串

```javascript
var a = "wenbo";
var b = "zhijian";
console.log(a.concat(b)); //wenbozhijian
console.log(a); //wenbo
```

### indexOf()和 lastIndexOf

> `indexOf`：返回某个指定的字符串值在字符串中首次出现的位置
> `lastIndexOf`：返回某个指定的字符串值在字符串中最后出现的位置，在一个字符串中的指定位置从后往前搜索

语法：

> `stringObject.lastIndexOf(searchvalue,fromindex)` > `stringObject.indexOf(searchvalue,fromindex)` > `_searchvalue_`：必需。规定需要检索的字符串值
> `fromindex`：可选的整数参数。规定在字符串中开始检索的位置。如果省略会从最前或者最后字符开始检索。
> 返回值：返回`searchvalue`第一次或者最后一次出现的位置。如果检索的字符串值没有出现，则返回-1。

用法：

```javascript
console.log(a.indexOf("wenbo")); //0
console.log(a.indexOf("wenbo", 5)); //-1
console.log(a.lastIndexOf("ligouhai")); //17
console.log(a.lastIndexOf("ligouhai", 20)); //17
console.log(a.lastIndexOf("ligouhai", 15)); //-1
```

### match()

> 在字符串内检索指定的值，或找到一个或多个正则表达式的匹配
> 类似于`indexOf`和`lastIndexOf`但是他返回是指定的值，而不是字符串的位置。

语法：

> `stringObject.match(searchvalue)` > `stringObject.match(regexp)` > `searchvalue`：必需。规定要检索的字符串值
> `regexp`：必需。规定要匹配的模式的 RegExp 对象。
> 返回值：存放匹配结果的数组。该数组的内容依赖于`regexp`是否具有全局标志`g`

```javascript
var a = "wenboyewen1zhdij2ia3nligouhai";
console.log(a.match("wen"));
console.log(a.match(/\d/));
console.log(a.match(/\d+/g));
/**
[ 'wen',
  index: 0,
  input: 'wenboyewen1zhdij2ia3nligouhai',
  groups: undefined ]
[ '1',
  index: 10,
  input: 'wenboyewen1zhdij2ia3nligouhai',
  groups: undefined ]
[ '1', '2', '3' ]
**/
```

### search()

> 用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串。

语法：

> `stringObject.search(regexp)` > `regexp`：参数可以是需要在 stringObject 中检索的子串，也可以是需要检索的 RegExp 对象。
> 注意：要执行忽略大小写的检索，请追加标志 i。

### replace()

### slice()

### split()

### substr()

### substring()

### toLowerCase()和 toLocaleLowerCase()

### toUpperCase()和 toLocaleUpperCase()
