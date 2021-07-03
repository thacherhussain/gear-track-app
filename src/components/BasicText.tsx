import React, { FC, ReactNode } from 'react'
import { StyleSheet, Text } from 'react-native'

type BasicTextProps = {
  children: ReactNode
}

const BasicText: FC<BasicTextProps> = (props) => {
  const { children } = props
  return <Text style={styles.text}>{children}</Text>
}

export default BasicText

const styles = StyleSheet.create({
  text: {
    height: 300,
    fontSize: 16,
  },
})
