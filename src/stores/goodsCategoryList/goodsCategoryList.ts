import { atomStorage } from 'core/atom';

/** 货物分类数据结构 */
export interface GoodsCategoryType {
  /** id */
  id: number;
  /** 分类名称 */
  name: string;
  /** 分类图片 */
  image: string;
}

/** 货物分类列表数据 */
export const goodsCategoryListDefault: GoodsCategoryType[] = [];

/** 货物分类列表数据，在浏览器存储中的存储key */
export const goodsCategoryListStorageKey: string = 'GoodsCategoryList';

/** 货物分类列表数据的原子对象 */
export const goodsCategoryListAtom = atomStorage<GoodsCategoryType[]>(
  goodsCategoryListStorageKey,
  goodsCategoryListDefault,
  true
);
