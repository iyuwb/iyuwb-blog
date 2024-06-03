---
title: Canvas-图片合成
author: 耶温
createTime: 2024/05/09 15:36:51
permalink: /HTML/bp8vo0oa/
---


# Canvas 实现两张图片合成

需求：在项目中遇到将一张固定图片和一张二维码图片合成一张新图片，并且用户能够将图片保存下载到本地。

思路：使用 CSS3 中的 Canvas 将两张图片绘制。

## HTML 部分

```html
<div>
  <img id="img1" src="wenbo.jpg" alt="" />
  <img id="img2" src="demo.png" alt="" />
</div>
<br />
<div>
  <canvas width="300" height="300" id="myCanvas"></canvas>
</div>
```

## JavaScript 部分

```js
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
//获取元素
var img1 = document.getElementById("img1");
var img2 = document.getElementById("img2");
// 等待图片加载完毕
img1.onload = function() {
  ctx.drawImage(img1, 0, 0, 300, 300);
};
img2.onload = function() {
  ctx.drawImage(img2, 75, 75, 150, 150);
};
```

## html2canvans

> html2canvans 插件也可以实现相关功能
