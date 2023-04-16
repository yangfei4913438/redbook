import { useAtom } from 'jotai';
import { useCallback } from 'react';

import { atomStorageClear } from 'core/atom';
import { goodsListAtom, goodsListDefault, type GoodsSimpleType } from './goodsList';
import { useRequestPageData } from 'stores/hooks';

const useGoodsList = () => {
  const [goodsList, setGoodsList] = useAtom(goodsListAtom);

  // 拿到分页数据
  const goodsListPageData = useRequestPageData<GoodsSimpleType, 'id'>({
    setPageData: setGoodsList,
    ApiName: 'goodsList',
    unique: 'id',
  });

  // 解构数据
  const { requestPageData, ...rest } = goodsListPageData;

  /** 从浏览器存储中删除当前存储的键值对 */
  const clearHomeListStorage = useCallback(() => {
    atomStorageClear(setGoodsList);
  }, [setGoodsList]);

  /** 重置为默认值 */
  const resetGoodsList = useCallback(() => {
    setGoodsList(goodsListDefault);
  }, [setGoodsList]);

  return {
    ...rest,
    requestGoodsList: requestPageData,
    goodsList,
    clearHomeListStorage,
    resetGoodsList,
  };
};

export default useGoodsList;
