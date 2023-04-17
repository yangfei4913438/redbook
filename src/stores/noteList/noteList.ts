import { atomStorage } from 'core/atom';
import type { ArticleSimpleType } from 'stores';

/** 笔记列表的数据类型定义 */
export interface NoteType extends ArticleSimpleType {}

/** 笔记列表数据，在浏览器存储中的存储key */
export const noteListStorageKey: string = 'NoteList';

/** 笔记列表默认值 */
export const noteListDefault: NoteType[] = [];

/** 笔记列表的数据原子对象 */
export const noteListAtom = atomStorage<NoteType[]>(noteListStorageKey, noteListDefault, true);
