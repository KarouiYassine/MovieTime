import { Button } from 'react-native'
import React from 'react'

export default function AddButton(props) {
    return (
        <Button color="skyblue" title={props.content} onPress={props.onClick} />
    )
}