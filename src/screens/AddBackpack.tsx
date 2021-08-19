import React, { FC, useState, useContext } from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { Stack, Input, Button } from 'native-base'

import i18n from '../localization/i18n'
import { AppContext } from '../navigation/AppProvider'
import { db } from '../firebase/firebase'
import { RootStackParamList } from '@src/types'
import { Page } from '@src/components'

type AddBackpackProps = {
  navigation: StackNavigationProp<RootStackParamList, 'AddBackpack'>
}

const AddBackpack: FC<AddBackpackProps> = (props) => {
  const { navigation } = props
  const [backpackName, setBackpackName] = useState<string>('')
  const [backpackDescription, setBackpackDescription] = useState<string>('')

  const { user } = useContext(AppContext)
  const userId = user.uid
  function handleItem() {
    if (!user) {
      navigation.goBack()
    } else {
      const newItem = {
        backpackName,
        backpackDescription,
      }
      db.collection('main').doc(userId).collection('backpacks').add(newItem)
      navigation.goBack()
    }
  }

  return (
    <Page>
      <Stack space={4} paddingX={4} safeArea>
        <Input
          placeholder={i18n.t('Name')}
          value={backpackName}
          onChangeText={setBackpackName}
        />
        <Input
          placeholder={i18n.t('Description')}
          value={backpackDescription}
          onChangeText={setBackpackDescription}
          multiline={true}
          height={200}
        />
        <Button
          disabled={backpackName == '' ? true : false}
          onPress={() => handleItem()}
          size={'sm'}
          colorScheme='teal'
        >
          {i18n.t('AddBackpack')}
        </Button>
      </Stack>
    </Page>
  )
}

export default AddBackpack
