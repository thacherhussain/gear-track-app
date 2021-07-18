import React, { FC, useState, useContext } from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { Stack, Input, Box, Text } from 'native-base'

import i18n from '../localization/i18n'
import { AppContext } from '../navigation/AppProvider'
import { db } from '../firebase/firebase'
import { RootStackParamList } from '@src/types'
import { Page, YesNoButtonGroup } from '@src/components'

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
    <Page>
      {!editing ? (
        <>
          <Box m={4}>
            <Text fontSize={'2xl'}>Item Name: {itemName}</Text>
            <Text>Item Description: {itemDescription}</Text>
          </Box>
          <YesNoButtonGroup
            yesText={i18n.t('Edit')}
            noText={i18n.t('Delete')}
            yesOnPress={() => setEditing(!editing)}
            noOnPress={() => handleDeleteItem()}
          />
        </>
      ) : (
        <>
          <Box m={4}>
            <Text fontSize={'2xl'}>{i18n.t('EditItem')}</Text>
          </Box>
          <Stack space={4} px={4}>
            <Input
              placeholder={i18n.t('ItemName')}
              value={newItemName}
              onChangeText={setNewItemName}
            />
            <Input
              placeholder={i18n.t('ItemDescription')}
              value={newItemDescription}
              onChangeText={setNewItemDescription}
              multiline={true}
              height={200}
              scrollEnabled={true}
              returnKeyType='done'
              blurOnSubmit={true}
            />
          </Stack>
          <YesNoButtonGroup
            yesText={i18n.t('Save')}
            noText={i18n.t('Cancel')}
            yesDisabled={newItemName == '' ? true : false}
            yesOnPress={() => handleEditItem()}
            noOnPress={() => setEditing(false)}
          />
        </>
      )}
    </Page>
  )
}

export default GearDetails
