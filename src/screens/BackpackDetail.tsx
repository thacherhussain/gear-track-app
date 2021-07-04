import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { StackNavigationProp } from '@react-navigation/stack'

import i18n from '../localization/i18n'
import { RootStackParamList } from '@src/types'

type BackpackDetailProps = {
  navigation: StackNavigationProp<RootStackParamList, 'BackpackDetail'>
}

const BackpackDetail: FC<BackpackDetailProps> = (props) => {
  const { navigation } = props

  return (
    <View style={styles.container}>
      <Text>Backpack List</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
})

export default BackpackDetail
