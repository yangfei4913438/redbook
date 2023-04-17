import { atomStorage } from 'core/atom';

/** 单个消息的数据定义 */
export interface MessageType {
  /** 消息ID */
  id: number;
  /** 群组名称 */
  name: string;
  /** 群组图标 */
  avatarUrl: string;
  /** 最后一条消息 */
  lastMessage: string;
  /** 最后一条消息的发送时间 */
  lastMessageTime: boolean;
}

/** 首页列表数据，在浏览器存储中的存储key */
export const messageListStorageKey: string = 'MessageList';

/** 首页列表默认值 */
export const messageListDefault: MessageType[] = [];

/** 首页列表的数据原子对象 */
export const messageListAtom = atomStorage<MessageType[]>(messageListStorageKey, messageListDefault, true);
