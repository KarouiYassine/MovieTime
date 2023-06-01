import { View, Text, Modal, ScrollView, StyleSheet, TouchableOpacity, PanResponder } from 'react-native';
import React, { useState, useRef } from 'react';
import { updateMovie } from '../Fire';
import { Ionicons } from '@expo/vector-icons';
import CommentModal from './CommentModal'

export default function CommentsModal(props) {
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [toEditComment, setToEditComment] = useState(null);

  const comments = props.movie.comments;
  const [commentList, setCommentList] = useState(comments);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => gestureState.dx > 10,
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 50) {
          props.onClose(); // Go back when swiped from left to right
        }
      },
    })
  ).current;

  function deleteComment(toDeleteComment) {
    const list = commentList.filter((comment) => comment !== toDeleteComment);

    let movie = {
      id: props.movie.id,
      title: props.movie.title,
      synopsis: props.movie.synopsis,
      image: props.movie.image,
      comments: list,
    };

    setCommentList(list);
    updateMovie(movie);
  }

  return (
    <Modal style={styles.modal} visible={props.isVisible} presentationStyle="overFullScreen">
      <View style={styles.background} {...panResponder.panHandlers}>
        <TouchableOpacity style={styles.goBackButton} onPress={props.onClose}>
          <Ionicons name="arrow-back-outline" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>{props.movie.title}</Text>
        <Text style={styles.text}>Commentaires:</Text>
        <ScrollView>
          {commentList.map((comment, index) => (
            <View key={index} style={styles.commentContainer}>
              <View style={styles.commentContent}>
                <Text style={styles.author}>{comment.author}</Text>
                <Text style={styles.commContent}>{comment.content}</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => {
                    setIsCommentModalVisible(true);
                    setToEditComment(comment);
                  }}
                >
                  <Ionicons name="create-outline" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => deleteComment(comment)}
                >
                  <Ionicons name="trash-outline" size={20} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.iconButton, styles.addButton]}
            onPress={() => setIsCommentModalVisible(true)}
          >
            <Ionicons name="add-circle-outline" size={64} color="skyblue" />
          </TouchableOpacity>
        </View>

        {isCommentModalVisible && (
          <CommentModal
            isVisible={isCommentModalVisible}
            onClose={() => {
              setIsCommentModalVisible(false);
              setToEditComment(null);
            }}
            toEditComment={toEditComment}
            movie={props.movie}
          />
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  background: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  goBackButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  text: {
    fontSize: 18,
    fontWeight: 'normal',
    color: 'white',
    marginBottom: 10,
  },
  author: {
    fontSize: 21,
    fontWeight: 'normal',
    color: 'skyblue',
    marginBottom: 10,
  },
  commContent: {
    fontSize: 15,
    fontWeight: 'normal',
    color: 'white',
    marginBottom: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'skyblue',
    marginBottom: 10,
    textAlign: 'center',
  },
  commentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  commentContent: {
    flex: 1,
    paddingRight: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 10,
  },
  addButton: {
    backgroundColor: 'transparent',
    marginRight: 10,
    position: "fixed",
    bottom: 20,
    right: 20,
  },
});
