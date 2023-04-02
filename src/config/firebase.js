// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyAlCpVI7nbtaze2e5u_t3O_MNg9tgLpkro',
	authDomain: 'fir-react-6d0b4.firebaseapp.com',
	projectId: 'fir-react-6d0b4',
	storageBucket: 'fir-react-6d0b4.appspot.com',
	messagingSenderId: '1031262020890',
	appId: '1:1031262020890:web:3b6ecc258919d28adbb8a3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
