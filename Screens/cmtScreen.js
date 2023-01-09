import React, { Component, useState, useEffect } from "react";
import {
  Text,
  TextInput,
  Button,
  ImageBackground,
  Image,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Comment } from "../components/Comment";
import { auth, postsRef, db } from "../firebase";
import { Ionicons } from "@expo/vector-icons";
import { Posts } from "../components/Post";
import { onSnapshot, doc, updateDoc } from "firebase/firestore";

function CmtScreen(props) {
  const post = props.route.params;
  const user = auth.currentUser;
  const [like, setlikes] = useState(likeChecking());
  const [CommentValue, setComment] = useState();
  function likeChecking() {
    if (
      post.likes.filter(function (userliked) {
        if (userliked == user.uid) {
          return true;
        }
      })
    ) {
      return true;
    }
  }
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
  function submitHandle(post) {
    const comments = post.comments;
    post.comments.push({
      authorImg: user.photoURL,
      authorName: user.displayName,
      authorComment: CommentValue,
    });
    updateDoc(doc(db, "posts", post.id), { comments });
    setComment("");
  }
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={{ marginTop: 100 }}>
        <View style={{ marginBottom: 10 }}>
          {
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
              likeHandle={() => likeHandle(post)}
            />
          }
        </View>
        <View style={styles.cmt}>
          <Image
            style={styles.Image}
            source={{
              uri: user.photoURL,
            }}
          />
          <View style={styles.text}>
            <TextInput
              style={styles.input}
              onChangeText={setComment}
              value={CommentValue}
              placeholder="Enter your comment..."
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Enter"
              color="blue"
              onPress={() => submitHandle(post)}
            />
          </View>
        </View>
        {post.comments.length != 0 &&
          post.comments.map((comment) => (
            <Comment
              authorImg={comment.authorImg}
              authorName={comment.authorName}
              authorComment={comment.authorComment}
              key={Math.random()}
            />
          ))}
      </View>
    </ScrollView>
  );
}
export default CmtScreen;
const styles = StyleSheet.create({
  cmt: {
    flexDirection: "row",
    height: 40,
    flex: 1,
    borderWidth: 1,
    borderColor: "white",
    marginBottom: 10,
  },
  Image: {
    height: 40,
    width: 40,
    borderRadius: 100,
    marginLeft: 5,
  },
  input: {
    fontSize: 18,
    color: "black",
    height: 40,
    width: 280,
    borderRadius: 20,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    height: 40,
    marginLeft: 10,
    marginRight: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    marginLeft: 10,
  },
});
