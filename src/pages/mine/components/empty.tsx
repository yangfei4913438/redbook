import React, { FC } from 'react';
import { Image, Text, View, ImageSourcePropType } from 'react-native';

interface EmptyProps {
  icon: ImageSourcePropType;
  tips: string;
}

const Empty: FC<EmptyProps> = ({ icon, tips }) => {
  return (
    <View className="w-full h-full items-center justify-center">
      <Image source={icon} className="w-24 h-24" resizeMode={'contain'} />
      <Text className="mt-6 text-secondary">{tips}</Text>
    </View>
  );
};

export default Empty;
