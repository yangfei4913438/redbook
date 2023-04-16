import { atomStorage } from 'core/atom';

/** 货物列表的数据类型定义 */
export interface GoodsSimpleType {
  /** 货物ID */
  id: number;
  /** 货物标题 */
  title: string;
  /** 货物图片 */
  image: string;
  /** 货物的价格 */
  price: number;
  /** 货物的原价 */
  originPrice?: number;
  /** 货物的促销文案 */
  promotion?: string;
}

/** 货物列表数据，在浏览器存储中的存储key */
export const goodsListStorageKey: string = 'GoodsList';

/** 货物列表默认值 */
export const goodsListDefault: GoodsSimpleType[] = [];

/** 货物列表的数据原子对象 */
export const goodsListAtom = atomStorage<GoodsSimpleType[]>(goodsListStorageKey, goodsListDefault, true);
