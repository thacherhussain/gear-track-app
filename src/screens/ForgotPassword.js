import React, { useState, useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { TextInput, Button } from 'react-native-paper'

import i18n from '../localization/i18n'
import { Header, ErrorText, FeedbackText } from '@src/components'
import FirebaseContext from '@src/firebase/context'

function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState('')
  const { firebase } = useContext(FirebaseContext)
  const [isPasswordReset, setIsPasswordReset] = useState(false)
  const [passwordResetError, setPasswordResetError] = useState(null)

  const handleResetPassword = async () => {
    try {
      await firebase.resetPassword(email)
      setIsPasswordReset(true)
      setPasswordResetError(null)
    } catch (err) {
      console.error('Error sending email', err)
      setPasswordResetError(err.message)
      setIsPasswordReset(false)
    }
  }

  return (
    <>
      <Header titleText={i18n.t('ForgotPassword')} />
      <View style={styles.container}>
        <TextInput
          label={i18n.t('Email')}
          value={email}
          mode='outlined'
          onChangeText={setEmail}
          autoCapitalize={'none'}
          style={styles.title}
        />

        <Button onPress={() => handleResetPassword()}>
          {i18n.t('ResetPassword')}
        </Button>
        <Button onPress={() => navigation.goBack()}>{i18n.t('Cancel')}</Button>
        {isPasswordReset && (
          <FeedbackText text={i18n.t('CheckYourEmailToResetPassword')} />
        )}
        {passwordResetError && <ErrorText errorText={passwordResetError} />}
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
})

export default ForgotPassword
