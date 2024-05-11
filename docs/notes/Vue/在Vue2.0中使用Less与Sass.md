---
title: 在Vue2.0中使用Less与Sass
author: 耶温
createTime: 2024/05/11 16:03:14
permalink: /article/nse4iv0k/
---
# 在 Vue2.0 中使用 Less 与 Sass

## 使用 Less

下载依赖：`npm install less less-loader`
在`mian.js` 中添加:

```javascript
import less from "less";
Vue.use(less);
```

使用：

```vue
<style lang="less"></style>
```

## 使用 Less 时运行报错

- `this.getOptions is not a function`
- 原因：`less-loader`安装的的版本过高
- 解决：重新安装较低版本
  - `npm uninstall less-loader`
  - `npm install less-loader@5.0.0`

## 使用 sass

下载依赖
`npm install node-sass sass-loader style-loader`

使用

```html
<style lang="scss" scoped>

<style>
```

## 使用 sass 时运行报错

报错：`this.getOptions is not a function`

- 原因：`sass-loader`安装的的版本过高
- 解决：重新安装较低版本
  - `npm uninstall sass-loader`
  - `npm install sass-loader@10.1.1`
