import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store.js'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('./views/main/Core.vue'),
      meta: { authRequired: true },
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('./views/main/Home.vue')
        },
        {
          path: 'about',
          component: () => import('./views/main/About.vue')
        }
      ]
    },
    {
      path: '/auth',
      component: () => import('./views/register/Core.vue'),
      children: [
        {
          path: '',
          name: 'auth',
          component: () => import('./views/register/Auth.vue')
        },
        {
          path: 'form',
          name: 'form',
          component: () => import('./views/register/Form.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  store.dispatch('checkAuth')
  if (to.matched.some(record => record.meta.authRequired)) {
    if (!store.state.isAuthenticated) {
      next({ name: 'auth', query: { redirect: to.fullPath } })
    } else {
      next()
    }
  } else if (store.state.isAuthenticated) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
