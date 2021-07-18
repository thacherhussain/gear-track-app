import React, { FC } from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'native-base'

type FeedbackTextProps = {
  text: string
}

const FeedbackText: FC<FeedbackTextProps> = (props) => {
  const { text } = props
  return (
    <Text fontSize='xs' ml={'1'} style={styles.text}>
      {text}
    </Text>
  )
}

export default FeedbackText

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
})
