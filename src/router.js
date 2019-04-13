import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import PageNotFound from './views/PageNotFound.vue'
import Expense from '@/components/Expenses/Expense'
import Edit from '@/components/Expenses/Edit'
import Create from '@/components/Expenses/Create'
import Index from "./components/Expenses/Index";
import {vueAuth} from "./main";
import Login from "./components/Auth/Login";
import Dashboard from "./components/Dashboard";

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
      {
          path: '/dummy',
          name: 'dummy',
          component: Dummy,
          meta: {
              requiresAuth: false
          }
      },
      {
          path: '/login',
          name: 'login',
          component: Login,
          meta: {
              requiresAuth: false
          }
      },
      {
          path: '/expenses',
          name: 'expenses',
          component: Index,
          meta: {
              requiresAuth: true
          }
      },
      {
          path: '/expenses/create',
          name: 'expenses-create',
          component: Create,
          meta: {
              requiresAuth: true
          }
      },
      {
          path: '/expenses/:id/edit',
          name: 'expenses-edit',
          component: Edit,
          meta: {
              requiresAuth: true
          }
      },
      {
          path: '/expenses/:id',
          name: 'expenses-show',
          component: Expense,
          meta: {
              requiresAuth: true
          }
      },
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
    meta: {
        requiresAuth: true
    }
    },
    {
      path: '/about',
      name: 'about',
        meta: {
            requiresAuth: false
        },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
      {
          path: '*',
          name: '404',
          component: PageNotFound,
          meta: {
              requiresAuth: false
          }
      },
  ]
})

// Auth route restriction
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !vueAuth.isAuthenticated()) {
        next('/login')

        return
    }

    next()
})

export default router
