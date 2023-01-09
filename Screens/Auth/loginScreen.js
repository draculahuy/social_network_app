import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, userRef } from "../../firebase";
import {
  View,
  Button,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";

function LoginScreen(navigation) {
  const [accInfo, setaccInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
      }
    });
    return unsubscribe;
  }, []);

  function loginHandle() {
    signInWithEmailAndPassword(auth, accInfo.email, accInfo.password)
      .then((userCredential) => {
        const user = userCredential.user;
        // alert("Signed in ");
        navigation.navigation.navigate("Tab");
      })
      .catch((error) => alert(error));
  }
  return (
    <ImageBackground source={{uri: "https://i.pinimg.com/564x/ff/68/82/ff6882e3b370f7401a0965683b60306c.jpg",}} style={style.container}>
    <View style={style.box}>
      <Image
          style={style.logo}
          source={{
            uri: "https://designs.vn/wp-content/images/09-08-2013/logo_lagi_8_resize.JPG",
          }}
      />
      <View style={style.wrapper}>
        <TextInput
          placeholder="Email"
          style={style.input}
          onChangeText={(email) =>
            setaccInfo({
              ...accInfo,
              email: email,
            })
          }
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
          secureTextEntry={true}
        ></TextInput>
        <Button title="login" onPress={loginHandle} color='#0000FF'></Button>
      </View>
      <View style={{ flexDirection: "row", marginTop: 20}}>
        <Text style={{fontSize: 16}}>Dont have an account ?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigation.navigate("Register")}
        >
          <Text style={style.link}>Register</Text>
        </TouchableOpacity>
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
    height: 300,
    opacity: 0.8,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  logo:{
    height:70,
    width: 70,
    borderRadius: 50,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    width: "80%",
  },
  input: {
    color:'black',
    height: 40,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "black",
    paddingHorizontal: 14,
  },
  link: {
    color: "blue",
    fontSize: 16,
    marginLeft: 3,
    borderBottomWidth: 1,
    borderBottomColor: "blue",
  },
});

export default LoginScreen;
