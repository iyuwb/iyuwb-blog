---
title: CSS滚动条-Scrollbar
author: 耶温
createTime: 2024/05/22 19:53:24
permalink: /CSS/b3trdf6x/
---
# CSS滚动条-Scrollbar


## 标准方法



### `scrollbar-color`

设置滚动条轨道（track）和滑块（thumb）的颜色。

-   轨道是指滚动条的背景，其一般是固定且与滚动位置无关的。

-   滑块是指滚动条的滑动部分，其通常浮动于轨道的顶部。

::: tip
实测发现：在Google，Edge和Fire Fox中支持该属性，Safar不支持
:::

```css
.main{
    /* 第一个颜色值为滑块 第二个颜色值为轨道  */
    scrollbar-color: pink #333;
}
```
当只设置一个颜色时，无效。

关键字：`auto`

全局值：`inherit`、`initial`、`revert`、`revert-layer`、`unset`

### `scrollbar-width`

::: tip
在Google，Edge和Fire Fox实测发现：`scrollbar-width`只支持关键字，不支持具体值类似于`10px`,

Safar不支持该属性
:::

关键字：`auto`、`none`、 `thin`

全局值：`inherit`、`initial`、`revert`、`revert-layer`、`unset`

### `scrollbar-gutter`

该CSS属性为滚动条保留空间，防止随着内容的增长而发生不必要的布局更改，同时还避免在不需要滚动时出现不必要的视觉效果。
::: tip
Safar不支持该属性
:::

-   `stable`
-   `stable both-edges`：为滚动条保留空间，防止随着内容的增长而发生不必要的布局更改，同时还避免在不需要滚动时出现不必要的视觉效果，让内容居中展示。

关键字：`auto`、`stable`、 `stable both-edges`

全局值：`inherit`、`initial`、`revert`、`revert-layer`、`unset`

整体代码演示：

::: normal-demo button 代码演示 

```html

    <div class="app">
        <div class="main">
            先帝创业未半而中道崩殂，今天下三分，益州疲弊，此诚危急存亡之秋也。然侍卫之臣不懈于内，忠志之士忘身于外者，盖追先帝之殊遇，欲报之于陛下也。诚宜开张圣听，以光先帝遗德，恢弘志士之气，不宜妄自菲薄，引喻失义，以塞忠谏之路也。

            宫中府中，俱为一体；陟罚臧否，不宜异同。若有作奸犯科及为忠善者，宜付有司论其刑赏，以昭陛下平明之理，不宜偏私，使内外异法也。

            侍中、侍郎郭攸之、费祎、董允等，此皆良实，志虑忠纯，是以先帝简拔以遗陛下。愚以为宫中之事，事无大小，悉以咨之，然后施行，必能裨补阙漏，有所广益。

            将军向宠，性行淑均，晓畅军事，试用于昔日，先帝称之曰能，是以众议举宠为督。愚以为营中之事，悉以咨之，必能使行阵和睦，优劣得所。

            亲贤臣，远小人，此先汉所以兴隆也；亲小人，远贤臣，此后汉所以倾颓也。先帝在时，每与臣论此事，未尝不叹息痛恨于桓、灵也。侍中、尚书、长史、参军，此悉贞良死节之臣，愿陛下亲之信之，则汉室之隆，可计日而待也。

            臣本布衣，躬耕于南阳，苟全性命于乱世，不求闻达于诸侯。先帝不以臣卑鄙，猥自枉屈，三顾臣于草庐之中，咨臣以当世之事，由是感激，遂许先帝以驱驰。后值倾覆，受任于败军之际，奉命于危难之间，尔来二十有一年矣。

            先帝知臣谨慎，故临崩寄臣以大事也。受命以来，夙夜忧叹，恐托付不效，以伤先帝之明；故五月渡泸，深入不毛。今南方已定，兵甲已足，当奖率三军，北定中原，庶竭驽钝，攘除奸凶，兴复汉室，还于旧都。此臣所以报先帝而忠陛下之职分也。至于斟酌损益，进尽忠言，则攸之、祎、允之任也。

            愿陛下托臣以讨贼兴复之效，不效，则治臣之罪，以告先帝之灵。若无兴德之言，则责攸之、祎、允等之慢，以彰其咎；陛下亦宜自谋，以咨诹善道，察纳雅言，深追先帝遗诏。臣不胜受恩感激。今当远离，临表涕零，不知所言。
        </div>
    </div>
```

```css

   .app {
        margin: 50px auto;
        width: 500px;
        height: 200px;
        background-color: #aaa;
        overflow: auto;
        scrollbar-color:pink #333;
        scrollbar-width:thin;
        scrollbar-gutter: stable both-edges;
    }

    .main {
        padding: 16px;
        background-color: #ccc;
    }

```

:::


## 非标准方法

::: tip 

> 以下所有的基于`-webkit-scrollbar`的选择器，仅在基于`Blink`和`webkit`的浏览器上可用。（例如，Chrome、Edge、Opera、Safari、iOS 上所有的浏览器）

> 不支持火狐
:::

### `-webkit-scrollbar`
选择器

- `::-webkit-scrollbar`：整个滚动条。
- `::-webkit-scrollbar-button`：滚动条上的按钮（上下箭头）。
- `::-webkit-scrollbar-thumb`：滚动条上的滚动滑块。
- `::-webkit-scrollbar-track`：滚动条轨道。
- `:-webkit-scrollbar-track-piece`：滚动条没有滑块的轨道部分。
- `::-webkit-scrollbar-corner`：当同时有垂直滚动条和水平滚动条时交汇的部分。通常是浏览器窗口的右下角。
- `::-webkit-resizer`：出现在某些元素底角的可拖动调整大小的滑块。

::: normal-demo button 代码演示 

```html

    <div class="app">
        <div class="main">
            先帝创业未半而中道崩殂，今天下三分，益州疲弊，此诚危急存亡之秋也。然侍卫之臣不懈于内，忠志之士忘身于外者，盖追先帝之殊遇，欲报之于陛下也。诚宜开张圣听，以光先帝遗德，恢弘志士之气，不宜妄自菲薄，引喻失义，以塞忠谏之路也。

            宫中府中，俱为一体；陟罚臧否，不宜异同。若有作奸犯科及为忠善者，宜付有司论其刑赏，以昭陛下平明之理，不宜偏私，使内外异法也。

            侍中、侍郎郭攸之、费祎、董允等，此皆良实，志虑忠纯，是以先帝简拔以遗陛下。愚以为宫中之事，事无大小，悉以咨之，然后施行，必能裨补阙漏，有所广益。

            将军向宠，性行淑均，晓畅军事，试用于昔日，先帝称之曰能，是以众议举宠为督。愚以为营中之事，悉以咨之，必能使行阵和睦，优劣得所。

            亲贤臣，远小人，此先汉所以兴隆也；亲小人，远贤臣，此后汉所以倾颓也。先帝在时，每与臣论此事，未尝不叹息痛恨于桓、灵也。侍中、尚书、长史、参军，此悉贞良死节之臣，愿陛下亲之信之，则汉室之隆，可计日而待也。

            臣本布衣，躬耕于南阳，苟全性命于乱世，不求闻达于诸侯。先帝不以臣卑鄙，猥自枉屈，三顾臣于草庐之中，咨臣以当世之事，由是感激，遂许先帝以驱驰。后值倾覆，受任于败军之际，奉命于危难之间，尔来二十有一年矣。

            先帝知臣谨慎，故临崩寄臣以大事也。受命以来，夙夜忧叹，恐托付不效，以伤先帝之明；故五月渡泸，深入不毛。今南方已定，兵甲已足，当奖率三军，北定中原，庶竭驽钝，攘除奸凶，兴复汉室，还于旧都。此臣所以报先帝而忠陛下之职分也。至于斟酌损益，进尽忠言，则攸之、祎、允之任也。

            愿陛下托臣以讨贼兴复之效，不效，则治臣之罪，以告先帝之灵。若无兴德之言，则责攸之、祎、允等之慢，以彰其咎；陛下亦宜自谋，以咨诹善道，察纳雅言，深追先帝遗诏。臣不胜受恩感激。今当远离，临表涕零，不知所言。
        </div>
    </div>
```

```css

   .app {
        margin: 50px auto;
        width: 500px;
        height: 200px;
        background-color: #aaa;
        overflow: auto;
    }
    .app::-webkit-scrollbar{
        width: 20px;
        height: 20px;
        background-color: pink;
        border-radius:10px;
        border:2px solid #000;
    }
    .app::-webkit-scrollbar-thumb{
        background-color: green;
        border-radius:10px;
        border:2px solid #ccc;
    }
    .app::-webkit-scrollbar-corner{
        border:2px solid #000;
        background-color: blue;
    }
    .main {
        width:800px;
        padding: 16px;
        background-color: #ccc;
    }

```

:::
