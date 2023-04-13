import { atomStorage } from 'core/atom';

/** 频道数据结构 */
export interface CategoryType {
  /** 名称 */
  name: string;
  /** 是否默认频道，不能取消 */
  default: boolean;
  /** 是否已经添加 */
  isAdd: boolean;
}

/** 默认频道列表数据 */
export const categoryListDefault: CategoryType[] = [
  // 默认添加频道
  { name: '推荐', default: true, isAdd: true },
  { name: '视频', default: true, isAdd: true },
  { name: '直播', default: true, isAdd: true },
  { name: '摄影', default: false, isAdd: true },

  { name: '穿搭', default: false, isAdd: true },
  { name: '读书', default: false, isAdd: true },
  { name: '影视', default: false, isAdd: true },
  { name: '科技', default: false, isAdd: true },

  { name: '健身', default: false, isAdd: true },
  { name: '科普', default: false, isAdd: true },
  { name: '美食', default: false, isAdd: true },
  { name: '情感', default: false, isAdd: true },

  { name: '舞蹈', default: false, isAdd: true },
  { name: '学习', default: false, isAdd: true },
  { name: '男士', default: false, isAdd: true },
  { name: '搞笑', default: false, isAdd: true },

  { name: '汽车', default: false, isAdd: true },
  { name: '职场', default: false, isAdd: true },
  { name: '运动', default: false, isAdd: true },
  { name: '旅行', default: false, isAdd: true },

  { name: '音乐', default: false, isAdd: true },
  { name: '护肤', default: false, isAdd: true },
  { name: '动漫', default: false, isAdd: true },
  { name: '游戏', default: false, isAdd: true },

  // 默认添加频道
  { name: '家装', default: false, isAdd: false },
  { name: '心理', default: false, isAdd: false },
  { name: '户外', default: false, isAdd: false },
  { name: '手工', default: false, isAdd: false },

  { name: '减脂', default: false, isAdd: false },
  { name: '校园', default: false, isAdd: false },
  { name: '社科', default: false, isAdd: false },
  { name: '露营', default: false, isAdd: false },

  { name: '文化', default: false, isAdd: false },
  { name: '机车', default: false, isAdd: false },
  { name: '艺术', default: false, isAdd: false },
  { name: '婚姻', default: false, isAdd: false },

  { name: '家居', default: false, isAdd: false },
  { name: '母婴', default: false, isAdd: false },
  { name: '绘画', default: false, isAdd: false },
  { name: '壁纸', default: false, isAdd: false },

  { name: '头像', default: false, isAdd: false },
];

/** 频道列表数据，在浏览器存储中的存储key */
export const categoryListStorageKey: string = 'CategoryList';

/** 频道列表数据的原子对象 */
export const categoryListAtom = atomStorage<CategoryType[]>(categoryListStorageKey, categoryListDefault, true);
