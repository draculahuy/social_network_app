import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Posts } from "../components/Post";
import { auth, postsRef, db } from "../firebase";
import { onSnapshot, doc, updateDoc } from "firebase/firestore";
function HomeScreen(navigation) {
  const user = auth.currentUser;
  const [like, setlikes] = useState(false);
  const [posts, setPosts] = useState([]);
  const temp = [];
  useEffect(
    () =>
      onSnapshot(postsRef, (snapshot) => {
        setPosts(
          snapshot.docs.map((post) => ({ ...post.data(), id: post.id }))
        );
      }),
    []
  );

  function likeHandle(post) {
    const likes = post.likes;
    if (!like) {
      setlikes(true);
      post.likes.push(user.uid);
      updateDoc(doc(db, "posts", post.id), { likes });
    } else {
      setlikes(false);
      post.likes.pop(user.uid);
      updateDoc(doc(db, "posts", post.id), { likes });
    }
  }

  function postHandle(post) {
    navigation.navigation.navigate("Comment", post);
  }

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View
        style={{
          backgroundColor: "white",
          // padding: 15,
        }}
      >
        {posts.length != 0 &&
          posts.map((post) => (
            <Posts
              avatar={post.user.avatarURI}
              username={post.user.author}
              tag={post.user.tag}
              createAt="15s"
              content={post.content}
              image={post.imageURI}
              likes={post.likes.length}
              comments={post.comments.length}
              key={post.id}
              postHandle={() => postHandle(post)}
              likeHandle={() => likeHandle(post)}
            />
          ))}
      </View>
    </ScrollView>
  );
}
const style = StyleSheet.create({
  container: {},
  wrap1: {},
  bubble: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderColor: "#fe5683",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
