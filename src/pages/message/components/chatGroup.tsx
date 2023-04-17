import React, { useRef, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import icon_group from 'assets/icon_group.png';
import icon_create_group from 'assets/icon_create_group.png';
import CustomModel, { type CustomModelResult } from 'components/customModel';

const ChatGroup = () => {
  const modelRef = useRef<CustomModelResult>(null);
  const [top, setTop] = useState<number>(0);

  return (
    <>
      <TouchableOpacity
        className="flex-row items-center space-x-1.5 absolute right-4"
        onPress={(event) => {
          const { nativeEvent } = event;
          // 除了目标的高度，还要加上标题的高度
          const realTop = nativeEvent.pageY + 48;
          setTop(realTop);
          modelRef.current?.show();
        }}
      >
        <Image source={icon_group} className="w-4 h-4" />
        <Text className="text-primary">群聊</Text>
      </TouchableOpacity>

      <CustomModel ref={modelRef}>
        <TouchableOpacity
          className="w-full h-full bg-transparent-60"
          onPress={() => {
            modelRef.current?.hide();
          }}
        >
          <TouchableOpacity
            className="bg-white rounded-4 w-[170px] right-4 absolute"
            style={{ marginTop: top }}
            onPress={(event) => {
              event.stopPropagation();
            }}
          >
            <TouchableOpacity className="w-full h-14 flex-row items-center pl-5 space-x-2.5">
              <Image source={icon_group} className="w-7 h-7" />
              <Text className="text-4 text-primary">群聊广场</Text>
            </TouchableOpacity>
            <View className="bg-line h-mini mr-4 ml-5" />
            <TouchableOpacity className="w-full h-14 flex-row items-center pl-5 space-x-2.5">
              <Image source={icon_create_group} className="w-7 h-7" />
              <Text className="text-4 text-primary">创建群聊</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </CustomModel>
    </>
  );
};

export default ChatGroup;
