import React, { FC } from 'react'
import { Button } from 'native-base'

type PrimaryButtonProps = {
  text: string
  color?: string
  disabled?: boolean
  colorScheme?: string
  onPress: () => void
}

const PrimaryButton: FC<PrimaryButtonProps> = (props) => {
  const { text, color, colorScheme, disabled, onPress } = props

  const textColor = color ? color : 'white'

  return (
    <Button
      onPress={onPress}
      size={'sm'}
      flexGrow={1}
      disabled={disabled}
      colorScheme={colorScheme}
      _text={{
        color: textColor,
      }}
    >
      {text}
    </Button>
  )
}

export default PrimaryButton
