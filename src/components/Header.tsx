import React, { FC, useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { Appbar, Title, IconButton } from 'react-native-paper'

import { AppContext } from '../navigation/AppProvider'
import { logout } from '../firebase/firebase'

type HeaderProps = {
  titleText: string
}

const Header: FC<HeaderProps> = (props) => {
  const { titleText } = props
  const { user } = useContext(AppContext)

  async function handleSignOut() {
    try {
      await logout()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Appbar.Header>
      <View style={{ flex: 1 }}>
        {/* {user && (
          <IconButton
            icon='menu'
            color={'white'}
            onPress={() => console.log('Menu')}
          />
        )} */}
      </View>
      <View style={styles.container}>
        <Title style={styles.title}>{titleText}</Title>
      </View>
      <View style={{ flex: 1 }}>
        {user && (
          <IconButton
            icon='logout-variant'
            color={'white'}
            onPress={handleSignOut}
          />
        )}
      </View>
    </Appbar.Header>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
  },
})

export default Header
