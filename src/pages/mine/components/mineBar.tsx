import React, { Dispatch, FC, SetStateAction, useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface MineBarProps {
  activeTab: number;
  setActiveTab: Dispatch<SetStateAction<number>>;
}

const MineBar: FC<MineBarProps> = ({ activeTab, setActiveTab }) => {
  // 响应点击事件
  const handlePress = useCallback(
    (active: number) => () => {
      setActiveTab(active);
    },
    [setActiveTab]
  );

  return (
    <View className="border-b border-line w-full h-12 flex-row items-center justify-center bg-white px-4 rounded-tl-3 rounded-tr-3 overflow-hidden">
      <TouchableOpacity className="px-4 h-full flex-col items-center justify-center" onPress={handlePress(0)}>
        <Text className={activeTab === 0 ? 'text-4p5 text-primary' : 'text-4p5 text-secondary'}>笔记</Text>
        {activeTab === 0 && <View className="w-7 h-0.5 bg-xhs rounded-mini absolute bottom-1.5" />}
      </TouchableOpacity>

      <TouchableOpacity className="px-4 h-full flex-col items-center justify-center" onPress={handlePress(1)}>
        <Text className={activeTab === 1 ? 'text-4p5 text-primary' : 'text-4p5 text-secondary'}>收藏</Text>
        {activeTab === 1 && <View className="w-7 h-0.5 bg-xhs rounded-mini absolute bottom-1.5" />}
      </TouchableOpacity>

      <TouchableOpacity className="px-4 h-full flex-col items-center justify-center" onPress={handlePress(2)}>
        <Text className={activeTab === 2 ? 'text-4p5 text-primary' : 'text-4p5 text-secondary'}>赞过</Text>
        {activeTab === 2 && <View className="w-7 h-0.5 bg-xhs rounded-mini absolute bottom-1.5" />}
      </TouchableOpacity>
    </View>
  );
};

export default MineBar;
