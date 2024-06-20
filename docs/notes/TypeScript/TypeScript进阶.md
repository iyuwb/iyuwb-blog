---
title: TypeScript进阶
author: 耶温
createTime: 2024/06/12 16:34:10
permalink: /TypeScript/cmpe7vpb/
---

# TypeScript进阶

## 接口定义使用

定义一个接口，用于限制Person对象的具体属性

`index.ts`

```ts
// 定义一个接口，用于限制Person对象的具体属性
export interface PersonInter {
    id: string,
    name: string,
    age: number,
    love?:string, // ? 代表可有 可没有
}

// 在PersonInter基础上，自定义一个类型
// or
// export  type Persons  = Array<PersonInter>
export  type Persons = PersonInter[]

```

使用接口

`demo.vue`

```ts
import {type PersonInter, type Persons} from "@/index";

// 定义对象
const person: PersonInter = {
    id: '2020521',
    name: 'yuwb',
    age: 18
}
console.log(person) //  {id: '2020521', name: 'yuwb', age: 18}

// 定义数组
const personList: Array<PersonInter> = [
    {id: '2020522', name: 'yiran', age: 18},
    {id: '2020523', name: 'yewen', age: 18}
]
console.log(personList)

// 定义数组简写
const persons: Persons = [
    {id: '2020524', name: 'bingbing', age: 18},
    {id: '2020525', name: 'baobao', age: 18}
]
console.log(persons)
```

