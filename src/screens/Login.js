import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { IconButton, TextInput, FAB, Button } from 'react-native-paper'
import Header from '../components/Header'
import useForm from '../Auth/useForm'
import firebaseInstance from '../firebase'

const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
}

function Login({ navigation }) {
  const { handleChange } = useForm(INITIAL_STATE)
  const { name, password, email, setState } = handleChange(INITIAL_STATE)
  const [login, setLogin] = useState(false)
  const [firebaseError, setFirebaseError] = useState(null)

  console.log(name, password, email)

  async function authenticateUser() {
    try {
      login
        ? await firebaseInstance.login(email, password)
        : await firebaseInstance.register(name, email, password)
      navigation.goBack()
    } catch (err) {
      console.log('Authentication Error', err)
      setFirebaseError(err.message)
    }
  }

  function signUp() {
    //   1. Is Form Valid

    // 1.1 If it's not return;

    // 2 If it is valid, make call to firebase

    // 2.1 Is this valid with firebase? (Meets password criteria, email doesn't exist) return if not

    // 3 - You're logged in - navigate to whatever
    navigation.state.params.onSignUp({ name, email, password })
    navigation.goBack()
  }

  return (
    <>
      {login ? (
        <Header titleText={'Log In'} />
      ) : (
        <Header titleText={'Create Account'} />
      )}
      <IconButton
        icon='close'
        size={25}
        color='white'
        onPress={() => navigation.goBack()}
        style={styles.iconButton}
      />
      <View style={styles.container}>
        {!login && (
          <TextInput
            label='Name'
            value={name}
            mode='outlined'
            onChangeText={setState('name')}
            style={styles.title}
          />
        )}
        <TextInput
          label='Email'
          value={email}
          mode='outlined'
          onChangeText={setState('email')}
          style={styles.title}
        />
        <TextInput
          label='Password'
          value={password}
          mode='outlined'
          onChangeText={setState('password')}
          style={styles.title}
        />

        <Button onPress={() => authenticateUser()}>
          {login ? 'Sign In' : 'Submit'}
        </Button>
        <Button onPress={() => setLogin((prevLogin) => !prevLogin)}>
          {login ? 'Sign Up' : 'Already Have an Account?'}
        </Button>
        <Button onPress={() => navigation.navigate('ForgotPassword')}>
          Forgot Password
        </Button>

        <FAB
          style={styles.fab}
          small
          icon='check'
          disabled={(name && email && password) == '' ? true : false}
          onPress={() => onSaveLogin()}
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
