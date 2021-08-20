import React, { useContext, useEffect, useState } from 'react'
import { IconButton } from 'react-native-paper'
import { createStackNavigator } from '@react-navigation/stack'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer'

import { AppContext } from '@src/navigation/AppProvider'
import { auth, logout } from '@src/firebase/firebase'
import AddGearItem from '@src/screens/AddGearItem'
import ForgotPassword from '@src/screens/ForgotPassword'
import Login from '@src/screens/Login'
import GearList from '@src/screens/GearList'
import BackpackList from '@src/screens/BackpackList'
import GearDetail from '@src/screens/GearDetail'
import BackpackDetail from '@src/screens/BackpackDetail'
import AddBackpack from '@src/screens/AddBackpack'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const AppNavigator = () => {
  const { user } = useContext(AppContext)

  const [isSignedIn, setIsSignedIn] = useState(user)

  useEffect(() => {
    !user ? setIsSignedIn(false) : setIsSignedIn(true)
  }, [user])

  async function handleSignOut(closeDrawer: () => void) {
    try {
      await logout()
      setIsSignedIn(false)
      closeDrawer()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Drawer.Navigator
      screenOptions={{ swipeEnabled: true }}
      drawerStyle={{
        backgroundColor: 'white',
        width: 200,
      }}
      drawerContentOptions={{
        activeTintColor: '#13b8a6',
        activeBackgroundColor: 'white',
      }}
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
              label='Logout'
              onPress={() => handleSignOut(props.navigation.closeDrawer)}
            />
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
    return auth.onAuthStateChanged(setUser)
  }, [])

  return (
    <Stack.Navigator>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen
        name='ForgotPassword'
        component={ForgotPassword}
        options={{ title: 'Forgot Password' }}
      />
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
        <Stack.Screen
          name='GearDetail'
          component={GearDetail}
          options={{ title: 'Gear Detail' }}
        />
        <Stack.Screen
          name='AddGearItem'
          component={AddGearItem}
          options={{ title: 'Add Item' }}
        />
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
        <Stack.Screen
          name='BackpackDetail'
          component={BackpackDetail}
          options={{ title: 'Backpack Detail' }}
        />
        <Stack.Screen
          name='AddBackpack'
          component={AddBackpack}
          options={{ title: 'Add Backpack' }}
        />
      </Stack.Navigator>
    </>
  )
}

export default AppNavigator
