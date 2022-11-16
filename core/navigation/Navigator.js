import * as React from "react";
import { Button, View, Text, Image, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GuidePage from '../screen/Guide/GuidePage';
import GuideMainPage from '../screen/Guide/GuideMainPage';
import GuideDetailPage from '../screen/Guide/GuideDetailPage';
import MainPage from '../screen/Main/MainPage';
import PicDetailPage from './../screen/Paint/PicDetailPage';

// Navigator Practice
// TODO : For Main Navigator & Nesting Navigator

const Stack = createNativeStackNavigator();

function Navigator() {
	return (
		<NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="GuidePage" component={GuidePage} />
        <Stack.Screen name="GuideMainPage" component={GuideMainPage} />
        <Stack.Screen name="GuideDetailPage" component={GuideDetailPage} />
        <Stack.Screen name="PicDetailPage" component={PicDetailPage} />
        <Stack.Screen name="MainPage" component={MainPage} />
      </Stack.Navigator>
		</NavigationContainer>
	);
}

export default Navigator;