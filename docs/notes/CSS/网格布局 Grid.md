---
title: 网格布局 Grid
author: 耶温
createTime: 2024/05/09 17:21:40
permalink: /CSS/vtf0fbww/
---
# Grid 网格布局
> `display:grid;`  开启Gird布局（现在浏览器内置grid布局，但是存在兼容性问题）
-   采用 `grid` 布局的区域，称为容器，内部的子元素，称为项目。
-   比如下面例子中 `div.grid` 为容器，里面的 `div.demo` 为项目
## 容器属性

### 1. `display`

`display:grid`或者`display:inline-gird`表示块级或者行内元素。


css代码：
```css
.grid {
    display: grid; 
    /* or display:inlie-gird; */
    grid-template-rows: 100px 100px 100px ;
    grid-template-columns: 100px 100px 100px ;
}

.demo {
    background-color: #eee;
}
```
html代码：
```html
<body>
    <span class="left">left</span>
    <div class="grid">
        <div class="demo">1</div>
        <div class="demo">2</div>
        <div class="demo">3</div>
        <div class="demo">4</div>
        <div class="demo">5</div>
        <div class="demo">6</div>
        <div class="demo">7</div>
        <div class="demo">8</div>
        <div class="demo">9</div>
    </div>
    <span class="right">right</span>
</body>
```


块级元素：

![块级元素](https://iyuwb.gitee.io/notes/images/grid-01.png)

行内块元素：

![行内级元素](https://iyuwb.gitee.io/notes/images/grid-02.png)



### 2. `grid-template-rows`和`grid-template-columns`和`grid-template`

-   `grid-template-columns`：定义每一列的列宽(可以使用绝对单位，也可以使用百分比)

-   `grid-template-rows`：定义每一行的行高

-   `grid-template`：定义行列，组合

```css
//定义三行三列宽高一百的盒子
.grid {
    display: grid;
    grid-template-rows: 100px 100px 100px;
    grid-template-columns: 100px 100px 100px;
    /* or  grid-template:100px 100px 100px / 100px 100px 100px */
}
```
-   `repeat()`：重复值，可以使用语法repeat(重复次数，重复的值)
    -    在`repeat`中可以使用`auto-fill`,根据容器大小，自动填充满单元格
```css
.grid {
    display: grid;
    grid-template-rows: repeat(3,100px);
    grid-template-columns: repeat(3,100px)
}
```
以上两种方式，可以创建一个3*3的宽高100的盒子

![grid盒子项目](https://iyuwb.gitee.io/notes/images/grid-01.png)
```css
.grid {
        display: grid;
        grid-template-rows: repeat(4, 100px);
        /* 自适应 充满行或者列 */
        grid-template-columns: repeat(auto-fill, 200px) 
}
```
使用`auto-fill`，创建，会根据屏幕尺寸，自适应列的数目：

![auto-fill](https://iyuwb.gitee.io/notes/images/grid-03.png)


![auto-fill](https://iyuwb.gitee.io/notes/images/grid-04.png)


-   `fr`关键字：表示倍数关系
```css
.grid {
    display: grid;
    grid-template-rows: 100px 100px 100px;
    grid-template-columns: 100px 1fr 2fr;
}
```

如下图，第三列的宽度是第二列的二倍，并且，第二列第三列的宽度会根据屏幕尺寸变化。

![fr](https://iyuwb.gitee.io/notes/images/grid-05.png)

-   `minmax()`：表示长度范围，接受两个参数，最大值和最小值
    -   比如：` grid-template-rows: minmax(100px,1fr)`

-   `auto`：自动平均分配剩余空间，或者占满空间
    -   比如：`grid-template-columns: 100px auto`;

-   网格线中名称

如下所示 中括号中的 c1-c4 r1-r4 表示三行三列布局中的四条横线 和 四条竖线，即网格线的名称

```css
.grid {
  display: grid;
  grid-template-columns: [c1] 100px [c2] 100px [c3] 100px [c4];
  grid-template-rows: [r1] 100px [r2] 100px [r3] 100px [r4];
}
```

### 3. `gird-row-gap`,`gird-column-gap`,`gird-gap`
> 设置行列之间的间距 `gird-gap`为以上两个属性的缩写

-   `gird-row-gap`：设置行与行之间的间距，行间距
-   `gird-column-gap`：设置列与列之间的间距，列间距
-   `gird-gap`：合并简写 `gird-gap: <gird-row-gap>  <gird-column-gap>`

::: tip 注意
根据最新标准，以上属性前缀已经删除，现在可以写为： `row-gap`, `column-gap`和 `gap`
:::
```css
.grid {
    display: grid;
    grid-template-rows: 100px 100px 100px;
    grid-template-columns: 100px 100px 100px;
    row-gap: 20px;
    column-gap: 40px;
    /* or gap:20px 40px */  
}
```
上面代码展示效果如下图：

![行列边距](https://iyuwb.gitee.io/notes/images/grid-06.png)

### 4. `gird-template-areas`
> grid-template-areas CSS 属性是网格区域 grid areas 在CSS中的特定命名。即自定义区域

-   `gird-template-areas`：自定义区域
-   不需要的区块可以使用 `.` 省略，例如下面代码
```css
.grid {
    display: grid;
    grid-template-rows: 100px 100px 100px;
    grid-template-columns: 100px 100px 100px;
    gap: 20px 40px;
    grid-template-areas: "header header header"
        "main main sidebar"
        "footer main sidebar";
     /* grid-template-areas: "header header header"
        "main . sidebar"
        "footer . sidebar"; */
}
```
::: tip 注意
注意，区域的命名会影响到网格线。每个区域的起始网格线，会自动命名为区域名-start，终止网格线自动命名为区域名-end。
:::


### 5. `gird-auto-flow`
> 设置布局中的项目，是先行排列还是先列排列
取值：
-   `row`：逐行填充，默认值
-   `column`：逐列排列项目
-   `row dense`和`column dense`：堆积算法，会填充网格中的空白。

::: tip 注意
`dense`：
该关键字指定自动布局算法使用一种“稠密”堆积算法，如果后面出现了稍小的元素，则会试图去填充网格中前面留下的空白。这样做会填上稍大元素留下的空白，但同时也可能导致原来出现的次序被打乱。

:::
示例代码：

::: details 点击显示代码
html
```html
   <div class="grid">
        <div class="demo">1</div>
        <div class="demo">2</div>
        <div class="demo1">3</div>
        <div class="demo1">4</div>
        <div class="demo1">5</div>
        <div class="demo1">6</div>
        <div class="demo1">7</div>
        <div class="demo1">8</div>
        <div class="demo1">9</div>
    </div>
```
css
```css

.grid {
    display: grid;
    gap: 20px;
    grid-template: repeat(4, 100px) / repeat(3, 100px);
    grid-auto-flow: row ;
    /* column  or  row dense  or column dense */
}

.demo {
    background-color: #ddd;
    grid-column-start: 1;
    grid-column-end: 3;
}

.demo1 {
    background-color: pink;
}

```
:::

当`grid-auto-flow`设置为`row`时：

![grid-auto-flow](https://iyuwb.gitee.io/notes/images/grid-07.png)

当`grid-auto-flow`设置为`column`时：

![grid-auto-flow](https://iyuwb.gitee.io/notes/images/grid-08.png)

当`grid-auto-flow`设置为`row dense`时：

![grid-auto-flow](https://iyuwb.gitee.io/notes/images/grid-09.png)

### 6. `justify-items`,`align-items`和`place-items`

- `justify-items`：   设置单元格内容的水平位置
- `align-items`：   设置单元格内容的垂直位置
- `place-items`： 水平垂直位置合写,如果忽略第二个值，则默认两个值相等，都为第一个值

属性值：
-   `start`： 对齐容器的起始边框
-   `end`： 对齐容器的结束边框
-   `center`： 对齐容器的起始边框
-   `stretch`： 大小没有指定时，拉伸占据整个网格容器（默认）


### 7. `justify-content`,`align-content`和`place-content`

- `justify-content`：   整个内容区域在容器里面的水平位置
- `align-content`：   整个内容区域在容器里面的垂直位置
- `place-content`： 水平垂直位置合写,如果忽略第二个值，则默认两个值相等，都为第一个值

属性值：
-   `start`： 对齐容器的起始边框
-   `end`： 对齐容器的结束边框
-   `center`： 对齐容器的起始边框
-   `stretch`： 大小没有指定时，拉伸占据整个网格容器
-   `space-around`： 每个项目两侧的间隔相等
-   `space-between`： 项目与项目的间隔相等，项目与容器边框之间没有间隔
-   `space-evenly`： 项目与项目的间隔相等，项目与容器边框之间也是同样长度的间隔 

### 8. `grid-auto-columns`和`grid-auto-rows`

> 用来设置，浏览器自动创建的多余网格的列宽和行高，与`grid-template-rows`和`grid-template-columns`用法一致。

-   `grid-auto-columns`：用来设置，浏览器自动创建的多余网格的列宽
-   `grid-auto-rows`：用来设置，浏览器自动创建的多余网格的行高

如下面代码所示：

```css
.grid {
    display: grid;
    gap: 10%;
    grid-template: repeat(2, 100px) / repeat(2, 45%);
    grid-auto-rows: 50px;
}
```
![grid-auto-rows](https://iyuwb.gitee.io/notes/images/grid-10.png)

### 9. `grid`和`grid-template`

不太建议 合写这么多属性

-   `grid`：`grid-template-rows`、`grid-template-columns`、`grid-template-areas`、 `grid-auto-rows`、`grid-auto-columns`、`grid-auto-flow`合写

-   `grid-template`：`grid-template-columns`、`grid-template-rows`和`grid-template-areas`的合写,中间用斜杠分割


## 项目属性
### 1. `grid-column-start`,`grid-column-end`,`grid-row-start`,`grid-row-end`
>   项目的位置是可以指定的，具体方法就是指定项目的四个边框，分别定位在哪根网格线。

-   `grid-column-start`：左边框所在的垂直网格线(可以使用)
-   `grid-column-end`：右边框所在的垂直网格线
-   `grid-row-start`：上边框所在的水平网格线
-   `grid-row-end`：下边框所在的水平网格线

例如：
```css
.grid {
    display: grid;
    gap: 10%;
    grid-template: repeat(4, 100px) / repeat(3, 100px);
    justify-content: center;
}
.demo {
    background-color: #ddd;
}
.demo1 {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 4;
    background-color: pink;
}
```
![grid项目位置](https://iyuwb.gitee.io/notes/images/grid-11.png)

### 2.`grid-column`和`grid-row`
> `grid-column-start`,`grid-column-end`和`grid-row-start`,`grid-row-end`的简写形式

-    `grid-column: <grid-column-start> / <grid-column-end>;`
-    `grid-row: <grid-row-start> / <grid-row-end>;`

### 3. `grid-area`

>  指定项目放在哪一个区域。



-  `grid-area: <grid-area-name>`

-   `grid-area`属性还可用作`grid-row-start`、`grid-column-start`、`grid-row-end`、`grid-column-end`的合并简写形式，直接指定项目的位置。


例如：
```css
.grid {
    display:  grid;
    gap: 10%;
    grid-template: repeat(3, 100px) / repeat(3, 100px);
    grid-template-areas: "a b c"
                            "d e f"
                            "g h i";
}
.demo {
    background-color: #ddd;
}
.demo1 {
    grid-area: f;
    background-color: pink;
}
```
![grid指定位置](https://iyuwb.gitee.io/notes/images/grid-12.png)


### 4. `justify-self`,`align-self`和`place-self`


-  `justify-self`:  属性设置单元格内容的水平位置（左中右)
-  `align-self`:  属性设置单元格内容的垂直位置（上中下）  
-   取值： `start | end | center | stretch`

#### `place-self`

>    `place-self`属性是`align-self`属性和`justify-self`属性的合并简写形式。

>    ` place-self: <align-self> <justify-self>`

## 案例实现

::: tip 注意
待更新
:::
