import React, { Component } from 'react'
import { Text,ImageBackground, Image, View, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function MenuScreen() {
    return(
        <ScrollView>
            <ImageBackground
          style={{ width: undefined, padding: 16, paddingTop: 48 }}
          source={{
            uri: "https://img.freepik.com/free-photo/night-starry-sky-bright-blue-galaxy-horizontal-background-3d-illustration-milky-way-universe_118047-10045.jpg?w=2000",
          }}
        >
          {/* <Image style={styles.profile} source={{ uri: user.photoURL }} />
          <Text style={styles.name}>{user.displayName}</Text> */}

          <View style={{ flexDirection: "row", marginLeft: -15 }}>
            <View style={styles.followersandfollowing}>
              <Text style={styles.number}>56</Text>
              <Text
                style={[styles.number, { fontWeight: "normal", fontSize: 18 }]}
              >
                followers
              </Text>
            </View>
            <View style={styles.followersandfollowing}>
              <Text style={styles.numberSecond}>64</Text>
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
        </ImageBackground>
        <View style={styles.container2}>
          <Ionicons name="person-circle" size={24}/>
          <Text style={styles.text}>Profile</Text>
        </View>
        <View style={styles.container2}>
          <Ionicons name="md-home" size={24}/>
          <Text style={styles.text}>Home</Text>
        </View>
        <View style={styles.container2}>
          <Ionicons name="chatbubbles-sharp" size={24}/>
          <Text style={styles.text}>Message</Text>
        </View>
        <View style={styles.container2}>
          <Ionicons name="notifications" size={24}/>
          <Text style={styles.text}>Notification</Text>
        </View>

        <View style={styles.container2}>
          <Ionicons name="settings" size={24}/>
          <Text style={styles.text}>Setting</Text>
        </View>
        <View style={styles.container2}>
          <Ionicons name="log-out-outline" size={24}/>
          {/* <Button onPress={LogOutHandle} title="Sign Out" style={styles.text} /> */}
        </View>
        </ScrollView>
    )
}
export default MenuScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-end",
      padding: 16,
    },
    navigationContainer: {
      backgroundColor: "#ecf0f1",
    },
    paragraph: {
      padding: 16,
      fontSize: 15,
      textAlign: "center",
    },
    profile: {
      width: 80,
      height: 80,
      borderRadius: 40,
      borderWidth: 3,
      borderColor: "#FFF",
      borderWidth: 1,
    },
    name: {
      color: "#fff",
      fontSize: 30,
      fontWeight: "bold",
      marginVertical: 8,
    },
    followersandfollowing: {
      marginLeft: 10,
      flexDirection: "row",
      bottom: "5%",
      alignItems: "center",
    },
    number: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
      marginLeft: 6,
    },
    numberSecond: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
      marginLeft: 6,
    },
    container2: {
      flex: 1,
      flexDirection: "row",
      width: undefined,
      height: 40,
  
      marginTop: 5,
      marginLeft:10,
      marginRight: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#000',
      alignItems: "center"
    },
    text: {
      color: "#000",
      fontSize: 20,
      fontWeight: "bold",
      marginLeft: 10,
    },
  });

