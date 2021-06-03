import React, { useState, useContext } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { Text, FAB, List, Button } from 'react-native-paper'
import Header from '../components/Header'
import firebase, { FirebaseContext } from '../firebase'

function ViewNotes({ navigation }) {
  const [notes, setNotes] = useState([])
  const addNote = (note) => {
    note.id = notes.length + 1
    setNotes([...notes, note])
  }

  const { user } = useContext(FirebaseContext)

  return (
    <>
      <Header titleText='Simple Note Taker' />
      <View style={{ flexDirection: 'row' }}>
        {!user && (
          <>
            <Button onPress={() => navigation.navigate('Login')}>Login</Button>
            <Button onPress={() => navigation.navigate('ForgotPassword')}>
              Forgot
            </Button>
          </>
        )}
        {user && <Button onPress={() => firebase.logout()}>Logout</Button>}
      </View>
      {user && (
        <View>
          <Text>Hey {user.displayName}!</Text>
        </View>
      )}
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
          // add a second parameter object
          onPress={() =>
            navigation.navigate('AddNotes', {
              addNote,
            })
          }
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
