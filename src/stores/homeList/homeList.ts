import { atomStorage } from 'core/atom';

/** 首页列表的数据类型定义 */
export interface ArticleSimple {
  /** 文章ID */
  id: number;
  /** 文章标题 */
  title: string;
  /** 文章作者的名称 */
  userName: string;
  /** 文章作者的头像 */
  avatarUrl: string;
  /** 文章被点赞多少次 */
  favoriteCount: number;
  /** 这篇文章你有没有点赞 */
  isFavorite: boolean;
  /** 文章中的第一张图片 */
  image: string;
}

/** 首页列表数据，在浏览器存储中的存储key */
export const homeListStorageKey: string = 'HomeList';

/** 首页列表默认值 */
export const homeListDefault: ArticleSimple[] = [];

/** 首页列表的数据原子对象 */
export const homeListAtom = atomStorage<ArticleSimple[]>(homeListStorageKey, homeListDefault, true);
