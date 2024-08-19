---
title: JavaScript方法-实现Vue中nextTick方法
author: 耶温
createTime: 2024/08/19 16:16:41
permalink: /article/x23qjoiw/
tags:
  - JavaScript
---

在 Vue.js 中，nextTick 函数用于在下次 DOM 更新循环结束之后执行延迟回调。我们可以封装一个简单的 JavaScript 插件来实现类似的功能，用在其他非Vue的页面中。

## MutationObserver

MutationObserver 是一个内置的 JavaScript API，用于观察 DOM 树的变化。它可以监测以下几种类型的变化：

-   子节点的添加或删除。
-   属性的变化。
-   文本内容的变化。

1. 创建一个`MutationObserver` 实例，并传入一个回调函数，该函数将在观察到变化时被调用。

-   `mutationsList`是一个数组，包含了所有的变化。
-   `observer` 参数是一个`MutationObserver` 实例，用于在观察到变化时进行其他操作。

```javascript
const observer = new MutationObserver((mutationsList, observer) => {
    console.log(mutationsList, observer)
});
```
2. 指定要观察的 DOM 元素和观察的选项。
-   `childList`: 观察子节点的添加和删除。
-   `attributes`: 观察属性的变化。
-   `characterData`: 观察文本内容的变化。
```javascript
const targetNode = document.getElementById('target');
const config = { childList: true, attributes: true, characterData: true };

```
3. 开始观察。
```javascript
observer.observe(targetNode, config);
```
4. 停止观察
```javascript
observer.disconnect();
```


## 方法实现

```javascript
(function (global) {
    let callbacks = [];
    let observer;
    let element;

    // 自动获取一个现有的 DOM 元素
    function getElement() {
        // 这里可以根据需要选择一个合适的元素
        return document.body; // 例如，使用 body 元素
    }

    function nextTick(callback) {
        if (typeof callback !== 'function') {
            throw new TypeError('callback must be a function');
        }

        callbacks.push(callback);

        // 如果 observer 尚未初始化，则进行初始化
        if (!observer) {
            element = getElement(); // 获取现有的 DOM 元素
             // 检查 element 是否有效
            if (!(element instanceof Node)) {
                throw new Error('The target element is not a valid DOM node.');
            }
            observer = new MutationObserver(() => {
                // 执行所有回调
                const currentCallbacks = callbacks.slice();
                callbacks = [];
                currentCallbacks.forEach(cb => cb());
                // 在执行完所有回调后，销毁 observer
                disconnectObserver();
            });

            observer.observe(element, { attributes: true });
        }
    }

    function disconnectObserver() {
        if (observer) {
            observer.disconnect();
            observer = null; // 清空 observer 引用
            element = null; // 清空元素引用
        }
    }

    // 将 nextTick 函数暴露到全局
    global.nextTick = nextTick;
})(this);

// 使用示例
nextTick(() => {
    console.log('This will be executed in the next tick');
});

```

介绍：

-   获取现有元素：在 `getElement` 函数中，我们选择了 `document.body` 作为观察的目标元素。可以根据需要选择其他元素，例如某个特定的容器。


