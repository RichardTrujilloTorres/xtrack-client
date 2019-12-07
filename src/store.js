import Vue from 'vue'
import Vuex from 'vuex'
import Expense from "./api/expense";
import {vueAuth} from "./main";
import axios from 'axios';
import Stats from "./api/stats";

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    expenses: [],
    expense: null,
    resource: Expense,
    stats: Stats,
    user: {
      email: ''
    }
  },
  mutations: {
    setUser(state, {email}) {
      state.user.email = email
    },

    // sets the working expense
    setExpense(state, expense) {
      state.expense = expense
    },
    setExpenses(state, expenses) {
      state.expenses = expenses
    }
  },
  actions: {
    getMonthlySummary(context) {
        return this.state.stats.get('/monthly-summary');
    },
    // TODO
    getExpensesByCategory(context) {
      /*
        return this.state.resource.stats('by-category')
            .then(res => {
              context.commit('setExpense', res.data.data)
            })
            .catch(res => {
              console.log(res)
            })
            */
    },
    setUser(context, user) {
      context.commit('setUser', user)
    },
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
    getExpense: (state) => state.expense,
    getUser: (state) => state.user
  }
})
