import { Model } from 'vue-mc'

/**
 * Action model
 */
export default class Action extends Model {
  // Default attributes that define the "empty" state.
  defaults () {
    return {
      uid: null,
      isNew: null,
      title: null,
      subtitle: null,
      thumbnail: null,
      description: null,
      imagesGallery: null,
      createAt: null,
      updateAt: null,
      deleteAt: null
    }
  }

  // Attribute mutations.
  mutations () {
    return {
      uid: (uid) => String(uid) || null,
      isNew: Boolean,
      title: String,
      subtitle: String,
      thumbnail: Object,
      description: String,
      imagesGallery: Array,
      createAt: Date,
      updateAt: Date,
      deleteAt: Date
    }
  }

  static buildAction () {
    return {
      uid: '',
      isNew: true,
      title: '',
      subtitle: '',
      thumbnail: {},
      description: '',
      imagesGallery: [],
      createAt: Date.now(),
      updateAt: Date.now(),
      deleteAt: null
    }
  }
}
