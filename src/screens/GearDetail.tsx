import React, { FC, useState, useContext } from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { Stack, Input, Box, Text } from 'native-base'

import i18n from '@src/localization/i18n'
import { RootStackParamList } from '@src/types'
import { AppContext } from '@src/navigation/AppProvider'
import { db } from '@src/firebase/firebase'
import { Page, YesNoButtonGroup } from '@src/components'

type GearDetailRouteProp = RouteProp<RootStackParamList, 'GearDetail'>

type GearDetailProps = {
  navigation: StackNavigationProp<RootStackParamList, 'GearDetail'>
  route: GearDetailRouteProp
}

const GearDetails: FC<GearDetailProps> = (props) => {
  const { navigation, route } = props
  const { singleItem } = route.params

  const { name, description, id } = singleItem

  const [newName, setNewName] = useState<string>(name)
  const [newDescription, setNewDescription] = useState<string>(description)
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
        name: newName,
        description: newDescription,
      })
      .then(() => {
        navigation.goBack()
      })
      .catch((error: unknown) => {
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
      .catch((error: unknown) => {
        console.error('Error removing document: ', error)
      })
  }

  return (
    <Page>
      {!editing ? (
        <>
          <Box m={4}>
            <Text fontSize={'2xl'}>{name}</Text>
            <Text>Description: {description}</Text>
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
            <Text fontSize={'2xl'}>{i18n.t('EditGear')}</Text>
          </Box>
          <Stack space={4} px={4}>
            <Input
              placeholder={i18n.t('ItemName')}
              value={newName}
              onChangeText={setNewName}
            />
            <Input
              placeholder={i18n.t('ItemDescription')}
              value={newDescription}
              onChangeText={setNewDescription}
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
            yesDisabled={newName == '' ? true : false}
            yesOnPress={() => handleEditItem()}
            noOnPress={() => setEditing(false)}
          />
        </>
      )}
    </Page>
  )
}

export default GearDetails
