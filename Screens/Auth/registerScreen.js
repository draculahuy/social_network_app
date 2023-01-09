import React, { useState } from "react";
import { View,ImageBackground, Button, Text, StyleSheet, TextInput, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth, userRef, storage, db } from "../../firebase";
import { addDoc, doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { Ionicons,MaterialIcons } from "@expo/vector-icons";
import GetCammeraPermission from "../../utilities/UserPermissions";
import * as ImagePicker from "expo-image-picker";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

function RegisterScreen(navigation) {
  const [accInfo, setaccInfo] = useState({
    name: "",
    email: "",
    password: "",
    avatar: null,
    followers: [],
    following: [],
    hometown: "",
    uid: "",
  });
  const SignUpHandle = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        accInfo.email,
        accInfo.password
      ).then((userCredential) => {
        const user = userCredential.user;

        updateProfile(user, {
          displayName: accInfo.name,
          email: accInfo.email,
          password: accInfo.password,
          photoURL: accInfo.avatar,
        });
        setDoc(doc(db, "users", user.uid), {
          name: accInfo.name,
          email: accInfo.email,
          password: accInfo.password,
          avatar: accInfo.avatar,
          followers: accInfo.followers,
          following: accInfo.following,
          hometown: accInfo.hometown,
          uid: user.uid,
        });
      });

      navigation.navigation.replace("Tab");
      // const userImgRef = ref(storage, accInfo.name);
      // const img = await fetch(accInfo.avatar);
      // const bytes = await img.blob();
      // await uploadBytes(userImgRef, bytes);
    } catch (error) {
      alert(error);
    }
  };

  const PickingAvatarHandle = async () => {
    GetCammeraPermission();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [5, 5],
    });

    if (!result.cancelled) {
      setaccInfo({
        ...accInfo,
        avatar: result.uri,
      });
    }
  };

  return (
    <ImageBackground source={{uri: "https://i.pinimg.com/564x/ff/68/82/ff6882e3b370f7401a0965683b60306c.jpg",}} style={style.container}>
    <View style={style.box}>
    <View style={style.container}>
      <View style={style.wrapper}>
        <View
          style={{
            alignItems: "center",
            marginBottom: 15,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={style.avatarPlaceholder}
            onPress={PickingAvatarHandle}
          >
            <Image
              source={{ uri: accInfo.avatar }}
              style={style.avatar}
              value={accInfo.avatar}
            />
            <MaterialIcons name="add-photo-alternate" size={25} color={"#909090"} />
          </TouchableOpacity>
        </View>
        <View style={style.inputwrap}>
          <TextInput
            placeholder="Username"
            style={style.inputName}
            onChangeText={(name) =>
              setaccInfo({
                ...accInfo,
                name: name,
              })
            }
            value={accInfo.name}
          ></TextInput>
          <TextInput
            placeholder="Address"
            style={style.inputHometown}
            onChangeText={(hometown) =>
              setaccInfo({
                ...accInfo,
                hometown: hometown,
              })
            }
            value={accInfo.hometown}
          ></TextInput>
        </View>
        <TextInput
          placeholder="Email"
          style={style.input}
          onChangeText={(email) =>
            setaccInfo({
              ...accInfo,
              email: email,
            })
          }
          value={accInfo.email}
        ></TextInput>
        <TextInput
          placeholder="Password"
          style={style.input}
          onChangeText={(password) =>
            setaccInfo({
              ...accInfo,
              password: password,
            })
          }
          value={accInfo.password}
          secureTextEntry={true}
        ></TextInput>
        <Button title="Sign Up" onPress={SignUpHandle} color= '#0000FF'></Button>
      </View>
      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <Text style={{fontSize:16}}>Already have an account ?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigation.navigate("Login")}
        >
          <Text style={style.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>
    </ImageBackground>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box:{
    backgroundColor:'white',
    width: "70%",
    height: 370,
    opacity: 0.8,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    width: "90%",
  },
  input: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "black",
    paddingHorizontal: 14,
  },
  inputwrap: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputName: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "black",
    paddingHorizontal: 14,
    width: "45%",
  },
  inputHometown: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "black",
    paddingHorizontal: 14,
    width: "45%",
  },
  link: {
    fontSize: 16,
    color: "blue",
    marginLeft: 3,
    borderBottomWidth: 1,
    borderBottomColor: "blue",
  },
  avatarPlaceholder: {
    width: 70,
    height: 70,
    borderColor: "#909090",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  avatar: {
    position: "absolute",
    width: 70,
    height: 70,
    borderRadius: 50,
  },
});

export default RegisterScreen;
