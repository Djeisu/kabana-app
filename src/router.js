import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store.js'

// Models
import User from '@/models/User'

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
          component: () => import('./views/main/home/Home.vue')
        },
        {
          path: 'about',
          component: () => import('./views/main/about/About.vue')
        },
        {
          path: 'user',
          component: () => import('./views/main/user/User.vue'),
          children: [
            {
              path: 'profile',
              name: 'profile',
              component: () => import('./views/main/user/Profile.vue')
            },
            {
              path: 'form',
              name: 'form',
              component: () => import('./views/main/user/Form.vue')
            }
          ]
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
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  store.dispatch('getAuth', { model: User, action: 'check' })
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
