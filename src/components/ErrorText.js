import React from 'react'
import { StyleSheet, Text } from 'react-native'

const ErrorText = ({ errorText }) => {
  return <Text style={styles.error}>{errorText}</Text>
}

export default ErrorText

const styles = StyleSheet.create({
  error: {
    textAlign: 'center',
    color: 'red',
  },
})
