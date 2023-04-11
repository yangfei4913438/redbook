import { atomStorage } from 'core/atom';

/** 用户信息的数据类型定义 */
export interface UserInfoType {
  /** 登陆名称 */
  name: string;
  /** 头像地址 */
  avatar: string;
  /** 描述 */
  desc: string;
  /** 性别 */
  sex: string;
  /** 小红书id */
  redBookId: number;
  /** 省份 */
  location: string;
  /** 昵称 */
  nickName: string;
}

/** 用户信息默认值 */
export const userInfoDefault: UserInfoType = {
  name: '',
  avatar: '',
  desc: '',
  sex: '',
  redBookId: -1,
  location: '',
  nickName: '',
};

/** 用户信息数据，在浏览器存储中的存储key */
export const userInfoStorageKey: string = 'UserInfo';

/** 用户信息的数据原子对象 */
export const userInfoAtom = atomStorage<UserInfoType>(userInfoStorageKey, userInfoDefault, true);
