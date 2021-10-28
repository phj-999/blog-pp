import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from "@/pages/main/home/HomeScreen";
import SettingsScreen from "@/pages/main/setting/SettingsScreen";

const HomeStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}


function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="SettingsScreen" component={SettingsScreen} />
      <SettingsStack.Screen name="Details" component={DetailsScreen} />
    </SettingsStack.Navigator>
  );
}

function Tabbar() {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBarOptions={} position="bottom" initialRouteName="Home" >
        <Tab.Screen name="HomeScreen" component={HomeStackScreen} />
        <Tab.Screen name="SettingsScreen" component={SettingsStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Tabbar;
