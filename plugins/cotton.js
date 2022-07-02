import Cotton from 'cottonjs'

export default defineNuxtPlugin(nuxtApp => {
  if (typeof window !== 'undefined') {
    nuxtApp.Cotton = Cotton
  }
})