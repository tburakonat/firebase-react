import useMovies from '../hooks/useMovies';
import { useState } from 'react';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

const Movies = () => {
	const { movies } = useMovies();
	const [title, setTitle] = useState('');
	const [releaseDate, setReleaseDate] = useState('');
	const [receivedOscar, setReceivedOscar] = useState(false);
	const [newTitle, setNewTitle] = useState('');

	const collectionRef = collection(db, 'movies');

	const handleFormSubmit = async e => {
		e.preventDefault();

		try {
			await addDoc(collectionRef, {
				title,
				releaseDate,
				receivedOscar,
				userId: auth?.currentUser?.uid,
			});
		} catch (e) {
			console.error(e);
		}
	};

	const deleteMovie = async id => {
		try {
			await deleteDoc(doc(db, 'movies', id));
		} catch (e) {
			console.error(e);
		}
	};

	const updateMovie = async id => {
		try {
			const movie = doc(db, 'movies', id);
			await updateDoc(movie, {
				title: newTitle,
			});
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div>
			<h2>Movies</h2>

			<form onSubmit={handleFormSubmit}>
				<input name="title" placeholder="title" value={title} onChange={e => setTitle(e.target.value)} />
				<input
					name="releaseDate"
					placeholder="release date"
					type="number"
					value={releaseDate}
					onChange={e => setReleaseDate(parseInt(e.target.value))}
				/>
				<label htmlFor="oscar">Received Oscar?</label>
				<input
					id="oscar"
					type="checkbox"
					checked={receivedOscar}
					onChange={e => setReceivedOscar(e.target.checked)}
				/>
				<button>Add Movie</button>
			</form>

			<div>
				{movies.map(movie => {
					return (
						<div key={movie.id}>
							<h3 style={{ color: movie.receivedOscar ? 'green' : 'black' }}>{movie.title}</h3>
							<p>{movie.releaseDate}</p>
							<button onClick={() => deleteMovie(movie.id)}>Delete</button>
							<input placeholder="new title..." onChange={e => setNewTitle(e.target.value)} />
							<button onClick={() => updateMovie(movie.id)}>Update</button>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Movies;
