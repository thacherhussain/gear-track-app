import React, { FC, useState, useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { StackNavigationProp } from '@react-navigation/stack'

import i18n from '../localization/i18n'
import { AppContext } from '../navigation/AppProvider'
import { db } from '../firebase/firebase'
import { RootStackParamList } from '@src/types'

type AddItemProps = {
  navigation: StackNavigationProp<RootStackParamList, 'AddItem'>
}

const AddItems: FC<AddItemProps> = (props) => {
  const { navigation } = props
  const [itemName, setItemName] = useState<string>('')
  const [itemDescription, setItemDescription] = useState<string>('')
  const [itemBrand, setItemBrand] = useState<string>('')
  const [itemColor, setItemColor] = useState<string>('')
  const [itemSize, setItemSize] = useState<string>('')
  const [itemWeight, setItemWeight] = useState<string>('')
  const { user } = useContext(AppContext)
  const userId = user.uid
  function handleItem() {
    if (!user) {
      navigation.goBack()
    } else {
      const newItem = {
        itemName,
        itemDescription,
      }
      db.collection('main').doc(userId).collection('gear').add(newItem)
      navigation.goBack()
    }
  }

  return (
    <>
      <View style={styles.container}>
        <TextInput
          label={i18n.t('Name')}
          value={itemName}
          mode='outlined'
          onChangeText={setItemName}
          style={styles.input}
        />
        <TextInput
          label={i18n.t('Brand')}
          value={itemBrand}
          mode='outlined'
          onChangeText={setItemBrand}
          style={styles.input}
        />
        <TextInput
          label={i18n.t('Color')}
          value={itemColor}
          mode='outlined'
          onChangeText={setItemColor}
          style={styles.input}
        />
        <TextInput
          label={i18n.t('Size')}
          value={itemSize}
          mode='outlined'
          onChangeText={setItemSize}
          style={styles.input}
        />
        <TextInput
          label={i18n.t('Weight')}
          value={itemWeight}
          mode='outlined'
          onChangeText={setItemWeight}
          style={styles.input}
        />
        <TextInput
          label={i18n.t('Description')}
          value={itemDescription}
          onChangeText={setItemDescription}
          mode='flat'
          multiline={true}
          style={styles.text}
          scrollEnabled={true}
          returnKeyType='done'
          blurOnSubmit={true}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Button onPress={() => navigation.goBack()}>
            {i18n.t('Cancel')}
          </Button>
          <Button
            disabled={itemName == '' ? true : false}
            onPress={() => handleItem()}
          >
            {i18n.t('AddItem')}
          </Button>
        </View>
      </View>
    </>
  )
}

export default AddItems

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    fontSize: 16,
    marginBottom: 20,
  },
  text: {
    height: 200,
    fontSize: 16,
  },
})
