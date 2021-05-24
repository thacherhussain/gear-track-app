import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import AppNavigator from './src/navigation'
import useAuth from './src/Auth/useAuth'
import firebase, { FirebaseContext } from './src/firebase'

export default function App() {
  return (
    <PaperProvider>
      <AppNavigator />
    </PaperProvider>
  )
}
