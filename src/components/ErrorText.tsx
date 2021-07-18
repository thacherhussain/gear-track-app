import React, { FC, ReactNode } from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'native-base'

import { errorColor } from '../style/colors'

type ErrorTextProps = {
  children: ReactNode
}

const ErrorText: FC<ErrorTextProps> = (props) => {
  const { children } = props
  return (
    <Text fontSize='xs' ml={'1'} style={styles.error}>
      {children}
    </Text>
  )
}

export default ErrorText

const styles = StyleSheet.create({
  error: {
    color: errorColor,
  },
})
