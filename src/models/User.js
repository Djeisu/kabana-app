import { Model } from 'vue-mc'

/**
 * User model
 */
export default class User extends Model {
  // Default attributes that define the "empty" state.
  defaults () {
    return {
      uid: null,
      name: '',
      done: false
    }
  }

  // Attribute mutations.
  mutations () {
    return {
      uid: (uid) => String(uid) || null,
      name: String,
      done: Boolean
    }
  }

  // Attribute valuidation
  // valuidation () {
  //   return {
  //     uid: Number.and(min(1)).or(equal(null)),
  //     name: String.and(required),
  //     done: Boolean
  //   }
  // }

  // Route configuration
  routes () {
    return {
      fetch: '/user/{uid}',
      save: '/user'
    }
  }
}
