---
title: Vue2数据响应原理解析
author: 耶温
createTime: 2024/07/15 09:59:05
permalink: /Vue/phlmn6jn/
---
# Vue 数据响应原理解析

## defineProperty 数据劫持

- 使用`defineProperty`劫持 `vm` 中的数据复制给 `data` 数据，同时更新到视图
- 可以在控制台，设置`vm.msg`的值查看视图更新，以及 `data` 值改变

```html
<div id="app">123</div>
<script>
  const data = {
    msg: "",
  };
  const vm = {};
  //数据劫持
  Object.defineProperty(vm, "msg", {
    //获取数据
    get() {
      return data.msg;
    },
    //设置数据
    set(val) {
      //数据没有改边不修改
      if (val === data.msg) return;
      //设置数据
      data.msg = val;
      //更新视图绑定数据
      document.querySelector("#app").textContent = val;
    },
  });
</script>
```

## defineProperty 劫持多个数据

```html
<div id="app">123</div>
<script>
  const data = {
    msg: "",
    name: "",
  };
  const vm = {};
  function proxyData(data) {
    Object.keys(data).forEach((key) => {
      Object.defineProperty(vm, key, {
        //获取数据
        get() {
          return data[key];
        },
        //设置数据
        set(val) {
          //数据没有该边不修改
          if (val === data[key]) return;
          //设置数据
          data[key] = val;
          //更新视图绑定数据
          document.querySelector("#app").textContent = val;
        },
      });
    });
  }
  proxyData(data);
</script>
```

## 使用代理 Proxy 实现

- 使用 Proxy 构造函数创建,构造函数接受两个参数：
  - 目标对象
  - 处理程序对象
- 两个参数缺一不可，不然会报错
- 如果创建空代理，可以传一个`{}`

```html
<div id="app">123</div>
<script>
  const data = {
    msg: "",
    name: "",
  };
  const vm = new Proxy(data, {
    //获取数据
    get(target, key) {
      return data[key];
      // return Reflect.get(...arguments);  //使用反射API
    },
    //设置数据
    set(target, key, val) {
      //数据没有该边不修改
      if (val === data[key]) return;
      //设置数据
      data[key] = val;
      //更新视图绑定数据
      document.querySelector("#app").textContent = val;
    },
  });
</script>
```

## 发布订阅模式

- 模仿 Vue 事件总线

```html
<script>
  class Vue {
    constructor() {
      //用来存储订阅者信息以及事件，即type类型以及所属函数事件
      this.subs = {};
    }
    $on(type, fn) {
      //添加订阅者以及事件
      if (!this.subs[type]) {
        this.subs[type] = [];
      }
      //添加函数事件
      this.subs[type].push(fn);
    }
    $emit(type) {
      //查看订阅者是否存在
      if (this.subs[type]) {
        //获取除去type之外的传参
        let [, ...args] = [...arguments];
        //循环调用函数
        this.subs[type].forEach((fn) => fn(...args));
      }
    }
  }
  const vm = new Vue();
  vm.$on("zhijian", function() {
    console.log("zhijian");
    console.log([...arguments]);
  });
  vm.$emit("zhijian", 1, 2, 3);
  //zhijian
  //(3) [1, 2, 3]
</script>
```

## 观察者模式

```html
<script>
  //观察者模式
  class Subject {
    constructor() {
      //存储观察者以及更新方法
      this.observerLists = [];
    }
    //添加观察者
    addObs(obs) {
      //判断是否存在观察者以及更新方法
      if (obs && obs.update) {
        this.observerLists.push(obs);
      }
    }
    //通知观察者
    notify(type) {
      this.observerLists.forEach((obs) => {
        obs.update();
      });
    }
    //清空观察者
    empty() {
      this.observerLists = [];
    }
  }
  //定义观察者
  class Observer {
    update() {
      //事件更新需要处理逻辑
      console.log("更新事件");
    }
  }

  let sub = new Subject();
  //新建观察者
  let o1 = new Observer();
  let o2 = new Observer();
  //添加观察者
  sub.addObs(o1);
  sub.addObs(o2);
  //通知观察者
  sub.notify();
</script>
```

## 模拟 Vue 响应原理

> 模拟 Vue 响应原理，试下一个响应式demo

### vue.js

```js
class Vue {
	//构造函数
	constructor(option) {
		//获取到传入的对象，没有默认为空对象
		this.$option = option || {}
		//获取 el
		this.$el = typeof option.el === 'string' ? document.querySelector(option.el) : option.el
		//获取data
		this.$data = option.data || {}
		//调用proxyData处理data数据变成响应式，加载到Vue实例vm上
		this.proxyData(this.$data)
		//使用Observer把data里数据也变成响应式  
		new Observer(this.$data)
		//编译模板 渲染数据
		new Compiler(this)
	}
	//把data数据注册到vue  可以使用代理proxy也可以使用defineProperty
	proxyData(data) {
		Object.keys(data).forEach((key) => {
			//进行数据劫持
			//循环遍历data数据，添加到Vue转化成getter和setter方法
			Object.defineProperty(this, key, {
				// 设置可以枚举
				enumerable: true,
				// 设置可以配置
				configurable: true,
				//设置数据
				set(val) {
					//判断新值是否相等
					if (val === data[key]) return
					//设置新值
					data[key] = val
				},
				//获取数据
				get() {
					return data[key]
				}
			})
		})
	}
}
```

### observer.js


```js
class Observer {
	//构造函数
	constructor(data) {
		//遍历data 转换成响应式
		this.walk(data)
	}
	//遍历data 转换成响应式
	walk(data) {
		//判断data类型
		if (!data || typeof data !== 'object') return
		//遍历data
		Object.keys(data).forEach((key) => {
			this.defineReactive(data, key, data[key])
		})
	}
	//把data数据注册到为响应式
	defineReactive(obj, key, value) {
		//如果value是对象 也变成响应式，如果不是直接return
		this.walk(value)
		//保存this
		const _this = this
		//创建dep对象
		let dep = new Dep()
		Object.defineProperty(obj, key, {
			// 设置可以枚举
			enumerable: true,
			// 设置可以配置
			configurable: true,
			//设置数据
			set(val) {
				//判断新值是否相等
				if (val === value) return
				//设置新值
				value = val
				//复制val如果是对象也要设置为响应式
				_this.walk(val)
				//数据改变 通知更新视图
				dep.notify()
			},
			//获取数据
			get() {
				//添加观察者对象 Dep.target 表示观察者
				Dep.target && dep.addSub(Dep.target)
				return value
			}
		})
	}
}
```

### compiler.js
```js
//在这个文件里实现对文本节点 和 元素节点指令编译 例如：v-text v-model
class Compiler {
	constructor(vm) {
		//拿到vm实例
		this.vm = vm
		//拿到el
		this.el = vm.$el
		//编译模板
		this.compile(this.el)
	}
	//编译模板
	compile(el) {
		//获取子节点 伪数组 转为真的数组
		let childNodes = [...el.childNodes]
		// 循环遍历
		childNodes.forEach(node => {
			//根据不同的节点进行编译
			if (node.nodeType === 3) { //文本节点
				this.compileText(node)
			} else if (node.nodeType === 1) { //元素节点
				this.compileElement(node)
			}
			//判断是否存在于节点 考虑递归
			if (node.childNodes && node.childNodes.length) {
				// 继续递归编译模板
				this.compile(node)
			}
		});
	}
	//编译文本节点  正则匹配出{{}}中的变量 并且给替换成值
	compileText(node) {
		//正则匹配
		let reg = /\{\{(.+?)\}\}/
		//获取节点文本内容
		let content = node.textContent
		//判断是否有插值
		if (reg.test(content)) {
			//获取分组匹配 $1
			let key = RegExp.$1.trim()
			//赋值替换
			node.textContent = content.replace(reg, this.vm[key])
			//创建者观察者
			new Watcher(this.vm, key, (newValue) => {
				node.textContent = newValue
			})
		}
	}
	//编译元素节点 匹配v-相关内容
	compileElement(node) {
		//获取元素 遍历元素上的所有属性
		let attr = [...node.attributes] || []
		attr.forEach((attrItem) => {
			//获取属性名
			let attrName = attrItem.name
			//判断是否是V-开头指令
			if (attrName.startsWith('v-')) {
				//获取attrname
				attrName = attrName.substr(2)
				//获取当前绑定属性值
				let key = attrItem.value
				//指令操作  执行更新方法
				this.update(node, key, attrName)
			}
		})
	}
	//添加更新指令方法
	update(node, key, attrName) {
		//根据不同的v-绑定值 执行不同的方法
		let updateFn = this[attrName + 'Updater']
		updateFn && updateFn.call(this, node, key, this.vm[key])
	}
	//添加更新方法 v-text
	textUpdater(node, key, value) {
		node.textContent = value
		//创建者观察者
		new Watcher(this.vm, key, newValue => {
			node.textContent = newValue
		})
	}
	//v-model
	modelUpdater(node, key, value) {
		node.value = value
		//创建者观察者
		new Watcher(this.vm, key, newValue => {
			node.value = newValue
		})
		//实现双向绑定 监听input事件  修改data中属性
		node.addEventListener('input',()=>{
			this.vm[key] = node.value
		})
	}
}

```

### dep.js
```js
//dep 相当于观察者中的发布者
class Dep {
	constructor() {
		//存放观察者
		this.subs = []
	}
	//添加观察者
	addSub(sub) {
		//判断是否存在观察者和update方法
		if (sub && sub.update) {
			this.subs.push(sub)
		}
	}
	//通知方法
	notify() {
		//循环遍历出发每个观察者的更新方法
		this.subs.forEach(sub => {
			sub.update()
		})
	}
}
```

### watcher.js
```js
//数据更新后  收到通知  调用update更新

class Watcher {
	constructor(vm, key, cb) {
		//vm Vue实例
		this.vm = vm
		//key 是data中的属性
		this.key = key
		//cb 回调函数 更新视图的具体方法
		this.cb = cb
		//把观察者存放在Dep.target
		Dep.target = this
		//旧数据 更新视图时需要比较
		// 还有一点就是 vm[key] 这个时候就触发了 get 方法
		// 之前在 get 把 观察者 通过dep.addSub(Dep.target) 添加到了 dep.subs中
		this.oldValue = vm[key]
		//Dep.target不存在了
		Dep.target = null
	}
	//更新视图
	update() {
		let newValue = this.vm[this.key]
		if (newValue === this.oldValue) return
		//调用具体的更新方法
		this.cb(newValue)
	}
}

```

### 代码验证，注意引入文件顺序
```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<script src="./dep.js"></script>
		<script src="./watcher.js"></script>
		<script src="./compiler.js"></script>
		<script src="./observer.js"></script>
		<script src="./vue.js"></script>
		<title>demo</title>
	</head>
	<body>
		<div id="app">
		<span>{{msg}}</span>
		<input v-model="msg" />
		</div>
		
		<script>
			const vm = new Vue({
				el: "#app",
				data: {
					msg: "hello world",
					age: "18",					
				},
			});
		</script>
	</body>
</html>
```
