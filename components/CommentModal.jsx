import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { updateMovie } from '../Fire';
import CommentForm from './CommentForm';
import { Ionicons } from '@expo/vector-icons';

export default function CommentModal(props) {
  const [author, setAuthor] = useState(props.toEditComment ? props.toEditComment.author : '');
  const [content, setContent] = useState(props.toEditComment ? props.toEditComment.content : '');

  const handleSubmit = () => {
        let movie = {
            "title": props.movie.title,
            "synopsis": props.movie.synopsis,
            "image": props.movie.image,
            "comments": props.movie.comments
        }

        let comment = {
            "author": author,
            "content": content,
        }

        if (props.toEditComment) {
            movie.id = props.movie.id
            movie.title = props.movie.title
            movie.image = props.movie.image
            movie.synopsis = props.movie.synopsis

            props.toEditComment.author = comment.author
            props.toEditComment.content = comment.content

            movie.comments = props.movie.comments

            updateMovie(movie)
        } else {
            movie.id = props.movie.id;
            movie.title = props.movie.title;
            movie.synopsis = props.movie.synopsis;
            movie.image = props.movie.image;
            props.movie.comments.push(comment);
            movie.comments = props.movie.comments;

            updateMovie(movie)
        }
        props.onClose()
    };

  return (
    <View>
      <Modal visible={props.isVisible} style={styles.modal}>
        <View style={styles.background}>
          <CommentForm
            author={author}
            content={content}
            handleAuthorChange={(newAuthor) => setAuthor(newAuthor)}
            handleContentChange={(newContent) => setContent(newContent)}
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
    </View>
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
