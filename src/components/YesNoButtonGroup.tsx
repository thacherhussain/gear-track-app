import React, { FC } from 'react'
import { Button } from 'native-base'

import { error, teal } from '../style/colors'

type YesNoButtonGroupProps = {
  yesText: string
  noText: string
  yesDisabled?: boolean
  yesOnPress: () => void
  noOnPress: () => void
}

const YesNoButtonGroup: FC<YesNoButtonGroupProps> = (props) => {
  const { yesText, noText, yesDisabled, yesOnPress, noOnPress } = props
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
        bg={'rose.600'}
        colorScheme={'rose'}
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
        colorScheme={'teal'}
      >
        {yesText}
      </Button>
    </Button.Group>
  )
}

export default YesNoButtonGroup
