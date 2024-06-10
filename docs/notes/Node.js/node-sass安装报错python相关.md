---
title: node-sass安装报错python相关
author: 耶温
createTime: 2024/06/10 20:06:22
permalink: /Node.js/ywbosuby/
---
# node-sass安装报错python相关

`npm install` 下载依赖包时，`node-sass`包报错，报错信息包含`python`环境相关。


## 解决方式

1. 删除原有`node_modules`

2. 使用以下命令重新下载

```shell
npm install --registry=https://registry.npmmirror.com --legacy-peer-deps
```

-  `--registry=https://registry.npmmirror.com`：为设置下载镜像为淘宝环境，解决可能网络环境问题导致的下载失败。
-  `--legacy-peer-deps`：绕过peerDependency里依赖的自动安装，忽略项目中引入的各个依赖模块之间依赖相同但版本不同的问题。解决某些包版本冲突的问题。

## 其他情况

如果上述方法未解决，可能是`node-sass`和当前`node`版本不兼容导致，可以根据`node-sass`版本或者`node`版本下载对应的`node`和`node-sass`。