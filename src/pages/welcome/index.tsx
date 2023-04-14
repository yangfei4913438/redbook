import React, { useEffect } from 'react';
import { Image, LayoutAnimation, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import main_logo from 'assets/icon_main_logo.png';
import { useUserInfo } from 'stores';

const Welcome = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  // 获取用户数据
  const { userInfo } = useUserInfo();

  useEffect(() => {
    // 执行页面跳转
    const goPage = (name: 'MainTab' | 'Login') => {
      LayoutAnimation.easeInEaseOut();
      // 存在登陆信息，跳转首页
      // 这个页面不能回来，所以这里是替换.
      navigation.replace(name);
    };

    // 定时器对象
    let timer: number;
    // 几秒后执行
    const delay: number = 1000 * 2;
    // 判断是否存在用户信息
    if (userInfo && userInfo.redBookId > 0) {
      // 存在用户信息，跳转首页
      timer = setTimeout(() => goPage('MainTab'), delay);
    } else {
      // 不存在用户信息，跳转登陆页
      timer = setTimeout(() => goPage('Login'), delay);
    }

    return () => {
      // 离开页面时，清理定时器
      clearTimeout(timer);
    };
  }, [navigation, userInfo]);

  return (
    <View className="w-full h-full bg-white flex-col justify-center items-center">
      <Image className="w-64 h-36" style={{ resizeMode: 'contain' }} source={main_logo} />
    </View>
  );
};

export default Welcome;
