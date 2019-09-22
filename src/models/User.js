import { Model } from 'vue-mc'

/**
 * User model
 */
export default class User extends Model {
  // Default attributes that define the "empty" state.
  defaults () {
    return {
      uid: null,
      displayName: null,
      email: null,
      emailVerified: null,
      isAnonymous: null,
      phoneNumber: null,
      photoURL: null,
      isNewUser: null
    }
  }

  // Attribute mutations.
  mutations () {
    return {
      uid: (uid) => String(uid) || null,
      name: String,
      displayName: String,
      email: String,
      emailVerified: Boolean,
      isAnonymous: Boolean,
      phoneNumber: String,
      photoURL: String,
      isNewUser: Boolean
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

  static buildUser (response) {
    const user = response.user
    return {
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      isAnonymous: user.isAnonymous,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      uid: user.uid,
      isNewUser: response.additionalUserInfo.isNewUser
    }
  }
}
