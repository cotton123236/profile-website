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
    projects: []
  }),
  getters: {},
  actions: {
    updateIndexData(data) {
      Object.assign(this, data)
    }
  }
})