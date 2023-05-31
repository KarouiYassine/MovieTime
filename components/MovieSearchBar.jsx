import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';



const MovieSearchBar = ({ movieList, onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');



    const handleSearch = (text) => {
        setSearchQuery(text);
        onSearch(text);
    };



    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Icon name="search" size={20} color="gray" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search movies..."
                    onChangeText={handleSearch}
                    value={searchQuery}
                />
            </View>
        
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        color: "white",
    },
});



export default MovieSearchBar;