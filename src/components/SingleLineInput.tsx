import React, { FC } from 'react'
import { StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'

type SingleLineInputProps = {
  label: string
  value: string
  onChangeText: () => void
}

const SingleLineInput: FC<SingleLineInputProps> = (props) => {
  const { label, value, onChangeText } = props
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={() => onChangeText}
      mode='outlined'
      style={styles.input}
    />
  )
}

export default SingleLineInput

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    marginBottom: 20,
  },
})
