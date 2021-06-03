import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { Appbar, Title, Button } from 'react-native-paper'
import { FirebaseContext } from '../firebase'

function Header({ titleText }) {
  const { user, firebase } = useContext(FirebaseContext)

  return (
    <Appbar.Header style={styles.headerContainer}>
      {user && (
        <Button color={'white'} onPress={() => firebase.logout()}>
          Logout
        </Button>
      )}

      <View style={styles.container}>
        <Title style={styles.title}>{titleText}</Title>
      </View>
    </Appbar.Header>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
  },
})

export default Header
