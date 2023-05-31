import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import MovieForm from './MovieForm';
import AddButton from './AddButton';
import { addMovie, updateMovie } from '../Fire';
import { Ionicons } from '@expo/vector-icons';

export default function MovieModal(props) {
  const [title, setTitle] = useState(props.editMovie ? props.editMovie.title : '');
  const [synopsis, setSynopsis] = useState(props.editMovie ? props.editMovie.synopsis : '');
  const [image, setImage] = useState(props.editMovie ? props.editMovie.image : '');

  const handleSubmit = () => {
    let movie = {
      id: props.editMovie ? props.editMovie.id : null,
      title: title,
      synopsis: synopsis,
      image: image,
      comments: props.editMovie ? props.editMovie.comments : [],
    };

    if (props.editMovie) {
      updateMovie(movie);
    } else {
      addMovie(movie);
    }

    props.onClose();
  };

  return (
    <Modal visible={props.isVisible} style={styles.modal}>
      <View style={styles.background}>
        <MovieForm
          title={title}
          synopsis={synopsis}
          image={image}
          handleTitleChange={(newTitle) => setTitle(newTitle)}
          handleSynopsisChange={(newSynopsis) => setSynopsis(newSynopsis)}
          handleImageChange={(newImage) => setImage(newImage)}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={handleSubmit}>
            <Ionicons name="checkmark" size={40} color="lightgreen" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={props.onClose}>
            <Ionicons name="close" size={40} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  iconButton: {
    alignItems: 'center',
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  background: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
  },
});
