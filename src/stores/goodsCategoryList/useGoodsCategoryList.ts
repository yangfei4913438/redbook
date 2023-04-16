import { useCallback } from 'react';
import { atomStorageClear } from 'core/atom';
import { useAtom } from 'jotai';
import { goodsCategoryListAtom, goodsCategoryListDefault, type GoodsCategoryType } from './goodsCategoryList';
import Loading from 'components/widget/Loading';
import { request } from 'core/request';

const useGoodsCategoryList = () => {
  const [goodsCategoryList, setGoodsCategoryList] = useAtom(goodsCategoryListAtom);

  /** 重置为默认值 */
  const resetCategoryList = useCallback(() => {
    setGoodsCategoryList(goodsCategoryListDefault);
  }, [setGoodsCategoryList]);

  /** 从浏览器存储中删除当前存储的键值对 */
  const clearGoodsCategoryListStorage = useCallback(() => {
    atomStorageClear(setGoodsCategoryList);
  }, [setGoodsCategoryList]);

  /** 更新分类tag */
  const updateCategory = useCallback(
    (item: GoodsCategoryType) => {
      setGoodsCategoryList((prev) => {
        return prev.map((p) => {
          if (p.name === item.name) {
            return item;
          }
          return p;
        });
      });
    },
    [setGoodsCategoryList]
  );

  /** 请求货物分类数据 */
  const requestGoodsCategoryList = useCallback(
    async (callback?: (result: boolean) => void) => {
      Loading.show();
      try {
        const { data } = await request<GoodsCategoryType[]>('top10Category', {});
        if (data) {
          setGoodsCategoryList(data);
          callback?.(true);
        } else {
          console.error('返回的货物分类数据为空');
          resetCategoryList();
          callback?.(false);
        }
      } catch (e) {
        console.error('请求货物分类数据，出现错误: %s', e);
        resetCategoryList();
        callback?.(false);
      } finally {
        Loading.hide();
      }
    },
    [resetCategoryList, setGoodsCategoryList]
  );

  return {
    goodsCategoryList,
    requestGoodsCategoryList,
    updateCategory,
    resetCategoryList,
    clearGoodsCategoryListStorage,
  };
};

export default useGoodsCategoryList;
