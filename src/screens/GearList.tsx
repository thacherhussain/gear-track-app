import React, { FC, useState, useContext } from 'react'
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native'
import { Text, FAB, List, IconButton } from 'react-native-paper'
import { StackNavigationProp } from '@react-navigation/stack'
import { useFocusEffect } from '@react-navigation/native'

import i18n from '../localization/i18n'
import { AppContext } from '../navigation/AppProvider'
import { db } from '../firebase/firebase'
import { RootStackParamList } from '@src/types'

type GearListProps = {
  navigation: StackNavigationProp<RootStackParamList, 'GearList'>
}

const GearList: FC<GearListProps> = (props) => {
  const { navigation } = props
  const [gear, setGear] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { user } = useContext(AppContext)

  useFocusEffect(
    React.useCallback(() => {
      getGear()
    }, [])
  )

  const getGear = async () => {
    setIsLoading(true)
    const doc = await db.collection('main').doc(user.uid).get()
    const gearRef = await doc.ref.collection('gear').get()

    const gearList: any[] = []

    gearRef.forEach((item: any) => {
      const data = item.data()
      gearList.push({
        ...data,
        id: item.id,
      })
    })

    gearList.sort((a, b) => a.itemName.localeCompare(b.itemName))

    setGear(gearList)
    setIsLoading(false)
  }

  const onPress = (item: any) => {
    const singleItem = gear.find((i) => i.id === item.id)
    navigation.navigate('GearDetail', { singleItem: singleItem })
  }

  const body =
    gear.length === 0 ? (
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{i18n.t('NoGear')}</Text>
      </View>
    ) : (
      <FlatList
        data={gear}
        renderItem={({ item }) => (
          <>
            <List.Item
              title={item.itemName}
              description={item.itemDescription}
              descriptionNumberOfLines={1}
              titleStyle={styles.listTitle}
              onPress={() => onPress(item)}
              right={() => <IconButton icon='chevron-right' size={30} />}
            />
          </>
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
        <View style={styles.container}>
          {body}
          <FAB
            style={styles.fab}
            small
            icon='plus'
            label={i18n.t('AddNewItem')}
            onPress={() => navigation.navigate('AddItem')}
          />
        </View>
      )}
    </>
  )
}

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
    backgroundColor: '#1e6091',
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 10,
  },
  listTitle: {
    fontSize: 20,
  },
})

export default GearList
