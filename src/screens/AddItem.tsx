import React, { FC, useState, useContext } from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { Stack, Input, Button } from 'native-base'

import i18n from '@src/localization/i18n'
import { AppContext } from '@src/navigation/AppProvider'
import { db } from '@src/firebase/firebase'
import { RootStackParamList } from '@src/types'
import { Page } from '@src/components'

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
    <Page>
      <Stack space={4} paddingX={4} safeArea>
        <Input
          placeholder={i18n.t('Name')}
          value={itemName}
          onChangeText={setItemName}
        />
        <Input
          placeholder={i18n.t('Brand')}
          value={itemBrand}
          onChangeText={setItemBrand}
        />
        <Input
          placeholder={i18n.t('Color')}
          value={itemColor}
          onChangeText={setItemColor}
        />
        <Input
          placeholder={i18n.t('Size')}
          value={itemSize}
          onChangeText={setItemSize}
        />
        <Input
          placeholder={i18n.t('Weight')}
          value={itemWeight}
          onChangeText={setItemWeight}
        />
        {/* <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Input
              placeholder={i18n.t('Weight')}
              value={itemWeight}
              onChangeText={setItemWeight}
            />
          </View>
          <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}>
            <Text>Put Units Radio Buttons</Text>
          </View>
        </View> */}
        <Input
          placeholder={i18n.t('Description')}
          value={itemDescription}
          onChangeText={setItemDescription}
          multiline={true}
          height={200}
        />
        <Button
          disabled={itemName == '' ? true : false}
          onPress={() => handleItem()}
          size={'sm'}
          colorScheme='teal'
        >
          {i18n.t('AddItem')}
        </Button>
      </Stack>
    </Page>
  )
}

export default AddItems
