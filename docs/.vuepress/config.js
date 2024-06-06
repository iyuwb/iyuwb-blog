import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { plumeTheme } from 'vuepress-theme-plume'

export default defineUserConfig({
    base: '/',
    // 请不要忘记设置默认语言
    lang: 'zh-CN',
    theme: plumeTheme({
        hostname: 'https://wwww.yuwb.cn',
        logo: '/logo.png',
        // 作者
        avatar: {
            url: '/logo.png',
            name: '耶温',
            description: '前端开发',
            circle: true,
            location: '西安，中国',
            organization: '亚信科技',
        },
        // nav
        navbar: [
            { text: '首页', link: '/', icon: 'solar:home-add-linear' },
            {
                text: '笔记',
                link: '/blog/',
                icon: 'ri:blogger-line'
            },
            {
                text: '基础',
                icon: 'ph:file-html',
                items: [
                    {
                        text: 'HTML',
                        icon: 'ph:file-html',
                        link: '/notes/HTML/HTML元素.md',
                    },
                    {
                        text: 'CSS',
                        icon: 'ph:file-css',
                        link: '/notes/CSS/CSS选择器',
                    },
                    {
                        text: 'JavaScript',
                        icon: 'ph:file-js',
                        link: '/notes/JavaScript/WebSocket',
                    },
                    {
                        text: 'TypeScript',
                        icon: 'ph:file-ts',
                        link: '/前端基础/TypeScript',
                    },
                ],
            },
            {
                text: '框架',
                icon: 'ph:file-vue-duotone',
                items: [
                    {
                        text: 'Vue',
                        icon: 'ph:file-vue',
                        link: '/notes/Vue/Vue组件自我调用.md',
                    },
                    {
                        text: 'React',
                        icon: 'mdi:react',
                        link: '/前端框架/React',
                    },
                    {
                        text: 'UNIAPP',
                        icon: 'mdi:unicode',
                        link: '/前端框架/UNIAPP',
                    },
                    {
                        text: '微信小程序',
                        icon: 'ri:wechat-2-line',
                        link: '/前端框架/WeChatApp',
                    },
                ],
            },
            {
                text: '插件',
                icon: 'clarity:plugin-line',
                items: [
                    {
                        text: 'NPM',
                        icon: 'ph:file-vue',
                        link: '/notes/Plugins/教程-Vue封装组件并发布到npm.md',
                    },
                    {
                        text: 'Element',
                        icon: 'mdi:react',
                        link: '/notes/Plugins/Element-Table表头顺序错乱问题',
                    }
                ],
            },
            {
                text: '其他',
                icon: 'icon-park-outline:other',
                items: [
                    {
                        text: 'Node.js',
                        icon: 'devicon-plain:nodejs-wordmark',
                        link: '/notes/Node.js/Node版本管理-n.md',
                    },
                    {
                        text: 'Git',
                        icon: 'teenyicons:git-outline',
                        link: '/notes/Git/Git Commit Message规范.md',
                    },
                ],
            }
        ],
        // aside
        notes: {
            dir: 'notes', // 声明所有笔记的目录
            link: '/', // 声明所有笔记默认的链接前缀， 默认为 '/'
            notes: [
                {
                    dir: 'HTML', // 声明笔记的目录，相对于 `notes.dir`
                    link: '/HTML/', // 声明笔记的链接前缀
                    sidebar: [ // 配置侧边栏
                        {
                            text: 'HTML基础',
                            icon: 'ic:baseline-dashboard',
                            items: ['HTML元素','HTML属性','HTML事件','HTML-input','HTML元素属性相关', 'HTML5新增内容']
                        },
                        {
                            text: 'HTML问题',
                            icon: 'icon-park-outline:file-question',
                            items: ['移动端H5-相关问题']
                        },
                        {
                            text: 'HTML方案',
                            icon: 'icon-park-outline:plan',
                            items: ['移动端H5-响应布局', 'Canvas-图片合成']
                        },
                    ]
                },
                {
                    dir: 'CSS', // 声明笔记的目录，相对于 `notes.dir`
                    link: '/CSS/', // 声明笔记的链接前缀
                    sidebar: [ // 配置侧边栏
                        {
                            text: 'CSS基础',
                            icon: 'ic:baseline-dashboard',
                            items: ['CSS选择器', 'CSS3新增内容','CSS-滚动条-Scrollbar', '样式滤镜 Filter', '网格布局 Grid']
                        },
                        {
                            text: 'CSS问题',
                            icon: 'icon-park-outline:file-question',
                            items: ['H5页面点击异常背景色问题']
                        },
                        {
                            text: 'CSS方案',
                            icon: 'icon-park-outline:plan',
                            items: ['CSS-文字轮播效果','响应式布局方案']
                        },
                    ]
                },
                {
                    dir: 'JavaScript', // 声明笔记的目录，相对于 `notes.dir`
                    link: '/JavaScript/', // 声明笔记的链接前缀
                    sidebar: [ // 配置侧边栏
                        {
                            text: 'JavaScript基础',
                            icon: 'ic:baseline-dashboard',
                            items: ['Service Worker-服务进程','Cache-浏览器缓存','PWA-渐进式应用','JavaScript-作用域和闭包','[JavaScript高级程序设计]读书笔记','WebSocket', '内置对象方法', '原型链',
                             '正则表达式','ECMAScript6','H5离线储存',
                            'Promise','Set、Map、WeakSet和WeakMap'
                            ]
                        },
                        {
                            text: 'JavaScript问题',
                            icon: 'icon-park-outline:file-question',
                            items: ['笔记']
                        },
                        {
                            text: 'JavaScript方案',
                            icon: 'icon-park-outline:plan',
                            items: ['常用方法']
                        },
                    ]
                },
                {
                    dir: 'Vue', // 声明笔记的目录，相对于 `notes.dir`
                    link: '/Vue/', // 声明笔记的链接前缀
                    sidebar: [ // 配置侧边栏
                        {
                            text: 'Vue方案',
                            icon: 'icon-park-outline:plan',
                            items: ['Vue组件自我调用','Vue事件总线使用']
                        },
                    ]
                },
                {
                    dir: 'Plugins', 
                    link: '/Plugins/', 
                    sidebar: [ 
                        {
                            text: '插件封装',
                            icon: 'ic:baseline-dashboard',
                            items: ['教程-Vue封装组件并发布到npm']
                        },
                        {
                            text: 'Element',
                            icon: 'ic:baseline-dashboard',
                            items: ['Element-Table表头顺序错乱问题']
                        },
                    ]
                },
                {
                    dir: 'Git', 
                    link: '/Git/', 
                    sidebar: [ 
                        {
                            text: 'Git',
                            icon: 'ic:baseline-dashboard',
                            items: ['Git Commit Message规范','Git常用命令']
                        }
                    ]
                },
                {
                    dir: 'Node.js', 
                    link: '/Node.js/', 
                    sidebar: [ 
                        {
                            text: '解决方案',
                            icon: 'ic:baseline-dashboard',
                            items: ['Node版本管理-n','Node版本管理-nvm']
                        }
                    ]
                },
            ]
        },
        // 页脚
        footer: {
            message: '耶温笔记|日常记录|前端学习',
            copyright: 'Copyright © 2024 | ICP备案号：<a target="_blank" href="https://beian.miit.gov.cn/">陕ICP备2024040821号-1</a>'
        },
        plugins: {
            markdownEnhance: {
                demo: true,
            },
        }
    }),
    bundler: viteBundler(),
    // 标题
    title: '耶温笔记',
    // 介绍
    description: '耶温学习笔记，包括内容：前端笔记,问题记录,HTML,CSS,JavaScript,Vue,Node.js,NPM',
    head: [
        ['link', {
            rel: 'icon',
            href: '/icon.png'
        }],
        ['link', {
            rel: 'stylesheet',
            href: '/index.css'
        }],
        // 开启PWA
        ['link', {
            rel: 'manifest',
            href: '/manifest.json'
        }]
    ],
    serviceWorker:true
})

