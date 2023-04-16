import { useAtom } from 'jotai';
import { articleDetailAtom, articleDetailDefault, ArticleDetailType } from './articleDetail';
import { useCallback, useMemo } from 'react';
import { atomStorageClear } from 'core/atom';
import Loading from 'components/widget/Loading';
import { request } from 'core/request';

const useArticleDetail = () => {
  const [articleDetail, setArticleDetail] = useAtom(articleDetailAtom);

  /** 重置为默认值 */
  const resetArticleDetail = useCallback(() => {
    setArticleDetail(articleDetailDefault);
  }, [setArticleDetail]);

  /** 从浏览器存储中删除当前存储的键值对 */
  const clearArticleDetailStorage = useCallback(() => {
    atomStorageClear(setArticleDetail);
  }, [setArticleDetail]);

  /** 请求文章详情 */
  const requestArticleDetail = useCallback(
    async (id: number, callback?: (success: boolean) => void) => {
      Loading.show();
      try {
        const { data } = await request<ArticleDetailType>('articleDetail', { id });
        if (data) {
          setArticleDetail(data);
          callback?.(true);
        } else {
          console.log('返回的文章详情为空: 文章id<%s>', id);
          callback?.(false);
        }
      } catch (e) {
        console.error('请求文章详情出现错误: %s', e);
        callback?.(false);
      } finally {
        Loading.hide();
      }
    },
    [setArticleDetail]
  );

  /** 文章详情的图片列表, 提供给轮播图组件的数据格式 */
  const articleImages = useMemo(() => {
    return articleDetail.images.map((img) => ({ img }));
  }, [articleDetail.images]);

  /** 文章详情的标签列表 */
  const articleTags = useMemo(() => {
    return articleDetail.tag.map((t) => `#${t}`).join(' ');
  }, [articleDetail.tag]);

  return {
    articleDetail,
    articleImages,
    articleTags,
    requestArticleDetail,
    clearArticleDetailStorage,
    resetArticleDetail,
  };
};

export default useArticleDetail;
