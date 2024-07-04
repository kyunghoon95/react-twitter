import styled from "styled-components";
import EditForm from "../components/edit-form";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const Wrapper = styled.div`
  display: grid;
  gap: 50px;
  width: 100%;
  grid-template-rows: 1fr 5fr;
`;

export default function Edit() {
  const { id } = useParams();
  const [collId, setCollId] = useState<string>("");

  useEffect(() => {
    const fetchTweet = async () => {
      try {
        if (id) {
          const tweetRef = doc(db, "tweets", id);
          const docSnap = await getDoc(tweetRef);
          if (docSnap.exists()) {
            setCollId(docSnap.id);
          } else {
            console.log("사용자를 찾을 수 없습니다.");
          }
        }
      } catch (error) {
        console.error("사용자를 불러오는 중 에러 발생:", error);
      }
    };

    fetchTweet();
  }, [id]);

  return (
    <Wrapper>
      <EditForm collId={collId} />
    </Wrapper>
  );
}
