import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useFavorateList } from 'stores';

import icon_no_favorate from 'assets/icon_no_favorate.webp';

import Empty from 'pages/mine/components/empty';
import ArticleList from 'pages/mine/components/articleList';

const FavorateList = () => {
  const { requestFavorateList, favorateList } = useFavorateList();

  useEffect(() => {
    requestFavorateList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (favorateList.length === 0) {
    return (
      <View className="w-full flex-1">
        <Empty icon={icon_no_favorate} tips={'喜欢点赞的人运气不会太差哦～'} />
      </View>
    );
  }

  return (
    <View className="w-full flex-wrap flex-row bg-white pt-2">
      {favorateList.length > 0 && <ArticleList articles={favorateList} />}
    </View>
  );
};

export default FavorateList;
