import React, { useState, useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'

import Header from '@src/components/Header'
import firebaseInstance, { FirebaseContext } from '@src/firebase'

function AddNotes({ navigation }) {
  const [noteTitle, setNoteTitle] = useState('')
  const [noteValue, setNoteValue] = useState('')
  const { user } = useContext(FirebaseContext)
  const userId = user.uid
  function handleAddNote() {
    if (!user) {
      navigation.goBack()
    } else {
      const newNote = {
        noteTitle,
        noteValue,
      }
      firebaseInstance.db
        .collection('main')
        .doc(userId)
        .collection('notes')
        .add(newNote)
      navigation.navigate('ViewNotes')
    }
  }

  return (
    <>
      <Header titleText={'Add a new note'} />
      <View style={styles.container}>
        <TextInput
          label='Add Title Here'
          value={noteTitle}
          mode='outlined'
          onChangeText={setNoteTitle}
          style={styles.title}
        />
        <TextInput
          label='Add Note Here'
          value={noteValue}
          onChangeText={setNoteValue}
          mode='flat'
          multiline={true}
          style={styles.text}
          scrollEnabled={true}
          returnKeyType='done'
          blurOnSubmit={true}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Button onPress={() => navigation.navigate('ViewNotes')}>
            Cancel
          </Button>
          <Button
            disabled={noteTitle == '' ? true : false}
            onPress={() => handleAddNote()}
          >
            Add Note
          </Button>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  text: {
    height: 300,
    fontSize: 16,
  },
})

export default AddNotes
