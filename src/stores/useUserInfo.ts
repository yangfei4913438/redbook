import { useCallback, useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { userInfoAtom, userInfoDefault, UserInfoType } from 'stores/userInfo';
import { request } from 'core/request';
import { atomStorageClear } from 'core/atom';

interface UserInfoHookType {
  /** 用户信息 */
  userInfo: UserInfoType;
  /** 网络请求状态 */
  loading: boolean;
  /** 用户登陆，从远程请求数据，并更新到本地存储及内存 */
  userLogin: (name: string, pwd: string, callback?: (success: boolean) => void) => Promise<void>;
  /** 重置为默认值 */
  resetUserInfo: () => void;
  /** 从浏览器存储中删除当前存储的键值对 */
  clearUserInfoStorage: () => void;
}

/**
 * 封装了所有和用户信息相关的数据，以及数据的处理方法。
 * 注意: 这里不直接对外暴露更新 atom 的方法，所有的 atom 更新逻辑，都应该放在当前自定义hook中，外部调用相应的处理方法即可。
 * */
const useUserInfo = (): UserInfoHookType => {
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  // 发生网络请求时，当前的处理状态
  const [loading, setLoading] = useState(false);
  // 路由相关
  const navigation = useNavigation<StackNavigationProp<any>>();

  /** 如果是带初始化的数据，可以通过 useEffect 来处理*/
  useEffect(() => {
    console.log('当前的数据：%o', userInfo);
  }, [userInfo]);

  /** 重置为默认值 */
  const resetUserInfo = useCallback(() => {
    setUserInfo(userInfoDefault);
  }, [setUserInfo]);

  /** 从浏览器存储中删除当前存储的键值对 */
  const clearUserInfoStorage = useCallback(() => {
    atomStorageClear(setUserInfo);
  }, [setUserInfo]);

  /** 用户登陆，从远程请求数据，并更新到本地存储及内存 */
  const userLogin = useCallback(
    async (name: string, pwd: string, callback?: (success: boolean) => void) => {
      setLoading(() => true);
      try {
        const { data } = await request<UserInfoType>('login', { name, pwd });
        if (data) {
          setUserInfo(data);
          callback?.(true);
          // 登陆页面到首页，一定是替换，不能出现回退。
          navigation.replace('Home');
        } else {
          callback?.(false);
          resetUserInfo();
          ToastAndroid.show('登陆失败，请检查用户名和密码', ToastAndroid.LONG);
        }
      } catch (e) {
        console.error('登陆出现错误: %s', e);
        resetUserInfo();
        callback?.(false);
      }
      setLoading(() => false);
    },
    [navigation, resetUserInfo, setUserInfo]
  );

  return {
    userInfo,
    loading,
    userLogin,
    resetUserInfo,
    clearUserInfoStorage,
  };
};

export default useUserInfo;
