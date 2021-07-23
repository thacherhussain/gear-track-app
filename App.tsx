import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import AppNavigator from './src/navigation/AppNavigator'
import { AppProvider } from './src/navigation/AppProvider'
import { extendTheme, NativeBaseProvider } from 'native-base'
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1e6091',
    accent: '#023047',
  },
}

const nativeBaseTheme = extendTheme({
  primary: {
    50: '#e0f7ff',
    100: '#b5e5fd',
    200: '#88d3fa',
    300: '#5bc1f6',
    400: '#39aff4',
    500: '#2a96da',
    600: '#1d75aa',
    700: '#11547a',
    800: '#02324a',
    900: '#00121c',
  },
})

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <NativeBaseProvider theme={nativeBaseTheme}>
          <PaperProvider theme={theme}>
            <AppNavigator />
          </PaperProvider>
        </NativeBaseProvider>
      </NavigationContainer>
    </AppProvider>
  )
}
