import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import PageNotFound from './views/PageNotFound.vue'
import Expense from '@/components/Expenses/Expense'
import Edit from '@/components/Expenses/Edit'
import Create from '@/components/Expenses/Create'
import Index from "./components/Expenses/Index";

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
      {
          path: '/expenses',
          name: 'expenses',
          component: Index,
      },
      {
          path: '/expenses/create',
          name: 'expenses-create',
          component: Create,
      },
      {
          path: '/expenses/:id/edit',
          name: 'expenses-edit',
          component: Edit,
      },
      {
          path: '/expenses/:id',
          name: 'expenses-show',
          component: Expense,
      },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
      {
          path: '*',
          name: '404',
          component: PageNotFound
      },
  ]
})
