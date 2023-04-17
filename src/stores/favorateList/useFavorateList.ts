import { useAtom } from 'jotai';
import { useCallback } from 'react';
import { atomStorageClear } from 'core/atom';
import { useRequestPageData } from 'stores/hooks';
import { favorateListAtom, favorateListDefault, type FavorateType } from './favorateList';

const useFavorateList = () => {
  const [favorateList, setFavorateList] = useAtom(favorateListAtom);

  /** 从浏览器存储中删除当前存储的键值对 */
  const clearFavorateListStorage = useCallback(() => {
    atomStorageClear(setFavorateList);
  }, [setFavorateList]);

  /** 重置为默认值 */
  const resetFavorateList = useCallback(() => {
    setFavorateList(favorateListDefault);
  }, [setFavorateList]);

  // 拿到分页数据
  const favorateListPageData = useRequestPageData<FavorateType, 'id'>({
    setPageData: setFavorateList,
    ApiName: 'favorateList',
    unique: 'id',
  });

  // 解构数据
  const { requestPageData, loading, ...rest } = favorateListPageData;

  return {
    ...rest,
    favorateLoading: loading,
    requestFavorateList: requestPageData,
    favorateList,
    clearFavorateListStorage,
    resetFavorateList,
  };
};

export default useFavorateList;
