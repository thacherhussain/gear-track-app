import React, { FC, ReactNode } from 'react'
import { StyleSheet, Text } from 'react-native'

import { errorColor } from '../style/colors'

type ErrorTextProps = {
  children: ReactNode
}

const ErrorText: FC<ErrorTextProps> = (props) => {
  const { children } = props
  return <Text style={styles.error}>{children}</Text>
}

export default ErrorText

const styles = StyleSheet.create({
  error: {
    color: errorColor,
  },
})
