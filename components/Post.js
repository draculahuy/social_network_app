import react, { useState } from "react";
import { Text, Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar } from "./Avatar";
import { Ionicons,AntDesign } from "@expo/vector-icons";
import { auth, postsRef } from "../firebase";
import { onSnapshot } from "firebase/firestore";
export function Posts({
  username,
  tag,
  createAt,
  content,
  image,
  avatar,
  comments,
  likes,
  postHandle,
  likeHandle,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Avatar image={avatar} size={50} />
        <View style={styles.righthead}>
          <View style={styles.rightWrap}>
            <View style={styles.contentWrap1}>
              <View style={styles.usernameWrap}>
                <Text style={styles.name}>{username}</Text>
                <Text style={styles.tag}>{tag}</Text>

                {/* <Text style={styles.createAt}>{moment(createAt).fromNow()}</Text> */}
              </View>
            </View>
          </View>
          <View style={styles.time}>
            <Ionicons name="time-outline" size={15} color="#707070" />
            <Text style={styles.createAt}>{createAt}</Text>
          </View>
        </View>
        <View style={styles.edit}>
          <Ionicons name="caret-down-outline" size={24} color="grey" />
        </View>
      </View>
      <View style={styles.contentWrap2}>
        <View style={styles.contentWrap}>
          <Text style={styles.styletext}>{content}</Text>
          {image ? (
            <Image
              source={{ uri: image }}
              style={{width: '100%', height:300, justifyContent: "center",}}
            />
          ) : null}
        </View>
        <View style={styles.contain}>
          <View style={styles.iconContainer}>
            <AntDesign name="like1" size={23} color={"#1b74e4" }/>
            <Text style={styles.number}>{likes}</Text>
          </View>

          <View style={styles.iconContainer}>
              <Ionicons name="chatbox-ellipses-outline" size={23} color="black"/>
            <Text style={styles.number}>{comments}</Text>
          </View>
        </View>

        <View style={styles.interactive} >
          <View style={styles.interactive2}>
            <TouchableOpacity onPress={likeHandle}>
            <View style={{flexDirection:'row'}}>
              <AntDesign name="like2" size={23} color={"#65676b" }/>
              <Text style={styles.textview}>Like</Text>
              </View>
            </TouchableOpacity>
          </View>
        
          <View style={styles.interactive2}>
            <TouchableOpacity onPress={postHandle}>
              <View style={{flexDirection:'row'}}>
              <Ionicons
                name="chatbox-ellipses-outline"
                size={23}
                color="black"
              />
              <Text style={styles.textview}>Comment</Text>
              </View>
            </TouchableOpacity>
          </View>
          
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F0F0',
    marginTop: 10,
    borderRadius: 15,
    marginHorizontal: 10,
  },
  head: {
    flex: 1,
    flexDirection: "row",
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
    backgroundColor: "#E0E0E0",
  },
  righthead: {
    marginLeft: 10,
  },
  rightWrap: {},
  name: {
    fontSize: 22,
    marginRight: 5,
    fontWeight: "bold",
    alignContent: "center",
  },
  tag: {
    fontSize: 18,
    color: "gray",
    marginRight: 5,
    marginTop:4,
    // alignContent: "flex-end",
    // alignItems: "flex-end",
    // justifyContent:'flex-end',
  },
  time: {
    flexDirection: "row",
  },
  createAt: {
    marginRight: 10,
    color: "#707070",
  },
  edit: {

  },
  contentWrap: {
    justifyContent: "space-between",
  },
  usernameWrap: {
    flexDirection: "row",
  },
  contentWrap1: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  contentWrap2: {
    fontWeight: "50",
  },
  contentWrap3: {},
  image:{
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  contain: {
    height: 40,
    borderBottomWidth: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  iconContainer: {
    width: 60,
    justifyContent: "center",
    flexDirection: "row",
  },
  styletext: {
    margin:10,
    textAlign: "justify",
    fontWeight: "bold",
    fontSize: 18,
  },
  number: {
    marginLeft: 3,
    color: "black",
    fontSize: 20,
  },
  interactive:{
    flex:1,
    flexDirection: 'row',
    marginLeft:15,
    marginRight:15,
  },
  interactive2:{
    flex:1,
    flexDirection:'row',
    height:40,
    backgroundColor:'#E0E0E0',
    justifyContent:"center",
    alignItems:'center',
    margin:5,
    borderRadius:18,
  },
  textview:{
    marginLeft:5,
    fontWeight: "bold",
    color:'black',
    fontSize: 18,
  }
});
