import React, { Dispatch, FC, SetStateAction, useCallback, useMemo } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { CategoryType, useCategoryList } from 'stores';

import icon_arrow from 'assets/icon_arrow.png';

interface CategoryListProps {
  activeCategory: CategoryType;
  setActiveCategory: Dispatch<SetStateAction<CategoryType>>;
}

const CategoryList: FC<CategoryListProps> = ({ activeCategory, setActiveCategory }) => {
  const { categoryList } = useCategoryList();

  const homeCategoryList = useMemo(() => {
    return categoryList.filter((category) => category.isAdd);
  }, [categoryList]);

  const handleOnPress = useCallback(
    (target: CategoryType) => () => {
      setActiveCategory(target);
    },
    [setActiveCategory]
  );

  return (
    <View className="w-full h-9 flex-row">
      <ScrollView className="flex-1 h-full" horizontal={true} showsHorizontalScrollIndicator={false}>
        {homeCategoryList.map((item, index) => {
          const isSelected = item.name === activeCategory.name;
          return (
            <TouchableOpacity
              className="w-15 h-full justify-center items-center"
              key={`${item.name}-${index}`}
              onPress={handleOnPress(item)}
            >
              <Text className={isSelected ? 'text-4 font-bold text-primary' : 'text-4 text-secondary'}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <TouchableOpacity className="w-10 h-full justify-center items-center">
        <Image source={icon_arrow} className="w-4p5 h-4p5 -rotate-90" />
      </TouchableOpacity>
    </View>
  );
};

export default CategoryList;
