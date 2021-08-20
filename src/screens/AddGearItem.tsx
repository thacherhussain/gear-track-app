import React, { FC, useState, useContext } from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { Stack, Input, Button } from 'native-base'

import i18n from '@src/localization/i18n'
import { AppContext } from '@src/navigation/AppProvider'
import { db } from '@src/firebase/firebase'
import { RootStackParamList } from '@src/types'
import { Page } from '@src/components'

type AddGearItemProps = {
  navigation: StackNavigationProp<RootStackParamList, 'AddGearItem'>
}

const AddGearItems: FC<AddGearItemProps> = (props) => {
  const { navigation } = props
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [brand, setBrand] = useState<string>('')
  const [color, setColor] = useState<string>('')
  const [size, setSize] = useState<string>('')
  const [weight, setWeight] = useState<string>('')
  const { user } = useContext(AppContext)
  const userId = user.uid
  function handleItem() {
    if (!user) {
      navigation.goBack()
    } else {
      const newItem = {
        name,
        description,
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
          value={name}
          onChangeText={setName}
        />
        <Input
          placeholder={i18n.t('Brand')}
          value={brand}
          onChangeText={setBrand}
        />
        <Input
          placeholder={i18n.t('Color')}
          value={color}
          onChangeText={setColor}
        />
        <Input
          placeholder={i18n.t('Size')}
          value={size}
          onChangeText={setSize}
        />
        <Input
          placeholder={i18n.t('Weight')}
          value={weight}
          onChangeText={setWeight}
        />
        {/* <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Input
              placeholder={i18n.t('Weight')}
              value={weight}
              onChangeText={setWeight}
            />
          </View>
          <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}>
            <Text>Put Units Radio Buttons</Text>
          </View>
        </View> */}
        <Input
          placeholder={i18n.t('Description')}
          value={description}
          onChangeText={setDescription}
          multiline={true}
          height={200}
        />
        <Button
          disabled={name == '' ? true : false}
          onPress={() => handleItem()}
          size={'sm'}
          colorScheme='teal'
        >
          {i18n.t('AddGearItem')}
        </Button>
      </Stack>
    </Page>
  )
}

export default AddGearItems
