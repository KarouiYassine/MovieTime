import { View, Text, Button, StyleSheet, Modal } from 'react-native'
import React, { useState } from 'react'
import MovieForm from './MovieForm';
import AddButton from './AddButton';
import { addMovie, updateMovie } from '../Fire';

export default function MovieModal(props) {
    console.log(props.isVisible);
    const [title, setTitle] = useState(props.editMovie ? props.editMovie.title : "");
    const [synopsis, setSynopsis] = useState(props.editMovie ? props.editMovie.synopsis : "");
    const [image, setImage] = useState(props.editMovie ? props.editMovie.image : "");

    const handleSubmit = () => {
        let movie = {
            "title": title,
            "synopsis": synopsis,
            "image": image,
            "comments": []
        }
        if (props.editMovie) {
            movie.id = props.editMovie.id
            movie.comments = props.editMovie.comments
            updateMovie(movie)
        } else {
            addMovie(movie)
        }
        props.onClose()
    }

    return (
        <Modal style={styles.modal} visible={props.isVisible}>
            <View style={styles.background}>
                <MovieForm title={title} synopsis={synopsis} image={image} handleTitleChange={newTitle => setTitle(newTitle)} handleSynopsisChange={newSynopsis => setSynopsis(newSynopsis)} handleImageChange={newImage => setImage(newImage)} />

                <View style={styles.button}><AddButton content="Valider" onClick={handleSubmit} /></View>
                <View style={styles.button}><AddButton content="Fermer" onClick={props.onClose} /></View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
      paddingHorizontal: 20,
      paddingTop: 20
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 10
    },
    input: {
      borderWidth: 2,
      borderColor: 'skyblue',
      padding: 10,
      marginBottom: 10,
      width: '100%',
      color: 'white'
    },
    text: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 5
    },
    placeholder: {
      color: 'lightgrey'
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20
    },
    addButton: {
      backgroundColor: 'skyblue',
      marginRight: 10
    },
    closeButton: {
      backgroundColor: 'tomato',
      marginLeft: 10
    }
  });