import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import AppNavigator from '@src/navigation/AppNavigator'
import { AppProvider } from './src/navigation/AppProvider'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1e6091',
    accent: '#52b69a',
  },
}

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <PaperProvider theme={theme}>
          <AppNavigator />
        </PaperProvider>
      </NavigationContainer>
    </AppProvider>
  )
}
