import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { Appbar, Title, Button, IconButton } from 'react-native-paper'
import { FirebaseContext } from '../firebase'

function Header({ navigation, titleText }) {
  const { user, firebase } = useContext(FirebaseContext)

  return (
    <Appbar.Header style={styles.headerContainer}>
      <View style={{ flex: 1 }}>
        {user && (
          <IconButton
            icon='cog-outline'
            color={'white'}
            onPress={() => console.log('Settings')}
          />
        )}
      </View>
      <View style={styles.container}>
        <Title style={styles.title}>{titleText}</Title>
      </View>
      <View style={{ flex: 1 }}>
        {user && (
          <IconButton
            icon='logout-variant'
            color={'white'}
            onPress={() => firebase.logout()}
          />
        )}
        {!user && (
          <IconButton
            icon='login-variant'
            color={'white'}
            onPress={() => navigation.navigate('Login')}
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
