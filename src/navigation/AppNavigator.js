import React from 'react'
// import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

// import { FirebaseContext } from '../firebase'
import AddNotes from '../screens/AddNotes'
import ForgotPassword from '../screens/ForgotPassword'
import Login from '../screens/Login'
import ViewNotes from '../screens/ViewNotes'

const Stack = createStackNavigator()

function AppNavigator() {
  // const { user } = useContext(FirebaseContext)
  // const isSignedIn = () => (user ? true : false)

  return (
    <Stack.Navigator
      initialRouteName='Login'
      screenOptions={{ gestureEnabled: false, headerShown: false }}
    >
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
      <Stack.Screen name='AddNotes' component={AddNotes} />
      <Stack.Screen name='ViewNotes' component={ViewNotes} />
    </Stack.Navigator>
  )
}

export default AppNavigator

// {!isSignedIn ? (
//   <>
//     <Stack.Screen name='Login' component={Login} />
//     <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
//   </>
// ) : (
//   <>
//     <Stack.Screen name='AddNotes' component={AddNotes} />
//     <Stack.Screen name='ViewNotes' component={ViewNotes} />
//   </>
// )}
