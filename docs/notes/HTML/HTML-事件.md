---
title: HTML-事件
author: 耶温
createTime: 2024/05/13 16:07:32
permalink: /HTML/vki4x35o/
---
<!-- 保链接，已废弃 -->
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

当表单被重置时，触发事件

### submit

当表单被提交时，触发事件


## HTMLInputElement

### change

当控件中元素值改变时，触发事件

### invalid

当控件中值不符合校验时，触发事件


## HTMLMediaElement

### abort

资源没有被完全加载时，触发事件

### canplay

可以播放媒体文件时，触发事件（可能还没有加载足够的数据来播放媒体直到其结束，即后续可能需要停止以进一步缓冲内容）

### canplaythrough

可以播放媒体文件时，触发事件（媒体文件已经全部加载）

### durationchange

`duration`属性更新时，触发事件。

### emptied

当媒体资源为空时，触发事件（断网或者，媒体文件被移除）

### error

错误（如网络连接错误）导致无法加载资源的时，触发事件

### loadeddata

事件在媒体当前播放位置的视频帧（通常是第一帧）加载完成后，触发事件

### loadeddata-data

在元数据（metadata）被加载完成后，触发事件

### loadstart

事件当浏览器开始载入一个资源文件时，触发事件

### play

当 `paused` 属性由 `true` 转换为 fa`lse 时，触发事件

### playing

在播放准备开始时（之前被暂停或者由于数据缺乏被暂缓），触发事件

### progress

进度，加载一个资源的时候周期性触发事件


### ratechange

播放速率发生变化时，触发事件。

### seeked

在用户已移动/跳跃到媒体的新播放位置时，触发事件

### seeking

在用户开始移动/跳跃到媒体的新播放位置时，触发事件

### stalled

获取媒体数据但数据意外未返回时，触发事件

### suspend

当媒体数据加载暂停时，触发事件。

### timeupdate

当currentTime更新时，触发事件。

### volumechange

当音量调整时，触发事件

### waiting

由于暂时缺少数据而停止播放时，触发事件。

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