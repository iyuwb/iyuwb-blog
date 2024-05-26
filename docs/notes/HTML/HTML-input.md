---
title: HTML-input
author: 耶温
createTime: 2024/05/13 16:08:58
permalink: /HTML/4nvq330q/
---
# HTML-input


## 输入框

### 邮箱：`email`

|   `email`    | 解释说明            |   备注   |
| :------: | :--------------: | :--: |
| 事件     | `change`、`input`            |   无   |
| 支持的通用属性 | `autocomplete`、`list`、`maxlength`、`minlength`、`multiple`、`name`、`pattern`、`placeholder`、`readonly`、`required`、`size` 和 `type`   |   无   |
| IDL属性  | `list`、`value`          |   无   |
| DOM接口  | `HTMLInputElement` |    无  |
| 方法  | `select()` | 无 |

在表单提交前，输入框会自动验证输入值是否是一个或多个合法的电子邮箱地址（非空值且符合电子邮箱地址格式）。CSS 伪标签 `:valid` 和 `:invalid` 能够在校验后自动应用，代表被校验的邮箱地址是否合法。

::: normal-demo email 代码演示
```html
<form>
    <label for="email">邮箱地址</label><br />
    <input
      id="email"
      type="email"
      required
      placeholder="username@outlook.com"
      pattern=".+@outlook.com"
      title="请仅提供 outlook 邮件地址" />
  <input type="submit" value="发送请求" />
</form>
```
```css
#email{
    outline:none;
    inline:none;
    border:1px solid #ccc
}
#email:valid{
    border:1px solid green
}
#email:invalid{
    border:1px solid red
}
```
:::
-   `maxlength`：最大字符数
-   `minlength`：最小字符数
-   `multiple`：多选，值可以用逗号（,）隔开
-   `pattern`：正则匹配
-   `readonly`：只读
-   `required`：必填
-   `size`：控件尺寸
::: normal-demo email 代码演示
```html
<form>
    <label for="email">邮箱地址</label><br />
    <input
      id="email"
      type="email"
      size="20"
      maxlength="64"
      required
      placeholder="username@outlook.com"
      pattern=".+@outlook.com"
      title="请仅提供 outlook 邮件地址" />
  <input type="submit" value="发送请求" />
</form>
```
:::

### 隐藏元素：`hidden`

|   `hidden`    | 解释说明            |   备注   |
| :------: | :--------------: | :--: |
| 事件     | 无           |   无   |
| 支持的公共属性 | `autocomplete` |   无   |
| IDL属性  | `value`          |   无   |
| DOM接口  | `HTMLInputElement` |    无  |
| 方法  | 无  | 无 |

`hidden` 类型的` <input>` 元素允许 Web 开发者包含用户不可见、不可改的数据，在用户提交表单时，这些数据会一并发送出。

`type`为`hidden`的`<input>`元素在页面中完全不可见，并且无法操作使其可见。

:::tip
用户可以通过浏览器开发者工具看到这些隐藏元素和值
:::

```html

<input type='hidden' name='artId' value='a123456' />
```
提交时发送数据为：`artid=a123456`




### 数字：`number`

|   `number`    | 解释说明            |   备注   |
| :------: | :--------------: | :--: |
| 事件     | `change`、`input`           |   无   |
| 支持的公共属性 | `autocomplete`、`list`、`readonly`、`placeholder` |   无   |
| IDL属性  | `value` 、`list`、`valueAsNumber`       |   无   |
| DOM接口  | `HTMLInputElement` |    无  |
| 方法  | `select`、`stepDown`、`stepUp`  | 无 |

类型为`number`的输入框的值，为数字类型`Number`,可以为带小数数字。

数字输入框，只允许输入数字，不同浏览器，可能会提供不同样式的步进箭头，方便调整数字。

:::tip
在移动设备中，使用`number`输入值时，会尝试使用特殊的数字键盘。
:::

额外属性

-   `max`：最大值
-   `min`：最小值
-   `step`：步进值，每一步增加或减少值，默认为1,(将有效值限制在一系列步进值中,提交时会进行校检)

IDL属性

-   `valueAsNumber`：将字符串转成数字

```js
const input = document.querySelector('input')
console.log(input.valueAsNumber)
```

::: normal-demo number 代码演示
```html
数字输入（只允许输入数字）：
<form>
    <input  type="number" name="name"  step="10" min="0" max="100"/>
    <input type="submit" />
</form>
```
:::

### 密码：`password`

|   `password`    | 解释说明            |   备注   |
| :------: | :--------------: | :--: |
| 事件     | `change`、`input`           |   无   |
| 支持的公共属性 | `autocomplete`、`inputmode`、`maxlength`、`minlength`、`pattern`、`readonly`、`placeholder`、`required`、`size` |   无   |
| IDL属性  | `selectionStart` 、`selectionEnd`、`selectionDirection` 、`value`      |   无   |
| DOM接口  | `HTMLInputElement` |    无  |
| 方法  | `select`、`setRangeText`、`setSelectionRange()`  | 无 |

密码输入框，根据不同浏览器会使用`·`、`*`等替代自己输入的字符。

执行模式：`inputmode`

-   `none`：无虚拟键盘
-   `text`：使用用户本地区域设置的标准文本输入键盘
-   `decimal`：小数输入键盘，包含数字和分隔符
-   `numeric`：数字输入键盘，所需要的就是 0 到 9 的数字
-   `tel`：电话输入键盘，包含 0 到 9 的数字、星号（*）和井号（#）键
-   `search`：为搜索输入优化的虚拟键盘，比如，返回键可能被重新标记为“搜索”
-   `email`：为邮件地址输入优化的虚拟键盘，通常包含"@"符号和其他优化
-   `url`：为邮件地址输入优化的虚拟键盘，通常包含"@"符号和其他优化

自动补全：`autocomplete`

-   `on`：允许浏览器或密码管理器自动填写密码字段

-   `off`：不允许浏览器或密码管理器自动填写密码字段

-   `current-password`：允许浏览器或密码管理器输入网站的当前密码

-   `new-password`：允许浏览器或密码管理器自动输入网站的新密码 

::: normal-demo password 代码演示
```html
账号输入：
<form>
    <input  type="text" name="username" />
    密码输入：
    <input  type="password" autocomplete="new-password"  name="password" />
    <input type="submit" />
</form>
```
:::

### 搜索：`search`

|   `search`    | 解释说明            |   备注   |
| :------: | :--------------: | :--: |
| 事件     | `change`、`input`           |   无   |
| 支持的通用属性 | `autocomplate`、`list`、`maxlength`、`minlength`、`pattern` 、`placeholder` 、`required` 、`size` |   无   |
| IDL属性  |`value` |   无   |
| DOM接口  | `HTMLInputElement` |    无  |
| 方法  |`select()`、`setRangeText()`、`setSelectionRange()` | 无 | 

搜索类型的输入框，功能上和Text输入框一致，浏览器不同，可能会有不同的样式和优化。`value`为搜索字符串。

属性

-   `spellcheck`：是否启用元素的拼写检查

非标准属性

-   `autocorrect`： `Safari` 扩展，`autocorrect `属性是一个字符串，它指示在用户编辑此字段时是否激活自动更正.
    -   `on`：启用拼写错误的自动更正
    -   `off`： 禁用自动更正和文本替换
-   `incremental`： `WebKit` 和 `Blink`  扩展，允许用户编辑搜索时实时更新搜索结果。
-   `mozactionhint`：Mozilla 扩展，它提供了一个提示，提示用户在编辑字段时按 Enter 或 Return 键将采取何种操作。
    -   已经废弃，可以使用全局属性`enterkeyhint`代替

-   `results`：
results 属性是一个数字值（仅受 Safari 支持），可让你覆盖要在 `<input>` 元素原生提供的先前搜索查询的下拉菜单中所显示的最大条目数。

::: normal-demo search
```html
搜索
<input type="search" value="sousou" name="search"/>

```

:::

### 电话号码：`tel`

|   `tel`    | 解释说明            |   备注   |
| :------: | :--------------: | :--: |
| 事件     | `change`、`input`           |   无   |
| 支持的通用属性 | `autocomplate`、`list`、`maxlength`、`minlength`、`pattern` 、`placeholder` 、`readonly` 、`size` |   无   |
| IDL属性  |`list`、`value`、`selectionStart`、`selectionEnd`、`selectionDirection` |   无   |
| DOM接口  | `HTMLInputElement` |    无  |
| 方法  |`select()`、`setRangeText()`、`setSelectionRange()` | 无 | 


`tel`类型的 输入框 和`text`功能上基本一致，但是手机上，可能会提供专门的电话号码输入键盘。

以下代码可以在手机浏览器测试
::: normal-demo 电话号码Tel
```html
<form>
  <div>
    <label for="example">电话号码：</label>
    <input id="example" type="tel" name="text" />
  </div>
</form>
```
:::

### 文本：`text`

|   `text`    | 解释说明            |   备注   |
| :------: | :--------------: | :--: |
| 事件     | `change`、`input`           |   无   |
| 支持的通用属性 | `autocomplate`、`list`、`maxlength`、`minlength`、`pattern` 、`placeholder` 、`readonly` 、`size` |   无   |
| IDL属性  |`list`、`value`、`selectionStart`、`selectionEnd`、`selectionDirection` |   无   |
| DOM接口  | `HTMLInputElement` |    无  |
| 方法  |`select()`、`setRangeText()`、`setSelectionRange()` | 无 | 

`value`值，为输入框输入字符串，可以通过`HTMLInputElement.value`获取。
```js
const el = document.querySelector('input')
console.log(el.value)
```
::: normal-demo 文本 Text
```html
<form>
  <div>
    <label for="example">个人介绍：</label>
    <input id="example" type="text" name="text" />
  </div>
</form>
```
:::

### URL：`url`

|   `url`    | 解释说明            |   备注   |
| :------: | :--------------: | :--: |
| 事件     | `change`、`input`           |   无   |
| 支持的通用属性 | `autocomplate`、`list`、`readonly` 、`size`、`step` |   无   |
| IDL属性  |`value`、`valueAsDate`、`valueAsNumber `、`list` |   无   |
| DOM接口  | `HTMLInputElement` |    无  |
| 方法  |`select()`、`stepUp()`、`stepDown()` | 无 | 


当元素非空值提交时，会自动验证当前URL是否合法。合法URL为：`https://baidu.com`

::: normal-demo URL
```html
<form>
  <input id="myURL" name="myURL" type="url"/>
  <button>提交</button>
</form>
```
:::

验证方式：
-   基本验证：URL类型浏览器自动验证
-   `pattern`验证：使用pattern限制



## 日期

### 日期选择：`date`

|   `date`    | 解释说明            |   备注   |
| :------: | :--------------: | :--: |
| 事件     | `change`、`input`            |   无   |
| 支持的常用属性 | `autocomplete`、`list`    |   无   |
| IDL属性  | `list`、`value`          |   无   |
| DOM接口  | `HTMLInputElement` |    无  |
| 方法  | `select()` | 无 |

日期选择`date`的值：按照 YYYY-MM-DD 格式化过的代表日期的字符串，或者为空字符串。

> 不支持日期选择的浏览器，会被优雅降级为普通的`<input type='text'>`

额外属性

-   `max`：所接受的最新日期
-   `min`：所接受的最早日期
-   `step`：步骤值

事件


-   `input`：日期发生改变时触发

-   `change`：日期发生改变并且用户关闭日期选择器之后会触发`change`事件


::: normal-demo date 代码演示

```html
<input type="date" step="day"/>
```
:::

### 时间日期选择：`datetime-locel`

> 受到浏览器限制，不建议使用

属性和事件，与上`date`一致

### 年月日期：`month`


|   `month`    | 解释说明            |   备注   |
| :------: | :--------------: | :--: |
| 事件     | `change`、`input`           |   无   |
| 支持的公共属性 | `autocomplete`、`list`、`readonly`、`step` |   无   |
| IDL属性  | `value`          |   无   |
| DOM接口  | `HTMLInputElement` |    无  |
| 方法  | `select`、`stepDown`、`stepUp`  | 无 |

年月日期`month`的值：按照 YYYY-MM 格式化过的代表年份和月份的字符串，或者为空字符串。

> 不支持年月选择的浏览器，会被优雅降级为普通的`<input type='text'>`( 火狐、Safar不支持 )
额外属性

-   `max`：所接受的最新日期
-   `min`：所接受的最早日期
-   `step`：步骤值

事件

-   `input`：日期发生改变时触发

-   `change`：日期发生改变并且用户关闭日期选择器之后会触发`change`事件

::: normal-demo month 代码演示
```html
<label for="bday-month">你在哪个月出生？</label>
<input id="bday-month" type="month" name="bday-month" value="2001-06" />
```
:::

### 时间：`time`

|   `time`    | 解释说明            |   备注   |
| :------: | :--------------: | :--: |
| 事件     | `change`、`input`           |   无   |
| 支持的通用属性 | `autocomplate`、`list`、`readonly` 、`size`、`step` |   无   |
| IDL属性  |`value`、`valueAsDate`、`valueAsNumber `、`list` |   无   |
| DOM接口  | `HTMLInputElement` |    无  |
| 方法  |`select()`、`stepUp()`、`stepDown()` | 无 | 

值为表示时间的字符串。(`15:20`or`15:20:21`)

::: normal-demo 时间 Time
```html
<form>
  <div>
    <label for="example">时间：</label>
    <input id="example" type="time" name="time"  value="13:30"/>
  </div>
</form>
```
```js
const el = document.querySelector('input')

document.querySelector('input').onchange= function(){
    const el = document.querySelector('input')
    alert(el.value)
}
```
:::
::: tip
当`step属性有值时`，时间选择会多一项秒选择。
:::

::: normal-demo 时间 Time
```html
<form>
  <div>
    <label for="example">时间：</label>
    <input id="example" type="time" name="time"  value="13:30" step="20"/>
  </div>
</form>
```
```js
const el = document.querySelector('input')

document.querySelector('input').onchange= function(){
    const el = document.querySelector('input')
    alert(el.value)
}
```
:::

### 周：`week`

|   `week`    | 解释说明            |   备注   |
| :------: | :--------------: | :--: |
| 事件     | `change`、`input`           |   无   |
| 支持的通用属性 | `autocomplate`、`list`、`readonly` 、`step` |   无   |
| IDL属性  |`value`、`valueAsDate`、`valueAsNumber `、`list` |   无   |
| DOM接口  | `HTMLInputElement` |    无  |
| 方法  |`select()`、`stepUp()`、`stepDown()` | 无 | 

值为表示日期和周数的字符串，eg:`2017-W01`。表示2017年第一周

::: normal-demo week
```html
<form>
  <input id="week" name="week" type="week" value="2024-W45"/>
  <button>提交</button>
</form>
```
:::

## 按钮

### 按钮：`button`

| `button`     | 解释说明            |   备注   |
| :------: | :--------------: | :--: |
| 事件     | `click`            |   无   |
| 支持的通用属性 | `type`、`value `     |   无   |
| IDL属性  | `value`            |   无   |
| DOM接口  | `HTMLInputElement` |    无  |
| 方法  | 无 | 无 |

-   事件：元素的事件，eg： `click`,`change`
-   IDL属性： `interface description language`，接口描述语言。IDL 属性即 DOM 提供给编程语言的真正的属性。
-   方法：实例方法，eg：`HTMLInputElement.select()` 选中当前元素内容
特殊属性

特殊属性：`accesskey`


`accesskey`：快捷键操作，一般浏览器都需要搭配`alt`使用（为了避免冲突），Mac上需要搭配`control`和`option`使用


::: normal-demo button 代码演示 （试试 `ALT`+`Q`）

```html
<input type="button"  accesskey="q" value="按钮" />
```
```javascript
document.querySelector('input').onclick = function(){
  alert('点击')
}
```

:::

### 图形按钮：`image`

`image` 类型的` <input>`元素用于创建图形化的提交按钮，即采用图像而非文本形式的提交按钮。


额外属性与`submit`保持一致 

### 重置按钮：`reset`

|   `reset`    | 解释说明            |   备注   |
| :------: | :--------------: | :--: |
| 事件     | `click`         |   无   |
| 支持的常用属性 | `type`、`value` |   无   |
| IDL属性  | `value` |   无   |
| DOM接口  | `HTMLInputElement` |    无  |
| 方法  | 无  | 无 | 

重置按钮，将表单中的所有输入重置为初始值，元素的`value`为按钮展示名称

::: normal-demo 重置按钮
```html

<form>
    <div>
        <label >Text</label>
        <input type="text"  name="text" />
    </div>
    <div>
        <label >Password</label>
        <input type="password"  name="password" />
    </div>  
    <div>
        <label >Range</label>
        <input type="range" name="range" min="0" max="10" value="5" />
    </div> 
    <div>
        <label >checkbox</label><br/>
        <input type="checkbox" name="selectType" value="cat"/>    <label >cat</label>
        <input type="checkbox" checked name="selectType" value="dog"/>   <label >dog</label>
        <input type="checkbox" name="selectType" value="pig"/>  <label >pig</label>
    </div> 
     <div>
        <label >Radio</label><br/>
        <input type="radio" name="Radio" value="cat"/>  <label >cat</label>
        <input type="radio" checked name="Radio" value="dog"/>  <label >dog</label>
        <input type="radio" name="Radio" value="pig"/>  <label >pig</label>
    </div>       
    <input type="reset" value="Reset" />
    <input type="submit" value="Submit" />
</form>
```

:::

### 提交按钮：`submit`


|   `submit`    | 解释说明            |   备注   |
| :------: | :--------------: | :--: |
| 事件     | `click`          |   无   |
| 支持的通用属性 | `type`、`value`|   无   |
| IDL属性  |`value` |   无   |
| DOM接口  | `HTMLInputElement` |    无  |
| 方法  |无 | 

表单提交按钮，`value`值为按钮名称。

额外属性值
-   `formaction`：提交URL。值为字符串，指示要将数据提交到的 URL，优先于`form`的`action`属性

-   `formenctype`：提交编码。值为字符串，标识在将表单数据提交到服务器时要使用的编码方法
    -   `application/x-www-form-urlencoded`
    -   `multipart/form-data`
    -   `text/plain`

-   `formmethod`：提交方法。
    -   `get`
    -   `post`
    -   `dialog`

-   `formnovalidate`：是否验证表单。值为布尔值，优先于表单的`novalidate`属性


-   `formtarget`：关键字。指定一个名称或关键字，该名称或关键字指示提交表单后在何处显示收到的响应。即在何处打开 action URL。
    -   `_self`：在同一框架中打开。
    -   `_blank`：在新窗口/选项卡中打开。
    -   `_parent`：	在父框架中打开。
    -   `_top`：	在整个窗口中打开。
    -   `framename`：在指定的 iframe 中打开。

以上额外属性 在`<inout type="image"/>`元素上和`button`元素上也可以使用


::: normal-demo search
```html
<form>
  <div>
    <label for="example">文本内容：</label>
    <input id="example" type="text" name="text" />
  </div>
  <div>
    <input type="submit" value="发送" accesskey="s" />
  </div>
</form>
```

:::

## 选择

### 复选框：`checkbox`
| `checkbox`    | 解释说明            |   备注   |
| :------: | :--------------: | :--: |
| 事件     | `change`、`input`            |   无   |
| 支持的常用属性 | `chceked`    |   无   |
| IDL属性  | `chceked`、 `indeterminate`、`value`          |   无   |
| DOM接口  | `HTMLInputElement` |    无  |
| 方法  | `select()` | 无 |


特殊属性：`indeterminate`
-   `indeterminate`：表示不确定或者半选中，不能直接通过`HTML`属性设置。

::: normal-demo checkbox 代码演示

```html
<label>
    <input id="checkbox" type="checkbox"/>
    按钮1
</label>
<label>
    <input type="checkbox" checked/>
    按钮2
</label>
```
```js
// 设置半选中状态
const el = document.querySelector('#checkbox')
el.indeterminate = true
```
:::


注意：当使用submit 提交`checkbox`时，只有选中的`checkbox`会提交，会提交`value`的值，如果`value`省略则默认值为`on`,提交时数据为`name=value`

```html
<label>
    <input type="checkbox" name="selectType" value="cat"/>
    按钮1
</label>
```
如上选中提交数据为:`selectType=cat`
```html
<label>
    <input type="checkbox" name="selectType" value="cat"/>
    按钮1
</label>
<label>
    <input type="checkbox" name="selectType" value="dog"/>
    按钮1
</label>
```
如上如果多个`checkbox`的`name`一致，则提交数据为`selectType=cat&selectType=dog`




### 颜色选择：`color`
|   `color`    | 解释说明            |   备注   |
| :------: | :--------------: | :--: |
| 事件     | `change`、`input`            |   无   |
| 支持的公共属性 | `autocomplete`、`list`    |   无   |
| IDL属性  | `list`、`value`          |   无   |
| DOM接口  | `HTMLInputElement` |    无  |
| 方法  | `select()` | 无 |

颜色选择`color`的选择值：长度为 7 的指定`<color>`值的小写十六进制字符串,eg:`#ffffff`

-   `list` ：输入建议

事件

-   `input`：颜色发生改变时触发

-   `change`：颜色发生改变并且用户关闭选色器之后会触发`change`事件


::: normal-demo color 代码演示

```html
<label>
    <input type="color"/>
    按钮1
</label>

<br/>
还可以这样写：
<br/>
<input type="color" id="color"/>
<label for="color"> 按钮2</label>

```
:::


### 单选：`radio`

|   `radio`    | 解释说明            |   备注   |
| :------: | :--------------: | :--: |
| 事件     | `change`、`input`           |   无   |
| 支持的通用属性 | `checked`、`value`、`required` |   无   |
| IDL属性  | `checked` 、`value` |   无   |
| DOM接口  | `HTMLInputElement` |    无  |
| 方法  | `select`  | 无 | 


CSS属性- `appearance`：删除本地元素
```css
input {
  appearance: none;
}
```
然后可以重新编写样式：


::: normal-demo radio 代码演示

```html
<form>
    <label> 
        <input  type="radio" name="skill"  value="html"/>HTML
    </label>
    <label> 
        <input  type="radio" name="skill"  value="css"/>CSS
    </label>
    <label> 
        <input  type="radio" name="skill"  value="javascript"/>JavaScript
    </label>
    <input type="submit" />
</form>
```
```css
input[type=radio] {
  appearance: none;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  border: 2px solid #999;
  transition: 0.2s all linear;
  margin-right: 5px;
  position: relative;
  top: 4px;
}

input[type=radio]:checked {
  border: 6px solid black;
}
```
:::

如上面示例：在`name`相等的一组`radio`中，只能选择和提交一个选项,如`skill=html`等

### 滑块：`range`

|   `range`    | 解释说明            |   备注   |
| :------: | :--------------: | :--: |
| 事件     | `change`、`input`           |   无   |
| 支持的通用属性 | `autocomplate`、`list`、`max`、`min`、`step` |   无   |
| IDL属性  | `list` 、`value`、和`valueAsNumber` |   无   |
| DOM接口  | `HTMLInputElement` |    无  |
| 方法  | `stepDown`、`stepUp`  | 无 | 

滑块的值为一个代表已选择数值的字符串，可以使用 valueAsNumber 来将此值作为数值获取。


::: normal-demo range 代码演示

```html

    <div>
        <label> 
            <input  type="range" name="size"  value="5" min="0" max="10" step="0.1"/> size
        </label>
    </div>
    <div>
        <label> 
            <input  type="range" name="position"  value="50" min="0" max="100"  step="1"/> position
        </label>
    </div>

```
:::
`list`：输入建议

::: normal-demo  list 输入建议 代码演示

```html
    <h5>选择合适的音量</h5>
    <div>
        <input type="range" name="size"  value="5" min="0" max="100" step="1" list="voice"/> 
        <datalist id="voice">
            <option value="0" label="0音量"></option>
            <option value="25" label="25音量"></option>
            <option value="50" label="50音量"></option>
            <option value="75" label="75音量"></option>
            <option value="100" label="100音量"></option>
        </datalist>
    </div>
```
```css
datalist {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  writing-mode: vertical-lr;
  width: 400px;
}

option {
  padding: 0;
}

input[type="range"] {
  width: 400px;
  margin: 0;
}
```
:::

## 文件

### 文件选择：`file`

|   `file`    | 解释说明            |   备注   |
| :------: | :--------------: | :--: |
| 事件     | `change`、`input`            |   无   |
| 支持的公共属性 | `required` |   无   |
| 附加属性 | `accpet` 、`capture`、`multiple`|   无   |
| IDL属性  | `files`、`value`          |   无   |
| DOM接口  | `HTMLInputElement` |    无  |
| 方法  | `select()` | 无 |

文件选择`file`的值：一个字符串，表示已选择文件的路径，如果多选，则表示第一个文件路径。
其他文件可以用`HTMLInputElement.files`属性获取查看。


-   `accpet`： 接受文件类型，多个用逗号隔开。字符串需要遵守唯一文件类型说明符。
-   `capture`： 指定摄像头获取数据
    -   `user`：前置摄像头和麦克风
    -   `environment`：后置摄像头和麦克风

:::tip
`capture`之前是一个布尔类型的属性，如果存在，就会使用设备的媒体捕获设备，而不是调用本地相册等。
:::

-   `multiple`： 多选文件

唯一文件类型说明符

唯一文件类型说明符是一个字符串，表示在 `file` 类型的` <input> `元素中用户可以选择的文件类型。每个唯一文件类型说明符可以采用下列形式之一：

-   一个以英文句号`.`开头的合法的不区分大小写的文件名扩展名。例如：`.jpg`、`.pdf` 或 `.doc`。
-   一个不带扩展名的 MIME 类型字符串。
    -   字符串 `audio/*`，表示“任何音频文件”。
    -   字符串 `video/*`，表示“任何视频文件”。
    -   字符串 `image/*`，表示“任何图片文件”。


`HTMLInputElement.files`属性

-   `name`：文件名
-   `lastModified`：文件最后一次修改时间
-   `size`：文件大小，单位为字节
-   `type`：文件的MIME类型










