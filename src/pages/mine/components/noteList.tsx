import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useNoteList } from 'stores';

import icon_no_note from 'assets/icon_no_note.webp';

import Empty from 'pages/mine/components/empty';
import ArticleList from 'pages/mine/components/articleList';

const NoteList = () => {
  const { requestNoteList, noteList } = useNoteList();

  useEffect(() => {
    requestNoteList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (noteList.length === 0) {
    return (
      <View className="w-full flex-1">
        <Empty icon={icon_no_note} tips={'快去发布今日的好心情吧～'} />
      </View>
    );
  }

  return (
    <View className="w-full flex-wrap flex-row bg-white pt-2">
      {noteList.length > 0 && <ArticleList articles={noteList} />}
    </View>
  );
};

export default NoteList;
