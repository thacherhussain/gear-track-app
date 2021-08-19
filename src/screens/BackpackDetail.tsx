import React, { FC, useState, useContext } from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { Stack, Input, Box, Text } from 'native-base'

import i18n from '../localization/i18n'
import { RootStackParamList } from '@src/types'
import { AppContext } from '../navigation/AppProvider'
import { db } from '../firebase/firebase'
import { Page, YesNoButtonGroup } from '@src/components'

type BackpackDetailRouteProp = RouteProp<RootStackParamList, 'BackpackDetail'>

type BackpackDetailProps = {
  navigation: StackNavigationProp<RootStackParamList, 'BackpackDetail'>
  route: BackpackDetailRouteProp
}

const BackpackDetail: FC<BackpackDetailProps> = (props) => {
  const { navigation, route } = props
  const { singleItem } = route.params

  const { backpackName, backpackDescription, id } = singleItem

  const [newBackpackName, setNewBackpackName] = useState<string>(backpackName)
  const [newBackpackDescription, setNewBackpackDescription] =
    useState<string>(backpackDescription)
  const [editing, setEditing] = useState<boolean>(false)

  const { user } = useContext(AppContext)
  const userId = user.uid
  const firebaseItem = db
    .collection('main')
    .doc(userId)
    .collection('backpacks')
    .doc(id)

  const handleEditItem = () => {
    firebaseItem
      .set({
        backpackName: newBackpackName,
        backpackDescription: newBackpackDescription,
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
            <Text fontSize={'2xl'}>Backpack Name: {backpackName}</Text>
            <Text>Backpack Description: {backpackDescription}</Text>
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
              value={newBackpackName}
              onChangeText={setNewBackpackName}
            />
            <Input
              placeholder={i18n.t('ItemDescription')}
              value={newBackpackDescription}
              onChangeText={setNewBackpackDescription}
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
            yesDisabled={newBackpackName == '' ? true : false}
            yesOnPress={() => handleEditItem()}
            noOnPress={() => setEditing(false)}
          />
        </>
      )}
    </Page>
  )
}

export default BackpackDetail
