import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Image, LayoutAnimation, Text, TextInput, TouchableOpacity, View } from 'react-native';

import icon_arrow from 'assets/icon_arrow.png';
import icon_search from 'assets/icon_search.png';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const SearchGoods = () => {
  // 路由相关
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [showBackBtn, setShowBackBtn] = useState(false);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
      setShowBackBtn(true);
    }, 100);
  }, []);

  const onBackPress = useCallback(() => {
    LayoutAnimation.easeInEaseOut();
    setShowBackBtn(false);
    inputRef.current?.blur();
    setTimeout(() => {
      navigation.pop();
    }, 300);
  }, [navigation]);

  const renderTitle = useMemo(() => {
    return (
      <View className="w-full h-10 flex-row items-center bg-white">
        {showBackBtn && (
          <TouchableOpacity className="h-full px-4 justify-center" onPress={onBackPress}>
            <Image source={icon_arrow} className="w-5 h-5" />
          </TouchableOpacity>
        )}
        <View className="flex-row h-full items-center flex-1 bg-primary rounded-4 px-4 space-x-1.5">
          <Image source={icon_search} className="w-4 h-4" />
          <TextInput
            ref={inputRef}
            className="text-2 px-2"
            style={{ paddingVertical: 0 }}
            placeholder={'bm吊带'}
            placeholderTextColor={'#bbb'}
            autoFocus={true}
          />
        </View>
        <TouchableOpacity className="px-4 items-center flex-row h-full">
          <Text>搜索</Text>
        </TouchableOpacity>
      </View>
    );
  }, [onBackPress, showBackBtn]);

  // 这里只是演示，就不具体的做搜索结果呈现的ui了。
  return <View className="w-full h-full">{renderTitle}</View>;
};

export default SearchGoods;
