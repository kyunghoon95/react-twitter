import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useState } from "react";
import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const Form = styled.form`
	display:flex;
	flex-direction:column;
	gap:10px;
`;
export const TextArea = styled.textarea`
	border:2px solid #fff;
	border-radius:20px;
	padding:20px;
	font-size:16px;
	color:#fff;
	background-color:#000;
	width:100%;
	resize:none;
	font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	&::placeholder {
		font-size:16px;
	}
	&:focus {
		outline:none;
		border-color:#1d9bf0;
	}
`;

export const AttachFileButton = styled.label`
	padding:10px 0;
	color:#1d9bf0;
	text-align:center;
	border-radius:20px;
	border:1px solid #1d9bf0;
	font-size:14px;
	font-weight:600;
	cursor: pointer;
`;

export const AttachFileInput = styled.input`
	display:none;
`;

export const SubmitBtn = styled.input`
	background-color:#1d9bf0;
	color:#fff;
	padding:10px 0;
	border:none;
	border-radius:20px;
	font-size:16px;
	cursor:pointer;
	&:hover, &:active {
		opacity:0.9;
	}
`;

export default function PostForm() {
	const [isLoading, setIsLoading] = useState(false);
	const [tweet, setTweet] = useState("");
	const [file, setFile] = useState<File|null>(null);


	const onChange = (e:React.ChangeEvent<HTMLTextAreaElement>) =>{
		setTweet(e.target.value);
	}

	const onFileChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
		const {files} = e.target;
		if(files && files.length ===1){
			setFile(files[0])
		}
	}

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
		const data = new Date();
    if (!user || isLoading || tweet === "" || tweet.length > 180) return;
    try {
			setIsLoading(true);
			const doc = await addDoc(collection(db, "tweets"), {
				tweet,
				createdAt: data,
				username: user.displayName || "Anonymous",
				userId: user.uid,
			});
			if(file){
				const locationRef = ref(storage, `tweets/${user.uid}/${doc.id}`);
				const result = await uploadBytes(locationRef, file);
				const url = await getDownloadURL(result.ref);
				await updateDoc(doc, {
					photo :url
				})
			}
			setTweet("")
			setFile(null)
    } catch (e) {
			console.log(e);
    } finally {
			setIsLoading(false);
    }
};

	return(
		<>
			<Form onSubmit={onSubmit}>
				<TextArea value={tweet} placeholder="내용을 쓰시오" onChange={onChange} rows={5} maxLength={180} required/>
				<AttachFileButton htmlFor="file">{file ? "Photo added ✅" : 'Add photo'}</AttachFileButton>
				<AttachFileInput onChange={onFileChange} id="file" type="file" accept="image/*"/>
				<SubmitBtn type="submit" value={isLoading ? "Posting..." :'Post Tweet'} />
			</Form>
		</>
	)
}
