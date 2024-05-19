---
title: HTML-input
author: 耶温
createTime: 2024/05/13 16:08:58
permalink: /HTML/4nvq330q/
---
# HTML-input

## 按钮：`button`

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

## 复选框：`checkbox`
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


## 颜色选择：`color`
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

## 日期选择：`date`
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

## 时间日期选择：`datetime-locel`

> 受到浏览器限制，不建议使用

属性和事件，与上`date`一致

## 邮箱：`email`

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
## 文件选择：`file`

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


## 隐藏元素：`hidden`



## 图形按钮：`image`

## 年月日期：`month`

## 数字：`number`

## 密码：`password`

## 单选：`radio`

## 范围滑块：`range`

## 重置按钮：`reset`

## 搜索：`search`

## 提交按钮：`submit`

## 电话号码：`tel`

## 文本：`text`

## 时间：`time`

## URL：`url`

## 周：`week`