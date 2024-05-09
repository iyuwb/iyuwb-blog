---
title: CSS3新增内容
author: 耶温
createTime: 2024/05/09 17:22:41
permalink: /CSS/ngcja8zf/
---
# CSS3

## CSS3 新增内容

### 颜色：RGBA，HSLA 模式

- RGBA：`background-color: rgba(179, 133, 133, 0.5);`
- HSLA：`background-color: hsla(120, 60%, 70%, 0.3)`
  - `hsla(hue, saturation, lightness, alpha)`：
  - `hue`：色相，色彩的基本属性，平常所说的颜色。
  - `saturation`：饱和度，色彩的纯度，越高色彩越纯，低则逐渐变灰，取值 0-100%
  - `lightness`：亮度，增加亮度，颜色会向白色变化，减少会向黑色变化。取值 0-100%，
  - `alpha`：透明度，取值 0-1 之间，代表透明度。

### 文字阴影 text-shadow

- `text-shadow: h-shadow v-shadow blur color;`
  - `h-shadow`：必需。水平阴影的位置，允许负值
  - `v-shadow`：必需。垂直阴影的位置，允许负值
  - `blur`：可选，模糊的距离
  - `color`：可选，阴影的颜色

### 边框阴影 box-shadow

`box-shadow: h-shadow v-shadow blur color;`

### 圆角 border-radius

`border-radius:左上 右上 右下 左下;`

### 盒子模型 Box

盒子模型包括：外边框 margin，边框 border，内边框 padding，和内容 content

### 背景相关

- `background-size`：指定背景图片的大小
- 语法：`background-size: length|percentage|cover|contain;`
  - `length`：设置图片宽高，第一个值宽度第一个值高度。如只有一个值，第二个值设置为 auto
  - `percentage`：百分比设置宽高。
  - `cover`：保持图像纵横比将图像缩放成完全覆盖背景定位区域的最小大小
  - `contain`：保持图像纵横比将图像缩放成完全覆盖背景定位区域的最大大小
- `background-origin`：规定图片相对于什么位置来定位
- 语法：`background-origin: padding-box|border-box|content-box;`
  - `padding-box`：背景相对于内边框来定位（默认）
  - `boder-box`：背景相对于边框盒来定位
  - `content-box`：背景相对于内容框来定位
- `background-clip`：规定背景的绘制区域
- 语法：`background-clip: border-box|padding-box|content-box;`
  - `padding-box`：背景被剪切到边框盒
  - `boder-box`：背景被剪切到内边框盒
  - `content-box`：背景被剪切到内容框

### 渐变 linear-gradient

线性渐变

- 语法：`background-image: linear-gradient(direction, color-stop1, color-stop2, ...);`
  - `direction`：方向角度 单位 deg
  - `color-stop1,color-stop2,...`：渐变颜色，可以有多个颜色节点

重复线性渐变：

```css
background-image: repeating-linear-gradient(red, yellow 10%, green 20%);
```

径向渐变

- 语法：`background-image: radial-gradient(shape size at position, start-color, ..., last-color);`
  - `shape`：形状，可以是`circle`或 `ellipse`
  - `size`：渐变大小：参数有`closest-side`，`farthest-side`，`closest-corner`，`farthset-corner`

例如：

```css
background-image: radial-gradient(circle, red, yellow, green);
background-image: radial-gradient(circle at 100% 100%, red, yellow, green);
background-image: radial-gradient(closest-side at 60% 55%, red, yellow, black);
```

重复径向渐变

```css
background-image: repeating-radial-gradient(red, yellow 10%, green 15%);
```

### 过度 Transition

- `transition`：过渡允许在规定时间内平滑的改变属性值
  - 过渡可以连写，一个`transition`写多个过渡。
  - `transition`：过渡简写，一个属性中设置四个过渡属性
  - `transition-property`：规定应用过渡的的 CSS 属性名称
  - `transition-duration`：定义过渡效果花费的时间、
  - [`transition-timing-function`](https://www.runoob.com/cssref/css3-pr-transition-timing-function.html)：规定过渡效果的时间曲线。
    - `linear` ，`ease`，`ease-in`，`ease-out`，`ease-in-out` ，`cubic-bezoer(n,n,n,n)`
  - `transition-delay`：规定过渡效果何时开始，以秒或者毫秒计

### 自定义动画 Animation

- `animation`：
- 语法：`animation: name duration timing-function delay iteration-count direction fill-mode play-state;`
  - `animation-name`：指定要绑定到选择器的关键帧的名字
  - `animation-duration`：动画指定需要多少秒或多少毫秒完成
  - `animation-timing-function`：设置动画如何完成一个周期
  - `animation-delay`：设置动画在启动前的延迟间隔
  - `animation-iteration-count`：定义动画播放的词素
  - `animation-direction`：是否应该轮流反向播放动画
  - `animation-fill-mode`：当动画不播放时，要应用到元素的样式
  - `animation-play-state`：指定动画是否再整运行或已暂停
  - `@keyframes`：创建动画，指定一个 CSS 样式和动画将逐步从目前的样式更改为新的样式

```css
@keyframes myfirst {
  from {
    background: red;
  }
  to {
    background: yellow;
  }
}
@-webkit-keyframes myfirst /* Safari 与 Chrome */ {
  from {
    background: red;
  }
  to {
    background: yellow;
  }
}
```

使用：

```css
animation: myfirst 5s;
-webkit-animation: myfirst 5s; /* Safari 与 Chrome */
```

### 媒体查询 Media

- 针对不同的媒体类型(根据屏幕大小)定义不同的样式。
- 语法：
- `@media mediatype and|not|only (media feature) {`
- `CSS-Code;`
- `}`
- `mediatype`：媒体类型
  - `print`：打印机和打印预览
  - `screen`：用于电脑屏幕，平板电脑，智能手机
  - `speech`：应用于屏幕阅读器等发声设备

```css
//如果文档宽度小于 300 像素则修改背景颜色(background-color):
@media screen and (max-width: 300px) {
  body {
    background-color: lightblue;
  }
}
```

### 边框图片 border-image

语法：`border-image: source slice width outset repeat|initial|inherit;`

### 转换 transform

`transform`：
**2D 转换：**

- `translate(X,Y)`：从当前位置移动元素到指定位置
- `rotate(deg)`：根据给定角度旋转元素
- `scale(X,Y)`：增加或减少元素默认值 1
- `scaleX(X)`：增加或减少元素宽度
- `scaleY(Y)`：增加或减少元素高度
- `skewX(X)`：使元素沿 X 轴倾斜给定角度
- `skewY(Y)`：使元素沿 Y 轴倾斜给定角度
- `skew(X,Y)`：使元素沿 X,Y 轴倾斜给定角度
- `matrix()`：把所有 2D 变换合成为一个
  - `matrix(scaleX(),skewY(),skewX(),scaleY(),translateX(),translateY())`

**3D 转换：**

- `rotate3d(x,y,z,angle)`
- `rotateX(deg)`：使元素绕其 X 轴旋转
- `rotateY(deg)`：使元素绕其 Y 轴旋转
- `rotateZ(deg)`：使元素绕其 Z 轴旋转
- `translate3d(x,y,z)`
- `translateX(x)`：移动用于 X 轴
- `translateY(y)`：移动用于 Y 轴
- `translateZ(z)`：移动用于 Z 轴
- `scale3d(x,y,z)`：3D 缩放
- `scaleX(x)`
- `scaleY(y)`
- `scaleZ(z)`

transform 其他相关样式

- `transform-style`：指定嵌套元素是怎样在三维空间中呈现。
  - flat：所有子元素再 2D 平面呈现
  - preserve-3d：表示所有子元素再 3D 空间中呈现
- `transform-origin`：设置元素转换中心点
  - X 轴
  - Y 轴
  - Z 轴

### 字体图标 iconfont

特殊的一种字体，通过这种字体显示给用户的就像一个个图片一样
优点：不会变形，加载速度快。可以使用 CSS 来控制它的大小和颜色。
**以 iconfont 为例：**

#### unicode 引用

unicode 是字体再网页端最原始的应用方式

- 优点：
  - 兼容行最好，支持 ie6+，及所有现代浏览器
  - 支持按字体的方式去动态调整图表达大小颜色
- 缺点：
  - 不支持多色，多色图标会自动取色
- 使用步骤：
  - 第一步：拷贝项目下面生成的`font-face`

```css
@font-face {
  font-family: "iconfont";
  src: url("iconfont.eot");
  src: url("iconfont.eot?#iefix") format("embedded-opentype"), url("iconfont.woff")
      format("woff"), url("iconfont.ttf") format("truetype"), url("iconfont.svg#iconfont")
      format("svg");
}
//支持网络地址
@font-face {
  font-family: "iconfont";
  src: url("//at.alicdn.com/t/font.eot");
  src: url("//at.alicdn.com/t/font.eot?#iefix") format("embedded-opentype"), url("//at.alicdn.com/t/font.woff2")
      format("woff2"), url("//at.alicdn.com/t/font.woff") format("woff"), url("//at.alicdn.com/t/font.ttf")
      format("truetype"),
    url("//at.alicdn.com/t/font.svg#iconfont") format("svg");
}
```

- 第二步：定义使用 iconfont 的样式

```css
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
```

- 第三步：挑选相应图标并获取字体编码，应用于页面

```css
<i class="iconfont">&#x33;</i>
```

#### font-class 引用

font-class 是 unicode 使用方式的一种变种，主要是解决 unicode 书写不直观，语意不明确的问题。

- 与 unicode 相比，优点：
  - 兼容性良好，支持 ie8+，及所有现代浏览器。
  - 相比于 unicode 语意明确，书写更直观。可以很容易分辨这个 icon 是什么。
  - 因为使用 class 来定义图标，所以当要替换图标时，只需要修改 class 里面的 unicode 引用。
- 缺点：
  - 本质上还是使用的字体，所以多色图标还是不支持的。
- 使用步骤：
  - 第一步：拷贝项目下面生成的 fontclass 代码

```html
//at.alicdn.com/t/font_8d5l8fzk5b87iudi.css
```

- 第二步：挑选相应图标并获取类名，应用于页面

```html
<i class="iconfont icon-xxx"></i>
```

#### symbol 引用

全新的使用方式，应该说这才是未来的主流，也是平台目前推荐的用法。

- 这种用法其实是做了一个 svg 的集合，与上面两种相比具有如下特点：
  - 支持多色图标了，不再受单色限制。
  - 通过一些技巧，支持像字体那样，通过 font-size,color 来调整样式。
- 缺点：
  - 兼容性较差，支持 ie9+,及现代浏览器。
  - 浏览器渲染 svg 的性能一般，还不如 png。
- 使用步骤：
  - 第一步：拷贝项目下面生成的 symbol 代码：

```html
//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js
```

- 第二步：加入通用 css 代码（引入一次就行）：

```html
<style type="text/css">
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
```

- 第三步：挑选相应图标并获取类名，应用于页面：

```html
<svg class="icon" aria-hidden="true">
  <use xlink:href="#icon-xxx"></use>
</svg>
```

### 弹性布局 Flex

`flex`：CSS3 的一种全新布局

> 提供一种更有效的方式来对一个容器中的子元素进行排列，对其和分配空白空间

- `flex-direction`：指定子元素在父容器中的位置（用来调整主轴的方向）
  - `row`：横向从左到右排列（默认）
  - `row-reverse`：翻转横向排列，从后往前排
  - `column`：纵向排列
  - `column-reverse`：反转纵向排列，从后往前排
- `justif-content`：内容对其，元素在弹性容器上的对其方式（主轴）
  - `flex-start`：默认值，所有元素在开始位置紧挨着填充
  - `flex-end`：所有元素在尾部紧挨着填充
  - `center`：容器内元素居中紧挨着布局
  - `space-between`：平均分布在改行上，两边紧挨着容器
  - `space-around`：平均分布在改行上，两边留有一半的间隔空间
- `align-items`：设置元素在侧轴方向的对其方式
  - `flex-start`：默认值，侧轴的开始位置对其
  - `flex-end`：侧轴的结束位置对其
  - `center`：中间位置对其
  - `baseline`：基线对其，不会拉伸高度
  - `stretch`：拉伸对其，子元素不用设置高度
- `flex-wrap`：指定弹性盒子的子元素换行方式
  - `nowrap`：默认，不换行。会溢出容器
  - `wrap`：换行
  - `wrap-reverse`：反转 wrap 排列
- `align-content`：子元素在侧轴的对其方式（多行模式）
  - `stretch` - 默认。各行将会伸展以占用剩余的空间。
  - `flex-start` - 各行向弹性盒容器的起始位置堆叠。
  - `flex-end` - 各行向弹性盒容器的结束位置堆叠。
  - `center` -各行向弹性盒容器的中间位置堆叠。
  - `space-between` -各行在弹性盒容器中平均分布。
  - `space-around` - 各行在弹性盒容器中平均分布，两端保留子元素与子元素之间间距大小的一半。
- `align-self`：自身在侧轴方向的对齐方式
  - `auto`：如果'align-self'的值为'auto'，则其计算值为元素的父元素的'align-items'值，如果其没有父元素，则计算值为'stretch'。
  - `flex-start`：弹性盒子元素的侧轴（纵轴）起始位置的边界紧靠住该行的侧轴起始边界。
  - `flex-end`：弹性盒子元素的侧轴（纵轴）起始位置的边界紧靠住该行的侧轴结束边界。
  - `center`：弹性盒子元素在该行的侧轴（纵轴）上居中放置。（如果该行的尺寸小于弹性盒子元素的尺寸，则会向两个方向溢出相同的长度）。
  - `baseline`：如弹性盒子元素的行内轴与侧轴为同一条，则该值与`flex-start`等效。其它情况下，该值将参与基线对齐。
  - `stretch`：如果指定侧轴大小的属性值为`auto`，则其值会使项目的边距盒的尺寸尽可能接近所在行的尺寸，但同时会遵照`min/max-width/height`属性的限制。
- 弹性布局子元素属性：
  - `order`：用整数来定义排列书序，数值小的排在前面
  - `margin`：设置为`auto`时可以在两轴上水平居中
  - `flex`：指定弹性子元素如何分配空间
