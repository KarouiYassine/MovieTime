import { View, Text, Modal, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { updateMovie } from '../Fire'
import CommentForm from './CommentForm'
import AddButton from './AddButton'

export default function CommentModal(props) {
    const [author, setAuthor] = useState(props.toEditComment ? props.toEditComment.author : "")
    const [content, setContent] = useState(props.toEditComment ? props.toEditComment.content : "")

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
    }
    console.log(author);
    return (
        <View>
            <Modal visible={props.isVisible} style={styles.modal}>
                <View style={styles.background}>
                    <CommentForm author={author} content={content} handleAuthorChange={newAuthor => setAuthor(newAuthor)} handleContentChange={newContent => setContent(newContent)} />

                    <View style={styles.button}><AddButton content="Valider" onClick={handleSubmit} /></View>
                    <View style={styles.button}><AddButton content="Fermer" onClick={props.onClose} /></View>
                </View>
            </Modal>
        </View>
    )
}


const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    button: {
        marginBottom: 5,
        alignItems: 'center',
    },
    background: {
        flex: 1,
        backgroundColor: 'black'
    },
    text: {
        color: 'white',
    },
});