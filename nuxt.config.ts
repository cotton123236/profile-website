import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ['@/assets/styles/style.sass'],
  buildModules: ['@pinia/nuxt'],
  plugins: [
    { src: '@/plugins/aos', ssr: false, mode: 'client' },
    { src: '@/plugins/anchor', ssr: false, mode: 'client' },
    { src: '@/plugins/cotton', ssr: false, mode: 'client' }
  ]
})
