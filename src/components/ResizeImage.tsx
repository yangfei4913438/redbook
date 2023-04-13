import React, { useEffect, useState } from 'react';
import { Image, Dimensions } from 'react-native';

type Props = {
  uri: string;
};

// 屏幕宽度
const { width: SCREEN_WIDTH } = Dimensions.get('window');
// 显示宽度，整个宽度减去间隔宽度，除以2
const SHOW_WIDTH = (SCREEN_WIDTH - 18) / 2;

const ResizeImage = ({ uri }: Props) => {
  // 显示高度
  const [showHeight, setHeight] = useState<number>(200);

  useEffect(() => {
    Image.getSize(uri, (width: number, height: number) => {
      // 计算比例
      // 因为：显示宽度 / 显示高度 = 图片宽度 / 图片高度
      // 所以：显示高度 = 显示宽度 * 图片高度 / 图片宽度
      const sh = (SHOW_WIDTH * height) / width;
      // 更新显示高度
      setHeight(sh);
    });
  }, [uri]);

  return (
    <Image
      style={{
        width: (SCREEN_WIDTH - 18) >> 1,
        height: showHeight,
        resizeMode: 'cover',
      }}
      source={{ uri: uri }}
    />
  );
};

export default ResizeImage;
