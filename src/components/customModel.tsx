import React, { useState, forwardRef, useImperativeHandle, useCallback, type PropsWithChildren } from 'react';
import { Modal, StyleProp, View, ViewStyle } from 'react-native';

interface CustomModelProps extends PropsWithChildren {
  /** 是否启用回退关闭 */
  backClose?: boolean;
  statusBarTranslucent?: boolean;
  animationType?: 'none' | 'slide' | 'fade';
  onSave?: () => void;
  style?: StyleProp<ViewStyle>;
}

export interface CustomModelResult {
  show: () => void;
  hide: () => void;
}

const CustomModel = forwardRef<CustomModelResult, CustomModelProps>(
  ({ children, backClose = true, style, animationType = 'fade', onSave = () => undefined }, ref) => {
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
        onRequestClose={backClose ? hideModal : undefined}
        animationType={animationType}
        transparent={true}
        statusBarTranslucent={true}
      >
        <View className="w-full h-full" style={style}>
          {children}
        </View>
      </Modal>
    );
  }
);

export default CustomModel;
