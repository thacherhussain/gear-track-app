import React, { FC, ReactNode } from 'react'
import { ScrollView, Box } from 'native-base'

type PageProps = {
  children: ReactNode
}

const Page: FC<PageProps> = (props) => {
  const { children } = props
  return (
    <ScrollView showsVerticalScrollIndicator={false} bg={'white'}>
      <Box flex={1} p={2} w='100%' mx='auto'>
        {children}
      </Box>
    </ScrollView>
  )
}

export default Page
