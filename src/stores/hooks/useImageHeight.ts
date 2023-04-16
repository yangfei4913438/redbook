import { useEffect, useState } from 'react';
import { Dimensions, Image } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

// 根据容器宽度，获取图片的显示高度
const useImageHeight = (img: string, defaultImageHeight: number = 400, boxWidth: number = screenWidth) => {
  // 图片轮播高度， 默认高度400
  const [imageHeight, setImageHeight] = useState<number>(defaultImageHeight);

  // 图片高度计算
  useEffect(() => {
    Image.getSize(img, (width, height) => {
      const showHeight = (boxWidth * height) / width;
      setImageHeight(showHeight);
    });
  }, [boxWidth, img]);

  return { imageHeight };
};

export default useImageHeight;
