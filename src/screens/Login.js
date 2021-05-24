import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { IconButton, TextInput, FAB } from 'react-native-paper'
import Header from '../components/Header'

function Login({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function onLogin() {
    navigation.state.params.addNote({ email, password })
    navigation.goBack()
  }

  return (
    <>
      <Header titleText={'Login'} />
      <IconButton
        icon='close'
        size={25}
        color='white'
        onPress={() => navigation.goBack()}
        style={styles.iconButton}
      />
      <View style={styles.container}>
        <TextInput
          label='Email'
          value={email}
          mode='outlined'
          onChangeText={setEmail}
          style={styles.title}
        />
        <TextInput
          label='Password'
          value={password}
          mode='outlined'
          onChangeText={setPassword}
          style={styles.title}
        />
        <FAB
          style={styles.fab}
          small
          icon='check'
          disabled={noteTitle == '' ? true : false}
          onPress={() => onLogin()}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  iconButton: {
    backgroundColor: 'rgba(46, 113, 102, 0.8)',
    position: 'absolute',
    right: 0,
    top: 40,
    margin: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  text: {
    height: 300,
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
  },
})

export default Login
