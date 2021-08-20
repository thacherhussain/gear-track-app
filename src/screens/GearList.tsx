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
import { RootStackParamList, Gear } from '@src/types'
import { teal } from '@src/style/colors'
import { Page } from '@src/components'

type GearListProps = {
  navigation: StackNavigationProp<RootStackParamList, 'GearList'>
}

const GearList: FC<GearListProps> = (props) => {
  const { navigation } = props
  const { user } = useContext(AppContext)

  const [gear, setGear] = useState<Gear[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [refreshing, setRefreshing] = useState(false)

  useFocusEffect(
    React.useCallback(() => {
      getGear()
    }, [])
  )

  const getGear = async () => {
    setIsLoading(true)
    const doc = await db.collection('main').doc(user.uid).get()
    const gearRef = await doc.ref.collection('gear').get()

    const gearList: Gear[] = []

    gearRef.forEach((item) => {
      const data = item.data() as Gear | undefined
      if (data) {
        gearList.push({
          ...data,
          id: item.id,
        })
      }
    })

    gearList.sort((a, b) => a.itemName.localeCompare(b.itemName))

    setGear(gearList)
    setIsLoading(false)
  }

  const refreshGear = async () => {
    setRefreshing(true)
    const doc = await db.collection('main').doc(user.uid).get()
    const gearRef = await doc.ref.collection('gear').get()

    const gearList: Gear[] = []

    gearRef.forEach((item) => {
      const data = item.data() as Gear | undefined
      if (data) {
        gearList.push({
          ...data,
          id: item.id,
        })
      }
    })

    gearList.sort((a, b) => a.itemName.localeCompare(b.itemName))
    setGear(gearList)
    setRefreshing(false)
  }

  const onPress = (item: Gear) => {
    const singleItem = gear.find((i) => i.id === item.id)
    if (singleItem) {
      navigation.navigate('GearDetail', { singleItem: singleItem })
    }
  }

  const addButton = (
    <FAB
      style={styles.fab}
      small
      icon='plus'
      color={'white'}
      label={i18n.t('AddNewItem')}
      onPress={() => navigation.navigate('AddItem')}
    />
  )

  const body =
    gear.length === 0 ? (
      <Page>
        <Center>
          <Text style={styles.title}>{i18n.t('NoGear')}</Text>
        </Center>
      </Page>
    ) : (
      <FlatList
        data={gear}
        style={styles.flatList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshGear} />
        }
        renderItem={({ item }) => (
          <List.Item
            title={item.itemName}
            description={item.itemDescription}
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
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

export default GearList
