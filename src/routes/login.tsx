import React, { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Error, Form, Input, Switcher, Title, Wrapper } from "../components/auth-components";
import GithubBtn from "../components/github-btn";





export default function Login() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const onChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
		const {target : {name, value}} = e;
		if(name === "email"){
			setEmail(value)
		} else if(name === "password"){
			setPassword(value)
		}
	}

	const onSubmit = async(e : React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");
		if(isLoading || email ==="" || password ===""){
			return;
		}
		try {
			setIsLoading(true);
			await signInWithEmailAndPassword(auth, email, password)
			navigate("/");
		} catch (e){
			if(e instanceof FirebaseError){
				setError(e.message)
			}
		}
		finally {
			setIsLoading(false)
		}
		console.log(name, email, password)
	}

	return(
		<Wrapper>
			<Title>Login to X</Title>
			<Form onSubmit={onSubmit}>
				<Input name="email" value={email} placeholder="Email" type="email" required onChange={onChange}/>
				<Input name="password" value={password} placeholder="Password" type="password" required onChange={onChange}/>
				<Input type="submit" value={isLoading ? "Loading" : "Log in"}/>
			</Form>
			{error != "" ? <Error>{error}</Error> : null}
			<Switcher>
				Don't have an account? <Link to='/create-account'>Create one &rarr;</Link>
			</Switcher>
			<GithubBtn/>
		</Wrapper>
	)
}
