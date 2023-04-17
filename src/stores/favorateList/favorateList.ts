import { atomStorage } from 'core/atom';
import type { ArticleSimpleType } from 'stores';

/** 点赞列表的数据类型定义 */
export interface FavorateType extends ArticleSimpleType {}

/** 点赞列表数据，在浏览器存储中的存储key */
export const favorateListStorageKey: string = 'FavorateList';

/** 点赞列表默认值 */
export const favorateListDefault: FavorateType[] = [];

/** 点赞列表的数据原子对象 */
export const favorateListAtom = atomStorage<FavorateType[]>(favorateListStorageKey, favorateListDefault, true);
