import { useAtom } from 'jotai';
import { unreadMessageAtom, unreadMessageDefault, type UnreadMessageType } from './unreadMessage';
import { useCallback } from 'react';
import { atomStorageClear } from 'core/atom';
import Loading from 'components/widget/Loading';
import { request } from 'core/request';

const useUnreadMessage = () => {
  const [unreadMessage, setUnreadMessage] = useAtom(unreadMessageAtom);

  /** 重置为默认值 */
  const resetUnreadMessage = useCallback(() => {
    setUnreadMessage(unreadMessageDefault);
  }, [setUnreadMessage]);

  /** 从浏览器存储中删除当前存储的键值对 */
  const clearUnreadMessageStorage = useCallback(() => {
    atomStorageClear(setUnreadMessage);
  }, [setUnreadMessage]);

  /** 请求数据 */
  const requestUnreadMessage = useCallback(
    async (callback?: (result: boolean) => void) => {
      Loading.show();
      try {
        const { data } = await request<UnreadMessageType>('unread', {});
        if (data) {
          setUnreadMessage(data);
          callback?.(true);
        } else {
          console.error('返回的未读消息数据为空');
          resetUnreadMessage();
          callback?.(false);
        }
      } catch (e) {
        console.error('请求未读消息数据，出现错误: %s', e);
        resetUnreadMessage();
        callback?.(false);
      } finally {
        Loading.hide();
      }
    },
    [resetUnreadMessage, setUnreadMessage]
  );

  /** 更新数据 */
  const updateUnreadMessage = useCallback(
    (key: keyof UnreadMessageType, value: number) => {
      setUnreadMessage((prev) => {
        return {
          ...prev,
          [key]: value,
        };
      });
    },
    [setUnreadMessage]
  );

  return {
    unreadMessage,
    requestUnreadMessage,
    clearUnreadMessageStorage,
    resetUnreadMessage,
    updateUnreadMessage,
  };
};

export default useUnreadMessage;
