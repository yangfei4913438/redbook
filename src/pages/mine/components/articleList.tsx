import React, { FC, useCallback } from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import ResizeImage from 'components/ResizeImage';
import Heart from 'components/Heart';
import { ArticleSimpleType, useArticleDetail } from 'stores';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Toast from 'components/widget/Toast';

const { width: screenWidth } = Dimensions.get('window');

interface ArticleListProps<T> {
  articles: T[];
}

const ArticleList = <T extends ArticleSimpleType>({ articles }: ArticleListProps<T>) => {
  // 请求页面详情的方法
  const { requestArticleDetail } = useArticleDetail();
  // 路由相关
  const navigation = useNavigation<StackNavigationProp<any>>();

  /** 跳转详情页 */
  const onArticlePress = useCallback(
    (article: T) => () => {
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

  return (
    <>
      {articles.map((item, index) => {
        return (
          <TouchableOpacity
            className="ml-1.5 mb-1.5 rounded-md overflow-hidden"
            style={{ width: (screenWidth - 18) / 2 }}
            onPress={onArticlePress(item)}
            key={`${item.id}-${index}`}
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
      })}
    </>
  );
};

export default ArticleList;
