---
title: Element-Table表头顺序错乱问题
author: 耶温
createTime: 2024/05/16 16:58:07
permalink: /Plugins/248efvlp/
---


# Element-Table表头顺序错乱问题

在之前的博客上有一篇[Vue组件自我调用],在封装`Element`的`Table`组件时，发现`Table`组件的表头乱序问题。

-   后测试发现是在循环嵌套`el-table-column`时，不能添加其他元素比如`div`等等。并且需要在`el-table-column`元素添加`key`值。

## 原代码

`app.vue`

```vue
<template>
  <div id="app">
    <!-- <elementTablePlus :option="option" /> -->
    <el-table
      :header-cell-style="{ background: '#ccc', color: '#333' }"
      :row-style="{ background: '#ccc', color: '#666' }"
      :border="true"
      :data="option.tableData"
      style="width: 100%"
    >
      <elTableColumnPlus :option="option.headerData"></elTableColumnPlus>
    </el-table>
  </div>
</template>

<script>
import elTableColumnPlus from "./elTableColumnPlus.vue";
export default {
  name: "App",
  components: {
    elTableColumnPlus,
  },
  data() {
    return {
      option: {},
    };
  },
  created() {
    this.option = require("./demo.json");
  },
};
</script>
```


`demo.json`
::: details 点击查看 demo.json

```json
{
    "headerData": [
        {
            "label": "日期",
            "prop": "date"
        },
        {
            "label": "名字",
            "prop": "name"
        },
        {
            "label": "成绩",
            "children": [
                {
                    "label": "语文",
                    "prop": "score1"
                },
                {
                    "label": "数学",
                    "prop": "score2"
                },
                {
                    "label": "英语",
                    "prop": "score3"
                },
                {
                    "label": "理综",
                    "children": [
                        {
                            "label": "物理",
                            "prop": "score4"
                        },
                        {
                            "label": "化学",
                            "prop": "score5"
                        },
                        {
                            "label": "生物",
                            "prop": "score6"
                        }
                    ]
                }
            ]
        }
    ],
    "tableData": [
        {
            "date": "2016-05-02",
            "name": "王小虎",
            "score1": 150,
            "score2": 150,
            "score3": 150,
            "score4": 110,
            "score5": 100,
            "score6": 90
        },
        {
            "date": "2016-05-04",
            "name": "王小明",
            "score1": 150,
            "score2": 150,
            "score3": 150,
            "score4": 110,
            "score5": 100,
            "score6": 90
        },
        {
            "date": "2016-05-01",
            "name": "王小丽",
            "score1": 150,
            "score2": 150,
            "score3": 150,
            "score4": 110,
            "score5": 100,
            "score6": 90
        },
        {
            "date": "2016-05-03",
            "name": "王小飞",
            "score1": 150,
            "score2": 150,
            "score3": 150,
            "score4": 110,
            "score5": 100,
            "score6": 90
        }
    ]
}
```

:::
`elTableColumnPlus.vue`

```vue
<template>
  <div>
    <div v-for="item in option" :key="item.value">
      <!-- 多级表头 -->
      <el-table-column
        v-if="!item.children || !item.children.length"
        :prop="item.prop"
        :label="item.label"
      >
      </el-table-column>
      <el-table-column v-else :prop="item.prop" :label="item.label">
        <elTableColumnPlus :option="item.children"> </elTableColumnPlus>
      </el-table-column>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "elTableColumnPlus",
  props: ["option"],
  components: {},
};
</script>
  
  <style>
</style>
```
![alt text](image-2.png)



## 优化后

`app.vue`

```vue
<template>
  <div id="app">
    <el-table
      :header-cell-style="{ background: '#ccc', color: '#333' }"
      :row-style="{ background: '#ccc', color: '#666' }"
      :border="true"
      :data="option.tableData"
      style="width: 100%"
    >
      <elTableColumnPlus v-for="item in option.headerData" :key="item.value" :item="item"></elTableColumnPlus>
    </el-table>
  </div>
</template>

<script>
import elTableColumnPlus from "./elTableColumnPlus.vue";
export default {
  name: "App",
  components: {
    elTableColumnPlus,
  },
  data() {
    return {
      option: {},
    };
  },
  created() {
    this.option = require("./demo.json");
  },
};
</script>
```

`demo.json`
::: details 点击查看 demo.json

```json
{
    "headerData": [
        {
            "label": "日期",
            "prop": "date"
        },
        {
            "label": "名字",
            "prop": "name"
        },
        {
            "label": "成绩",
            "children": [
                {
                    "label": "语文",
                    "prop": "score1"
                },
                {
                    "label": "数学",
                    "prop": "score2"
                },
                {
                    "label": "英语",
                    "prop": "score3"
                },
                {
                    "label": "理综",
                    "children": [
                        {
                            "label": "物理",
                            "prop": "score4"
                        },
                        {
                            "label": "化学",
                            "prop": "score5"
                        },
                        {
                            "label": "生物",
                            "prop": "score6"
                        }
                    ]
                }
            ]
        }
    ],
    "tableData": [
        {
            "date": "2016-05-02",
            "name": "王小虎",
            "score1": 150,
            "score2": 150,
            "score3": 150,
            "score4": 110,
            "score5": 100,
            "score6": 90
        },
        {
            "date": "2016-05-04",
            "name": "王小明",
            "score1": 150,
            "score2": 150,
            "score3": 150,
            "score4": 110,
            "score5": 100,
            "score6": 90
        },
        {
            "date": "2016-05-01",
            "name": "王小丽",
            "score1": 150,
            "score2": 150,
            "score3": 150,
            "score4": 110,
            "score5": 100,
            "score6": 90
        },
        {
            "date": "2016-05-03",
            "name": "王小飞",
            "score1": 150,
            "score2": 150,
            "score3": 150,
            "score4": 110,
            "score5": 100,
            "score6": 90
        }
    ]
}
```

:::

`elTableColumnPlus.vue`

需要去掉当前页面嵌套的`div`

```vue
<template>
  <el-table-column :prop="item.prop" :label="item.label">
    <template v-if="item.children && item.children.length">
      <elTableColumnPlus v-for="it in item.children" :key="it.value" :item="it"></elTableColumnPlus>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: "elTableColumnPlus",
  props: ["item"],
  components: {},
};
</script>
```
![alt text](image-3.png)