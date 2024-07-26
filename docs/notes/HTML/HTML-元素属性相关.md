---
title: HTML-元素属性相关
author: 耶温
createTime: 2024/05/09 15:36:16
permalink: /HTML/bx4noavf/
---


# HTML

## `meta` 头部元数据设置

>  head标签信息 ，可以指定一些信息
>
> 也可以根据需要自定义信息，给指定的网站识别

`<meta>`元素常包含`name`和`content`属性

- keywords  给搜索引擎提供搜索关键词（现在已被忽略）

### 示例

指定字符集

```html
<head>
	<meta charset="utf-8" />
</head>
```

网站作者和简介

```html
<head>
  <meta name="yevin" content="Yevin blogs" />
  <meta name="description" content="Yevin‘s blogs." />
</head>
```

其他类型-向特定网站指定特定信息，如下，当其他网站引入当前网站时，会展示特定的图片，标题，介绍

> [!NOTE]
>
> 具体的网站有专有元数据协议，需要根据具体协议进行设置。

```html
<head>
  <meta property="og:image" content="https://developer.mozilla.org/mdn-social-share.png" />
  <meta property="og:description" content="The Mozilla Developer Network (MDN)" />
  <meta property="og:title" content="Mozilla Developer Network" />
</head>
```

## `script` 引入JavaScript

​	`defer`：解析完HTML之后再加载`script`

```html
<script src="./demo.js" defer></script>
```

## `lang` 语言属性

​	可以根据需要设置语言，可以为整个`html`设置，也可以为单个元素设置。

```html
<html lang="zh-CN"></html>

<div lang="en"> </div>
```

## `a` 超链接标签

​	`download`：设置下载默认文件名

###  `mailto`邮箱URL协议

​	可以在邮箱链接后面拼接，邮件主题、内容、抄送人等等

```html
<a href="mailto:wenbo@gmail.com"></a>
```

## `<blockquote>`块引用 `q`行内引用

​	引入其他地方的东西，需要用其包裹起来，并设置属性`cite`来指向引用的资源，不过不被浏览器支持，需要特殊处理才能展示引用链接。

 ##  `abbr`缩略语

```html
<p>
  我们使用
  <abbr title="超文本标记语言（Hyper text Markup Language）">HTML</abbr>
  来组织网页文档。
</p>
```

## `address`联系方式

## `sub`下标和`sup`上标

```html
<p>
  咖啡因的化学方程式是 C<sub>8</sub>H<sub>10</sub>N<sub>4</sub>O<sub>2</sub>。
</p>
<p>如果 x<sup>2</sup> 的值为 9，那么 x 的值必为 3 或 -3。</p>
```

## `code`、`pre`、`var`、`kbd`、`samp`展示计算机代码

## `time` 标记 时间和日期

## `header`、`nav`、`main`、`aside`、`footer`语义化标签

 	使用语义化标签，更有助于网站的seo

​	`header`： 页眉，顶部，头部

​	`nav`：导航栏

​	`main`：主内容

​		主内容中还可以区分

​		`article`：独立部分，一篇文章，与其他内容无关

​		`section`：独立部分，把页面按功能分块

​	`aside`：侧边栏

​	`footer`：页脚，底部

## `img`

 `img`的`alt`,如果图片只起到装饰作用，可以省略，如果有具体含义，需在`alt`里也表明。

### `srcset` 和 `sizes` 

**`srcset`** 定义了浏览器可选择的图片集合以及每个图片的大小，每张图片信息的设置和前一个用逗号隔开

**`sizes`** 定义了一组媒体条件（例如屏幕宽度）并且指明当某些媒体条件为真时，什么样的图片尺寸是最佳选择

```html
<img
  srcset="elva-fairy-480w.jpg 480w, elva-fairy-800w.jpg 800w"
  sizes="(max-width: 600px) 480px,
         800px"
  src="elva-fairy-800w.jpg"
  alt="Elva dressed as a fairy" />
```

##  `video`、`audio`

 `video `的属性 `poster` 指向封面图

### `tract` 字幕

```html
<video controls>
  <source src="example.mp4" type="video/mp4" />
  <source src="example.webm" type="video/webm" />
  <track kind="subtitles" src="subtitles_es.vtt" srclang="es" label="Spanish" />
</video>
```

字幕格式

```txt
WEBVTT

1
00:00:22.230 --> 00:00:24.606
第一段字幕

2
00:00:30.739 --> 00:00:34.074
第二段
```







