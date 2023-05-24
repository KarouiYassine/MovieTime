import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, addDoc, query, orderBy, onSnapshot,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCXtVVtZIPSFmpagrpeaumpJ8ThFyykAUA",
  authDomain: "movietime-49e63.firebaseapp.com",
  projectId: "movietime-49e63",
  storageBucket: "movietime-49e63.appspot.com",
  messagingSenderId: "641820636985",
  appId: "1:641820636985:web:5e2e9a5d1ddce069e7dae8"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export const getMovies = callback => {
  const q = query(collection(db, 'movies'), orderBy('title', 'asc'))
  onSnapshot(q, snapshot => {
    let movies = []
    snapshot.forEach(doc => {
      movies.push({ id: doc.id, ...doc.data() })
    })
    callback(movies)
  })
}

export const addMovie = movie => {
  addDoc(collection(db, 'movies'), movie)
}

export const updateMovie = movie => {
  updateDoc(doc(db, 'movies', movie.id), movie)
}

export const deleteMovie = movie => {
  deleteDoc(doc(db, 'movies', movie.id))
}


