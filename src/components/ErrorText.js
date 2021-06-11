import React from 'react'
import { StyleSheet, Text } from 'react-native'

const ErrorText = ({ children }) => {
  return <Text style={styles.error}>{children}</Text>
}

export default ErrorText

const styles = StyleSheet.create({
  error: {
    color: 'red',
  },
})
