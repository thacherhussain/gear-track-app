import React, { FC, useState, useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, TextInput, Text } from 'react-native-paper'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'

import i18n from '../localization/i18n'
import Header from '@src/components/Header'
import { AppContext } from '../navigation/AppProvider'
import { db } from '../firebase/firebase'
import { RootStackParamList } from '@src/types'

type GearDetailRouteProp = RouteProp<RootStackParamList, 'GearDetail'>

type GearDetailProps = {
  navigation: StackNavigationProp<RootStackParamList, 'GearDetail'>
  route: GearDetailRouteProp
}

const GearDetails: FC<GearDetailProps> = (props) => {
  const { navigation, route } = props
  const { itemId } = route.params
  const [itemName, setItemName] = useState('')
  const [itemDescription, setItemDescription] = useState('')

  const [editing, setEditing] = useState<boolean>(false)

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

  async function getItem() {
    //if exists
    const doc = await db.collection('main').doc(user.uid).get()
    const gearRef = await doc.ref.collection('gear').doc(itemId).get()
    console.log(gearRef)
  }

  return (
    <>
      <Header titleText={'Gear Details'} />
      {editing ? (
        <View style={styles.container}>
          <Text>List of Gear Details</Text>
        </View>
      ) : (
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
              Save
            </Button>
          </View>
        </View>
      )}
      <Button onPress={() => navigation.navigate('GearList')}>
        To Gear List
      </Button>
      <Button onPress={() => getItem()}>GearRef</Button>
      <View>
        <Button onPress={() => setEditing(true)}>Edit</Button>
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

export default GearDetails
