import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const API_URL = 'http://localhost:8000/api'

export default new Vuex.Store({
  state: {
      expenses: []
  },
  mutations: {
      setExpenses(state, expenses) {
          state.expenses = expenses
      }
  },
  actions: {
      getExpenses({ commit }) {
          axios.get(`${API_URL}/expenses`)
              .then(res => {
                  commit('setExpenses', res.data.data.expenses.data)
              })
              .catch(res => {
                  console.log(res)
              })
      },
      // Should not be overused.
      // Work with the store instead and reload as (and if) needed.
      getExpenseById({ commit }, id) {
          let expense = null
          axios.get(`${API_URL}/expenses/${id}`)
              .then(res => {
                  // commit('setExpenses', res.data.data.expenses.data)
                  console.log('---------- promise')
                  console.log( res.data.data.expenses)
                  expense = res.data.data.expenses
              })
              .catch(res => {
                  console.log(res)
              })

          return expense
      }
  }
})
