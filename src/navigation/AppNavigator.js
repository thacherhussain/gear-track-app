import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { FirebaseContext } from '@src/firebase'
import AddNotes from '@src/screens/AddNotes'
import ForgotPassword from '@src/screens/ForgotPassword'
import Login from '@src/screens/Login'
import ViewNotes from '@src/screens/ViewNotes'

const Stack = createStackNavigator()

function AppNavigator() {
  const { user } = useContext(FirebaseContext)
  const isSignedIn = user ? true : false

  return (
    <Stack.Navigator
      initialRouteName={user ? 'ViewNotes' : 'Login'}
      screenOptions={{ gestureEnabled: false, headerShown: false }}
    >
      {!isSignedIn ? (
        <>
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
        </>
      ) : (
        <>
          <Stack.Screen name='AddNotes' component={AddNotes} />
          <Stack.Screen name='ViewNotes' component={ViewNotes} />
        </>
      )}
    </Stack.Navigator>
  )
}

export default AppNavigator
