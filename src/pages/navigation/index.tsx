import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Welcome from 'pages/welcome';
import Login from 'pages/login';
import MainTab from 'pages/mainTab';
import ArticleDetail from 'pages/articleDetail';
import SearchGoods from 'pages/shop/searchGoods';

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
          name="Login" // 登陆页
          component={Login}
          options={{
            headerShown: false, // 不显示默认标题栏
          }}
        />
        <Stack.Screen
          name="MainTab" // 首页
          component={MainTab}
          options={{
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS, // IOS风格的动画
          }}
        />
        <Stack.Screen
          name="ArticleDetail" // 文章详情
          component={ArticleDetail}
          options={{
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS, // IOS风格的动画
          }}
        />
        <Stack.Screen
          name="SearchGoods" // 商品搜索页
          component={SearchGoods}
          options={{
            headerShown: false,
            presentation: 'transparentModal', // 无感切换到当前页面，当前页面的背景色需要设置透明色
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
