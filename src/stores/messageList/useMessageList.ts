import { useAtom } from 'jotai';
import { messageListAtom, messageListDefault, type MessageType } from './messageList';
import { useRequestPageData } from 'stores/hooks';
import { useCallback } from 'react';
import { atomStorageClear } from 'core/atom';

const useMessageList = () => {
  const [messageList, setMessageList] = useAtom(messageListAtom);

  // 拿到分页数据
  const messageListPageData = useRequestPageData<MessageType, 'id'>({
    setPageData: setMessageList,
    ApiName: 'messageList',
    unique: 'id',
  });

  // 解构数据
  const { requestPageData, ...rest } = messageListPageData;

  /** 从浏览器存储中删除当前存储的键值对 */
  const clearMessageListStorage = useCallback(() => {
    atomStorageClear(setMessageList);
  }, [setMessageList]);

  /** 重置为默认值 */
  const resetMessageList = useCallback(() => {
    setMessageList(messageListDefault);
  }, [setMessageList]);

  return {
    ...rest,
    messageList,
    requestMessageList: requestPageData,
    clearMessageListStorage,
    resetMessageList,
  };
};

export default useMessageList;
