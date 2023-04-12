/** 文章的数据结构 */
export interface Article {
  /** 文章ID */
  id: number;
  /** 文章标题 */
  title: string;
  /** 文章描述 */
  desc: string;
  /** 文章标签 */
  tag: string[];
  /** 文章发布时间 */
  dateTime: string;
  /** 文章发布地点 */
  location: string;
  /** 文章发布用户ID */
  userId: string;
  /** 文章作者的名称 */
  userName: string;
  /** 文章作者的头像 */
  avatarUrl: string;
  /** 文章作者是否关注 */
  isFollow: boolean;
  /** 文章中的图片数组 */
  images: string[];
  /** 文章被点赞多少次 */
  favoriteCount: number;
  /** 文章被收藏的数量 */
  collectionCount: number;
  /** 这篇文章你有没有点赞 */
  isFavorite: boolean;
  /** 这篇文章你有没有收藏 */
  isCollection: boolean;
  /** 文章的评论 */
  comments?: ArticleComment[];
}

/** 文章评论的数据结构 */
export interface ArticleComment {
  /** 评论者的名称 */
  userName: string;
  /** 评论者的头像 */
  avatarUrl: string;
  /** 评论内容 */
  message: string;
  /** 评论时间 */
  dateTime: string;
  /** 评论者的地区 */
  location: string;
  /** 评论被点赞次数 */
  favoriteCount: number;
  /** 评论你是否点赞了 */
  isFavorite: boolean;
  /** 评论的评论 */
  children?: ArticleComment[];
}
