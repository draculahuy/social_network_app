import React from "react";
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
import { Ionicons } from "@expo/vector-icons";

export function Comment({ authorImg, authorName, authorComment }) {
  return (
    <View>
      <View style={styles.container}>
        <Image
          style={styles.Image}
          source={{
            uri: authorImg,
          }}
        />
        <View style={styles.textcmt}>
          <View style={styles.container2}>
            <Text style={styles.name}>{authorName}</Text>
            {/* <Ionicons name="time-outline" size={15} color="#707070" /> */}
            {/* <Text style={styles.time}>10:00</Text> */}
          </View>
          <View>
            <Text style={styles.text}>{authorComment}</Text>
          </View>
        </View>
        <View style={styles.edit}>
          <Ionicons name="ellipsis-vertical" size={24} color={"black"} />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginRight: 10,
    marginTop: 30,
  },
  textcmt: {
    width: 300,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 15,
    backgroundColor: "#E8E8E8",
  },
  text: {
    fontSize: 18,
    marginLeft: 10,
  },
  container2: {
    marginLeft: 10,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    marginRight: 5,
    fontWeight: "bold",
  },
  time: {
    fontSize: 15,
    color: "grey",
    marginRight: 5,
  },
  edit: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    marginRight: 10,
  },
  Image: {
    height: 40,
    width: 40,
    borderRadius: 100,
    marginLeft: 5,
  },
});
