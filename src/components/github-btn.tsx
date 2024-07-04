import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import styled from "styled-components"
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Button = styled.span`
	margin-top:50px;
	background-color:#fff;
	font-weight:500;
	padding:10px 20px;
	border-radius:50px;
	border:0;
	display:flex;
	width:100%;
	gap:5px;
	justify-content:center;
	align-items:center;
	color:#000;
	cursor: pointer;
`;
const Logo = styled.img`
	height:25px;
`;

export default function GithubBtn() {
	const navigate = useNavigate()
	const onClick = async() => {
		const provider = new GithubAuthProvider();
		
		try{
			await signInWithPopup(auth, provider);
			// await signInWithRedirect(auth, provider);
			navigate('/');
		} catch(error){
			console.log(error)
		}
	}
	return (
		<>
			<Button onClick={onClick}>
				<Logo src="/github-logo.svg"/>
				Continue with Github
			</Button>
		</>
	)
}
