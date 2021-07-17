import React, { FC } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Input, Stack } from 'native-base'
import { StackNavigationProp } from '@react-navigation/stack'

import { RootStackParamList } from '@src/types'

type ScratchProps = {
  navigation: StackNavigationProp<RootStackParamList, 'ForgotPassword'>
}

const Scratch: FC<ScratchProps> = (props) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Stack space={4} w='100%' safeArea>
        <Input size='xs' placeholder='input' marginX='2' />
        <Input size='xs' placeholder='input' marginX='2' />
      </Stack>
    </ScrollView>
  )
}

export default Scratch
