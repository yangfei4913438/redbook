import React, { type Dispatch, type FC, type SetStateAction, useCallback, useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  LayoutAnimation,
  ListRenderItem,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { type CategoryType, useCategoryList } from 'stores';

import icon_delete from 'assets/icon_delete.png';
import icon_arrow from 'assets/icon_arrow.png';
import CategoryModel, { type CategoryModelResult } from './categoryModel';
import cls from 'classnames';

const { width: ScreenWidth } = Dimensions.get('window');

interface CategoryListProps {
  activeCategory: CategoryType;
  setActiveCategory: Dispatch<SetStateAction<CategoryType>>;
}

const CategoryList: FC<CategoryListProps> = ({ activeCategory, setActiveCategory }) => {
  const { myCategoryList, otherCategoryList, updateCategory } = useCategoryList();
  const categoryRef = useRef<FlatList>(null);
  const modelRef = useRef<CategoryModelResult>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const OnCategoryPress = useCallback(
    (target: CategoryType, index: number) => () => {
      // 更新数据
      setActiveCategory(target);
      // 移动标签的位置到中间
      categoryRef.current?.scrollToIndex({
        index,
        viewPosition: 0.5,
        animated: true,
      });
    },
    [setActiveCategory]
  );

  // 弹窗顶部预留的距离
  const modelTop = useMemo(() => {
    return 48 + (StatusBar.currentHeight || 0);
  }, []);

  // 点击已经选中的标签
  const onMyItemPress = useCallback(
    (item: CategoryType, index: number) => () => {
      LayoutAnimation.easeInEaseOut();
      // 非编辑状态，切换选中的标签，关闭频道弹窗
      if (!isEdit) {
        // 注意：这里的方法，返回的是一个函数，直接传值是不会执行的，需要手动执行。
        OnCategoryPress(item, index)();
        modelRef.current?.hide();
        return;
      }
      updateCategory({ ...item, isAdd: false });
    },
    [isEdit, updateCategory, OnCategoryPress]
  );

  // 点击未选中的标签
  const onOtherItemPress = useCallback(
    (item: CategoryType) => () => {
      LayoutAnimation.easeInEaseOut();
      updateCategory({ ...item, isAdd: true });
    },
    [updateCategory]
  );

  // 渲染选中的标签列表
  const selectedTags = useMemo(() => {
    return (
      <>
        <View className="w-full flex-row items-center">
          <Text className="text-4 text-primary font-bold ml-4">我的频道</Text>
          <Text className="text-2p5 text-secondary ml-3 flex-1">{isEdit ? '点击移除频道' : '点击进入频道'}</Text>
          <TouchableOpacity
            className="px-2.5 h-7 bg-secondary rounded-xl justify-center items-center"
            onPress={() => {
              setIsEdit((status) => !status);
            }}
          >
            <Text className="text-2 text-[#3050ff] -mt-0.5">{isEdit ? '完成编辑' : '进入编辑'}</Text>
          </TouchableOpacity>
          <TouchableOpacity className="p-3" onPress={() => modelRef.current?.hide()}>
            <Image source={icon_arrow} className="w-4 h-6 rotate-90" style={{ resizeMode: 'contain' }} />
          </TouchableOpacity>
        </View>
        <View className="w-full flex-row flex-wrap px-4 gap-4">
          {myCategoryList.map((item, index) => {
            return (
              <TouchableOpacity
                className={cls(
                  'h-8 justify-center items-center border border-gray-300 rounded',
                  item.default && 'bg-secondary'
                )}
                style={{ width: (ScreenWidth - 80 - 16) / 4 }}
                key={`${item.name}-${index}`}
                onPress={onMyItemPress(item, index)}
              >
                <Text className={'text-third'}>{item.name}</Text>
                {isEdit && !item.default && <Image source={icon_delete} className="w-4 h-4 absolute -right-2 -top-2" />}
              </TouchableOpacity>
            );
          })}
        </View>
      </>
    );
  }, [isEdit, myCategoryList, onMyItemPress]);

  // 渲染未选中的标签列表
  const unSelectedTags = useMemo(() => {
    return (
      <>
        <View className="w-full flex-row items-center my-4">
          <Text className="text-4 text-primary font-bold ml-4">推荐频道</Text>
          <Text className="text-2p5 text-secondary ml-3 flex-1">点击添加频道</Text>
        </View>
        <View className="w-full flex-row flex-wrap px-4 gap-4 mb-4">
          {otherCategoryList.map((item, index) => {
            return (
              <TouchableOpacity
                className="h-8 justify-center items-center border border-gray-300 rounded"
                style={{ width: (ScreenWidth - 80 - 16) / 4 }}
                key={`${item.name}-${index}`}
                onPress={onOtherItemPress(item)}
              >
                <Text className={'text-third'}>+ {item.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </>
    );
  }, [onOtherItemPress, otherCategoryList]);

  const renderCategoryItem: ListRenderItem<CategoryType> = useMemo(
    () =>
      ({ item, index }) => {
        const isSelected = item.name === activeCategory.name;
        return (
          <TouchableOpacity className="w-15 h-full justify-center items-center" onPress={OnCategoryPress(item, index)}>
            <Text className={isSelected ? 'text-4 font-bold text-primary' : 'text-4 text-secondary'}>{item.name}</Text>
          </TouchableOpacity>
        );
      },
    [OnCategoryPress, activeCategory.name]
  );

  return (
    <View className="w-full h-9 flex-row">
      <FlatList
        ref={categoryRef}
        data={myCategoryList}
        renderItem={renderCategoryItem}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        className="flex-1 h-full"
        horizontal={true} // 横向滚动
        showsHorizontalScrollIndicator={false} // 是否显示横向滚动条
        initialNumToRender={15} // 初始化渲染的数量
      />
      <TouchableOpacity
        className="w-10 h-full justify-center items-center"
        onPress={() => {
          modelRef.current?.show();
        }}
      >
        <Image source={icon_arrow} className="w-4p5 h-4p5 -rotate-90" />
      </TouchableOpacity>

      <CategoryModel ref={modelRef} style={{ marginTop: modelTop }}>
        <ScrollView className="w-full h-full bg-white" showsVerticalScrollIndicator={false}>
          {selectedTags}
          {unSelectedTags}
        </ScrollView>
      </CategoryModel>
    </View>
  );
};

export default CategoryList;
