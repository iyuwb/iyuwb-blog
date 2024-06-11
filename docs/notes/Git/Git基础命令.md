---
title: Git基础命令
author: 耶温
createTime: 2024/05/11 21:16:42
permalink: /Git/h8hjd37u/
---
# Git 基础命令

## Git 忽略文件

- 在仓库的根目录下创建一个 .gitignore 文件
- 将不需要被 git 管理的文件路径 写到 gitignore 文件中
- `idea.txt` 忽视 idea.txt 文件
- `.gitignore` 忽视.gitignore 文件
- `css/index.js` 忽视 css 下的 index.js
- `css/*.js` 忽视 css 下的所有 js 文件
- `css` 忽视 css 文件夹

## Git 基础操作

### 工作区，暂存区，与仓库区

- 工作区：书写代码的区域
- 暂存区：暂时存储的区域，git 无法直接从工作区提交到仓库区，需要 先从工作区添加到暂存区，然后才能提交到仓库区。可以避免一些错误操作
- 仓库区：将保存在暂存区的内容保存到 Git 仓库中，生成版本号，可以根据版本号回退到指定版本的代码

### Git 配置

```git
//设置用户名

git  config --global user.name  用户名

//设置邮箱

 git config --global user.email  邮箱

//查看配置信息

git config --list

```

### Git 初始化

```git
git init
```

### 将文件添加到暂存区

```git
//将选择文件添加到暂存区/文件夹/所有的js文件

git add  文件名称/文件夹名称/*.js

//添加当前目录下的所有文件

git add ./-A/--all

```

### 暂存区提交到仓库

```git
//将文件从暂存区提交到仓库

git commit -m 添加说明

// 修改上一次提交说明

git commit --amend -m 提交说明
```

### 查看 Log 和 reflog

```git
//查看提交的日志
git log


//查看所有的版本信息，回退之后也可以查看
git reflog
```

### Diff 版本比较相关

```git

//查看工作区与暂存区的不同
git diff

//查看工作区域仓库区的不同
git diff --cached

//查看工作区域仓库区的不同，最新提交比较
git diff HEAD

//比较两次版本的不同

git diff  版本号  版本号

```

### reset 回退相关

```git
//回退到指定版本号
git reset --hard 版本号


//回退到上一次提交/上上次提交/本次提交
git reset --hard head~1/head~2/head~0

// --hard 其他参数
// --soft 只重置仓库区
// --mixed 重置仓库区和暂存区
// --hard 重置仓库区暂存区和工作区

```

## Branch 分支相关

:::tip 注意
在 git 中，有一个特殊分支 HEAD 永远指向当前分支
:::

### 创建切换分支

```git
//查看分支
git branch

//创建分支
git branch 分支名称

//切换分支
git checkout 分支名称

//创建新分支并切换到该分支
git chekcout -b 分支名称

```

### 删除合并分支

```git
//删除分支
git branch -d 分支名称

//合并分支  将其他分支的内容合并到当前分支
git merge 分支名称

```

:::tip 注意
不能在当前分支删除当前分支，需要切换到其他分支才能删除
:::

## Git 远程仓库

- Github，GitLab 和码云

### 克隆代码

```git
 git clone 远程仓库地址
```

### 克隆远程指定分支到本地

```git
// 克隆远程仓库指定分支到本地
git clone -b 远程分支名  仓库地址
```

### 远程仓库操作

```git
//拉取远程仓库代码
 git pull 远程仓库地址 分支名称

//将本地仓库中代码提交到远程仓库
 git push 远程仓库地址 分支名称
```

### 仓库别名

```git
//给远程仓库起一个别名
git remote 仓库别名 仓库地址

//删除别名
git remote remove 仓库别名

```

## Tag 相关

### 创建 tag

```git
git tag tag名称 -m tag备注
```

### 推送 Tag

```git
git  push origin --tag

```

### 拉取 Tag

```git
git  pull origin --tag
```

### 根据 Tag 回退到之前版本

#### 查看所有 tag

```git
git tag
```

#### 查看指定 tag 找出打标签的那次提交 `commit id`

```git
git show tag名称
```

#### 版本回退，创建分支

```git
//版本回退

git reset --hard  提交commit-id

//创建分支并切换到新分支

git checkout -b 分支名称

```

:::tip 注意
通过标签回退版本后，需要创建一个新的分支，然后当前主干分支要立即回到原来的位置。在新的分支上修改代码
:::

#### 原分支立即回到原来的提交位置

```git
//切换到之前分支

git checkout 之前分支名称

//查看之前分支的原来位置提交id

git reflog

// 主分支回到原来提交位置
git reset --hard  原来提交commit-id

```

后续，切换分支，在新建分支上修改代码

## stash 储藏

Git 储藏（stashing）是一种将当前工作进度保存起来的方法，以便可以切换到其他分支进行其他工作，而不会丢失当前的工作进度。

### 储藏当前更改

```git
git stash
```
### 最近储藏
1. 展示所有储藏
```git
git stash list
```

2. 应用最近的储藏

```git
git stash apply
```

3. 删除最近的储藏
```git
git stash drop
```
4. 应用并删除最近的储藏
```git
git stash pop
```

### 指定储藏
1. 应用指定的储藏
```git
git stash apply stash@{储藏编号}
```
2. 删除指定的储藏
```git
git stash drop stash@{储藏编号}
```
3. 应用并删除指定的储藏
```git
git stash pop stash@{储藏编号}
```