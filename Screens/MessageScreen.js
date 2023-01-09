import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

function MessageScreen({ navigation }) {
  function ChatDirecting() {
    navigation.navigate("ChatBox");
  }
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <TouchableOpacity onPress={ChatDirecting}>
        <View style={styles.container}>
          <Image
            style={styles.bgImage}
            source={{
              uri: "https://i.pinimg.com/originals/06/4d/12/064d12aa37e1e30547aeb02a8ec4bb79.jpg",
            }}
          />
          <View>
            <View style={styles.container2}>
              <Text style={styles.name}>Thinhnguyen</Text>
            </View>
            {/* <Text style={styles.time}>10:00</Text> */}
          </View>
          <View style={styles.edit}>
            {/* <Ionicons name="ellipsis-vertical" size={24} color={"black"} /> */}
          </View>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default MessageScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f7f7f7",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },
  container2: {
    marginLeft: 30,
    marginBottom: 5,
    flexDirection: "row",
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
  bgImage: {
    height: 50,
    width: 50,
    borderRadius: 100,
    marginLeft: 10,
  },
  name: {
    fontSize: 20,
    marginRight: 5,
    fontWeight: "bold",
  },
  notify: {
    fontSize: 18,
    color: "grey",
  },
  time: {
    marginLeft: 10,
    fontSize: 15,
    color: "grey",
    marginRight: 5,
  },
  edit: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginRight: 10,
  },
});
