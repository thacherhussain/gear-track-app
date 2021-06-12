import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import useAuth from '@src/auth/useAuth'
import firebase, { FirebaseContext } from '@src/firebase'
import AppNavigator from '@src/navigation/AppNavigator'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1e6091',
    accent: '#52b69a',
  },
}

export default function App() {
  const user = useAuth()
  return (
    <FirebaseContext.Provider value={{ user, firebase }}>
      <NavigationContainer>
        <PaperProvider theme={theme}>
          <AppNavigator />
        </PaperProvider>
      </NavigationContainer>
    </FirebaseContext.Provider>
  )
}
