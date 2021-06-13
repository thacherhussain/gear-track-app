import React, { useState, useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'

import Header from '@src/components/Header'
import firebaseInstance, { FirebaseContext } from '@src/firebase'

function AddItems({ navigation }) {
  const [itemName, setItemName] = useState('')
  const [itemDescription, setItemDescription] = useState('')
  const { user } = useContext(FirebaseContext)
  const userId = user.uid
  function handleItem() {
    if (!user) {
      navigation.goBack()
    } else {
      const newItem = {
        itemName,
        itemDescription,
      }
      firebaseInstance.db
        .collection('main')
        .doc(userId)
        .collection('gear')
        .add(newItem)
      navigation.navigate('GearList')
    }
  }

  return (
    <>
      <Header titleText={'Add a new item'} />
      <View style={styles.container}>
        <TextInput
          label='Item Name'
          value={itemName}
          mode='outlined'
          onChangeText={setItemName}
          style={styles.title}
        />
        <TextInput
          label='Item Description'
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
            Cancel
          </Button>
          <Button
            disabled={itemName == '' ? true : false}
            onPress={() => handleItem()}
          >
            Add Item
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
