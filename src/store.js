import Vue from 'vue'
import Vuex from 'vuex'
import Expense from "./api/expense";

Vue.use(Vuex)

const API_URL = 'http://localhost:8000/api'

export default new Vuex.Store({
  state: {
      expenses: [],
      expense: null,
      resource: Expense
  },
  mutations: {
      // sets the working expense
      setExpense(state, expense) {
          state.expense = expense
      },
      setExpenses(state, expenses) {
          state.expenses = expenses
      }
  },
  actions: {
      // retrieves the working expense
      getExpense(context, id) {
          return this.state.resource.show(id)
              .then(res => {
                  context.commit('setExpense', res.data.data)
              })
              .catch(res => {
                  console.log(res)
              })
      },
      getExpenses({ commit }) {
          const expenses = this.state.expense.index()
          expenses.then(res => {
              // console.log(res.data.data)

              commit('setExpenses', res.data.data)
          })
          .catch(res => {
              console.log(res)
          })
      }
  },
    getters: {
      // return the working expense
      getExpense: (state) => state.expense
    }
})
