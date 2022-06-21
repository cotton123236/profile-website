import { defineStore } from 'pinia'

const state = () => ({
  todos: []
})

const getters = {}

const actions = {}

export const useTodoStore = defineStore('todoStore', {
  state,
  getters,
  actions
})