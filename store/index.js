import { defineStore } from 'pinia'

const state = () => ({
  works: [
    {
      id: '01',
      name: 'MDS'
    },
    {
      id: '02',
      name: '長榮葡萄酒'
    }
  ]
})

const getters = {}

const actions = {}

export const useIndexStore = defineStore('indexStore', {
  state,
  getters,
  actions
})