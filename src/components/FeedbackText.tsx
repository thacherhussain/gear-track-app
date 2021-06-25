import React, {FC} from 'react'
import { StyleSheet, Text } from 'react-native'

type FeedbackTextProps = {
  text: string
}

const FeedbackText: FC<FeedbackTextProps> = (props) => {
  const {text} = props
  return <Text style={styles.error}>{text}</Text>
}

export default FeedbackText

const styles = StyleSheet.create({
  error: {
    textAlign: 'center',
  },
})
