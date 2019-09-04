import Vue from 'vue'
import firebase from 'firebase'
import '@/firebase/'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './registerServiceWorker'
import '@babel/polyfill'

Vue.config.productionTip = false

firebase.auth().onAuthStateChanged((user) => {
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
})
