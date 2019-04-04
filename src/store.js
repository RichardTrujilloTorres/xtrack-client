import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Expense from "./api/expense";

Vue.use(Vuex)

const API_URL = 'http://localhost:8000/api'

export default new Vuex.Store({
  state: {
      expenses: [],
      expense: Expense
  },
  mutations: {
      setExpenses(state, expenses) {
          state.expenses = expenses
      }
  },
  actions: {
      getExpenses({ commit }) {
          const expenses = this.state.expense.index()
          expenses.then(res => {
              // console.log(res.data.data)

              commit('setExpenses', res.data.data)
          })
          .catch(res => {
              console.log(res)
          })
      },
      // Should not be overused.
      // Work with the store instead and reload as (and if) needed.
      getExpenseById({ commit }, id) {
          const expense = this.state.expense.show(id)

          return expense
          /*
          expense.then(res => {
              // console.log(res.data.data)

              return res.data.data
          })
          .catch(res => {
              console.log(res)

              return null
          })
          */

          /*
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
          */
      }
  }
})
