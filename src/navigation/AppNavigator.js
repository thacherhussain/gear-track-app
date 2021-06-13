import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { FirebaseContext } from '@src/firebase'
import AddItem from '@src/screens/AddItem'
import ForgotPassword from '@src/screens/ForgotPassword'
import Login from '@src/screens/Login'
import GearList from '@src/screens/GearList'

const Stack = createStackNavigator()

function AppNavigator() {
  const { user } = useContext(FirebaseContext)
  const isSignedIn = user ? true : false

  return (
    <Stack.Navigator
      initialRouteName={user ? 'GearList' : 'Login'}
      screenOptions={{ gestureEnabled: false, headerShown: false }}
    >
      {!isSignedIn ? (
        <>
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
        </>
      ) : (
        <>
          <Stack.Screen name='AddItem' component={AddItem} />
          <Stack.Screen name='GearList' component={GearList} />
        </>
      )}
    </Stack.Navigator>
  )
}

export default AppNavigator
