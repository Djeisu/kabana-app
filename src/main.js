import Vue from 'vue'
import firebase from 'firebase'
import '@/firebase/'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import '@babel/polyfill'

// Utils
import Utils from '@/utils'

// models imports
import User from '@/models/User'

Vue.config.productionTip = false

// Models GLOBAL
Vue.prototype.$Utils = Utils
Vue.prototype.$UserModel = User

// Firebase GLOBAL
Vue.prototype.$firebase = firebase

firebase.auth().onAuthStateChanged((user) => {
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
})
