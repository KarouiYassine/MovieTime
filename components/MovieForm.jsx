import { Text, StyleSheet, TextInput, View } from 'react-native'
import React from 'react'

export default function MovieForm(props) {

    return (
        <View>
            <Text style={styles.text}>Titre:</Text>
            <TextInput style={[styles.input, styles.first, styles.placeholder]} placeholder="Titre..." value={props.title} onChangeText={props.handleTitleChange}></TextInput>
            <Text style={styles.text}>Image:</Text>
            <TextInput style={[styles.input, styles.first, styles.placeholder]} placeholder="Image" value={props.image} onChangeText={props.handleImageChange}></TextInput>
            <Text style={styles.text}>Synopsis:</Text>
            <TextInput style={[styles.input, styles.second, styles.placeholder]} placeholder="Synopsis..." value={props.synopsis} onChangeText={props.handleSynopsisChange} multiline></TextInput>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        borderWidth: 2,
        borderColor: "skyblue",
        padding: 10,
        marginBottom: 4,
        width: '90%',
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
        color: 'white'
    },
    placeholder: {
        color: 'lightgrey'
    },
});
