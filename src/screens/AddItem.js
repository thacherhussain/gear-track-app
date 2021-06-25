import React, { useState, useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'

import i18n from '../localization/i18n'
import Header from '@src/components/Header'
import { AppContext } from '../navigation/AppProvider'
import { db } from '../firebase/firebase'

function AddItems({ navigation }) {
  const [itemName, setItemName] = useState('')
  const [itemDescription, setItemDescription] = useState('')
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
      navigation.navigate('GearList')
    }
  }

  return (
    <>
      <Header titleText={i18n.t('AddANewItem')} />
      <View style={styles.container}>
        <TextInput
          label={i18n.t('ItemName')}
          value={itemName}
          mode='outlined'
          onChangeText={setItemName}
          style={styles.title}
        />
        <TextInput
          label={i18n.t('ItemDescription')}
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
          <Button onPress={() => navigation.navigate('GearList')}>
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
  text: {
    height: 300,
    fontSize: 16,
  },
})

export default AddItems
