import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  avatar,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth, postsRef } from "../firebase";
import { addDoc, serverTimestamp } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";

function PostScreen(navigation) {
  const [img, setImg] = useState();
  const [content, setContent] = useState();
  const user = auth.currentUser;

  const PickingAvatarHandle = async () => {
    GetCammeraPermission();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [5, 5],
    });
    if (!result.cancelled) {
      setImg(result.uri);
    }
  };
  const submitHandle = async () => {
    await addDoc(postsRef, {
      user: {
        author: user.displayName,
        tag: user.email,
        avatarURI: user.photoURL,
      },
      createAt: serverTimestamp(),
      content: content,
      imageURI: img ? img : null,
      comments: [],
      likes: [],
    })
      .then(() => console.log("success"))
      .catch((error) => {
        console.log(error);
      });

    navigation.navigation.replace("Tab");
  };

  return (
    <ScrollView style={{ backgroundColor: "#F0F0F0" }}>
      <View style={{backgroundColor:'white',borderRadius:15, margin:10}}>
        <View style={styles.container}>
          <Image
            style={styles.bgImage}
            source={{
              uri: user.photoURL,
            }}
          />
          <View>
            <Text style={styles.name}>{user.displayName}</Text>
            <Text style={styles.tag}>{user.email}</Text>
          </View>
        </View>
        <View style={styles.caption}>
          <TextInput
            placeholder="What's on your mind?"
            style={{height:40, color:'black',fontSize:20,marginRight:10}}
            value={content}
            onChangeText={(content) => {
              setContent(content);
            }}
          ></TextInput>
        </View>
        <TouchableOpacity
          style={styles.imgPlaceholder}
          onPress={PickingAvatarHandle}
        >
          <Image
            style={styles.img}
            source={{
              uri: img,
            }}
          />
          <Ionicons name="images" size={50} color={"#D0D0D0"} />
        </TouchableOpacity>
        <View style={styles.button}>
          <Button title="Post" onPress={submitHandle} />
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor:'#E0E0E0',
    flexDirection: "row",
    flex: 1,
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
    alignItems: "center",
  },
  bgImage: {
    height: 70,
    width: 70,
    borderRadius: 100,
    marginLeft: 10,
  },
  name: {
    fontSize: 20,
    marginRight: 5,
    fontWeight: "bold",
  },
  tag: {
    fontSize: 15,
    color: "grey",
    marginRight: 5,
  },
  caption: {
    height:70,
    width:'100%',
    margin:10,
    fontSize: 24,
    color: "#333333",
  },
  imgPlaceholder: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    height: 200,
    borderColor: "#D0D0D0",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  img: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  button: {
    marginTop: 10,
    marginRight: 20,
    marginBottom: 10,
    alignItems: "flex-end",
  },
});
export default PostScreen;
