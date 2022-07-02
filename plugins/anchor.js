import Anchor from './anchor4/anchor4'

export default defineNuxtPlugin(nuxtApp => {
  if (typeof window !== 'undefined') {
    nuxtApp.Anchor = Anchor
  }
})