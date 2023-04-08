import React, { useEffect } from 'react';
import { Image, LayoutAnimation, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import main_logo from 'assets/icon_main_logo.png';

const Welcome = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  useEffect(() => {
    setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
      // 这个页面不能回来，所以这里是替换
      navigation.replace('Login');
    }, 2000);
  }, [navigation]);

  return (
    <View className="w-full h-full bg-white flex-col justify-center items-center">
      <Image className="w-64 h-36" style={{ resizeMode: 'contain' }} source={main_logo} />
    </View>
  );
};

export default Welcome;
