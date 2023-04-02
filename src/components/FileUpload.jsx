import { storage } from '../config/firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react';

const FileUpload = () => {
	const [file, setFile] = useState(null);
	console.log('file: ', file);

	const uploadFile = async () => {
		if (!file) return;
		const fileFolderRef = ref(storage, `projectFiles/${file.name}`);
		try {
			const d = await uploadBytes(fileFolderRef, file);
			console.log('d: ', d);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div>
			<h2>File Upload</h2>
			<input type="file" onChange={e => setFile(e.target.files[0])} />
			<button onClick={uploadFile}>Upload</button>
		</div>
	);
};

export default FileUpload;
