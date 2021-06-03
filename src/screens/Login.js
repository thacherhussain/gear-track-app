import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { IconButton, TextInput, Button, Text } from 'react-native-paper'

import useForm from '../Auth/useForm'
import validateLogin from '../Auth/validateLogin'
import firebaseInstance from '../firebase'
import Header from '../components/Header'

const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
}

function handleChange(initialState) {
  const [values, setValues] = useState(initialState)

  const setState = (key) => (value) =>
    setValues((prev) => ({ ...prev, [key]: value }))

  return {
    ...values,
    setState,
  }
}

function Login({ navigation }) {
  const { name, password, email, setState } = handleChange(INITIAL_STATE)
  const [login, setLogin] = useState(true)
  const [errors, setErrors] = useState({})
  const [firebaseError, setFirebaseError] = useState(null)

  // console.log(name, password, email)

  async function authenticateUser() {
    try {
      login
        ? await firebaseInstance.login(email, password)
        : await firebaseInstance.register(name, email, password)
      navigation.navigate('ViewNotes')
    } catch (err) {
      console.log('Authentication Error', err)
      setFirebaseError(err.message)
    }
  }

  function signUp() {
    //   1. Is Form Valid
    setErrors(validateLogin(email, password))
    // 1.1 If it's not return

    // 2 If it is valid, make call to firebase

    // 2.1 Is this valid with firebase? (Meets password criteria, email doesn't exist) return if not

    // 3 - You're logged in - navigate to whatever
    authenticateUser()
    // navigation.goBack()
  }

  return (
    <>
      {login ? (
        <Header titleText={'Log In'} />
      ) : (
        <Header titleText={'Create Account'} />
      )}
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
          autoCapitalize={'none'}
        />
        {errors.email && <Text>{errors.email}</Text>}
        <TextInput
          label='Password'
          value={password}
          mode='outlined'
          onChangeText={setState('password')}
          style={styles.title}
          autoCapitalize={'none'}
          secureTextEntry={true}
        />
        {errors.password && <Text>{errors.password}</Text>}
        {firebaseError && <Text>{firebaseError}</Text>}

        <Button onPress={() => signUp()}>{login ? 'Sign In' : 'Submit'}</Button>
        <Button onPress={() => setLogin((prevLogin) => !prevLogin)}>
          {login ? 'Need an account?' : 'Already Have an Account?'}
        </Button>
        <Button onPress={() => navigation.navigate('ForgotPassword')}>
          Forgot Password
        </Button>
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
