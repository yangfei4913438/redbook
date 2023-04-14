import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Welcome from 'pages/welcome';
import Login from 'pages/login';
import MainTab from 'pages/mainTab';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          cardStyle: { elevation: 1 }, // 避免渲染异常，保持导航栈渲染在第一层级
        }}
      >
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false, // 不显示默认标题栏
          }}
        />
        <Stack.Screen
          name="MainTab"
          component={MainTab}
          options={{
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS, // IOS风格的动画
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
