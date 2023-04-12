import React, { useCallback } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs/src/types';
import { launchImageLibrary } from 'react-native-image-picker';

import Home from 'pages/home';
import Shop from 'pages/shop';
import Message from 'pages/message';
import Mine from 'pages/mine';

import icon_tab_publish from 'assets/icon_tab_publish.png';

const TabBar = (props: BottomTabBarProps) => {
  const {
    state: { routes, index },
    descriptors,
    navigation,
  } = props;

  const handlePhoto = useCallback(async () => {
    await launchImageLibrary(
      {
        mediaType: 'photo', // 图片类型是照片
        quality: 1, // 质量
        includeBase64: true,
      },
      (response) => {
        const { assets } = response;
        if (assets && assets?.length > 0) {
          const { uri, width, height, fileName, fileSize, type } = assets[0];
          console.log(
            `uri: %s\nwidth: %s\nheight: %s\nfileName: %s\nfileSize: %s\ntype: %s`,
            uri,
            width,
            height,
            fileName,
            fileSize,
            type
          );
        }
      }
    );
  }, []);

  return (
    <View className="w-full h-[52px] flex-row items-center bg-white">
      {routes.map((route, idx) => {
        const { options } = descriptors[route.key];
        const isFocused = idx === index;

        if (idx === 2) {
          return (
            <TouchableOpacity
              className="flex-1 h-full justify-center items-center"
              key={options.title}
              onPress={handlePhoto}
            >
              <Image source={icon_tab_publish} className="w-[58px] h-[42px]" style={{ resizeMode: 'contain' }} />
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            className="flex-1 h-full justify-center items-center"
            key={options.title}
            onPress={() => {
              navigation.navigate(route.name);
            }}
          >
            <Text className={isFocused ? 'text-[18px] text-[#333] text-bold' : 'text-[16px] text-[#999]'}>
              {options.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const BottomTab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <View className="w-full h-full">
      <NavigationContainer>
        <BottomTab.Navigator tabBar={(props) => <TabBar {...props} />}>
          <BottomTab.Screen name={'Home'} component={Home} options={{ title: '首页', headerShown: false }} />
          <BottomTab.Screen name={'Shop'} component={Shop} options={{ title: '购物', headerShown: false }} />
          <BottomTab.Screen name={'Publish'} component={Shop} options={{ title: '发布', headerShown: false }} />
          <BottomTab.Screen name={'Message'} component={Message} options={{ title: '消息', headerShown: false }} />
          <BottomTab.Screen name={'Mine'} component={Mine} options={{ title: '我', headerShown: false }} />
        </BottomTab.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default BottomTabs;
