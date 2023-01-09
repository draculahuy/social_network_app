import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import LoginScreen from "../Screens/Auth/loginScreen";
import RegisterScreen from "../Screens/Auth/registerScreen";
import ButtonTab from "./ButtonTab";
import PostScreen from "../Screens/postScreen";
import MenuScreen from "../Screens/cmtScreen";
import { ChatBoxScreen } from "../Screens/ChatBoxScreen";
const stack = createStackNavigator();
function AuthNavigation() {
  return (
    <stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <stack.Screen name="Login" component={LoginScreen} />
      <stack.Screen name="Register" component={RegisterScreen} />
      <stack.Screen name="Tab" component={ButtonTab} />
      <stack.Screen name="Post" component={PostScreen} />
      <stack.Screen name="Comment" component={MenuScreen} />
      <stack.Screen name="ChatBox" component={ChatBoxScreen} />
    </stack.Navigator>
  );
}

export default AuthNavigation;
