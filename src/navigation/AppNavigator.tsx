import React, { useContext, useEffect } from 'react'
import { IconButton } from 'react-native-paper'
import { createStackNavigator } from '@react-navigation/stack'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer'
import { DrawerActions } from '@react-navigation/native'

import { AppContext } from './AppProvider'
import { auth, logout } from '../firebase/firebase'
import AddItem from '@src/screens/AddItem'
import ForgotPassword from '@src/screens/ForgotPassword'
import Login from '@src/screens/Login'
import GearList from '@src/screens/GearList'
import Backpack from '@src/screens/Backpack'
import GearDetail from '@src/screens/GearDetail'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const GearListNavigator = () => {
  async function handleSignOut() {
    try {
      await logout()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Drawer.Navigator
      screenOptions={{ swipeEnabled: false }}
      drawerStyle={{
        backgroundColor: '#e4e4e7',
        width: 200,
      }}
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label='Logout' onPress={handleSignOut} />
          </DrawerContentScrollView>
        )
      }}
    >
      <Drawer.Screen name='GearList' component={GearList} />
      <Drawer.Screen name='My Backpack' component={Backpack} />
      <Drawer.Screen name='AddItem' component={AddItem} />
    </Drawer.Navigator>
  )
}

const AppNavigator = () => {
  const { user, setUser } = useContext(AppContext)

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

  const isSignedIn = user ? true : false

  return (
    <>
      <Stack.Navigator initialRouteName={isSignedIn ? 'GearList' : 'Login'}>
        {!isSignedIn ? (
          <>
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
          </>
        ) : (
          <>
            <Stack.Screen
              name='GearListNavigator'
              component={GearListNavigator}
              options={({ navigation }) => ({
                headerLeft: () => (
                  <IconButton
                    icon='menu'
                    size={30}
                    onPress={() =>
                      navigation.dispatch(DrawerActions.toggleDrawer())
                    }
                  />
                ),
              })}
            />
            <Stack.Screen name='GearDetail' component={GearDetail} />
            {/* <Stack.Screen name='AddItem' component={AddItem} /> */}
          </>
        )}
      </Stack.Navigator>
    </>
  )
}

export default AppNavigator
