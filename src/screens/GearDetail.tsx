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
import { errorColor } from '../style/colors'

type GearDetailRouteProp = RouteProp<RootStackParamList, 'GearDetail'>

type GearDetailProps = {
  navigation: StackNavigationProp<RootStackParamList, 'GearDetail'>
  route: GearDetailRouteProp
}

const GearDetails: FC<GearDetailProps> = (props) => {
  const { navigation, route } = props
  const { singleItem } = route.params

  const { itemName, itemDescription, id } = singleItem
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

  // handleEditItem

  const handleDeleteItem = () => {
    const item = db.collection('main').doc(userId).collection('gear').doc(id)

    item
      .delete()
      .then(() => {
        console.log('Document successfully deleted!')
        navigation.navigate('GearList')
      })
      .catch((error: any) => {
        console.error('Error removing document: ', error)
      })
  }

  return (
    <>
      <Header titleText={'Gear Details'} />
      {!editing ? (
        <View style={styles.container}>
          <Text>Item Id: {id}</Text>
          <Text>Item Name: {itemName}</Text>
          <Text>Item Description: {itemDescription}</Text>
          <Button onPress={() => setEditing(!editing)}>Edit</Button>
          <Button color={errorColor} onPress={() => handleDeleteItem()}>
            Delete
          </Button>
          <Button onPress={() => navigation.navigate('GearList')}>
            Cancel
          </Button>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>Edit Text</Text>
          {/* <TextInput
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
          </View> */}
          <Button onPress={() => setEditing(!editing)}>Save</Button>
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
