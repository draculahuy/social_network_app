import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { auth, db } from "../firebase";
import {
  addDoc,
  onSnapshot,
  collection,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export function ChatBoxScreen(props) {
  const userData = props.route.params;
  const user = auth.currentUser;
  const [messages, setMessages] = useState([]);
  const [tmp, settmp] = useState([]);

  useEffect(() => {
    onSnapshot(collection(db, "messages"), (snapshot) => {
      snapshot.docs.map((message) => {
        if (
          message.id ==
          "OxfFkgcIJOcIUkQyq1viUZbfkm62IctXAr8bc1dELy1lGSy4fiQJF3j1"
        ) {
          setMessages(message.data().messages);
          settmp(message.data().messages);
        }
      });
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={(message) => {
        tmp.push(message[0]);
        console.log(tmp);

        const docID = user.uid + userData.uid;

        setDoc(doc(db, "messages", docID), {
          messages: tmp,
        });
      }}
      user={{
        _id: user.uid,
        avatar: user.photoURL,
        name: user.displayName,
      }}
    />
  );
}
