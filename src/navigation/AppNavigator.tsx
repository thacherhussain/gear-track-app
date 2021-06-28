import React, { useContext, useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { AppContext } from './AppProvider'
import { auth } from '../firebase/firebase'
import AddItem from '@src/screens/AddItem'
import ForgotPassword from '@src/screens/ForgotPassword'
import Login from '@src/screens/Login'
import GearList from '@src/screens/GearList'
import Backpack from '@src/screens/Backpack'
import GearDetail from '@src/screens/GearDetail'

const Stack = createStackNavigator()

function AppNavigator() {
  const { user, setUser } = useContext(AppContext)

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (authUser) => {
      try {
        await (authUser ? setUser(authUser) : setUser(null))
      } catch (error) {
        console.log(error)
      }
    })

    return unsubscribeAuth
  }, [])

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
          <Stack.Screen name='GearList' component={GearList} />
          <Stack.Screen name='GearDetail' component={GearDetail} />
          <Stack.Screen name='AddItem' component={AddItem} />
          <Stack.Screen name='Backpack' component={Backpack} />
        </>
      )}
    </Stack.Navigator>
  )
}

export default AppNavigator
