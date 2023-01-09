import react from "react";
import { Image } from "react-native";

export const Avatar = ({ size, image }) => (
  <Image
    source={{ uri: image }}
    style={{
      width: size,
      height: size,
      borderRadius: size,
    }}
  />
);
