import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Dimensions, Image, ListRenderItem, Text, TouchableOpacity, View } from 'react-native';
import { useHomeList, type ArticleSimpleType, CategoryType, useCategoryList } from 'stores';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// 使用自定义瀑布流组件，替代无限加载列表组件
import FlowList from 'components/flowlist/FlowList';
// 图片自适应高度组件，配合瀑布流组件使用
import ResizeImage from 'components/ResizeImage';
// 自定义点赞组件
import Heart from 'components/Heart';
// 首页标题栏
import TitleBar from './components/titleBar';
// 分类列表
import CategoryList from './components/categoryList';
// 提示组件
import Toast from 'components/widget/Toast';
// 文章详情hooks
import { useArticleDetail } from 'stores';

const { width: screenWidth } = Dimensions.get('window');

const Home = () => {
  // 分类数据
  const { categoryList } = useCategoryList();
  // 首页列表数据
  const { homeList, loading, requestHomeList, isLastPage } = useHomeList();
  // 选中的tab
  const [activeTab, setActiveTab] = useState<number>(0);
  // 选中的标签
  const [activeCategory, setActiveCategory] = useState<CategoryType>(categoryList[0]);
  // 请求页面详情的方法
  const { requestArticleDetail } = useArticleDetail();

  // 路由相关
  const navigation = useNavigation<StackNavigationProp<any>>();

  /** 初始化数据*/
  useEffect(() => {
    requestHomeList(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** 跳转详情页 */
  const onArticlePress = useCallback(
    (article: ArticleSimpleType) => () => {
      // 先尝试获取详情
      requestArticleDetail(article.id, (ok) => {
        if (ok) {
          // 获取到页面详情之后，再跳转路由
          navigation.push('ArticleDetail', { id: article.id });
        } else {
          // 异常提示
          Toast.show('获取文章详情失败，请稍后再试');
        }
      });
    },
    [navigation, requestArticleDetail]
  );

  const renderItem: ListRenderItem<ArticleSimpleType> = useMemo(
    () =>
      ({ item }) => {
        return (
          <TouchableOpacity
            className="ml-1.5 mb-1.5 rounded-md overflow-hidden"
            style={{ width: (screenWidth - 18) / 2 }}
            onPress={onArticlePress(item)}
          >
            <ResizeImage uri={item.image} />
            <Text className="text-sm text-primary px-3 py-1">{item.title}</Text>
            <View className="flex-row w-full items-center px-3 mb-3">
              <Image
                source={{ uri: item.avatarUrl }}
                className="w-5 h-5 rounded-[10px]"
                style={{ resizeMode: 'cover' }}
              />
              <Text className="text-2 text-secondary ml-1.5 flex-1" numberOfLines={1} ellipsizeMode={'tail'}>
                {item.userName}
              </Text>
              <Heart value={item.isFavorite} onValueChanged={(value) => console.log(value)} />
              <Text className="text-sm text-secondary ml-1.5">{item.favoriteCount}</Text>
            </View>
          </TouchableOpacity>
        );
      },
    [onArticlePress]
  );

  const resetData = useCallback(async () => {
    await requestHomeList(true);
  }, [requestHomeList]);

  const loadMore = useCallback(async () => {
    await requestHomeList(false);
  }, [requestHomeList]);

  const ListFooter = useMemo(() => {
    return (
      <Text className="w-full text-center my-4 text-secondary">
        {isLastPage ? '没有更多数据了' : '数据加载中,请稍后...'}
      </Text>
    );
  }, [isLastPage]);

  const ListTitle = useMemo(() => {
    return <CategoryList activeCategory={activeCategory} setActiveCategory={setActiveCategory} />;
  }, [activeCategory]);

  return (
    <View className="w-full h-full bg-primary justify-center items-center">
      <TitleBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <FlowList
        className="w-full h-full"
        data={homeList}
        renderItem={renderItem}
        keyExtractor={(item: ArticleSimpleType, index: number) => `${item.id}-${index}`}
        showsVerticalScrollIndicator={false} // 是否显示纵向滚动条
        inverted={false} // 是否反向渲染（倒序排列）
        numColumns={2} // 一行渲染几列，注意样式
        refreshing={loading} // 是否在请求数据
        onRefresh={resetData} // 每次进来的时候，请求新数据，上拉刷新
        onEndReachedThreshold={0.4} // 距离底部40%的时候，加载更多数据
        onEndReached={loadMore} // 触发后，执行当前方法
        ListFooterComponent={ListFooter} // 底部组件
        ListHeaderComponent={ListTitle} // 头部组件
      />
    </View>
  );
};

export default Home;
