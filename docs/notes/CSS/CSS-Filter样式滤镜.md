---
title: CSS-Filter样式滤镜
author: 耶温
createTime: 2024/05/09 17:22:05
permalink: /CSS/hnhsstkm/
---


CSS滤镜（filter）是一种用于对元素应用视觉效果的样式属性。通过使用滤镜，可以实现模糊、亮度、对比度、灰度等多种效果。滤镜可以应用于图像、文本和其他元素，增强网页的视觉效果。

## 基本语法

```css
  filter: <filter-function> [<filter-function> ...];
```

## 常用滤镜

- `blur`：模糊滤镜，用于模糊图像。
- `brightness`：亮度滤镜，用于调整图像的亮度。
- `contrast`：对比度滤镜，用于调整图像的对比度。
- `drop-shadow`：阴影滤镜，用于为元素添加阴影效果。
- `grayscale`：灰度滤镜，用于将图像转换为灰度。
- `invert`：反色滤镜，用于将图像反转为其相反的颜色。
- `opacity`：透明度滤镜，用于调整图像的透明度。
- `saturate`：饱和度滤镜，用于调整图像的饱和度。
- `sepia`：褐色滤镜，用于将图像转换为褐色。


## 具体滤镜

### `blur()`
- `blur()`：模糊滤镜，用于模糊图像。

```css
filter: blur(5px);
```

::: normal-demo filter 代码演示
```html
 <h1>filter - blur</h1>
    <img class="image" src="https://via.placeholder.com/300" alt="示例图像">
```
```css
*{
  text-align: center;
}
.image {
    width: 300px;
    height: auto;
    transition: filter 0.3s;
}

.image:hover {
    filter: blur(5px)
}
```
:::

### `brightness()`
- `brightness()`： 亮度滤镜，用于调整图像的亮度。

```css
filter: brightness(120%)
```

::: normal-demo filter 代码演示
```html
 <h1>filter - brightness</h1>
 <img class="image" src="https://via.placeholder.com/300" alt="示例图像">
```
```css
*{
  text-align: center;
}
.image {
    width: 300px;
    height: auto;
    transition: filter 0.3s;
}

.image:hover {
    filter: brightness(120%); /* 亮度增加20% */
}
```
:::

### `contrast()`
- `contrast()`：对比度滤镜，用于调整图像的对比度。

```css
filter: contrast(200%); /* 对比度增加100% */
```

::: normal-demo filter 代码演示
```html
 <h1>filter - contrast</h1>
 <img class="image" src="https://via.placeholder.com/300" alt="示例图像">
```
```css
*{
  text-align: center;
}
.image {
    width: 300px;
    height: auto;
    transition: filter 0.3s;
}

.image:hover {
   filter: contrast(200%)
}
```
:::

### `drop-shadow()`
- `drop-shadow()`：阴影滤镜，用于为元素添加阴影效果。

```css
filter: drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.5));
```

::: normal-demo filter 代码演示
```html
 <h1>filter - drop-shadow</h1>
 <img class="image" src="https://via.placeholder.com/300" alt="示例图像">
```
```css
*{
  text-align: center;
}
.image {
    width: 300px;
    height: auto;
    transition: filter 0.3s;
}

.image:hover {
   filter: drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.5));
}
```
:::

### `grayscale()`
- `grayscale()`：灰度滤镜，用于将图像转换为灰度。

```css
filter: grayscale(100%)
```

::: normal-demo filter 代码演示
```html
 <h1>filter - grayscale</h1>
 <img class="image"  alt="示例图像">
```
```css
*{
  text-align: center;
}
.image {
    display: inline-block;
    width: 300px;
    height:300px;
    background: pink;
    transition: filter 0.3s;
}

.image:hover {
   filter: grayscale(100%); /* 完全灰度 */
}
```
:::

### invert()
- `invert()`：反色滤镜，用于将图像反转为相反的颜色。


```css
filter: invert(100%)
```

::: normal-demo filter 代码演示
```html
 <h1>filter - invert</h1>
 <img class="image"  alt="示例图像">
```
```css
*{
  text-align: center;
}
.image {
    display: inline-block;
    width: 300px;
    height:300px;
    background: pink;
    transition: filter 0.3s;
}

.image:hover {
   filter: invert(100%)
}
```
:::
### opacity()
- `opacity()`：透明度滤镜，用于调整图像的透明度。

```css
filter: opacity(50%)
```

::: normal-demo filter 代码演示
```html
 <h1>filter - opacity</h1>
 <img class="image"  alt="示例图像">
```
```css
*{
  text-align: center;
}
.image {
    display: inline-block;
    width: 300px;
    height:300px;
    background: pink;
    transition: filter 0.3s;
}

.image:hover {
  filter: opacity(50%)
}
```
:::
### saturate()
- `saturate()`：饱和度滤镜，用于调整图像的饱和度。

```css
  filter: saturate(200%); /* 饱和度增加100% */
```
::: normal-demo filter 代码演示
```html
 <h1>filter - saturate</h1>
 <img class="image"  alt="示例图像">
```
```css
*{
  text-align: center;
}
.image {
    display: inline-block;
    width: 300px;
    height:300px;
    background: pink;
    transition: filter 0.3s;
}

.image:hover {
  filter: saturate(200%); /* 饱和度增加100% */
}
```
:::
### sepia()

- `sepia()`：深褐色滤镜，用于将图像转换为深褐色。

```css
filter: sepia(100%); /* 完全棕褐色 */

```

::: normal-demo filter 代码演示
```html
 <h1>filter - sepia</h1>
 <img class="image"  alt="示例图像">
```
```css
*{
  text-align: center;
}
.image {
    display: inline-block;
    width: 300px;
    height:300px;
    background: pink;
    transition: filter 0.3s;
}

.image:hover {
 filter: sepia(100%); /* 完全棕褐色 */
}
```
:::
