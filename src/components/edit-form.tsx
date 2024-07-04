import { useEffect, useState } from "react";
import { AttachFileButton, AttachFileInput, Form, SubmitBtn, TextArea } from "./post-form";
import { auth, db, storage } from "../firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface IProps {
  collId: string;
}

export default function EditForm({ collId }: IProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [tweets, setTweets] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [oldTweets, setOldTweets] = useState("Enter your Tweet");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTweet = async () => {
      try {
        if (collId) {
          const tweetRef = doc(db, "tweets", collId);
          const docSnap = await getDoc(tweetRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setOldTweets(data.tweet);
          } else {
            console.log("No such document!");
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchTweet();
  }, [collId]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      setFile(files[0]);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user || isLoading || tweets === "" || tweets.length > 180) return;
    try {
      setIsLoading(true);
      const tweetRef = doc(db, "tweets", collId);
      await updateDoc(tweetRef, {
        tweet: tweets,
      });
      if (file) {
        const locationRef = ref(storage, `tweets/${user.uid}/${collId}`);
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        await updateDoc(tweetRef, {
          photo: url
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      navigate("/");
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweets(e.target.value);
  };

  return (
    <Form onSubmit={onSubmit}>
      <TextArea value={tweets} placeholder={oldTweets} onChange={onChange} rows={5} maxLength={180} required/>
      <AttachFileButton htmlFor="file">{file ? "Change added ✅" : "Change photo"}</AttachFileButton>
      <AttachFileInput onChange={onFileChange} id="file" type="file" accept="image/*"/>
      <SubmitBtn type="submit" value={isLoading ? "Editing..." : "Edit"} />
    </Form>
  );
}
