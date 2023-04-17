import { atomStorage } from 'core/atom';

/** 账号信息的数据定义 */
export interface AccountInfoType {
  /** 关注数量 */
  followCount: number;
  /** 粉丝数量 */
  fans: number;
  /** 获赞与收藏数量 */
  favorateCount: number;
}

/** 账号信息数据，在浏览器存储中的存储key */
export const accountInfoStorageKey: string = 'AccountInfo';

/** 账号信息默认值 */
export const accountInfoDefault: AccountInfoType = { followCount: -1, fans: -1, favorateCount: -1 };

/** 账号信息的数据原子对象 */
export const accountInfoAtom = atomStorage<AccountInfoType>(accountInfoStorageKey, accountInfoDefault, true);
