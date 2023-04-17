import { atomStorage } from 'core/atom';

/** 未读消息的数据定义 */
export interface UnreadMessageType {
  /** 未读消息 */
  unreadFavorate: number;
  /** 新消息 */
  newFollow: number;
  /** 数量 */
  comment: number;
}

/** 未读消息数据，在浏览器存储中的存储key */
export const unreadMessageStorageKey: string = 'UnreadMessage';

/** 未读消息默认值 */
export const unreadMessageDefault: UnreadMessageType = { unreadFavorate: -1, newFollow: -1, comment: -1 };

/** 未读消息的数据原子对象 */
export const unreadMessageAtom = atomStorage<UnreadMessageType>(unreadMessageStorageKey, unreadMessageDefault, true);
