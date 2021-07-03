import React, { FC, ReactNode } from 'react'
import { StyleSheet, Text } from 'react-native'

type TitleTextProps = {
  children: ReactNode
}

const TitleText: FC<TitleTextProps> = (props) => {
  const { children } = props
  return <Text style={styles.title}>{children}</Text>
}

export default TitleText

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
})
