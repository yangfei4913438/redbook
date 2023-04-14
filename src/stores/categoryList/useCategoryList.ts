import { useCallback, useMemo } from 'react';
import { atomStorageClear } from 'core/atom';
import { categoryListAtom, categoryListDefault, CategoryType } from 'stores/categoryList/categoryList';
import { useAtom } from 'jotai';

const useCategoryList = () => {
  const [categoryList, setCategoryList] = useAtom(categoryListAtom);

  /** 重置为默认值 */
  const resetCategoryList = useCallback(() => {
    setCategoryList(categoryListDefault);
  }, [setCategoryList]);

  /** 从浏览器存储中删除当前存储的键值对 */
  const clearCategoryListStorage = useCallback(() => {
    atomStorageClear(setCategoryList);
  }, [setCategoryList]);

  /** 用户选中的标签列表 */
  const myCategoryList = useMemo(() => {
    return categoryList.filter((category) => category.isAdd);
  }, [categoryList]);

  /** 用户没选中的标签列表 */
  const otherCategoryList = useMemo(() => {
    return categoryList.filter((category) => !category.isAdd);
  }, [categoryList]);

  /** 更新分类tag */
  const updateCategory = useCallback(
    (item: CategoryType) => {
      setCategoryList((prev) => {
        return prev.map((p) => {
          if (p.name === item.name) {
            return item;
          }
          return p;
        });
      });
    },
    [setCategoryList]
  );

  return {
    categoryList,
    myCategoryList,
    otherCategoryList,
    updateCategory,
    resetCategoryList,
    clearCategoryListStorage,
  };
};

export default useCategoryList;
