---
title: HTML事件
author: 耶温
createTime: 2024/05/13 16:07:32
permalink: /HTML/vki4x35o/
---
# HTML事件

## Docment

### DOMContentLoaded

当 HTML 文档完全解析，且所有延迟脚本（`<script defer src="…">` 和 `<script type="module">`）下载和执行完毕后，会触发 DOMContentLoaded 事件。它不会等待图片、子框架和异步脚本等其他内容完成加载。

-   相似事件`load`

```js
//1.绑定事件名称
addEventListener("DOMContentLoaded", (event) => {
    console.log(event)
});
//2.事件处理器属性
onDOMContentLoaded = (event) => {
    console.log(event)
};
```

###  readystatechange

Document.readyState 属性发生改变时，会触发 readystatechange 事件。

> Document.readyState 属性描述了document 的加载状态。