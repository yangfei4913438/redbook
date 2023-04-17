import React, { useEffect, useMemo } from 'react';
import { FlatList, Image, ListRenderItem, StyleProp, Text, TextStyle, View } from 'react-native';
import { type MessageType, useMessageList, useUnreadMessage } from 'stores';

import icon_star from 'assets/icon_star.png';
import icon_new_follow from 'assets/icon_new_follow.png';
import icon_comments from 'assets/icon_comments.png';
import icon_to_top from 'assets/icon_to_top.png';

import ChatGroup from './components/chatGroup';

interface UnReadCountProps {
  count: number;
  className?: string;
  style?: StyleProp<TextStyle>;
}
const UnReadCount = ({ count, className, style }: UnReadCountProps) => {
  if (count > 0) {
    return (
      <Text className={className} style={style}>
        {count > 99 ? '99+' : count}
      </Text>
    );
  }
  return null;
};

const Message = () => {
  const { messageList, requestMessageList } = useMessageList();
  const { unreadMessage, requestUnreadMessage } = useUnreadMessage();

  useEffect(() => {
    requestMessageList(true);
    requestUnreadMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderTitle = useMemo(() => {
    return (
      <View className="w-full h-12 flex-row items-center justify-center">
        <Text className="text-lg text-primary font-bold">消息</Text>
        <ChatGroup />
      </View>
    );
  }, []);

  const renderItem: ListRenderItem<MessageType> = useMemo(
    () =>
      ({ item }) => {
        return (
          <View className="w-full h-20 flex-row items-center space-x-2">
            <Image source={{ uri: item.avatarUrl }} className="w-12 h-12 rounded-6" style={{ resizeMode: 'cover' }} />
            <View className="flex-1 space-y-1">
              <Text className="text-4p5 text-primary font-bold">{item.name}</Text>
              <Text className="text-3p5 text-secondary">{item.lastMessage}</Text>
            </View>
            <View className="items-end space-y-1.5">
              <Text className="text-2 text-secondary">{item.lastMessageTime}</Text>
              <Image source={icon_to_top} className="w-2 h-4" style={{ resizeMode: 'contain' }} />
            </View>
          </View>
        );
      },
    []
  );

  const renderHeader = useMemo(() => {
    return (
      <View className="flex-row py-5">
        <View className="flex-1 items-center space-y-2">
          <View className="">
            <Image source={icon_star} className="w-15 h-15" />
            <UnReadCount
              count={unreadMessage.unreadFavorate}
              className="absolute -top-1.5 -right-2.5 bg-xhs px-2 h-6 rounded-2 text-center text-2 text-white"
              style={{ textAlignVertical: 'center' }}
            />
          </View>
          <Text className="text-primary text-4">赞和收藏</Text>
        </View>
        <View className="flex-1 items-center space-y-2">
          <View>
            <Image source={icon_new_follow} className="w-15 h-15" />
            <UnReadCount
              count={unreadMessage.newFollow}
              className="absolute -top-1.5 -right-2.5 bg-xhs px-2 h-6 rounded-2 text-center text-2 text-white"
              style={{ textAlignVertical: 'center' }}
            />
          </View>
          <Text className="text-primary text-4">新增关注</Text>
        </View>
        <View className="flex-1 items-center space-y-2">
          <View>
            <Image source={icon_comments} className="w-15 h-15" />
            <UnReadCount
              count={unreadMessage.comment}
              className="absolute -top-1.5 -right-2.5 bg-xhs px-2 h-6 rounded-2 text-center text-2 text-white"
              style={{ textAlignVertical: 'center' }}
            />
          </View>
          <Text className="text-primary text-4">评论和@</Text>
        </View>
      </View>
    );
  }, [unreadMessage.comment, unreadMessage.newFollow, unreadMessage.unreadFavorate]);

  return (
    <View className="w-full h-full bg-white">
      {renderTitle}
      <FlatList
        className="flex-1 px-4"
        data={messageList}
        extraData={[unreadMessage]}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeader}
      />
    </View>
  );
};

export default Message;
