import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Button } from 'react-native-paper'
import { StackNavigationProp } from '@react-navigation/stack'

import i18n from '../localization/i18n'
import Header from '@src/components/Header'
import { RootStackParamList } from '@src/types'

type BackpackProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Backpack'>
}

const Backpack: FC<BackpackProps> = (props) => {
  const { navigation } = props

  return (
    <>
      <Header titleText={i18n.t('Backpack')} />
      <View style={styles.container}>
        <Text>Backpack</Text>
        <Button onPress={() => navigation.navigate('GearList')}>
          To Gear List
        </Button>
      </View>
    </>
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

export default Backpack
