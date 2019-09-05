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
      name: 'home',
      component: () => import('./views/Home.vue'),
      meta: {
        authRequired: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue'),
      meta: {
        authRequired: true
      }
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('./views/Auth.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  store.dispatch('checkAuth')
  if (to.matched.some(record => record.meta.authRequired)) {
    if (!store.state.isAuthenticated) {
      next({
        path: '/auth'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
