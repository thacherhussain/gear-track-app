import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import AppNavigator from './src/navigation'
import firebase, { FirebaseContext } from './src/firebase'
import useAuth from './src/Auth/useAuth'

export default function App() {
  const user = useAuth()
  return (
    <FirebaseContext.Provider value={{ user, firebase }}>
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </FirebaseContext.Provider>
  )
}
