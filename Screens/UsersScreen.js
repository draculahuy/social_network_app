import React, { useEffect, useState, useContext, createContext } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import UserBox from "../components/UserBox";
import { auth, userRef } from "../firebase";
import { onSnapshot } from "firebase/firestore";
import { textContext } from "../navigations/NestingNavigation";
function UsersScreen({ navigation }) {
  const [User, setuser] = useState([]);
  const temp = [];
  const value = useContext(textContext);

  useEffect(() => {
    onSnapshot(userRef, (snapshot) => {
      const data = snapshot.docs.map((user) => {
        temp.push(user.data());
      });
      setuser(temp);
    });
  }, []);

  return (
    <View>
      {User.length != 0 &&
        User.map(function (data) {
          if (data.name == value) {
            return (
              <TouchableOpacity
                key={Math.random()}
                onPress={() => {
                  navigation.navigate("UsersProfile", data);
                }}
              >
                <UserBox name={data.name} tag={data.email} img={data.avatar} />
              </TouchableOpacity>
            );
          }
        })}
    </View>
  );
}

export default UsersScreen;
