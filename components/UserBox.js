import React from "react";
import { View, Text, Button } from "react-native";
import { Avatar } from "../components/Avatar";

function UserBox({ img, name, tag }) {
  return (
    <View style={{ padding: 10, flexDirection: "row" }}>
      <Avatar size={40} image={img} />

      <View
        style={{
          justifyContent: "space-between",
          marginHorizontal: 10,
        }}
      >
        <Text style={{ fontSize: 13 }}>{tag}</Text>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>{name}</Text>
      </View>
    </View>
  );
}

export default UserBox;
