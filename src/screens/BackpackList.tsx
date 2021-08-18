import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { StackNavigationProp } from '@react-navigation/stack'
import { Button } from 'native-base'

import i18n from '../localization/i18n'
import { RootStackParamList } from '@src/types'

type BackpackListProps = {
  navigation: StackNavigationProp<RootStackParamList, 'BackpackList'>
}

const BackpackList: FC<BackpackListProps> = (props) => {
  const { navigation } = props

  return (
    <View style={styles.container}>
      <Text>{i18n.t('BackpackList')}</Text>
      <Button onPress={() => navigation.navigate('AddItem')}>
        {i18n.t('AddNewBackpack')}
      </Button>
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

export default BackpackList
