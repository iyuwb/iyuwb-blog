---
title: NPM-常见依赖安装问题解决方案
author: 耶温
createTime: 2024/08/21 09:24:37
permalink: /article/ex8bk4bz/
tags:
  - npm
---


## Node版本

在获取新项目后，首先需要确定当前项目的node版本，然后再安装依赖。推荐使用 nvm 或 n Node版本管理器来管理node版本。

::: tip Node版本管理器
[Node版本管理 - n(推荐Mac使用)](/Node.js/cznd3edy/)

[Node版本管理 - nvm（推荐Windows使用）](/Node.js/tbfyiodl/)
:::





## 权限问题

1. `Error: EACCES: permission denied`相关报错，可以使用以下方法尝试解决：


-   windows下，需要管理员权限打开powershell，执行命令：

```shell
set-ExecutionPolicy RemoteSigned
```

-   macos下，可以在命令前面加上sudo，执行命令：

```shell
sudo npm install
```



## 网络问题

安装依赖时可能会因为网络问题导致超时或无法连接。我们可以设置国内镜像，尝试解决问题。

```shell
npm config set registry https://registry.npmmirror.com
```
也可以使用 cnpm 来下载依赖，但是不是很推荐，因为 cnpm 不支持依赖版本锁定，后续使用过程中可能会造成更大的问题。

也可以直接在安装依赖命令后添加镜像源解决：

```shell
npm install --registry=https://registry.npmmirror.com
```

## 缓存问题

NPM 的缓存也可能会导致安装失败。当遇到依赖安装失败时，可以尝试以下方法：

清除缓存，之后再尝试重新安装依赖：

```shell
npm cache clean --force
```


## 依赖冲突

如果在安装依赖时出现依赖冲突，可以尝试以下方法：
```shell
npm install --legacy-peer-deps 
```

-   `--legacy-peer-deps` : 可以忽略依赖冲突，继续安装。
