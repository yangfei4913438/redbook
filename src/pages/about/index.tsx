import React from 'react';
import { Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const About = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const handlePress = () => {
    navigation.navigate('Home');
  };

  return (
    <View className="w-full h-full bg-white justify-center items-center">
      <Text className="text-3xl font-bold text-gray-500">This is About Page.</Text>
      <Button title={'切换页面'} onPress={handlePress} />
    </View>
  );
};

export default About;
