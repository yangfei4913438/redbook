import { useAtom } from 'jotai';
import { useCallback } from 'react';

import { atomStorageClear } from 'core/atom';
import { homeListAtom, ArticleSimpleType } from './homeList';
import { useRequestPageData } from 'stores/hooks';

const useHomeList = () => {
  const [homeList, setHomeList] = useAtom(homeListAtom);

  // 拿到分页数据
  const homeListPageData = useRequestPageData<ArticleSimpleType, 'id'>({
    setPageData: setHomeList,
    ApiName: 'homeList',
    unique: 'id',
  });

  // 解构数据
  const { requestPageData, ...rest } = homeListPageData;

  /** 从浏览器存储中删除当前存储的键值对 */
  const clearHomeListStorage = useCallback(() => {
    atomStorageClear(setHomeList);
  }, [setHomeList]);

  return {
    ...rest,
    homeList,
    requestHomeList: requestPageData,
    clearHomeListStorage,
  };
};

export default useHomeList;
