import React, { FC, useState, useEffect } from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { Stack, Input, Button, Link, Center } from 'native-base'

import i18n from '@src/localization/i18n'
import validateLogin from '@src/utils/validateLogin'
import { ErrorText, Page } from '@src/components'
import { loginWithEmail, registerWithEmail } from '@src/firebase/firebase'
import { RootStackParamList } from '@src/types'

type State = {
  name: string
  email: string
  password: string
}

const INITIAL_STATE: State = {
  name: '',
  email: '',
  password: '',
}

function handleChange(initialState: State) {
  const [values, setValues] = useState(initialState)

  const setState =
    <Key extends keyof State, Value extends State[Key]>(key: Key) =>
    (value: Value) =>
      setValues((prev) => ({ ...prev, [key]: value }))

  return {
    ...values,
    setState,
  }
}

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>
}

const Login: FC<Props> = (props) => {
  const { navigation } = props
  const { name, password, email, setState } = handleChange(INITIAL_STATE)
  const [login, setLogin] = useState(true)
  const [errors, setErrors] = useState<Partial<State>>({})
  const [firebaseError, setFirebaseError] = useState(null)
  const [showNameError, setShowNameError] = useState(false)

  async function authenticateUser() {
    try {
      login
        ? await loginWithEmail(email, password)
        : await registerWithEmail(name, email, password)
      // navigation.navigate('GearList')
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

  useEffect(() => {
    navigation.setOptions({ title: login ? 'Login' : 'Sign Up' })
  }, [login])

  return (
    <Page>
      <Stack space={4} paddingX={4} safeArea>
        {!login && (
          <>
            <Input
              placeholder={i18n.t('Name')}
              onChangeText={setState('name')}
              value={name}
            />
            {showNameError && !name ? (
              <ErrorText>{i18n.t('NameRequired')}</ErrorText>
            ) : null}
          </>
        )}
        <Input
          placeholder={i18n.t('Email')}
          value={email}
          onChangeText={setState('email')}
          autoCapitalize={'none'}
        />
        {errors.email && <ErrorText>{errors.email}</ErrorText>}

        <Input
          placeholder={i18n.t('Password')}
          value={password}
          onChangeText={setState('password')}
          autoCapitalize={'none'}
          secureTextEntry={true}
        />
        {errors.password && <ErrorText>{errors.password}</ErrorText>}
        {!errors.password && firebaseError && (
          <ErrorText>{firebaseError}</ErrorText>
        )}
      </Stack>

      <Center>
        <Stack space={4} paddingX={4}>
          <Button
            onPress={() => signUp()}
            size={'sm'}
            m={'1'}
            colorScheme='teal'
            style={{ minWidth: 250 }}
          >
            {login ? i18n.t('SignIn') : i18n.t('Submit')}
          </Button>
          <Center>
            <Link
              onPress={() => toggleSignUpLogin()}
              _text={{
                fontSize: 'sm',
              }}
            >
              {login ? i18n.t('NeedAnAccount') : i18n.t('AlreadyHaveAnAccount')}
            </Link>
            <Link
              onPress={() => navigation.navigate('ForgotPassword')}
              _text={{
                fontSize: 'sm',
              }}
            >
              {i18n.t('ForgotPassword')}
            </Link>
          </Center>
        </Stack>
      </Center>
    </Page>
  )
}

export default Login
