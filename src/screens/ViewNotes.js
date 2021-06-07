import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { Text, FAB, List, Button } from 'react-native-paper'
import Header from '../components/Header'
import { FirebaseContext } from '../firebase'

function ViewNotes({ navigation }) {
  const [notes, setNotes] = useState([])
  const { user, firebase } = useContext(FirebaseContext)

  useEffect(() => {
    getNotes()
  }, [])

  function getNotes() {
    //should this by firebaseInstance?
    firebase.db.collection('notes').onSnapshot(handleSnapshot)
  }

  function handleSnapshot(snapshot) {
    const notes = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      }
    })
    setNotes(notes)
    // console.log({ notes })
  }

  return (
    <>
      <Header titleText={`${user.displayName}'s Notes`} />
      <View style={{ flexDirection: 'row' }}>
        {!user && (
          <>
            <Button onPress={() => navigation.navigate('Login')}>Login</Button>
            <Button onPress={() => navigation.navigate('ForgotPassword')}>
              Forgot
            </Button>
          </>
        )}
      </View>
      <View style={styles.container}>
        {notes.length === 0 ? (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>You do not have any notes</Text>
          </View>
        ) : (
          <FlatList
            data={notes}
            renderItem={({ item }) => (
              <List.Item
                title={item.noteTitle}
                description={item.noteValue}
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
          label='Add new note'
          onPress={() => navigation.navigate('AddNotes')}
        />
      </View>
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
    backgroundColor: '#6200ed',
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 10,
  },
  listTitle: {
    fontSize: 20,
  },
})

export default ViewNotes
