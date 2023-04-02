import { auth, googleProvider } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';

const Auth = () => {
	const [formData, setFormData] = useState({ email: '', password: '' });
	const [formData2, setFormData2] = useState({ email: '', password: '' });

	console.log('current user ', auth?.currentUser?.email);
	console.log('current user uid ', auth?.currentUser?.uid);

	const signIn = async e => {
		e.preventDefault();
		const { email, password } = formData;
		try {
			await createUserWithEmailAndPassword(auth, email, password);
		} catch (e) {
			console.error(e);
		}
		setFormData({ email: '', password: '' });
	};

	const signInWithGoogle = async e => {
		e.preventDefault();
		const { email, password } = formData2;
		try {
			await signInWithPopup(auth, googleProvider);
		} catch (e) {
			console.error(e);
		}
		setFormData2({ email: '', password: '' });
	};

	const handleFormChange = e => {
		setFormData(prev => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	};

	const logout = async () => {
		try {
			await auth.signOut();
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<>
			<h2>Sign In with Email and Password</h2>
			<form onSubmit={signIn}>
				<input name="email" placeholder="email" value={formData.email} onChange={handleFormChange} />
				<input name="password" placeholder="password" value={formData.password} onChange={handleFormChange} />
				<button>Login</button>
			</form>
			<button onClick={signInWithGoogle}>Sign In With Google</button>
			<button style={{ marginTop: '20px' }} onClick={logout}>
				Logout
			</button>
		</>
	);
};

export default Auth;
