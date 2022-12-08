import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GuidePage from '../screen/Guide/GuidePage';
import GuideMainPage from '../screen/Guide/GuideMainPage';
import GuideDetailPage from '../screen/Guide/GuideDetailPage';
import MainPage from '../screen/Main/MainPage';
import ConvertPage from '../screen/ConvertPage';

const Stack = createNativeStackNavigator();

function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="GuidePage"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="GuidePage" component={GuidePage} />
        <Stack.Screen name="GuideMainPage" component={GuideMainPage} />
        <Stack.Screen name="GuideDetailPage" component={GuideDetailPage} />
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="ConvertPage" component={ConvertPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
