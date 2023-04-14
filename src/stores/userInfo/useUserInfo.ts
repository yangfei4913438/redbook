import { useCallback } from 'react';
import { useAtom } from 'jotai';

import { userInfoAtom, userInfoDefault, UserInfoType } from './userInfo';
import { request } from 'core/request';
import { atomStorageClear } from 'core/atom';

import Loading from 'components/widget/Loading';

/**
 * 封装了所有和用户信息相关的数据，以及数据的处理方法。
 * 注意: 这里不直接对外暴露更新 atom 的方法，所有的 atom 更新逻辑，都应该放在当前自定义hook中，外部调用相应的处理方法即可。
 * */
const useUserInfo = () => {
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);

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
      Loading.show();
      try {
        const { data } = await request<UserInfoType>('login', { name, pwd });
        if (data) {
          setUserInfo(data);
          callback?.(true);
        } else {
          resetUserInfo();
          callback?.(false);
        }
      } catch (e) {
        console.error('登陆出现错误: %s', e);
        resetUserInfo();
        callback?.(false);
      } finally {
        Loading.hide();
      }
    },
    [resetUserInfo, setUserInfo]
  );

  return {
    userInfo,
    userLogin,
    resetUserInfo,
    clearUserInfoStorage,
  };
};

export default useUserInfo;
