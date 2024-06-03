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
document.addEventListener("DOMContentLoaded", (event) => {
    console.log(event)
});
//2.事件处理器属性
document.onDOMContentLoaded = (event) => {
    console.log(event)
};
```

###  readystatechange

Document.readyState 属性发生改变时，会触发 readystatechange 事件。

> Document.readyState 属性描述了document 的加载状态。


## Element


### onauxclick

鼠标左键外的任何按钮点击时，触发事件（火狐和safari不支持）


### blur

元素失去焦点时，触发事件

### click

元素点击事件

### contextmenu

鼠标右击或者菜单事件

### focus

元素获得焦点时，触发事件


### select

选择文本时，触发事件

:::tip
`select`事件只能在`<input>`和`<textarea>`元素上触发
:::


### show

未知

## HTMLDetailsElement

### toggle

当`<details>`元素打开/关闭状态被切换时，切换事件会触发。

## HTMLDialogElement

### cancel
当使用`esc`关闭时，触发事件
### close

对话框被关闭时，触发事件

## HTMLElement

### input

当一个 `<input>`、`<select>` 或 `<textarea>` 元素的 value 被修改时，会触发 `input` 事件。

## HTMLFormElement

### reset

### submit

### change

### invalid

### abort

### canplay


## HTMLMediaElement

### abort

### canplay

### canplaythrough

### durationchange

### emptied

### error

### loadeddata

### loadeddata-data

### loadstart

### play

### playing

### progress

### seeked

### seeking

### stalled

### suspend

### timeupdate

### volumechange

### waiting

## Window

### afterprint

### beforeprint

### hashchange

### languagechange

### load

### message

### offline

### online

### pagehide

### pageshow

### rejectionhandled

### storage

### unhandledrejection

### unload