import { useAtom } from 'jotai';
import { noteListAtom, noteListDefault, type NoteType } from './noteList';
import { useCallback } from 'react';
import { atomStorageClear } from 'core/atom';
import { useRequestPageData } from 'stores/hooks';

const useNoteList = () => {
  const [noteList, setNoteList] = useAtom(noteListAtom);

  /** 从浏览器存储中删除当前存储的键值对 */
  const clearNoteListStorage = useCallback(() => {
    atomStorageClear(setNoteList);
  }, [setNoteList]);

  /** 重置为默认值 */
  const resetNoteList = useCallback(() => {
    setNoteList(noteListDefault);
  }, [setNoteList]);

  // 拿到分页数据
  const noteListPageData = useRequestPageData<NoteType, 'id'>({
    setPageData: setNoteList,
    ApiName: 'noteList',
    unique: 'id',
  });

  // 解构数据
  const { requestPageData, loading, ...rest } = noteListPageData;

  return {
    ...rest,
    noteLoading: loading,
    requestNoteList: requestPageData,
    noteList,
    clearNoteListStorage,
    resetNoteList,
  };
};

export default useNoteList;
