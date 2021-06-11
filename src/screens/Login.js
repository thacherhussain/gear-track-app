import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { TextInput, Button } from 'react-native-paper'

import validateLogin from '../Auth/validateLogin'
import firebaseInstance from '../firebase'
import Header from '@src/components/Header'
import ErrorText from '@src/components/ErrorText'

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
  }

  return (
    <>
      {login ? (
        <Header titleText={'Log In'} navigation={navigation} />
      ) : (
        <Header titleText={'Create Account'} />
      )}
      <View style={styles.container}>
        {!login && (
          <View style={styles.inputView}>
            <TextInput
              style={styles.textInput}
              label='Name'
              value={name}
              mode='outlined'
              onChangeText={setState('name')}
            />
          </View>
        )}
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            label='Email'
            value={email}
            mode='outlined'
            onChangeText={setState('email')}
            autoCapitalize={'none'}
          />
          {errors.email && <ErrorText>{errors.email}</ErrorText>}
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            label='Password'
            value={password}
            mode='outlined'
            onChangeText={setState('password')}
            autoCapitalize={'none'}
            secureTextEntry={true}
          />
          {errors.password && <ErrorText>{errors.password}</ErrorText>}
          {firebaseError && <ErrorText>{firebaseError}</ErrorText>}
        </View>
        <View style={styles.buttonView}>
          <Button onPress={() => signUp()}>
            {login ? 'Sign In' : 'Submit'}
          </Button>
          <Button onPress={() => setLogin((prevLogin) => !prevLogin)}>
            {login ? 'Need an account?' : 'Already Have an Account?'}
          </Button>
          <Button onPress={() => navigation.navigate('ForgotPassword')}>
            Forgot Password
          </Button>
        </View>
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
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  text: {
    height: 300,
    fontSize: 16,
  },
  textInput: {
    fontSize: 20,
    marginBottom: 5,
  },
  buttonView: {
    marginTop: 20,
  },
  inputView: {
    marginBottom: 20,
  },
})

export default Login
