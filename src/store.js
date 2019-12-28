import Vue from 'vue'
import Vuex from 'vuex'
import Expense from "./api/expense";
import {vueAuth} from "./main";
import Stats from "./api/stats";

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    expenses: [],
    expense: null,
    resource: Expense,
    stats: Stats,
    user: {},
    isAuthenticated: false
  },
  mutations: {
    isAuthenticated(state, payload) {
      state.isAuthenticated = payload.isAuthenticated;
    },
    removeUser(state) {
      state.user = null;
    },
    setUser(state, {email}) {
      state.user.email = email;
    },
    setExpense(state, expense) {
      state.expense = expense
    },
    setExpenses(state, expenses) {
      state.expenses = expenses
    }
  },
  actions: {
    login(context, payload) {
      return vueAuth.login(payload.user, payload.requestOptions)
          .then((res) => {
            context.commit('isAuthenticated', {
              isAuthenticated: vueAuth.isAuthenticated()
            });
            context.commit('setUser', payload.user);
      })
    },
    logout(context) {
      context.commit('isAuthenticated', {
        isAuthenticated: false
      });
      context.commit('setUser', {});

      return vueAuth.logout();
    },
    getMonthlySummary(context) {
        return this.state.stats.get('/monthly-summary');
    },
    setUser(context, user) {
      context.commit('setUser', user);
    },
    getExpense(context, id) {
      return this.state.resource.show(id);
    },
    getExpenses({ commit }) {
      const expenses = this.state.expense.index();
      expenses.then(res => {
        commit('setExpenses', res.data.data)
      })
      .catch(res => {
        console.log(res)
      })
    }
  },
  getters: {
    getExpense: (state) => state.expense,
    getUser: (state) => state.user,
    isAuthenticated: (state) => state.isAuthenticated
  }
})
