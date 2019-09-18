import { Model } from 'vue-mc'

/**
 * User model
 */
export default class User extends Model {
  // Default attributes that define the "empty" state.
  defaults () {
    return {
      model: 'User',
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

  buildUser (response) {
    const user = response.user
    this.displayName = user.displayName
    this.email = user.email
    this.emailVerified = user.emailVerified
    this.isAnonymous = user.isAnonymous
    this.phoneNumber = user.phoneNumber
    this.photoURL = user.photoURL
    this.uid = user.uid
    this.isNewUser = response.additionalUserInfo.isNewUser
  }
}
