import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { plumeTheme } from 'vuepress-theme-plume'

export default defineUserConfig({
    // base: '/home/',
    // 请不要忘记设置默认语言
    lang: 'zh-CN',
    theme: plumeTheme({
        logo: '/logo.png',
        avatar: {
            url: '/logo.png',
            name: '耶温',
            description: '前端开发',
            circle: true,
            location: '西安，中国',
            organization: '亚信科技',
        },
        // 页脚
        footer: {
            message: '耶温博客|日常记录|前端学习笔记',
            copyright: 'Copyright © 2024'
        }
    }),
    bundler: viteBundler(),
    // 标题
    title: '耶温博客',
    // 介绍
    description: '日常笔记',
    head: [
        ['link', {
            rel: 'icon',
            href: 'icon.png'
        }]
    ],
})