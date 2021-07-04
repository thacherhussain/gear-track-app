import React, { useContext, useEffect, useState } from 'react'
import { IconButton } from 'react-native-paper'
import { createStackNavigator } from '@react-navigation/stack'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer'

import { AppContext } from './AppProvider'
import { auth, logout } from '../firebase/firebase'
import AddItem from '@src/screens/AddItem'
import ForgotPassword from '@src/screens/ForgotPassword'
import Login from '@src/screens/Login'
import GearList from '@src/screens/GearList'
import BackpackList from '@src/screens/BackpackList'
import GearDetail from '@src/screens/GearDetail'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const AppNavigator = () => {
  const { user } = useContext(AppContext)

  const [isSignedIn, setIsSignedIn] = useState(user)

  useEffect(() => {
    !user ? setIsSignedIn(false) : setIsSignedIn(true)
  }, [user])

  async function handleSignOut(props) {
    try {
      await logout()
      setIsSignedIn(false)
      props.navigation.closeDrawer()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Drawer.Navigator
      screenOptions={{ swipeEnabled: true }}
      drawerStyle={{
        backgroundColor: '#e4e4e7',
        width: 200,
      }}
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label='Logout' onPress={() => handleSignOut(props)} />
          </DrawerContentScrollView>
        )
      }}
    >
      {!isSignedIn ? (
        <Drawer.Screen name='Login' component={LoginNavigator} />
      ) : (
        <>
          <Drawer.Screen name='Gear' component={GearNavigator} />
          <Drawer.Screen name='Backpacks' component={BackpackNavigator} />
        </>
      )}
    </Drawer.Navigator>
  )
}

const LoginNavigator = () => {
  const { setUser } = useContext(AppContext)

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (authUser: any) => {
      try {
        await (authUser ? setUser(authUser) : setUser(null))
      } catch (error) {
        console.log(error)
      }
    })

    return unsubscribeAuth
  }, [])

  return (
    <Stack.Navigator>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
    </Stack.Navigator>
  )
}

const GearNavigator = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          options={({ navigation }) => ({
            headerLeft: () => (
              <IconButton
                icon='menu'
                size={30}
                onPress={() => navigation.toggleDrawer()}
              />
            ),
          })}
          name='Gear'
          component={GearList}
        />
        <Stack.Screen name='GearDetail' component={GearDetail} />
        <Stack.Screen name='AddItem' component={AddItem} />
      </Stack.Navigator>
    </>
  )
}

const BackpackNavigator = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          options={({ navigation }) => ({
            headerLeft: () => (
              <IconButton
                icon='menu'
                size={30}
                onPress={() => navigation.toggleDrawer()}
              />
            ),
          })}
          name='Backpacks'
          component={BackpackList}
        />
      </Stack.Navigator>
    </>
  )
}

export default AppNavigator
