import React, { useCallback, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  LayoutAnimation,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import icon_menu from 'assets/icon_menu.png';
import icon_setting from 'assets/icon_setting.png';
import icon_service from 'assets/icon_service.png';
import icon_scan from 'assets/icon_scan.png';
import icon_find_user from 'assets/icon_find_user.png';
import icon_draft from 'assets/icon_draft.png';
import icon_create_center from 'assets/icon_create_center.png';
import icon_browse_history from 'assets/icon_browse_history.png';
import icon_packet from 'assets/icon_packet.png';
import icon_free_net from 'assets/icon_free_net.png';
import icon_nice_goods from 'assets/icon_nice_goods.png';
import icon_orders from 'assets/icon_orders.png';
import icon_shop_car from 'assets/icon_shop_car.png';
import icon_coupon from 'assets/icon_coupon.png';
import icon_wish from 'assets/icon_wish.png';
import icon_red_vip from 'assets/icon_red_vip.png';
import icon_community from 'assets/icon_community.png';
import icon_exit from 'assets/icon_exit.png';

import CustomModel, { type CustomModelResult } from 'components/customModel';
import { useUserInfo } from 'stores';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

interface MenuType {
  icon: ImageSourcePropType;
  name: string;
}

const menus: MenuType[][] = [
  [{ icon: icon_find_user, name: '发现好友' }],
  [
    { icon: icon_draft, name: '我的草稿' },
    { icon: icon_create_center, name: '创作中心' },
    { icon: icon_browse_history, name: '浏览记录' },
    { icon: icon_packet, name: '钱包' },
    { icon: icon_free_net, name: '免流量' },
    { icon: icon_nice_goods, name: '好物体验' },
  ],
  [
    { icon: icon_orders, name: '订单' },
    { icon: icon_shop_car, name: '购物车' },
    { icon: icon_coupon, name: '卡券' },
    { icon: icon_wish, name: '心愿单' },
    { icon: icon_red_vip, name: '小红书会员' },
  ],
  [
    { icon: icon_community, name: '社区公约' },
    { icon: icon_exit, name: '退出登陆' },
  ],
];

const bottom_menus = [
  { icon: icon_setting, txt: '设置' },
  { icon: icon_service, txt: '帮助与客服' },
  { icon: icon_scan, txt: '扫一扫' },
];

const { width: screenWidth } = Dimensions.get('window');

const ContentWidth = screenWidth * 0.75;

const SideMenu = () => {
  const { resetUserInfo } = useUserInfo();
  const modelRef = useRef<CustomModelResult>(null);
  const [open, setOpen] = useState<boolean>(false);

  // 路由相关
  const navigation = useNavigation<StackNavigationProp<any>>();

  const show = useCallback(() => {
    modelRef.current?.show();
    setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
      setOpen(true);
    }, 100);
  }, []);

  const hide = useCallback(() => {
    LayoutAnimation.easeInEaseOut();
    setOpen(false);
    setTimeout(() => {
      modelRef.current?.hide();
    }, 300);
  }, []);

  const onMenuPress = useCallback(
    (item: MenuType) => () => {
      if (item.name === '退出登陆') {
        // 先关闭弹窗
        setOpen(false);
        // 再重置用户信息
        resetUserInfo();
        // 切换到欢迎页，重置路由栈。
        navigation.reset({
          index: 0,
          routes: [{ name: 'Welcome' }],
        });
      }
    },
    [navigation, resetUserInfo]
  );

  return (
    <>
      <TouchableOpacity className="h-full px-4 justify-center" onPress={show}>
        <Image source={icon_menu} className="w-7 h-7" resizeMode={'contain'} />
      </TouchableOpacity>

      <CustomModel ref={modelRef}>
        <TouchableOpacity className="w-full h-full bg-transparent-90" onPress={hide}>
          <TouchableOpacity
            activeOpacity={1}
            className="h-full bg-white"
            style={{ width: ContentWidth, marginLeft: open ? 0 : -ContentWidth }}
            onPress={(event) => event.stopPropagation()}
          >
            <ScrollView
              className="flex-1 w-full"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingTop: 72, paddingHorizontal: 28, paddingBottom: 12 }}
            >
              {menus.map((items, index) => {
                return (
                  <View key={index}>
                    {items.map((menu) => {
                      return (
                        <TouchableOpacity
                          className="flex-row w-full h-14 items-center space-x-3"
                          key={`${menu.name}-${index}`}
                          onPress={onMenuPress(menu)}
                        >
                          <Image source={menu.icon} className="w-8 h-8" resizeMode={'contain'} />
                          <Text className="text-4 text-primary">{menu.name}</Text>
                        </TouchableOpacity>
                      );
                    })}
                    {index !== menus.length - 1 && <View className="h-mini bg-line w-full" />}
                  </View>
                );
              })}
            </ScrollView>
            <View className="w-full flex-row px-4 pt-3 pb-5">
              {bottom_menus.map((menu, index) => {
                return (
                  <TouchableOpacity className="items-center flex-1 space-y-2" key={`${menu.txt}-${index}`}>
                    <View className={'w-11 h-11 rounded-[22px] bg-primary justify-center items-center'}>
                      <Image source={menu.icon} className="w-6 h-6" />
                    </View>
                    <Text className="text-2p5 text-third">{menu.txt}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </CustomModel>
    </>
  );
};

export default SideMenu;
