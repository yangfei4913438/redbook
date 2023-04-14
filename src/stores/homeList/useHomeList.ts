import { useAtom } from 'jotai';
import { useCallback, useState } from 'react';

import { atomStorageClear } from 'core/atom';
import { homeListAtom, ArticleSimple } from './homeList';
import { request } from 'core/request';
import { arrayConcatBy } from 'utils/array';
import Loading from 'components/widget/Loading';

const useHomeList = () => {
  const [homeList, setHomeList] = useAtom(homeListAtom);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  // 是否最后一页（因为当前的后台没有total之类的数据，所以需要人工判断一下）
  const [isLastPage, setIsLastPage] = useState<boolean>(false);

  // 发生网络请求时，当前的处理状态
  const [loading, setLoading] = useState(false);

  /** 请求数据 */
  const requestHomeList = useCallback(
    async (reset: boolean = false) => {
      // 正在网络请求的时候，不要重复发网络请求。
      if (loading) return;
      // 开始请求数据
      Loading.show();
      setLoading(() => true);
      // 如果已经是最后一页了, 且当前请求不是重置数据，就不用处理了。直接返回即可。
      if (isLastPage && !reset) {
        console.log('当前是最后一页，不继续执行');
        setLoading(() => false);
        Loading.hide();
        return;
      }
      try {
        console.log('开始请求数据');
        const params = {
          page: reset ? 1 : page,
          size: pageSize,
        };
        const { data } = await request<ArticleSimple[]>('homeList', params);

        // 重置就直接设置为第一页
        if (reset) {
          console.log('重置数据');
          if (data?.length) {
            setHomeList(data);
            setPage(2);
          } else {
            // 第一页没值，就需要清空本地数据
            setHomeList([]);
            // 重置页码
            setPage(1);
          }
          setIsLastPage(false);
        } else if (data.length) {
          console.log('更新数据');
          setHomeList((prev) => arrayConcatBy<ArticleSimple, 'id'>(data, prev, 'id'));
          console.log('更新页码');
          setPage((prevState) => {
            // 当获取的文章数量，小于设置的每页文章数量，表示当前是最后一页
            if (data.length < pageSize) {
              console.log('当前是最后一页, 页码不+1');
              setIsLastPage(() => true);
              // 如果当前是最后一页，页码不+1
              return prevState;
            }
            // 不是最后一页，页码+1
            return prevState + 1;
          });
        } else {
          console.log('没有数据，处理');
          if (page === 1) {
            // 第一页没值，就需要清空本地数据
            setHomeList([]);
          }
        }
      } catch (e) {
        console.error('请求主页列表出错: %o', e);
      } finally {
        console.log('完成数据请求');
        setLoading(() => false);
        Loading.hide();
      }
    },
    [isLastPage, loading, page, pageSize, setHomeList]
  );

  /** 从浏览器存储中删除当前存储的键值对 */
  const clearHomeListStorage = useCallback(() => {
    atomStorageClear(setHomeList);
  }, [setHomeList]);

  return {
    loading,
    homeList,
    page,
    setPage,
    pageSize,
    setPageSize,
    isLastPage,
    requestHomeList,
    clearHomeListStorage,
  };
};

export default useHomeList;
