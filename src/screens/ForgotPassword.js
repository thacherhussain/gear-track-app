import React, { useState, useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { IconButton, TextInput, Button } from 'react-native-paper'
import Header from '../components/Header'
import FirebaseContext from '../firebase/context'
import { ErrorText, FeedbackText } from '../components'

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
      <Header titleText={'Forgot Password'} />
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
          autoCapitalize={'none'}
          style={styles.title}
        />

        <Button onPress={() => handleResetPassword()}>Reset Password</Button>
        {isPasswordReset && (
          <FeedbackText text={'Check your email to reset password'} />
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
