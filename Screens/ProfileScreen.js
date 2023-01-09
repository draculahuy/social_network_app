import React, { useEffect, useState, useContext } from "react";
import { Text, Image, View, StyleSheet, ScrollView } from "react-native";
import { Posts } from "../components/Post";
import { auth, userRef, postsRef } from "../firebase";
import { onSnapshot } from "firebase/firestore";
import { userContext } from "../navigations/ButtonTab";
function ProfileScreen() {
  const authorData = useContext(userContext);
  const [authorPosts, setauthorPosts] = useState([]);
  // const temp = [];
  useEffect(() => {
    onSnapshot(postsRef, (snapshot) => {
      setauthorPosts(snapshot.docs.map((post) => ({ ...post.data() })));
    });
  }, []);

  return (
    <ScrollView style={{ backgroundColor: "white",marginTop:10 }}>
      <View style={{}}>
        <Image
          style={styles.bgImage}
          source={{
            uri: "https://img.freepik.com/free-photo/night-starry-sky-bright-blue-galaxy-horizontal-background-3d-illustration-milky-way-universe_118047-10045.jpg?w=2000",
          }}
        />
        
        <View style={styles.bottomContainer}>
          {/* <Image style={styles.profile} source={{ uri: authorData.avatar }} /> */}
          <Image
          style={styles.profile}
          source={{
            uri: "https://img.freepik.com/free-photo/night-starry-sky-bright-blue-galaxy-horizontal-background-3d-illustration-milky-way-universe_118047-10045.jpg?w=2000",
          }}
        />
          <Text style={styles.name}>{authorData.name}</Text>
          <Text style={{ color: "black", bottom: "7%", fontSize:18}}>
            {authorData.hometown}
          </Text>
          <View style={{ flexDirection: "row"}}>
            <View style={styles.followersandfollowing}>
              <Text style={styles.number}>{authorData.followers.length}</Text>
              <Text
                style={[styles.number, { fontWeight: "normal", fontSize: 18, color:"black"}]}
              >
                Followers
              </Text>
            </View>
            <View style={styles.followersandfollowing}>
              <Text style={styles.numberSecond}>
                {authorData.following.length}
              </Text>
              <Text
                style={[
                  styles.numberSecond,
                  { fontWeight: "normal", fontSize: 18,color:"black" },
                ]}
              >
                Following
              </Text>
            </View>
          </View>

          <View
            style={{
              width: "100%",
            }}
          >
            {authorPosts.length != 0 &&
              authorPosts.map((post) => {
                if (post.user.tag == authorData.email) {
                  return (
                    <Posts
                      avatar={post.user.avatarURI}
                      username={post.user.author}
                      tag={post.user.tag}
                      createAt="15s"
                      content={post.content}
                      image={post.imageURI}
                      likes={post.likes.length}
                      comments={post.comments.length}
                      key={Math.random()}
                    />
                  );
                }
              })}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bgImage: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: 300,
    justifyContent: "center",
  },
  bottomContainer: {
    marginTop: "52%",
    height: "90%",
    width: "100%",
    backgroundColor: "white",
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    alignItems: "center",
  },
  profile: {
    height: 150,
    width: 150,
    borderRadius: 100,
    bottom: "8 %",
  },
  name: {
    fontSize: 36,
    fontWeight: "bold",
    bottom: "8%",
  },
  number: {
    color: "#6d6a7f",
    fontSize: 16,
    fontWeight: "bold",
  },
  numberSecond: {
    color: "#6d6a7f",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 36,
  },
  followersandfollowing: {
    bottom: "15%",
    alignItems: "center",
    borderBottomWidth:1,
  },
});
export default ProfileScreen;
