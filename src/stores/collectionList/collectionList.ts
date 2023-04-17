import { atomStorage } from 'core/atom';
import type { ArticleSimpleType } from 'stores';

/** 收藏列表的数据类型定义 */
export interface CollectionType extends ArticleSimpleType {}

/** 收藏列表数据，在浏览器存储中的存储key */
export const collectionListStorageKey: string = 'CollectionList';

/** 收藏列表默认值 */
export const collectionListDefault: CollectionType[] = [];

/** 收藏列表的数据原子对象 */
export const collectionListAtom = atomStorage<CollectionType[]>(collectionListStorageKey, collectionListDefault, true);
