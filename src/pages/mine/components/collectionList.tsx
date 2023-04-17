import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useCollectionList } from 'stores';

import icon_no_collection from 'assets/icon_no_collection.webp';

import Empty from 'pages/mine/components/empty';
import ArticleList from 'pages/mine/components/articleList';

const CollectionList = () => {
  const { requestCollectionList, collectionList } = useCollectionList();

  useEffect(() => {
    requestCollectionList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (collectionList.length === 0) {
    return (
      <View className="w-full flex-1">
        <Empty icon={icon_no_collection} tips={'快去收藏你喜欢的作品吧～'} />
      </View>
    );
  }

  return (
    <View className="w-full flex-wrap flex-row bg-white pt-2">
      {collectionList.length > 0 && <ArticleList articles={collectionList} />}
    </View>
  );
};

export default CollectionList;
