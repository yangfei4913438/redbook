import React, { useEffect, useMemo, useState } from 'react';
import { Image, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useAccountInfo, useCollectionList, useFavorateList, useNoteList, useUserInfo } from 'stores';

import icon_mine_bg from 'assets/icon_mine_bg.png';
import icon_menu from 'assets/icon_menu.png';
import icon_shop_car from 'assets/icon_shop_car.png';
import icon_share from 'assets/icon_share.png';
import icon_qrcode from 'assets/icon_qrcode.png';
import icon_add from 'assets/icon_add.png';
import icon_male from 'assets/icon_male.png';
import icon_female from 'assets/icon_female.png';
import icon_setting from 'assets/icon_setting.png';

import MineBar from 'pages/mine/components/mineBar';
import NoteList from 'pages/mine/components/noteList';
import CollectionList from 'pages/mine/components/collectionList';
import FavorateList from 'pages/mine/components/favorateList';

const Mine = () => {
  const { userInfo } = useUserInfo();
  const { requestAccountInfo, accountInfo } = useAccountInfo();
  const { noteList, requestNoteList, noteLoading } = useNoteList();
  const { collectionList, requestCollectionList, collectionLoading } = useCollectionList();
  const { favorateList, requestFavorateList, favorateLoading } = useFavorateList();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [topHeight, setTopHeight] = useState(0);

  useEffect(() => {
    requestAccountInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderTitle = useMemo(() => {
    return (
      <View className="w-full h-12 flex-row items-center">
        <TouchableOpacity className="h-full px-4 justify-center">
          <Image source={icon_menu} className="w-7 h-7" resizeMode={'contain'} />
        </TouchableOpacity>
        <View className="flex-1" />
        <TouchableOpacity className="mr-3">
          <Image source={icon_shop_car} className="w-7 h-7" resizeMode={'contain'} style={{ tintColor: 'white' }} />
        </TouchableOpacity>
        <TouchableOpacity className="mr-4">
          <Image source={icon_share} className="w-7 h-7" resizeMode={'contain'} style={{ tintColor: 'white' }} />
        </TouchableOpacity>
      </View>
    );
  }, []);

  const renderUserInfo = useMemo(() => {
    return (
      <View
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          // 除了用户信息的高度，还要加上标题的高度48 和 tab区域的高度48
          const realHeight = height + 48 + 48;
          setTopHeight(realHeight);
        }}
      >
        <View className="w-full flex-row items-end py-4">
          <Image source={{ uri: userInfo.avatar }} className="w-24 h-24 rounded-12" resizeMode={'cover'} />
          <Image source={icon_add} className="w-7 h-7 -ml-7 mb-0.5" />

          <View className="ml-4 flex-1 space-y-4 mb-5">
            <Text className="text-white font-bold text-5">{userInfo.nickName}</Text>
            <View className="flex-row items-center space-x-1">
              <Text className="text-2 text-darkLine">小红书号: {userInfo.redBookId}</Text>
              <Image
                source={icon_qrcode}
                className="w-2 h-2 mt-1"
                resizeMode={'contain'}
                style={{ tintColor: '#bbb' }}
              />
            </View>
          </View>
        </View>
        <Text className="text-white text-sm">{userInfo.desc}</Text>
        <View className="px-2 mt-2 h-6 w-8 bg-transparent-30 rounded-3 justify-center items-center">
          <Image
            source={userInfo.sex === 'male' ? icon_male : icon_female}
            resizeMode={'contain'}
            className="w-3 h-3"
          />
        </View>
        <View className="w-full mt-5 mb-8 flex-row items-center">
          <View className="items-center pr-4 space-y-1.5">
            <Text className="text-4p5 text-white">{accountInfo.followCount}</Text>
            <Text className="text-2 text-line">关注</Text>
          </View>
          <View className="items-center pr-4 space-y-1.5">
            <Text className="text-4p5 text-white">{accountInfo.fans}</Text>
            <Text className="text-2 text-line">粉丝</Text>
          </View>
          <View className="items-center pr-4 space-y-1.5">
            <Text className="text-4p5 text-white">{accountInfo.favorateCount}</Text>
            <Text className="text-2 text-line">获赞与收藏</Text>
          </View>

          <View className="flex-1" />

          <TouchableOpacity className="h-8 px-4 border border-white rounded-4 justify-center items-center mr-2">
            <Text className="text-white mb-0.5">编辑资料</Text>
          </TouchableOpacity>
          <TouchableOpacity className="h-8 px-4 border border-white rounded-4 justify-center items-center">
            <Image source={icon_setting} className="w-5 h-5" style={{ tintColor: '#fff' }} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }, [
    accountInfo.fans,
    accountInfo.favorateCount,
    accountInfo.followCount,
    userInfo.avatar,
    userInfo.desc,
    userInfo.nickName,
    userInfo.redBookId,
    userInfo.sex,
  ]);

  const scrollStyle = useMemo(() => {
    switch (activeTab) {
      case 0:
        return noteList.length === 0 ? { height: '100%' } : {};
      case 1:
        return collectionList.length === 0 ? { height: '100%' } : {};
      case 2:
        return favorateList.length === 0 ? { height: '100%' } : {};
      default:
        return {};
    }
  }, [activeTab, collectionList.length, favorateList.length, noteList.length]);

  const currentRefresh = useMemo(() => {
    switch (activeTab) {
      case 0:
        return { loading: noteLoading, request: requestNoteList };
      case 1:
        return { loading: collectionLoading, request: requestCollectionList };
      default:
        return { loading: favorateLoading, request: requestFavorateList };
    }
  }, [
    activeTab,
    collectionLoading,
    favorateLoading,
    noteLoading,
    requestCollectionList,
    requestFavorateList,
    requestNoteList,
  ]);

  return (
    <View className="w-full h-full bg-white">
      <Image source={icon_mine_bg} className="w-full absolute top-0" style={{ height: topHeight }} />
      {renderTitle}
      <ScrollView
        className="w-full flex-1"
        contentContainerStyle={scrollStyle}
        refreshControl={<RefreshControl refreshing={currentRefresh.loading} onRefresh={currentRefresh.request} />}
      >
        <View className="px-4">{renderUserInfo}</View>
        <MineBar activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === 0 && <NoteList />}
        {activeTab === 1 && <CollectionList />}
        {activeTab === 2 && <FavorateList />}
      </ScrollView>
    </View>
  );
};

export default Mine;
