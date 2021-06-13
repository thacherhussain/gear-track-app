import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native'
import { Text, FAB, List } from 'react-native-paper'

import i18n from '../localization/i18n'
import Header from '@src/components/Header'
import { FirebaseContext } from '@src/firebase'

function GearList({ navigation }) {
  const [gear, setGear] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { user, firebase } = useContext(FirebaseContext)

  useEffect(() => {
    getGear()
  }, [])

  async function getGear() {
    setIsLoading(true)
    const doc = await firebase.db.collection('main').doc(user.uid).get()
    const gearRef = await doc.ref.collection('gear').get()

    const gearList = []

    gearRef.forEach((item) => {
      const data = item.data()
      gearList.push({
        ...data,
        id: item.id,
      })
    })
    setGear(gearList)
    setIsLoading(false)
  }

  return (
    <>
      <Header titleText={i18n.t('GearApp')} />
      {isLoading ? (
        <View style={styles.titleContainer}>
          <ActivityIndicator size='large' />
        </View>
      ) : (
        <View style={styles.container}>
          {gear.length === 0 ? (
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{i18n.t('NoGear')}</Text>
            </View>
          ) : (
            <FlatList
              data={gear}
              renderItem={({ item }) => (
                <List.Item
                  title={item.itemTitle}
                  description={item.itemDescription}
                  descriptionNumberOfLines={1}
                  titleStyle={styles.listTitle}
                />
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          )}
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
