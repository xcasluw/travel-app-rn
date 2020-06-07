import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./pages/Home";
import Questions from "./pages/Questions";
import Finish from "./pages/Finish";

const AppStack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator headerMode="none">
        <AppStack.Screen name="Home" component={Home} />
        <AppStack.Screen name="Questions" component={Questions} />
        <AppStack.Screen name="Finish" component={Finish} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
