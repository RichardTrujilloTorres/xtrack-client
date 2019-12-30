import Vue from 'vue'
import Vuex from 'vuex'
import Expense from "./api/expense";
import {vueAuth} from "./main";
import Stats from "./api/stats";
import UserService from "./services/user/user";

Vue.use(Vuex)

export const GETTERS = {
  APP: {
    IS_LOADING: 'isLoading'
  },
  USER: {
    GET: 'getUser',
    IS_AUTHENTICATED: 'isAuthenticated'
  },
};
export const ACTIONS = {
  APP: {
    IS_LOADING: 'isLoading'
  },
  USER: {
    IS_AUTHENTICATED: 'isAuthenticated',
    LOGIN: 'login',
    LOGOUT: 'logout',
  },
  STATS: {
    MONTHLY_SUMMARY: 'getMonthlySummary'
  },
  EXPENSE: {
    GET: 'getExpense'
  },
  EXPENSES: {
    GET: 'getExpenses'
  },
};
export const MUTATIONS = {
  APP: {
    IS_LOADING: 'isLoading'
  },
  USER: {
    SET: 'setUser',
    IS_AUTHENTICATED: 'isAuthenticated'
  },
  EXPENSE: {
      SET: 'setExpense'
  },
  EXPENSES: {
    SET: 'setExpenses'
  }
};

export default new Vuex.Store({
  state: {
    expenses: [],
    expense: null,
    resource: Expense,
    stats: Stats,
    user: {},
    isAuthenticated: false,
    app: {
      loading: false
    }
  },
  mutations: {
    [MUTATIONS.APP.IS_LOADING](state, payload) {
        state.app.loading = payload;
    },
    [MUTATIONS.USER.IS_AUTHENTICATED](state, payload) {
      state.isAuthenticated = payload.isAuthenticated;
    },
    [MUTATIONS.USER.SET](state, user) {
      UserService.setUser(user);
      state.user = {email: user.email};
    },
    [MUTATIONS.EXPENSE.SET](state, expense) {
      state.expense = expense
    },
    [MUTATIONS.EXPENSES.SET](state, expenses) {
      state.expenses = expenses
    }
  },
  actions: {
    [ACTIONS.APP.IS_LOADING](context, payload) {
        context.commit(MUTATIONS.APP.IS_LOADING, payload);
    },
    [ACTIONS.USER.LOGIN](context, payload) {
      return vueAuth.login(payload.user, payload.requestOptions)
          .then((res) => {
            context.commit(MUTATIONS.USER.IS_AUTHENTICATED, {
              isAuthenticated: vueAuth.isAuthenticated()
            });
            context.commit(MUTATIONS.USER.SET, payload.user);
      })
    },
    [ACTIONS.USER.LOGOUT](context) {
      context.commit(MUTATIONS.USER.IS_AUTHENTICATED, {
        isAuthenticated: false
      });
      context.commit(MUTATIONS.USER.SET, {});

      return vueAuth.logout();
    },
    [ACTIONS.STATS.MONTHLY_SUMMARY](context) {
        return this.state.stats.get('/monthly-summary');
    },
    [ACTIONS.EXPENSE.GET](context, id) {
      return this.state.resource.show(id);
    },
    [ACTIONS.EXPENSES.GET]({ commit }) {
      const expenses = this.state.expense.index();
      expenses.then(res => {
        commit([MUTATIONS.EXPENSES.SET], res.data.data)
      })
      .catch(res => {
        console.log(res)
      })
    }
  },
  getters: {
    [GETTERS.USER.GET]: (state) => state.user,
    [GETTERS.USER.IS_AUTHENTICATED]: (state) => state.isAuthenticated,
    [GETTERS.APP.IS_LOADING]: (state) => state.app.loading,
  }
})
