import React, { FC, useState } from 'react'
import { Stack, Input, Button } from 'native-base'

import i18n from '../localization/i18n'
import { ErrorText, FeedbackText, Page } from '@src/components'
import { passwordReset } from '../firebase/firebase'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '@src/types'

type ForgotPasswordProps = {
  navigation: StackNavigationProp<RootStackParamList, 'ForgotPassword'>
}

const ForgotPassword: FC<ForgotPasswordProps> = () => {
  const [email, setEmail] = useState<string>('')
  const [isPasswordReset, setIsPasswordReset] = useState<boolean>(false)
  const [passwordResetError, setPasswordResetError] = useState<null | string>(
    null
  )

  const handleResetPassword = async () => {
    try {
      await passwordReset(email)
      setIsPasswordReset(true)
      setPasswordResetError(null)
    } catch (err) {
      console.error('Error sending email', err)
      setPasswordResetError(err.message)
      setIsPasswordReset(false)
    }
  }

  return (
    <Page>
      <Stack space={4} paddingX={4} safeArea>
        <Input
          placeholder={i18n.t('Email')}
          value={email}
          onChangeText={setEmail}
          autoCapitalize={'none'}
        />
        <Button
          onPress={() => handleResetPassword()}
          size={'sm'}
          colorScheme='teal'
        >
          {i18n.t('ResetPassword')}
        </Button>
        {isPasswordReset && (
          <FeedbackText text={i18n.t('CheckYourEmailToResetPassword')} />
        )}
        {passwordResetError && <ErrorText>{passwordResetError}</ErrorText>}
      </Stack>
    </Page>
  )
}

export default ForgotPassword
