import React, { FC, useState, useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, TextInput, Text } from 'react-native-paper'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'

import i18n from '../localization/i18n'
import { AppContext } from '../navigation/AppProvider'
import { db } from '../firebase/firebase'
import { RootStackParamList } from '@src/types'
import { errorColor } from '../style/colors'
import { TitleText } from '../components'

type GearDetailRouteProp = RouteProp<RootStackParamList, 'GearDetail'>

type GearDetailProps = {
  navigation: StackNavigationProp<RootStackParamList, 'GearDetail'>
  route: GearDetailRouteProp
}

const GearDetails: FC<GearDetailProps> = (props) => {
  const { navigation, route } = props
  const { singleItem } = route.params

  const { itemName, itemDescription, id } = singleItem

  const [newItemName, setNewItemName] = useState<string>(itemName)
  const [newItemDescription, setNewItemDescription] =
    useState<string>(itemDescription)
  const [editing, setEditing] = useState<boolean>(false)

  const { user } = useContext(AppContext)
  const userId = user.uid
  const firebaseItem = db
    .collection('main')
    .doc(userId)
    .collection('gear')
    .doc(id)

  const handleEditItem = () => {
    firebaseItem
      .set({
        itemName: newItemName,
        itemDescription: newItemDescription,
      })
      .then(() => {
        navigation.goBack()
      })
      .catch((error: any) => {
        console.error('Error editing document: ', error)
      })
  }

  const handleDeleteItem = () => {
    firebaseItem
      .delete()
      .then(() => {
        console.log('Document successfully deleted!')
        navigation.goBack()
      })
      .catch((error: any) => {
        console.error('Error removing document: ', error)
      })
  }

  return (
    <>
      {!editing ? (
        <View style={styles.container}>
          <Text style={styles.title}>Item Name: {itemName}</Text>
          <Text style={styles.text}>Item Description: {itemDescription}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Button onPress={() => setEditing(!editing)}>
              {i18n.t('Edit')}
            </Button>
            <Button color={errorColor} onPress={() => handleDeleteItem()}>
              {i18n.t('Delete')}
            </Button>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 30,
            }}
          ></View>
        </View>
      ) : (
        <View style={styles.container}>
          <TitleText>{i18n.t('EditItem')}</TitleText>
          <TextInput
            label={i18n.t('ItemName')}
            value={newItemName}
            mode='outlined'
            onChangeText={setNewItemName}
            style={styles.title}
          />
          <TextInput
            label={i18n.t('ItemDescription')}
            value={newItemDescription}
            onChangeText={setNewItemDescription}
            mode='flat'
            multiline={true}
            style={styles.text}
            scrollEnabled={true}
            returnKeyType='done'
            blurOnSubmit={true}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Button onPress={() => setEditing(false)}>
              {i18n.t('Cancel')}
            </Button>
            <Button
              disabled={newItemName == '' ? true : false}
              onPress={() => handleEditItem()}
            >
              Save
            </Button>
          </View>
          {/* <Button onPress={() => setEditing(!editing)}>Save</Button> */}
        </View>
      )}
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
