import React from 'react'
import { StyleSheet, Text } from 'react-native'

const FeedbackText = ({ text }) => {
  return <Text style={styles.error}>{text}</Text>
}

export default FeedbackText

const styles = StyleSheet.create({
  error: {
    textAlign: 'center',
  },
})
