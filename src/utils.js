import firebase from 'firebase'

export default class Utils {
  static addDoc (payload) {
    return firebase
      .firestore()
      .collection(payload.collection)
      .doc(payload.docUid)
      .set(payload.doc)
  }

  static getDoc (payload) {
    return firebase
      .firestore()
      .collection(payload.collection)
      .doc(payload.docUid)
      .get()
  }
}
