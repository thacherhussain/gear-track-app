import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Provider as PaperProvider } from 'react-native-paper'

import useAuth from './src/Auth/useAuth'
import firebase, { FirebaseContext } from './src/firebase'
import AppNavigator from './src/navigation'

export default function App() {
  const user = useAuth()
  return (
    <FirebaseContext.Provider value={{ user, firebase }}>
      <NavigationContainer>
        <PaperProvider>
          <AppNavigator />
        </PaperProvider>
      </NavigationContainer>
    </FirebaseContext.Provider>
  )
}
