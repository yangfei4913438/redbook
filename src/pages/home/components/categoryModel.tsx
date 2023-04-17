import React, { useState, forwardRef, useImperativeHandle, useCallback, type PropsWithChildren } from 'react';
import { Modal, StyleProp, View, ViewStyle } from 'react-native';

interface CategoryModelProps extends PropsWithChildren {
  statusBarTranslucent?: boolean;
  animationType?: 'none' | 'slide' | 'fade';
  onSave?: () => void;
  style?: StyleProp<ViewStyle>;
}

export interface CategoryModelResult {
  show: () => void;
  hide: () => void;
}

const CategoryModel = forwardRef<CategoryModelResult, CategoryModelProps>(
  ({ children, style, animationType = 'fade', onSave = () => undefined }, ref) => {
    const [visible, setVisible] = useState(false);

    const showModal = useCallback(() => {
      setVisible(true);
    }, []);

    // 先跑动画，再关闭弹窗
    const hideModal = useCallback(() => {
      onSave();
      setVisible(false);
    }, [onSave]);

    useImperativeHandle(ref, () => ({
      show: showModal,
      hide: hideModal,
    }));

    return (
      <Modal
        visible={visible}
        onRequestClose={hideModal}
        animationType={animationType}
        transparent={true}
        statusBarTranslucent={true}
      >
        <View className="w-full h-full" style={style}>
          <View className="w-full h-[80%]">{children}</View>
          <View className="w-full h-[20%] bg-transparent-60" />
        </View>
      </Modal>
    );
  }
);

export default CategoryModel;
