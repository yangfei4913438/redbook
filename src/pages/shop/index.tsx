import React, { useEffect, useMemo } from 'react';
import { Dimensions, FlatList, Image, ListRenderItem, Text, View } from 'react-native';
import { useGoodsList, useGoodsCategoryList } from 'stores';
import type { GoodsSimpleType } from 'stores';

import icon_search from 'assets/icon_search.png';
import icon_shop_car from 'assets/icon_shop_car.png';
import icon_orders from 'assets/icon_orders.png';
import icon_menu_more from 'assets/icon_menu_more.png';

const { width: screenWidth } = Dimensions.get('window');

const Shop = () => {
  const { goodsList, requestGoodsList } = useGoodsList();
  const { goodsCategoryList, requestGoodsCategoryList } = useGoodsCategoryList();

  useEffect(() => {
    // 请求列表数据
    requestGoodsList(true);
    // 请求分类数据
    requestGoodsCategoryList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderTitle = useMemo(() => {
    return (
      <View className="w-full h-10 flex-row items-center space-x-1.5 px-4">
        <View className="flex-row h-full items-center flex-1 bg-primary rounded-4 px-4 space-x-1.5">
          <Image source={icon_search} className="w-4 h-4" />
          <Text className="text-2 text-secondary">bm吊带</Text>
        </View>
        <Image source={icon_shop_car} className="w-5 h-5" />
        <Image source={icon_orders} className="w-5 h-5" />
        <Image source={icon_menu_more} className="w-5 h-5" />
      </View>
    );
  }, []);

  const renderHeader = useMemo(() => {
    return (
      <View className="w-full flex-row flex-wrap">
        {goodsCategoryList.map((goodsCategory, index) => {
          return (
            <View
              className="items-center w-1/5 space-y-1.5"
              style={{ paddingVertical: 16 }}
              key={`${goodsCategory.name}-${index}`}
            >
              <Image source={{ uri: goodsCategory.image }} className="w-10 h-10" style={{ resizeMode: 'contain' }} />
              <Text className="text-primary text-sm">{goodsCategory.name}</Text>
            </View>
          );
        })}
      </View>
    );
  }, [goodsCategoryList]);

  const renderItem: ListRenderItem<GoodsSimpleType> = useMemo(
    () =>
      ({ item }) => {
        const colWidth = (screenWidth - 16 - 16 - 6) / 2;
        return (
          <View className="rounded-lg space-y-1 overflow-hidden mr-1.5 mt-1.5 even:mr-0" style={{ width: colWidth }}>
            <Image source={{ uri: item.image }} className="w-full h-52" style={{ resizeMode: 'cover' }} />
            <Text>{item.title}</Text>
            {item.promotion && (
              <Text className="text-2 text-secondary w-18 border border-darkLine text-center rounded-[2px]">
                {item.promotion}
              </Text>
            )}
            <View className="flex-row items-baseline">
              <Text className="text-primary font-bold mr-0.5">¥</Text>
              <Text className="text-5 text-primary font-bold">{item.price}</Text>
              {item.originPrice && (
                <Text className="ml-1.5 text-2p5 font-normal line-through text-red-500">原价: {item.originPrice}</Text>
              )}
            </View>
          </View>
        );
      },
    []
  );

  return (
    <View className="w-full h-full bg-white">
      {renderTitle}
      <FlatList
        className="flex-1 mx-4"
        showsVerticalScrollIndicator={false}
        data={goodsList}
        extraData={[goodsCategoryList]}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        numColumns={2}
        ListHeaderComponent={renderHeader}
      />
    </View>
  );
};

export default Shop;
