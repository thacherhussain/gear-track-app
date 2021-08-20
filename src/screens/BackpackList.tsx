import React, { FC, useState, useContext } from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
} from 'react-native'
import { List, IconButton, FAB } from 'react-native-paper'
import { Center, Text } from 'native-base'
import { StackNavigationProp } from '@react-navigation/stack'
import { useFocusEffect } from '@react-navigation/native'

import i18n from '@src/localization/i18n'
import { AppContext } from '@src/navigation/AppProvider'
import { db } from '@src/firebase/firebase'
import { RootStackParamList, Backpack } from '@src/types'
import { teal } from '@src/style/colors'
import { Page } from '@src/components'

type BackpackListProps = {
  navigation: StackNavigationProp<RootStackParamList, 'BackpackList'>
}

const BackpackList: FC<BackpackListProps> = (props) => {
  const { navigation } = props
  const { user } = useContext(AppContext)

  const [backpacks, setBackpacks] = useState<Backpack[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  useFocusEffect(
    React.useCallback(() => {
      getBackpacks()
    }, [])
  )

  const getBackpacks = async () => {
    setIsLoading(true)
    const doc = await db.collection('main').doc(user.uid).get()
    const backpacksRef = await doc.ref.collection('backpacks').get()

    const backpacksList: Backpack[] = []

    backpacksRef.forEach((item) => {
      const data = item.data() as Backpack | undefined

      if (data) {
        backpacksList.push({
          ...data,
          id: item.id,
        })
      }
    })

    backpacksList.sort((a, b) => a.backpackName.localeCompare(b.backpackName))

    setBackpacks(backpacksList)
    setIsLoading(false)
  }

  const refreshBackpacks = async () => {
    setRefreshing(true)
    const doc = await db.collection('main').doc(user.uid).get()
    const backpackRef = await doc.ref.collection('backpacks').get()

    const backpacksList: Backpack[] = []

    backpackRef.forEach((item) => {
      const data = item.data() as Backpack | undefined

      if (data) {
        backpacksList.push({
          ...data,
          id: item.id,
        })
      }
    })

    backpacksList.sort((a, b) => a.backpackName.localeCompare(b.backpackName))
    setBackpacks(backpacksList)
    setRefreshing(false)
  }

  const onPress = (item: Backpack) => {
    const singleItem = backpacks.find((i) => i.id === item.id)
    if (singleItem) {
      navigation.navigate('BackpackDetail', { singleItem: singleItem })
    }
  }

  const addButton = (
    <FAB
      style={styles.fab}
      small
      icon='plus'
      color={'white'}
      label={i18n.t('AddNewBackpack')}
      onPress={() => navigation.navigate('AddBackpack')}
    />
  )

  const body =
    backpacks.length === 0 ? (
      <Page>
        <Center>
          <Text style={styles.title}>{i18n.t('NoBackpacks')}</Text>
        </Center>
      </Page>
    ) : (
      <FlatList
        data={backpacks}
        style={styles.flatList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshBackpacks}
          />
        }
        renderItem={({ item }) => (
          <List.Item
            title={item.backpackName}
            description={item.backpackDescription}
            descriptionNumberOfLines={1}
            titleStyle={styles.listTitle}
            descriptionStyle={styles.listDescription}
            style={styles.listItem}
            onPress={() => onPress(item)}
            right={() => (
              <IconButton icon='chevron-right' size={30} color={teal} />
            )}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    )

  return (
    <>
      {isLoading ? (
        <View style={styles.titleContainer}>
          <ActivityIndicator size='large' />
        </View>
      ) : (
        <SafeAreaView style={{ height: '100%' }}>
          <View style={styles.container}>{body}</View>
          {addButton}
        </SafeAreaView>
      )}
    </>
  )
}

export default BackpackList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: 20,
  },
  fab: {
    position: 'absolute',
    margin: 20,
    marginBottom: 40,
    right: 0,
    bottom: 10,
    backgroundColor: teal,
  },
  flatList: {
    height: '110%',
    paddingTop: 16,
  },
  listTitle: {
    fontSize: 24,
  },
  listDescription: {
    fontSize: 16,
  },
  listItem: {
    padding: 0,
    paddingLeft: 5,
  },
})
