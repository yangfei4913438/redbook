import { useAtom } from 'jotai';
import { useCallback } from 'react';
import { atomStorageClear } from 'core/atom';
import { useRequestPageData } from 'stores/hooks';
import { collectionListAtom, collectionListDefault, type CollectionType } from './collectionList';

const useCollectionList = () => {
  const [collectionList, setCollectionList] = useAtom(collectionListAtom);

  /** 从浏览器存储中删除当前存储的键值对 */
  const clearCollectionListStorage = useCallback(() => {
    atomStorageClear(setCollectionList);
  }, [setCollectionList]);

  /** 重置为默认值 */
  const resetCollectionList = useCallback(() => {
    setCollectionList(collectionListDefault);
  }, [setCollectionList]);

  // 拿到分页数据
  const collectionListPageData = useRequestPageData<CollectionType, 'id'>({
    setPageData: setCollectionList,
    ApiName: 'collectionList',
    unique: 'id',
  });

  // 解构数据
  const { requestPageData, loading, ...rest } = collectionListPageData;

  return {
    ...rest,
    collectionLoading: loading,
    requestCollectionList: requestPageData,
    collectionList,
    clearCollectionListStorage,
    resetCollectionList,
  };
};

export default useCollectionList;
