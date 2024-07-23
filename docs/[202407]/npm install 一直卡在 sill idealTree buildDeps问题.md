---
title: npm install 一直卡在 sill idealTree buildDeps 问题
author: 耶温
createTime: 2024/07/23 15:11:14
permalink: /article/krhu7r3i/
tags:
  - npm
---

安装项目包时，下载依赖时，卡在了下载依赖的阶段。终端一致卡在` sill idealTree buildDeps `


解决方法


更换npm镜像源：


1. 查看当前npm镜像源
```bash
npm config get registry
```
2. 切换为taobao源

```bash
npm config set registry https://registry.npm.taobao.org
```
切换成taobao源时，发现问题还是没有解决

3. 再次切换其他源，问题解决
```bash
npm config set registry https://registry.npmmirror.com
```
