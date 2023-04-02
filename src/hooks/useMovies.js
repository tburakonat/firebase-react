import { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { getDocs, collection } from 'firebase/firestore';

export default function useMovies() {
	const [movies, setMovies] = useState([]);

	const collectionRef = collection(db, 'movies');

	useEffect(() => {
		const getMovies = async () => {
			try {
				const data = await getDocs(collectionRef);
				const movies = data.docs.map(doc => ({
					id: doc.id,
					...doc.data(),
				}));
				setMovies(movies);
			} catch (e) {
				console.log(e);
			}
		};

		getMovies();
	}, []);

	return { movies };
}
