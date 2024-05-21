---
title: CSS-文字轮播效果
author: 耶温
createTime: 2024/05/21 15:21:45
permalink: /CSS/7jz9mff7/
---
# CSS-文字轮播效果

使用CSS3，新增动画`animation`,完成文字轮播效果。

## 动画`animation`

语法：`animation: name duration timing-function delay iteration-count direction fill-mode play-state;`

- `animation-name`：指定要绑定到选择器的关键帧的名字
-  `animation-duration`：动画指定需要多少秒或多少毫秒完成
- `animation-timing-function`：设置动画如何完成一个周期
- `animation-delay`：设置动画在启动前的延迟间隔
- `animation-iteration-count`：定义动画播放的词素
- `animation-direction`：是否应该轮流反向播放动画
- `animation-fill-mode`：当动画不播放时，要应用到元素的样式
- `animation-play-state`：指定动画是否再整运行或已暂停

`@keyframes`：创建动画，指定一个 CSS 样式和动画将逐步从目前的样式更改为新的样式



## HTML部分

```html
<div class="top-tips">
    <div>
        先帝创业未半而中道崩殂，今天下三分，益州疲弊，此诚危急存亡之秋也。然侍卫之臣不懈于内，忠志之士忘身于外者，盖追先帝之殊遇，欲报之于陛下也。诚宜开张圣听，以光先帝遗德，恢弘志士之气，不宜妄自菲薄，引喻失义，以塞忠谏之路也。
    </div>
</div>
```


## CSS部分

```css
.top-tips {
    margin:0 auto;
    width:500px;
    display: flex;
    height:100px;
    background:#ccc;
    overflow:hidden;
    div {
        color:red;
        white-space: nowrap;
        animation: marquee 30s linear infinite 3s;
        line-height:100px;
    }
}

@keyframes marquee {
    0% {
    transform: translateX(0);
    }

    100% {
    transform: translateX(-100%);
    }
}

```

## 效果演示


::: normal-demo button 代码演示 
```html
<div class="top-tips">
    <div>
        先帝创业未半而中道崩殂，今天下三分，益州疲弊，此诚危急存亡之秋也。然侍卫之臣不懈于内，忠志之士忘身于外者，盖追先帝之殊遇，欲报之于陛下也。诚宜开张圣听，以光先帝遗德，恢弘志士之气，不宜妄自菲薄，引喻失义，以塞忠谏之路也。
    </div>
</div>
```

```css
.top-tips {
    margin:0 auto;
    width:500px;
    display: flex;
    height:100px;
    background:#ccc;
    overflow:hidden;
    div {
        color:red;
        white-space: nowrap;
        animation: marquee 30s linear infinite  3s;
        line-height:100px;
    }
}

@keyframes marquee {
    0% {
    transform: translateX(0);
    }

    100% {
    transform: translateX(-100%);
    }
}

```
:::