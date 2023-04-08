import React, { useCallback, useMemo, useState } from 'react';
import { Image, LayoutAnimation, Linking, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import cls from 'classnames';
import { formatPhone, replaceBlank } from 'utils/StringUtil';

import main_logo from 'assets/icon_main_logo.png';
import icon_unselected from 'assets/icon_unselected.png';
import icon_selected from 'assets/icon_selected.png';
import icon_arrow from 'assets/icon_arrow.png';
import icon_wx_small from 'assets/icon_wx_small.png';
import icon_triangle from 'assets/icon_triangle.png';
import icon_eye_open from 'assets/icon_eye_open.png';
import icon_eye_close from 'assets/icon_eye_close.png';
import icon_exchange from 'assets/icon_exchange.png';
import icon_wx from 'assets/icon_wx.png';
import icon_qq from 'assets/icon_qq.webp';
import icon_close_modal from 'assets/icon_close_modal.png';

const Login = () => {
  const [loginType, setLoginType] = useState<'quick' | 'input'>('quick');
  const [check, setCheck] = useState<boolean>(false);
  const [eyeOpen, setEyeOpen] = useState<boolean>(false);
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [phone, setPhone] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');

  const handleEye = useCallback(() => {
    setEyeOpen((prevState) => !prevState);
  }, []);

  const handleCheck = useCallback(() => {
    setCheck((prevState) => !prevState);
  }, []);

  const switchLoginType = useCallback(() => {
    LayoutAnimation.easeInEaseOut();
    setLoginType((prevState) => {
      if (prevState === 'quick') {
        return 'input';
      } else {
        return 'quick';
      }
    });
  }, []);

  // 能否登陆，需要满足三个条件
  const canLogin = useMemo<boolean>(
    () => check && phone.length === 13 && pwd.length > 6,
    [check, phone.length, pwd.length]
  );

  const goToHomePage = useCallback(() => {
    const realPhone = replaceBlank(phone);
    console.log('realPhone: %s', realPhone);

    // 登陆页面到首页，一定是替换，不能出现回退。
    navigation.replace('Home');
  }, [navigation, phone]);

  const renderQuickLogin = useMemo(() => {
    return (
      <View className="w-full h-full flex-col-reverse items-center px-10">
        <View className="w-full flex-row items-center mb-8">
          <TouchableOpacity className="items-center" onPress={handleCheck}>
            <Image source={check ? icon_selected : icon_unselected} className="w-5 h-5" />
          </TouchableOpacity>
          <Text className="text-[12px] text-gray-500 ml-1.5">我已阅读并同意</Text>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.baidu.com')}>
            <Text className="text-[12px] text-blue-500">《用户协议》和《隐私政策》</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity className="flex-row items-center py-5 px-2.5 mb-24" onPress={switchLoginType}>
          <Text className="text-sm text-gray-900">其他登陆方式</Text>
          <Image source={icon_arrow} className="ml-1.5 mt-0.5 w-3 h-3 rotate-180" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          className="flex-row items-center justify-center w-full h-14 bg-[#05c160] rounded-3xl space-x-1"
        >
          <Image source={icon_wx_small} className="w-10 h-10 mt-1" />
          <Text className="text-lg text-white">微信登陆</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          className="mb-5 flex-row items-center justify-center w-full h-14 bg-[#ff2442] rounded-3xl space-x-1"
        >
          <Text className="text-lg text-white">一键登陆</Text>
        </TouchableOpacity>
        <Image className="w-64 h-28 absolute top-40" style={{ resizeMode: 'contain' }} source={main_logo} />
      </View>
    );
  }, [check, handleCheck, switchLoginType]);

  const handleChangePhone = useCallback((txt: string) => {
    const num = formatPhone(txt);
    setPhone(num);
  }, []);

  const handleChangePwd = useCallback((txt: string) => {
    setPwd(txt);
  }, []);

  const renderInputLogin = useMemo(() => {
    return (
      <View className="w-full h-full flex-col items-center px-12">
        <Text className="text-3xl font-bold mt-16 text-[#333]">密码登陆</Text>
        <Text className="text-sm mt-1.5 text-[#bbb]">未注册的手机号登陆成功后将自动注册</Text>
        <View className="mt-4 w-full h-16 flex-row items-center border-b border-[#ddd]">
          <Text className="text-2xl text-[#999]">+86</Text>
          <Image source={icon_triangle} className="w-3 h-1.5 ml-1.5 mt-1" />
          <TextInput
            className="flex-1 h-16 text-start pl-4 text-2xl text-[#333]"
            style={{ textAlignVertical: 'center' }}
            placeholderTextColor={'#999'}
            placeholder={'请输入手机号码'}
            keyboardType={'number-pad'}
            returnKeyType={'next'}
            textContentType={'telephoneNumber'}
            maxLength={13} // 这里的长度要加上格式化后2的两个空格位
            value={phone}
            onChangeText={handleChangePhone}
          />
        </View>
        <View className="mt-2 w-full h-16 flex-row items-center border-b border-[#ddd]">
          <TextInput
            className="flex-1 h-16 text-start pr-4 text-2xl text-[#333]"
            style={{ textAlignVertical: 'center' }}
            placeholderTextColor={'#999'}
            placeholder={'请输入密码'}
            maxLength={16}
            secureTextEntry={!eyeOpen} // eyeOpen 为true表示明文显示，所以这里要取反
            value={pwd}
            onChangeText={handleChangePwd}
          />
          <TouchableOpacity onPress={handleEye}>
            <Image source={eyeOpen ? icon_eye_open : icon_eye_close} className="w-8 h-8" />
          </TouchableOpacity>
        </View>
        <View className="w-full mt-2.5 flex-row justify-center items-center">
          <Image source={icon_exchange} className="w-4 h-4 mt-0.5" />
          <Text className="text-sm text-[#303080] flex-1">验证码登陆</Text>
          <Text className="text-sm text-[#303080]">忘记密码?</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          className={cls(
            'mt-4 w-full h-14 justify-center items-center rounded-3xl',
            canLogin ? 'bg-red-400' : 'bg-gray-500'
          )}
          disabled={!canLogin}
          onPress={goToHomePage}
        >
          <Text className="text-xl text-white">登陆</Text>
        </TouchableOpacity>

        <View className="mt-4 w-full flex-row items-center mb-8">
          <TouchableOpacity className="items-center" onPress={handleCheck}>
            <Image source={check ? icon_selected : icon_unselected} className="w-5 h-5" />
          </TouchableOpacity>
          <Text className="text-[12px] text-gray-500 ml-1.5">我已阅读并同意</Text>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.baidu.com')}>
            <Text className="text-[12px] text-blue-500">《用户协议》和《隐私政策》</Text>
          </TouchableOpacity>
        </View>

        <View className={'w-full flex-row justify-between px-10 mt-24'}>
          <Image className="w-14 h-14" source={icon_wx} />
          <Image className="w-14 h-14" source={icon_qq} />
        </View>

        <TouchableOpacity className="absolute left-9 top-6" onPress={switchLoginType}>
          <Image source={icon_close_modal} className="w-7 h-7" />
        </TouchableOpacity>
      </View>
    );
  }, [
    canLogin,
    check,
    eyeOpen,
    goToHomePage,
    handleChangePhone,
    handleChangePwd,
    handleCheck,
    handleEye,
    phone,
    pwd,
    switchLoginType,
  ]);

  return (
    <View className="w-full h-full bg-white flex-col justify-center items-center">
      {loginType === 'quick' ? renderQuickLogin : renderInputLogin}
    </View>
  );
};

export default Login;
