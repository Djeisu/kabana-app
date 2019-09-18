import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
import firebase from 'firebase'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiUrl: '',
    user: null,
    token: null,
    isAuthenticated: false,
    error: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setToken (state, payload) {
      state.token = payload
    },
    setIsAuthenticated (state, payload) {
      state.isAuthenticated = payload
    },
    setError (state, payload) {
      state.error = payload
    }
  },
  actions: {
    // async getRecipes ({ state, commit }, plan) {
    //   try {
    //     let response = await axios.get(`${state.apiUrl}`, {
    //       params: { q: plan }
    //     })
    //     commit('setRecipes', response.data.hits)
    //   } catch (error) {
    //     commit('setRecipes', [])
    //   }
    // },
    checkAuth ({ dispatch, state, commit }, payload) {
      const currentUser = firebase.auth().currentUser
      if (currentUser && state.user == null) {
        dispatch('getDoc', {
          collection: payload.model,
          docUid: currentUser.uid
        }).then(doc => {
          commit('setIsAuthenticated', true)
          commit('setToken', currentUser.refreshToken)
          commit('setUser', doc.data())
          router.push('/home')
        })
      }
    },
    userAuth ({ dispatch, commit }, payload) {
      firebase
        .auth()
        .signInWithPopup(payload.provider)
        .then(response => {
          payload.model.buildUser(response)
          commit('setUser', payload.model.attributes)
          commit('setToken', response.credential.accessToken)
          commit('setIsAuthenticated', true)
          dispatch('addDoc', {
            collection: payload.model.model,
            docUid: response.user.uid,
            doc: payload.model.attributes
          })

          router.push('/home')
        })
        .catch(error => {
          commit('setUser', null)
          commit('setIsAuthenticated', false)
          commit('setError', error)

          router.push('/auth')
        })
    },
    userSignOut ({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit('setUser', null)
          commit('setIsAuthenticated', false)

          router.push('/auth')
        })
        .catch(() => {
          commit('setUser', null)
          commit('setIsAuthenticated', false)

          router.push('/auth')
        })
    },
    addDoc ({ state }, payload) {
      firebase
        .firestore()
        .collection(payload.collection)
        .doc(payload.docUid)
        .set(payload.doc)
    },
    getDoc ({ state }, payload) {
      return firebase
        .firestore()
        .collection(payload.collection)
        .doc(payload.docUid)
        .get()
    }
    // addRecipe ({ state }, payload) {
    //   firebase
    //     .database()
    //     .ref('users')
    //     .child(state.user.uid)
    //     .push(payload.recipe.label)
    // },
    // getUserRecipes ({ state, commit }) {
    //   return firebase
    //     .database()
    //     .ref('users/' + state.user.uid)
    //     .once('value', snapshot => {
    //       commit('setUserRecipes', snapshot.val())
    //     })
    // }
  },
  getters: {
    isAuthenticated (state) {
      return state.user !== null && state.user !== undefined
    }
  }
})
