import { useCallback, useState } from 'react';
import { atomStorageClear } from 'core/atom';
import { categoryListAtom, categoryListDefault } from 'stores/categoryList/categoryList';
import { useAtom } from 'jotai';

const useCategoryList = () => {
  const [categoryList, setCategoryList] = useAtom(categoryListAtom);
  // 发生网络请求时，当前的处理状态
  const [loading, setLoading] = useState(false);

  /** 重置为默认值 */
  const resetCategoryList = useCallback(() => {
    setCategoryList(categoryListDefault);
  }, [setCategoryList]);

  /** 从浏览器存储中删除当前存储的键值对 */
  const clearCategoryListStorage = useCallback(() => {
    atomStorageClear(setCategoryList);
  }, [setCategoryList]);

  /** 发起网络请求 */

  return {
    loading,
    categoryList,
    resetCategoryList,
    clearCategoryListStorage,
  };
};

export default useCategoryList;
