import { defineStore } from 'pinia'

export const useIndexStore = defineStore('indexStore', {
  state: () => ({
    about: {
      note: '',
      nameTw: '',
      nameEn: '',
      slogan: '',
      brief: ''
    },
    works: [],
    projects: [
      {
        _id: '01',
        href: 'https://www.universewalls.com/#/login',
        title: 'Metawall',
        brief: 'Metawall 是一個小型社群平台，供會員互動及交流，必須先註冊為會員才能享有我們所提供的服務。',
        tech: 'Node.js / Express / MongoDB / Vite / Vue 3 / Pinia / Vue Router',
        image: 'https://i.imgur.com/FyZww1T.png'
      },
      {
        _id: '02',
        href: 'https://cotton123236.github.io/zoomist/index.html',
        title: 'Zoomist',
        brief: '一個發佈在 NPM 上的 JavaScript library，能方便快速的建立圖片放大縮效的功能，並同時支援行動裝置操作。',
        tech: 'JavaScript / Rollup<br>( 17 Stars & 5 Forks on Github )',
        image: 'https://i.imgur.com/DRkr5Fm.png'
      },
      {
        _id: '03',
        href: 'https://cotton123236.github.io/CottonJS/dist/index.html',
        title: 'CottonJS',
        brief: '一個發佈在 NPM 上的 JavaScript library，能快速的製作滑鼠跟隨的動畫效果。',
        tech: 'JavaScript / Rollup<br>( 18 Stars & 2 Forks on Github )',
        image: 'https://i.imgur.com/RNcJaHy.png'
      }
    ]
  }),
  getters: {},
  actions: {
    updateIndexData(data) {
      Object.assign(this, data)
    }
  }
})