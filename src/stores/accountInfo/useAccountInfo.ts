import { useAtom } from 'jotai';
import { accountInfoAtom, accountInfoDefault, type AccountInfoType } from './accountInfo';
import { useCallback } from 'react';
import { atomStorageClear } from 'core/atom';
import Loading from 'components/widget/Loading';
import { request } from 'core/request';

const useAccountInfo = () => {
  const [accountInfo, setAccountInfo] = useAtom(accountInfoAtom);

  /** 重置为默认值 */
  const resetAccountInfo = useCallback(() => {
    setAccountInfo(accountInfoDefault);
  }, [setAccountInfo]);

  /** 从浏览器存储中删除当前存储的键值对 */
  const clearAccountInfoStorage = useCallback(() => {
    atomStorageClear(setAccountInfo);
  }, [setAccountInfo]);

  /** 请求账号数据 */
  const requestAccountInfo = useCallback(
    async (callback?: (result: boolean) => void) => {
      Loading.show();
      try {
        const { data } = await request<AccountInfoType>('accountInfo', {});
        if (data) {
          setAccountInfo(data);
          callback?.(true);
        } else {
          console.error('返回的未读消息数据为空');
          resetAccountInfo();
          callback?.(false);
        }
      } catch (e) {
        console.error('请求未读消息数据，出现错误: %s', e);
        resetAccountInfo();
        callback?.(false);
      } finally {
        Loading.hide();
      }
    },
    [resetAccountInfo, setAccountInfo]
  );

  return {
    accountInfo,
    resetAccountInfo,
    clearAccountInfoStorage,
    requestAccountInfo,
  };
};

export default useAccountInfo;
