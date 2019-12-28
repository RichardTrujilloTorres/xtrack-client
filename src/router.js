import Vue from 'vue'
import Router from 'vue-router'
import Edit from '@/components/Expenses/Edit'
import Create from '@/components/Expenses/Create'
import Index from "./components/Expenses/Index";
import Login from "./components/Auth/Login";
import Dashboard from "./components/Dashboard";
import Search from "./views/Search";
import PageNotFound from "./views/PageNotFound";
import store from "./store";
import About from "./views/About";
import UserService from "./services/user/user";

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
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
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
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
      component: About,
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
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {

    // check local storage for credentials
    if (UserService.hasCredentials()) {
      store.dispatch('isLoading', true);

      store.dispatch('login', {user: UserService.getUser()})
        .then(res => {
          next();
        })
        .catch(res => {
          next('/login');
        });

      setTimeout(() => {
        store.dispatch('isLoading', false);
      }, 1000);
      return;
    }

    next('/login');
    return;
  }

  next();
});

export default router
