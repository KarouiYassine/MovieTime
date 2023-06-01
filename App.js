import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import AddButton from './components/AddButton';
import MovieModal from './components/MovieModal';
import { deleteMovie, getMovies, updateMovie } from './Fire';
import CommentsModal from './components/CommentsModal';
import MovieSearchBar from './components/MovieSearchBar';

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCommentsModalVisible, setIsCommentsModalVisible] = useState(false);
  const [toEditMovie, setToEditMovie] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      getMovies((movies) => {
        setMovies(movies);
        setLoading(false);
        applyFilterAndSort(movies, searchQuery);
      });
    } catch (error) {
      console.log('Error fetching movies: ', error);
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    applyFilterAndSort(movies, text);
  };

  const applyFilterAndSort = (movies, query) => {
    let filteredList = movies;

    if (query) {
      filteredList = movies.filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase()));
    }

    const sortedList = filteredList.sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      return sortOrder === 'asc' ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
    });

    setFilteredMovies(sortedList);
  };

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    applyFilterAndSort(movies, searchQuery);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('./logo.png')} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.searchFilterContainer}>
          <View style={styles.searchBarContainer}>
            <MovieSearchBar style={styles.searchBar} onSearch={handleSearch} />
            <TouchableOpacity style={styles.filterButton} onPress={toggleSortOrder}>
              <Feather name="filter" size={24} color="skyblue" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={() => setIsModalVisible(true)}>
            <Ionicons name="add-circle" size={40} color="skyblue" />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <View key={movie.id} style={styles.movieContainer}>
                <Image source={{ uri: movie.image }} style={styles.movieImage} />
                <View>
                  <Text style={styles.movieTitle}>{movie.title}</Text>
                  <Text style={styles.movieSynopsis}>{movie.synopsis}</Text>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      setIsModalVisible(true);
                      setToEditMovie(movie);
                    }}
                  >
                    <Feather name="edit" size={24} color="skyblue" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={() => deleteMovie(movie)}>
                    <Feather name="trash-2" size={24} color="red" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      setIsCommentsModalVisible(true);
                      setToEditMovie(movie);
                    }}
                  >
                    <Feather name="message-square" size={24} color="skyblue" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.text}>Aucun film trouvé</Text>
          )}
        </ScrollView>
        {isModalVisible && (
          <MovieModal
            isVisible={isModalVisible}
            onClose={() => {
              setIsModalVisible(false);
              setToEditMovie(null);
            }}
            editMovie={toEditMovie}
          />
        )}
        {isCommentsModalVisible && (
          <CommentsModal
            isVisible={isCommentsModalVisible}
            onClose={() => {
              setIsCommentsModalVisible(false);
              setToEditMovie(null);
            }}
            movie={toEditMovie}
          />
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textPrimary: {
    color: 'skyblue',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    color: 'white',
  },
  logo: {
    width: 280,
    height: 200,
    marginBottom: 20,
  },
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    flex: 1,
  },
  filterButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  addButton: {},
  movieContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  movieImage: {
    width: 180,
    height: 300,
    marginBottom: 10,
  },
  movieTitle: {
    color: 'white',
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  movieSynopsis: {
    color: 'white',
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
    borderRadius: 5,
  },
});
