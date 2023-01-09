import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { auth, postsRef, db } from "../firebase";
import { onSnapshot, updateDoc, doc } from "firebase/firestore";
import { userContext } from "../navigations/ButtonTab";
import { Posts } from "../components/Post";

function UsersProfileScreen(props) {
  const authorData = useContext(userContext);
  const userData = props.route.params;
  const user = auth.currentUser;
  const [userPosts, setuserPosts] = useState([]);
  const [follow, setFollow] = useState({
    check: false,
    display: "follow",
  });

  function followHandle() {
    const followers = userData.followers;
    const following = authorData.following;

    if (!follow.check) {
      setFollow({
        check: true,
        display: "following",
      });
      followers.push(user.uid);
      following.push(authorData.uid);
      updateDoc(doc(db, "users", userData.uid), { followers }).catch((error) =>
        console.log(error)
      );
      updateDoc(doc(db, "users", authorData.uid), { following }).catch(
        (error) => console.log(error)
      );
    } else {
      setFollow({
        check: false,
        display: "follow",
      });
      followers.pop(userData.uid);
      following.pop(authorData.uid);
      updateDoc(doc(db, "users", userData.uid), { followers }).catch((error) =>
        console.log(error)
      );
      updateDoc(doc(db, "users", authorData.uid), { following }).catch(
        (error) => console.log(error)
      );
    }
  }

  useEffect(() => {
    onSnapshot(postsRef, (snapshot) => {
      setuserPosts(snapshot.docs.map((post) => ({ ...post.data() })));
    });
  }, []);
  function BackEvent() {
    props.navigation.goBack();
  }
  function chatHandle() {
    props.navigation.navigate("ChatBox", userData);
  }
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.containerImage}>
        <Image
          style={styles.bgImage}
          source={{
            uri: "https://img.freepik.com/free-photo/night-starry-sky-bright-blue-galaxy-horizontal-background-3d-illustration-milky-way-universe_118047-10045.jpg?w=2000",
          }}
        />
        <TouchableOpacity onPress={BackEvent}>
          <View
            style={{
              position: "absolute",
              height: 30,
              width: 50,
              borderRadius: 20,
              borderColor: "#dcdcdc",
              borderWidth: 1,
              margin: 40,
              justifyContent: "center",
              alignItems: "center",
              // backgroundColor: "red",
            }}
          >
            <Ionicons name="return-up-back-outline" size={30} color={"white"} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={followHandle}>
          <View
            style={{
              position: "absolute",
              height: 30,
              width: 100,
              borderRadius: 20,
              borderColor: "#dcdcdc",
              borderWidth: 1,
              marginTop: 40,
              marginHorizontal: 270,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white" }}>{follow.display}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={chatHandle}>
          <View
            style={{
              position: "absolute",
              marginTop: 140,
              marginHorizontal: 140,
              flex: 1,
              transform: [{ scaleX: -1 }],
            }}
          >
            <Ionicons
              name="chatbox-ellipses-outline"
              size={30}
              color={"white"}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.bottomContainer}>
          <Image style={styles.profile} source={{ uri: userData.avatar }} />
          <Text style={styles.name}>{userData.name}</Text>
          <Text style={{ color: "grey", bottom: "7%" }}>
            {/* {userData.hometown}
             */}
            Hai Phong, Viet Nam
          </Text>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.followersandfollowing}>
              <Text style={styles.number}>{userData.followers.length}</Text>
              <Text
                style={[styles.number, { fontWeight: "normal", fontSize: 18 }]}
              >
                followers
              </Text>
            </View>
            <View style={styles.followersandfollowing}>
              <Text style={styles.numberSecond}>
                {userData.following.length}
              </Text>
              <Text
                style={[
                  styles.numberSecond,
                  { fontWeight: "normal", fontSize: 18 },
                ]}
              >
                following
              </Text>
            </View>
          </View>

          <View
            style={{
              width: "100%",
            }}
          >
            {userPosts.length != 0 &&
              userPosts.map((post) => {
                if (post.user.tag == userData.email) {
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
    height: "100%",
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
    height: 120,
    width: 120,
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
    bottom: "5%",
    alignItems: "center",
  },
});
export default UsersProfileScreen;
