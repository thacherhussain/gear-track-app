import React, { FC } from 'react'
import { StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'

type MultiLineInputProps = {
  label: string
  value: string
  onChangeText: () => void
}

const MultiLineInput: FC<MultiLineInputProps> = (props) => {
  const { label, value, onChangeText } = props
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      mode='flat'
      multiline={true}
      style={styles.text}
      scrollEnabled={true}
      returnKeyType='done'
      blurOnSubmit={true}
    />
  )
}

export default MultiLineInput

const styles = StyleSheet.create({
  text: {
    height: 200,
    fontSize: 16,
  },
})
