
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './pages/account/login'
import Demo from "@/pages/Demo"
import UserInfo from '@/pages/account/userInfo'

const Stack = createStackNavigator();

function Nav() {
  return (
    <NavigationContainer>
      <Stack.Navigator  screenOptions={{headerShown:false}} initialRouteName="UserInfo">
        <Stack.Screen name="Demo" component={Demo} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="UserInfo" component={UserInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Nav;