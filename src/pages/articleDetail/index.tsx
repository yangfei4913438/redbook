import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { Dimensions, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import dayjs from 'dayjs';

import { useArticleDetail, useUserInfo } from 'stores';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ImageSlider, { type DataType } from 'components/slidePager';

import icon_share from 'assets/icon_share.png';
import icon_arrow from 'assets/icon_arrow.png';
import icon_collection from 'assets/icon_collection.png';
import icon_collection_selected from 'assets/icon_collection_selected.png';
import icon_comment from 'assets/icon_comment.png';
import icon_edit_comment from 'assets/icon_edit_comment.png';

import Heart from 'components/Heart';

const { width: screenWidth } = Dimensions.get('window');

const ArticleDetail = () => {
  const { userInfo } = useUserInfo();
  const { articleDetail, articleImages, articleTags } = useArticleDetail();
  // 路由相关
  const navigation = useNavigation<StackNavigationProp<any>>();
  // 图片轮播高度， 默认高度400
  const [imgHeight, setImgHeight] = useState<number>(400);

  // 图片高度计算
  useEffect(() => {
    // 数组长度大于0才行
    if (articleImages.length) {
      // 拿到第一张图片
      const img = articleImages[0].img;
      Image.getSize(img, (width, height) => {
        const showHeight = (screenWidth * height) / width;
        setImgHeight(showHeight);
      });
    }
  }, [articleImages, articleImages.length]);

  // 渲染标题
  const renderTitle = useMemo(() => {
    return (
      <View className="w-full h-14 flex-row items-center">
        <TouchableOpacity
          className={'h-full px-4 justify-center'}
          onPress={() => {
            // 移除当前路由，回到上个路由页面
            navigation.pop();
          }}
        >
          <Image source={icon_arrow} className="w-5 h-5" />
        </TouchableOpacity>
        <Image
          source={{ uri: articleDetail.avatarUrl }}
          className="w-10 h-10 rounded-5"
          style={{ resizeMode: 'cover' }}
        />
        <Text className="text-primary ml-4 flex-1">{articleDetail.userName}</Text>
        <TouchableOpacity>
          <Text
            className="px-4 h-7 rounded-3 border border-xhs text-2 text-xhs"
            style={{ textAlign: 'center', textAlignVertical: 'center' }}
          >
            关注
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={icon_share} className="w-7 h-7 mx-4" />
        </TouchableOpacity>
      </View>
    );
  }, [articleDetail.avatarUrl, articleDetail.userName, navigation]);

  // 渲染文章头图
  const renderImages = useMemo(() => {
    if (articleDetail?.images?.length === 0) {
      return null;
    }

    return (
      <View className="pb-7">
        <ImageSlider
          data={articleImages as DataType[]}
          autoPlay={false}
          closeIconColor={'white'}
          caroselImageStyle={{ height: imgHeight }}
          indicatorContainerStyle={{ bottom: -40 }}
          activeIndicatorStyle={{
            width: 6,
            height: 6,
            backgroundColor: '#ff2442',
            borderRadius: 3,
          }} // 选中图片
          inActiveIndicatorStyle={{
            width: 6,
            height: 6,
            backgroundColor: '#c0c0c0',
            borderRadius: 3,
          }} // 未选中图片
        />
      </View>
    );
  }, [articleDetail?.images?.length, articleImages, imgHeight]);

  // 渲染文章信息
  const renderInfo = useMemo(() => {
    //
    return (
      <View className="px-4 mb-4">
        <Text className="text-4p5 text-primary font-bold">{articleDetail.title}</Text>
        <Text className="text-primary text-3p5 mt-1.5">{articleDetail.desc}</Text>
        <Text className="text-3p5 text-[#305090] mt-1.5">{articleTags}</Text>
        <Text className="text-2 text-secondary" style={{ marginVertical: 16 }}>
          {articleDetail.dateTime} {articleDetail.location}
        </Text>
        <View className="h-mini bg-secondary" />
      </View>
    );
  }, [articleDetail.dateTime, articleDetail.desc, articleDetail.location, articleDetail.title, articleTags]);

  // 渲染评论区
  const renderComments = useMemo(() => {
    //
    return (
      <View className="px-4 space-y-4 mb-8">
        <Text className="text-third">
          {articleDetail?.comments && articleDetail.comments?.length > 0
            ? `共 ${articleDetail.comments?.length} 条评论`
            : '暂无评论'}
        </Text>
        <View className="flex-row items-center w-full space-x-3">
          <Image source={{ uri: userInfo.avatar }} className="w-8 h-8 rounded-4" style={{ resizeMode: 'cover' }} />
          <TextInput
            className="flex-1 bg-primary text-primary h-8 rounded-4 px-3 text-sm"
            style={{ textAlignVertical: 'center', paddingVertical: 0 }}
            placeholder={'说点什么吧，万一火了呢'}
            placeholderTextColor={'#bbb'}
          />
        </View>
        {!!articleDetail.comments?.length && (
          <View className="space-y-2">
            {articleDetail.comments.map((comment, index) => {
              return (
                <Fragment key={`${comment.userName}-${index}`}>
                  <View className="w-full flex-row space-x-3">
                    <Image
                      source={{ uri: comment.avatarUrl }}
                      className="w-9 h-9 rounded-4p5"
                      style={{ resizeMode: 'cover' }}
                    />
                    <View className="flex-1 space-y-2">
                      <Text className="text-2 text-secondary">{comment.userName}</Text>
                      <Text className="w-full">
                        {comment.message} {'\t'}
                        <Text className="text-2 text-secondary">
                          {dayjs(comment.dateTime).format('MM-DD')} {comment.location}
                        </Text>
                      </Text>
                      {!!comment.children?.length && (
                        <View className="w-full space-y-1">
                          {comment.children.map((sub, subIndex) => {
                            return (
                              <View
                                className="flex-row space-x-3"
                                style={{ width: screenWidth - (16 + 36 + 12 + 16) }}
                                key={`${sub.userName}-${subIndex}-${index}`}
                              >
                                <Image
                                  source={{ uri: sub.avatarUrl }}
                                  className="w-9 h-9 rounded-4p5"
                                  style={{ resizeMode: 'cover' }}
                                />
                                <View className="flex-1 space-y-1">
                                  <Text className="text-2 text-secondary">{sub.userName}</Text>
                                  <Text className="w-full">
                                    {sub.message} {'\t'}
                                    <Text className="text-2 text-secondary">
                                      {dayjs(sub.dateTime).format('MM-DD')} {sub.location}
                                    </Text>
                                  </Text>
                                </View>
                                <View className="items-center space-y-0.5">
                                  <Heart size={20} value={sub.isFavorite} />
                                  <Text className="text-2 text-third">{sub.favoriteCount}</Text>
                                </View>
                              </View>
                            );
                          })}
                        </View>
                      )}
                    </View>
                    <View className="items-center space-y-0.5">
                      <Heart size={20} value={comment.isFavorite} />
                      <Text className="text-2 text-third">{comment.favoriteCount}</Text>
                    </View>
                  </View>
                  {articleDetail?.comments && index < articleDetail.comments.length - 1 && (
                    <View className="ml-12 my-3 h-mini bg-secondary" />
                  )}
                </Fragment>
              );
            })}
          </View>
        )}
      </View>
    );
  }, [articleDetail.comments, userInfo.avatar]);

  return (
    <View className="w-full h-full bg-white">
      {renderTitle}
      <ScrollView className={'flex-1'}>
        <>
          {renderImages}
          {renderInfo}
          {renderComments}
        </>
      </ScrollView>
      <View className="w-full h-14 flex-row items-center px-4 border-t border-line">
        <View className="flex-row h-10 flex-1 items-center px-3 bg-primary rounded-5 mr-3">
          <Image source={icon_edit_comment} className="w-5 h-5" style={{ tintColor: '#333' }} />
          <TextInput
            className="flex-1 text-primary h-full text-4"
            style={{ textAlignVertical: 'center', paddingVertical: 0 }}
            placeholder={'说点什么吧'}
            placeholderTextColor={'#333'}
          />
        </View>

        <Heart value={articleDetail.isFavorite} size={30} />
        <Text className="text-primary font-bold ml-2 text-4">{articleDetail.favoriteCount}</Text>

        <Image
          source={articleDetail.isCollection ? icon_collection_selected : icon_collection}
          className="w-[30px] h-[30px] ml-3"
        />
        <Text className="text-primary font-bold ml-2 text-4">{articleDetail.collectionCount}</Text>

        <Image source={icon_comment} className="w-[30px] h-[30px] ml-3" />
        <Text className="text-primary font-bold ml-2 text-4">{articleDetail.comments?.length ?? 0}</Text>
      </View>
    </View>
  );
};

export default ArticleDetail;
