import { View, Text, Modal, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { updateMovie } from '../Fire'
import AddButton from './AddButton'
import CommentModal from './CommentModal'

export default function CommentsModal(props) {

    const [isCommentModalVisible, setIsCommentModalVisible] = useState(false)
    const [toEditComment, setToEditComment] = useState()

    const comments = props.movie.comments
    const [commentList, setCommentList] = useState(comments)
    function deleteComment(toEditComment) {

        const list = commentList.filter((comment) => comment !== toEditComment)

        let movie = {
            "id": props.movie.id,
            "title": props.movie.title,
            "synopsis": props.movie.synopsis,
            "image": props.movie.image,
            "comments": list
        }
        setCommentList(list);
        updateMovie(movie);
    }

    return (

        <Modal style={styles.modal} visible={props.isVisible}>
            <View style={styles.background}>
                <Text style={styles.text}>{props.movie.title}</Text>
                <Text style={styles.text}>Commentaires:</Text>
                <ScrollView>
                    {commentList.map((comment, index) => (
                        <View key={index}>
                            <Text style={styles.text}>{comment.author}</Text>
                            <Text style={styles.text}>{comment.content}</Text>
                            <View style={styles.button}><AddButton content="Modifier" onClick={() => { setIsCommentModalVisible(true); setToEditComment(comment) }} /></View>
                            <View style={styles.button}><AddButton content="Supprimer" onClick={() => deleteComment(comment)} /></View>

                        </View>
                    ))}
                </ScrollView>
                <View style={styles.button}><AddButton content="Commenter" onClick={() => { setIsCommentModalVisible(true) }} /></View>
                <View style={styles.button}><AddButton content="Fermer" onClick={props.onClose} /></View>

                {isCommentModalVisible && (
                    <CommentModal isVisible={isCommentModalVisible} onClose={() => {setIsCommentModalVisible(false); setToEditComment(null)}} toEditComment={toEditComment} movie={props.movie} />
                )}
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
    subtitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 10
    },
    commentList: {
      maxHeight: '50%'
    },
    commentContainer: {
      backgroundColor: '#333',
      padding: 10,
      borderRadius: 5,
      marginBottom: 10
    },
    author: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white'
    },
    content: {
      fontSize: 14,
      color: 'white',
      marginTop: 5
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10
    },
    editButton: {
      backgroundColor: 'skyblue',
      marginRight: 5
    },
    deleteButton: {
      backgroundColor: 'tomato',
      marginLeft: 5
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
