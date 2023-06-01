import { Text, StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';

export default function CommentForm(props) {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Feather name="user" size={24} color="skyblue" />
        </View>
        <TextInput
          style={[styles.input, styles.first]}
          placeholder="Auteur..."
          placeholderTextColor="lightgrey"
          value={props.author}
          onChangeText={props.handleAuthorChange}
        />
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Feather name="edit-2" size={24} color="skyblue" />
        </View>
        <TextInput
          style={[styles.input, styles.second]}
          placeholder="Contenu..."
          placeholderTextColor="lightgrey"
          value={props.content}
          onChangeText={props.handleContentChange}
          multiline
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'skyblue',
    marginBottom: 4,
    width: '90%',
  },
  input: {
    flex: 1,
    padding: 10,
    color: 'white',
    fontSize: 16,
  },
  first: {
    height: 40,
  },
  second: {
    height: 120,
  },
  iconContainer: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
