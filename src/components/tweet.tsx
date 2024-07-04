import styled from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useNavigate } from "react-router-dom";


const Wrapper = styled.div`
	display:grid;
	grid-template-columns:3fr 1fr;
	padding:20px;
	border:1px solid rgba(255,255,255,0.5);
	border-radius:15px;
`;
const Column = styled.div``;
const Username = styled.span`
	font-weight:600;
	font-size:15px;
`;
const Payload = styled.p`
	margin:10px 0;
	font-size:18px;
`;
const Photo = styled.img`
	width:100%;
	height:100%;
	border-radius:15px;
`;

const DeleteButton = styled.button`
	background-color:tomato;
	color:#fff;
	font-weight:600;
	border:0;
	font-size:12px;
	padding:5px 10px;
	text-transform:uppercase;
	border-radius:5px;
	cursor: pointer;
`;

const EditButton = styled.button`
	background-color:#31e66d;
	color:#fff;
	font-weight:600;
	border:0;
	font-size:12px;
	padding:5px 10px;
	text-transform:uppercase;
	border-radius:5px;
	cursor: pointer;
	margin-left:10px;
`;



export default function Tweet({photo, username, tweet, userId, id}:ITweet) {
	const navigate = useNavigate();
	const user = auth.currentUser;
	const onDelete = async() => {
		const ok = confirm('진짜로 삭제할꺼임?');
		if(!ok || user?.uid !== userId) return;
		if(user?.uid !== userId) return;
		try {
			await deleteDoc(doc(db, "tweets", id));
			if(photo){
				const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
				await deleteObject(photoRef)
			}
		} catch (error) {
			console.log(error)
		} finally {
// 
		}
	}
	const onEdit = async() => {
		const ok = confirm('수정하시겠습니까?');
		if(!ok || user?.uid !== userId) return;
		navigate(`/edit/${id}`);
	}

	return(
		<Wrapper>
			<Column>
				<Username>{username}</Username>
				<Payload>{tweet}</Payload>
				{user?.uid === userId ? <DeleteButton onClick={onDelete}>Delete</DeleteButton> : null}
				{user?.uid === userId ? <EditButton onClick={onEdit}>Edit</EditButton> : null}
			</Column>
			<Column>
				{photo ? 
					<Photo src={photo}/>
				: null
				}
			</Column>
			
		</Wrapper>
	)
}
