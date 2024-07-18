---
title: Vue2相关问题
author: 耶温
createTime: 2024/07/15 09:59:05
permalink: /Vue/s9eupkio/
---
# Vue2相关问题

## 直接访问打包文件`index.html`

​	配置Vue应用的基础路径：在Vue项目的`vue.config.js`文件中，你可以通过设置`publicPath`选项来指定应用的基础路径。将`publicPath`设置为`'./'`，然后在浏览器中打开`index.html`文件应该可以正常工作。

```js
module.exports = {
  publicPath: './',
}
```

