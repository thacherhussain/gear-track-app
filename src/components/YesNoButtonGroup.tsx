import React, { FC } from 'react'
import { StyleSheet } from 'react-native'
import { Button } from 'native-base'

import { errorColor } from '../style/colors'

type YesNoButtonGroupProps = {
  yesText: string
  noText: string
  yesDisabled?: boolean
  yesColor?: string
  yesOnPress: () => void
  noOnPress: () => void
}

const YesNoButtonGroup: FC<YesNoButtonGroupProps> = (props) => {
  const { yesText, noText, yesDisabled, yesColor, yesOnPress, noOnPress } =
    props
  return (
    <Button.Group
      variant='solid'
      isAttached
      space={6}
      mx={{
        base: 'auto',
        md: 0,
      }}
      my={'2'}
      px={3}
    >
      <Button
        onPress={noOnPress}
        size={'sm'}
        flexGrow={1}
        m={'1'}
        colorScheme='danger'
        _text={{
          color: 'white',
        }}
      >
        {noText}
      </Button>
      <Button
        disabled={yesDisabled}
        onPress={yesOnPress}
        size={'sm'}
        flexGrow={1}
        m={'1'}
        colorScheme={yesColor ? yesColor : 'cyan'}
      >
        {yesText}
      </Button>
    </Button.Group>
  )
}

export default YesNoButtonGroup
