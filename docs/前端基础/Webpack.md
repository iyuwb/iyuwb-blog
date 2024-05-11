---
title: Webpack
author: 耶温
createTime: 2024/05/11 16:02:58
permalink: /article/7wn1n2bb/
---
# Webpack了解

## 简介
>   Webpack前端资源构建工具，静态模块打包器
-   所有前端文件(css,less,js,img)都会作为模块资源
-   模块->打包->客户端可运行文件

## 核心概念

### 入口entry
-   从入口文件开始打包文件

### 出口output
-   设定打包完成后的输出文件

### 转换loader 
-   处理非js文件，翻译成浏览器能够识别的文件

### 插件plugins

### 模式mode
-   模式配置，开发以及线上环境
-   可以设置 process.env.NODE.EVN的值