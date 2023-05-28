import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
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
    <ScrollView contentContainerStyle={styles.scrollView}>
      <SafeAreaView>
        <View style={styles.container}>
          <Image style={styles.logo} source={require('./logo.png')} />
          <Text style={styles.text}> Bienvenue sur MovieTime!</Text>
          <AddButton content="Ajouter un film" onClick={() => setIsModalVisible(true)} />
          <MovieSearchBar onSearch={handleSearch} />
          <TouchableOpacity style={styles.filterButton} onPress={toggleSortOrder}>
            <View style={styles.filterButtonText}>
              <Text>{sortOrder === 'asc' ? 'Trier par ordre alphabétique (Ascendant)' : 'Trier par ordre alphabétique (Descendant)'}</Text>
            </View>
          </TouchableOpacity>
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <View key={movie.id}>
                <Image source={{ uri: movie.image }} style={{ width: 180, height: 300 }} />
                <View>
                  <Text style={styles.text}>{movie.title}</Text>
                  <Text style={styles.text}>{movie.synopsis}</Text>
                </View>
                <AddButton
                  content="Modifier le film"
                  onClick={() => {
                    setIsModalVisible(true);
                    setToEditMovie(movie);
                  }}
                />
                <AddButton content="Supprimer le film" onClick={() => deleteMovie(movie)} />
                <AddButton
                  content="Commentaires"
                  onClick={() => {
                    setIsCommentsModalVisible(true);
                    setToEditMovie(movie);
                  }}
                />
              </View>
            ))
          ) : (
            <Text style={styles.text}>Aucun film trouvé</Text>
          )}
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
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textPrimary: {
    color: 'skyblue',
  },
  text: {
    color: 'white',
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 280,
    height: 200,
  },
  scrollView: {
    backgroundColor: 'black',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButton: {
    backgroundColor: 'gray',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  filterButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});