import React, { useState, useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { IconButton, TextInput, FAB } from 'react-native-paper'
import Header from '../components/Header'
import firebaseInstance, { FirebaseContext } from '../firebase'

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
      <IconButton
        icon='close'
        size={25}
        color='white'
        onPress={() => navigation.goBack()}
        style={styles.iconButton}
      />
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
        <FAB
          style={styles.fab}
          small
          icon='check'
          disabled={noteTitle == '' ? true : false}
          onPress={() => handleAddNote()}
        />
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
  iconButton: {
    backgroundColor: 'rgba(46, 113, 102, 0.8)',
    position: 'absolute',
    right: 0,
    top: 40,
    margin: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  text: {
    height: 300,
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
  },
})

export default AddNotes
