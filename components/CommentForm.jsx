import { Text, StyleSheet, TextInput, View } from 'react-native'
import React from 'react'

export default function CommentForm(props) {
    return (
        <View>
            <Text style={styles.text}>Auteur:</Text>
            <TextInput style={[styles.input, styles.first, styles.placeholder]} placeholder="Author..." value={props.author} onChangeText={props.handleAuthorChange}></TextInput>
            <Text style={styles.text}>Contenu:</Text>
            <TextInput style={[styles.input, styles.first, styles.placeholder]} placeholder="Content..." value={props.content} onChangeText={props.handleContentChange}></TextInput>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    input: {
      borderWidth: 2,
      borderColor: 'skyblue',
      padding: 10,
      marginBottom: 4,
      width: '90%',
      color: 'white',
    },
    first: {
      height: 40,
    },
    second: {
      height: 120,
    },
    text: {
      fontWeight: 'bold',
      fontSize: 18,
      color: 'white',
      marginBottom: 5,
    },
    placeholder: {
      color: 'lightgrey',
    },
  });