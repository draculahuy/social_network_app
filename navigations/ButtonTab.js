import React, { useRef, useState, useEffect, createContext } from "react";
import {
  Button,
  DrawerLayoutAndroid,
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, AntDesign, FontAwesome5 } from "@expo/vector-icons";
import HomeScreen from "../Screens/HomeScreen";
import MessageScreen from "../Screens/MessageScreen";
import postScreen from "../Screens/postScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import NestingNavigation from "../navigations/NestingNavigation";
import { Avatar } from "../components/Avatar";
import { auth, userRef } from "../firebase";
import { onSnapshot } from "firebase/firestore";
const tab = createBottomTabNavigator();
export const userContext = createContext();
const ButtonTab = (navigation) => {
  const user = auth.currentUser;
  const drawer = useRef(null);
  const [userData, setUserData] = useState({
    name: "",
    followers: [],
    following: [],
    hometown: "",
  });
  useEffect(() => {
    function userSearching(item) {
      if (item.data().email == user.email) {
        setUserData(item.data());
      }
    }
    onSnapshot(userRef, (snapshot) => {
      const data = snapshot.docs.forEach(userSearching);
    });
  }, []);
  const LogOutHandle = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigation.replace("Login");
      })
      .catch((error) => {});
  };

  function profileHandle() {
    navigation.navigation.navigate("Profile");
    drawer.current.closeDrawer();
  }
  function homeHandle() {
    navigation.navigation.navigate("Home");
    drawer.current.closeDrawer();
  }
  function usersHandle() {
    navigation.navigation.navigate("Users");
    drawer.current.closeDrawer();
  }
  function msgHandle() {
    navigation.navigation.navigate("Message");
    drawer.current.closeDrawer();
  }

  const navigationView = () => (
    <View>
      <ScrollView>
        <ImageBackground
          style={{ width: undefined, padding: 16, paddingTop: 48 }}
          source={{
            uri: "https://img.freepik.com/free-photo/night-starry-sky-bright-blue-galaxy-horizontal-background-3d-illustration-milky-way-universe_118047-10045.jpg?w=2000",
          }}
        >
          <Image style={styles.profile} source={{ uri: user.photoURL }} />
          <Text style={styles.name}>{userData.name}</Text>

          <View style={{ flexDirection: "row", marginLeft: -15 }}>
            <View style={styles.followersandfollowing}>
              <Text style={styles.number}>{userData.followers.length}</Text>
              <Text
                style={[styles.number, { fontWeight: "normal", fontSize: 18 }]}
              >
                Followers
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
                Following
              </Text>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.the}>
          <TouchableOpacity style={styles.container2} onPress={homeHandle}>
            <View style={{marginLeft:10}}>
              <AntDesign name="home" size={24} color='#1b74e4'/>
            </View> 
            <Text style={styles.text}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={profileHandle} style={styles.container2}>
            <View style={{marginLeft:10}}>
              <Ionicons name="person-circle-outline" size={25} color='#1b74e4'/>
            </View>
            <Text style={styles.text}>Profile</Text>
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity style={styles.container2} onPress={usersHandle}>
          <Ionicons name="chatbubbles-sharp" size={24} />
          <Text style={styles.text}>Message</Text>
        </TouchableOpacity> */}

        <View style={styles.the}>
          <TouchableOpacity style={styles.container2} onPress={msgHandle}>
            <View style={{marginLeft:10}}>
              <AntDesign name="message1" size={24} color='#1b74e4'/>
            </View> 
            <Text style={styles.text}>Message</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.container2}>
            <View style={{marginLeft:10}}>
              <Ionicons name="settings-outline" size={24}color='#1b74e4'/>
            </View> 
            <Text style={styles.text}>Setting</Text>
          </TouchableOpacity>
        </View>

          <TouchableOpacity style={styles.container3}>
          <View style={{marginLeft:10}}>
              <AntDesign name="questioncircleo" size={24} color='#1b74e4'/>
            </View> 
            <Text style={styles.text}>Trợ giúp và hỗ trợ</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.container3}>
            <View style={{marginLeft:10}}>
              <FontAwesome5 name="address-book" size={24} color='#1b74e4'/>
            </View>          
            <Text style={styles.text}>Điều khoản chính sách</Text>
          </TouchableOpacity>
        

        <View style={{marginTop:20, margin:10}}>
          <Button onPress={LogOutHandle} title="Sign Out" style={styles.text} />
        </View>
      </ScrollView>
    </View>
  );

  return (
    <userContext.Provider value={userData}>
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={300}
        drawerPosition={"left"}
        renderNavigationView={navigationView}
      >
        <tab.Navigator
          screenOptions={{
            headerLeft: () => (
              <View>
                <Avatar image={user.photoURL} size={50} />
              </View>
            ),
            tabBarHideOnKeyboard: true,
          }}
        >
          <tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              backgroundColor: "white",
              tabBarIcon: (tabInfo) => {
                return (
                  <AntDesign
                    name="home"
                    size={30}
                    color={tabInfo.focused ? "#1b74e4" : "#65676b"}
                  />
                );
              },
            }}
          />
          <tab.Screen
            name="Search"
            component={NestingNavigation}
            options={{
              tabBarIcon: (tabInfo) => {
                return (
                  <Ionicons
                    name="search"
                    size={30}
                    color={tabInfo.focused ? "#1b74e4" : "#65676b"}
                  />
                );
              },
              headerShown: false,
            }}
          />
          <tab.Screen
            name="Creat post"
            component={postScreen}
            options={{
              tabBarIcon: (tabInfo) => {
                return (
                  <AntDesign
                    name="pluscircle"
                    size={30}
                    containerstyle
                    color={tabInfo.focused ? "#1b74e4" : "#65676b"}
                  />
                );
              },
            }}
          />
          <tab.Screen
            name="Message"
            component={MessageScreen}
            options={{
              tabBarIcon: (tabInfo) => {
                return (
                  <AntDesign
                    name="message1"
                    size={30}
                    color={tabInfo.focused ? "#1b74e4" : "#65676b"}
                  />
                );
              },
            }}
          />
          <tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarIcon: (tabInfo) => {
                return (
                  <Ionicons
                    name="person-circle-outline"
                    size={30}
                    color={tabInfo.focused ? "#1b74e4" : "#65676b"}
                  />
                );
              },
            }}
          />
        </tab.Navigator>
      </DrawerLayoutAndroid>
    </userContext.Provider>
  );
};

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
    // flex:1,
    height:80,
    width: 140,
    backgroundColor:'#E0E0E0',
    justifyContent:"center",
    // alignItems:'center',
    margin:5,
    borderRadius:15,
  },
  text: {
    color: "black",
    fontSize: 18,
    marginLeft: 10,
  },
  the:{
    flex:1,
    flexDirection: 'row',
    marginLeft:5,
    marginRight:5,
    justifyContent:"center",
    alignItems:'center',
  },
  container3:{
    flex: 1,
    flexDirection: 'row',
    height: 50,
    marginTop:10,
    borderTopWidth:1,
    alignItems:'center',
  },
});

export default ButtonTab;
