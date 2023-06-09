const size = {
  mini: '1px',
  2: '12px',
  '2p5': '13px', // 使用小数点，在部分IDE中会造成解析异常，导致后面的提示出错，所以改成英文字符
  3: '14px',
  '3p5': '15px',
  4: '16px',
  '4p5': '18px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  11: '44px',
  12: '48px',
  13: '52px',
  14: '56px',
  15: '60px',
  16: '64px',
  17: '68px',
  18: '72px',
  19: '76px',
  20: '80px',
  24: '96px',
  28: '112px',
  half: '50%',
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.@(js|jsx|ts|tsx|html)'],
  safelist: [
    'col-span-1',
    'col-span-2',
    'col-span-3',
    'col-span-4',
    'col-span-5',
    'col-span-6',
    'col-span-7',
    'col-span-8',
    'col-span-9',
    'col-span-10',
    'col-span-11',
    'col-span-12',
  ],
  theme: {
    extend: {
      colors: {
        xhs: '#ff2442', // 小红书主色调
        primary: '#333', // 深色文字
        secondary: '#999', // 浅色文字
        third: '#666', // 普通颜色
        line: '#eee', // 边框线的颜色
        darkLine: '#bbb', // 深色的边框线
      },
      backgroundColor: {
        xhs: '#ff2442', // 小红书主色调
        primary: '#f0f0f0', // 主要背景色
        secondary: '#eee', // 次要背景色
        transparent: '#00000000', // 透明背景
        'transparent-10': '#00000010', // 透明背景
        'transparent-20': '#00000020', // 透明背景
        'transparent-30': '#00000030', // 透明背景
        'transparent-40': '#00000040', // 透明背景
        'transparent-50': '#00000050', // 透明背景
        'transparent-60': '#00000060', // 透明背景
        'transparent-70': '#00000070', // 透明背景
        'transparent-80': '#00000080', // 透明背景
        'transparent-90': '#00000090', // 透明背景
      },
      borderRadius: size,
      fontSize: size,
      width: size,
      minWidth: size,
      maxWidth: size,
      height: size,
      minHeight: size,
      maxHeight: size,
    },
  },
  plugins: [],
};
