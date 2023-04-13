import React, { useCallback, useEffect, useMemo } from 'react';
import { Dimensions, Image, ListRenderItem, Text, View } from 'react-native';
import { useHomeList, type ArticleSimple } from 'stores';

// 使用自定义瀑布流组件，替代无限加载列表组件
import FlowList from 'components/flowlist/FlowList';
// 图片自适应高度组件，配合瀑布流组件使用
import ResizeImage from 'components/ResizeImage';
// 自定义点赞组件
import Heart from 'components/Heart';

const { width: screenWidth } = Dimensions.get('window');

const Home = () => {
  const { homeList, loading, requestHomeList, isLastPage } = useHomeList();

  /** 初始化数据*/
  useEffect(() => {
    requestHomeList(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem: ListRenderItem<ArticleSimple> = useMemo(
    () =>
      ({ item }) => {
        return (
          <View className="ml-1.5 mb-1.5 rounded-md overflow-hidden" style={{ width: (screenWidth - 18) / 2 }}>
            <ResizeImage uri={item.image} />
            <Text className="text-sm font-bold text-[#333] px-3 py-1">{item.title}</Text>
            <View className="flex-row w-full items-center px-3 mb-3">
              <Image
                source={{ uri: item.avatarUrl }}
                className="w-5 h-5 rounded-[10px]"
                style={{ resizeMode: 'cover' }}
              />
              <Text className="text-[12px] text-[#999] ml-1.5 flex-1" numberOfLines={1} ellipsizeMode={'tail'}>
                {item.userName}
              </Text>
              <Heart value={item.isFavorite} onValueChanged={(value) => console.log(value)} />
              <Text className="text-sm text-[#999] ml-1.5">{item.favoriteCount}</Text>
            </View>
          </View>
        );
      },
    []
  );

  const resetData = useCallback(async () => {
    await requestHomeList(true);
  }, [requestHomeList]);

  const loadMore = useCallback(async () => {
    await requestHomeList(false);
  }, [requestHomeList]);

  const ListFooter = useMemo(() => {
    return (
      <Text className="w-full text-center my-4 text-[#999]">
        {isLastPage ? '没有更多数据了' : '数据加载中, 请稍后。。。'}
      </Text>
    );
  }, [isLastPage]);

  return (
    <View className="w-full h-full bg-[#f0f0f0] justify-center items-center">
      <FlowList
        className="w-full h-full mt-1.5"
        data={homeList}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false} // 是否显示纵向滚动条
        inverted={false} // 是否反向渲染（倒序排列）
        numColumns={2} // 一行渲染几列，注意样式
        refreshing={loading} // 是否在请求数据
        onRefresh={resetData} // 每次进来的时候，请求新数据，上拉刷新
        onEndReachedThreshold={0.4} // 距离底部40%的时候，加载更多数据
        onEndReached={loadMore} // 触发后，执行当前方法
        ListFooterComponent={ListFooter} // 底部组件
      />
    </View>
  );
};

export default Home;
