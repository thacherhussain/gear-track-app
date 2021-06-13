import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { TextInput, Button } from 'react-native-paper'

import validateLogin from '@src/auth/validateLogin'
import { Header, ErrorText } from '@src/components'
import firebaseInstance from '@src/firebase'

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
  const [showNameError, setShowNameError] = useState(false)

  async function authenticateUser() {
    try {
      login
        ? await firebaseInstance.login(email, password)
        : await firebaseInstance.register(name, email, password)
      navigation.navigate('GearList')
    } catch (err) {
      console.log('Authentication Error', err)
      setFirebaseError(err.message)
    }
  }

  const signUp = () => {
    if (!login) {
      setShowNameError(true)
    }
    setErrors(validateLogin(email, password))
    authenticateUser()
  }

  const toggleSignUpLogin = () => {
    setLogin((prevLogin) => !prevLogin)
    setFirebaseError(null)
    setErrors({})
    setShowNameError(false)
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
            {showNameError && !name ? (
              <ErrorText>{'Enter Name'}</ErrorText>
            ) : null}
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
          {!errors.password && firebaseError && (
            <ErrorText>{firebaseError}</ErrorText>
          )}
        </View>
        <View style={styles.buttonView}>
          <Button onPress={() => signUp()}>
            {login ? 'Sign In' : 'Submit'}
          </Button>
          <Button onPress={() => toggleSignUpLogin()}>
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
