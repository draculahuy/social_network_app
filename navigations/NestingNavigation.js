import React, { useState, createContext } from "react";
import { TextInput, View } from "react-native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import UsersScreen from "../Screens/UsersScreen";
import UsersProfileScreen from "../Screens/UsersProfileScreen";
const stack = createStackNavigator();
export const textContext = createContext();

function NestingNavigation() {
  const [text, settext] = useState();

  return (
    <textContext.Provider value={text}>
      <stack.Navigator
        initialRouteName="Users"
        screenOptions={{ headerShown: true, headerLeft: () => null }}
      >
        <stack.Screen
          name="Users"
          component={UsersScreen}
          options={{
            headerTitle: () => (
              <View>
                <TextInput
                  onChangeText={(text) => settext(text)}
                  placeholder="Search here"
                  style={{
                    backgroundColor: "#efefef",
                    width: 350,
                    borderRadius: 40,
                    paddingHorizontal: 20,
                  }}
                />
              </View>
            ),
          }}
        />
        <stack.Screen
          name="UsersProfile"
          component={UsersProfileScreen}
          options={{ headerShown: false }}
        />
      </stack.Navigator>
    </textContext.Provider>
  );
}

export default NestingNavigation;
