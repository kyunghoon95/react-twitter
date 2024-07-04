import styled from "styled-components";
import PostForm from "../components/post-form";
import TimeLine from "../components/timeline";

const Wrapper = styled.div`
	display:grid;
	gap:50px;
	width:100%;
	/* overflow-y:scroll; */
	grid-template-rows:1fr 5fr;
`;

export default function Home() {
	
	return(
		<Wrapper>
			<PostForm/>
			<TimeLine/>
		</Wrapper>
	)
}
