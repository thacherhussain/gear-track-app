import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

import firebaseConfig from './firebaseConfig'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth()

export const db = firebase.firestore()

export const loginWithEmail = (email, password) =>
  auth.signInWithEmailAndPassword(email, password)

export const registerWithEmail = async (name, email, password) => {
  const newUser = await auth.createUserWithEmailAndPassword(email, password)
  return await newUser.user.updateProfile({
    displayName: name,
  })
}

export const logout = () => auth.signOut()

export const passwordReset = (email) => auth.sendPasswordResetEmail(email)
