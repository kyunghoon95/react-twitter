import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import Tweet from "./tweet";
import { Unsubscribe } from "firebase/auth";


export interface ITweet {
	id:string;
	photo?:string;
	tweet:string;
	userId:string;
	username:string;
	createdAt:number;



	
}

const Wrapper = styled.div`
	display:flex;
	gap:10px;
	flex-direction:column;
	overflow-y:scroll;
	&::-webkit-scrollbar{
		display:none;
	}
`;

export default function TimeLine() {
	const [tweets, setTweets] = useState<ITweet[]>([]);
	
	useEffect(() => {
		let unsubscribe : Unsubscribe | null = null;
		const fetchTweets = async() => {
			const tweetsQuery = query(
				collection(db, "tweets"),
				orderBy("createdAt", "desc"),
				limit(25)
			);
			unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
				const tweets = snapshot.docs.map(doc => {
					const {tweet, createdAt, userId, photo, username} = doc.data();
					return {
						tweet, createdAt, userId, photo, username, id:doc.id
					}
				});
				
				setTweets(tweets);
			})
		}
		fetchTweets();
		return ()=> {
			unsubscribe && unsubscribe();
		}
	},[])
	return (
		<Wrapper>
			{tweets.map(tweet => <Tweet key={tweet.id} {...tweet}/>)}
		</Wrapper>
	)
}
