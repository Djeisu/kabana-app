import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import firebase from 'firebase'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiUrl: '',
    user: null,
    userData: null,
    token: null,
    isAuthenticated: false,
    error: null,
    recipes: [],
    userRecipes: []
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setUserData (state, payload) {
      state.userData = payload
    },
    setToken (state, payload) {
      state.token = payload
    },
    setIsAuthenticated (state, payload) {
      state.isAuthenticated = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    setRecipes (state, payload) {
      state.recipes = payload
    },
    setUserRecipes (state, payload) {
      state.userRecipes = payload
    }
  },
  actions: {
    async getRecipes ({ state, commit }, plan) {
      try {
        let response = await axios.get(`${state.apiUrl}`, {
          params: {
            q: plan,
            app_id: '5b6623d5',
            app_key: '46674aa2193dbb7b88ffd897331e661a',
            from: 0,
            to: 9
          }
        })
        commit('setRecipes', response.data.hits)
      } catch (error) {
        commit('setRecipes', [])
      }
    },
    checkAuth ({ dispatch, commit }) {
      const currentUser = firebase.auth().currentUser
      if (currentUser) {
        commit('setUser', currentUser)
        commit('setToken', currentUser.refreshToken)
        commit('setIsAuthenticated', true)

        dispatch('getDoc', {
          collection: 'users',
          docUid: currentUser.uid
        }).then(doc => commit('setUserData', doc.data()))
      }
    },
    userAuth ({ dispatch, commit }, payload) {
      firebase
        .auth()
        .signInWithPopup(payload.provider)
        .then(result => {
          commit('setUser', result.user)
          commit('setToken', result.credential.accessToken)
          commit('setIsAuthenticated', true)

          if (result.additionalUserInfo.isNewUser) {
            dispatch('addDoc', {
              collection: 'users',
              docUid: result.user.uid,
              doc: { isNewUser: true }
            })
          }

          router.push('/')
        })
        .catch(error => {
          commit('setUser', null)
          commit('setToken', null)
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
    },
    addRecipe ({ state }, payload) {
      firebase
        .database()
        .ref('users')
        .child(state.user.uid)
        .push(payload.recipe.label)
    },
    getUserRecipes ({ state, commit }) {
      return firebase
        .database()
        .ref('users/' + state.user.uid)
        .once('value', snapshot => {
          commit('setUserRecipes', snapshot.val())
        })
    }
  },
  getters: {
    isAuthenticated (state) {
      return state.user !== null && state.user !== undefined
    }
  }
})
