import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ['@/assets/styles/style.sass'],
  plugins: [
    { src: '@/plugins/aos', ssr: false, mode: 'client' }
  ]
})
