import React, { Dispatch, FC, SetStateAction, useCallback } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import icon_daily from 'assets/icon_daily.png';
import icon_search from 'assets/icon_search.png';

interface TitleBarProps {
  activeTab: number;
  setActiveTab: Dispatch<SetStateAction<number>>;
}

const TitleBar: FC<TitleBarProps> = ({ activeTab, setActiveTab }) => {
  // 响应点击事件
  const handlePress = useCallback(
    (active: number) => () => {
      setActiveTab(active);
    },
    [setActiveTab]
  );

  return (
    <View className="w-full h-12 flex-row items-center bg-white px-4">
      <TouchableOpacity className="h-full justify-center items-center pr-3 mr-11">
        <Image source={icon_daily} className="w-7 h-7" />
      </TouchableOpacity>

      <TouchableOpacity className="flex-1 h-full flex-col items-center justify-center" onPress={handlePress(0)}>
        <Text className={activeTab === 0 ? 'text-4p5 text-primary' : 'text-4 text-secondary'}>关注</Text>
        {activeTab === 0 && <View className="w-7 h-0.5 bg-xhs rounded-mini absolute bottom-1.5" />}
      </TouchableOpacity>

      <TouchableOpacity className="flex-1 h-full flex-col items-center justify-center" onPress={handlePress(1)}>
        <Text className={activeTab === 1 ? 'text-4p5 text-primary' : 'text-4 text-secondary'}>发现</Text>
        {activeTab === 1 && <View className="w-7 h-0.5 bg-xhs rounded-mini absolute bottom-1.5" />}
      </TouchableOpacity>

      <TouchableOpacity className="flex-1 h-full flex-col items-center justify-center" onPress={handlePress(2)}>
        <Text className={activeTab === 2 ? 'text-4p5 text-primary' : 'text-4 text-secondary'}>上海</Text>
        {activeTab === 2 && <View className="w-7 h-0.5 bg-xhs rounded-mini absolute bottom-1.5" />}
      </TouchableOpacity>

      <TouchableOpacity className="h-full justify-center items-center pl-3 ml-11">
        <Image source={icon_search} className="w-7 h-7" />
      </TouchableOpacity>
    </View>
  );
};

export default TitleBar;
