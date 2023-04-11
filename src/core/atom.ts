import { atomWithStorage, createJSONStorage, RESET } from 'jotai/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * 封装一个使用浏览器存储功能的 atom 实例。
 * */
export const atomStorage = <T>(key: string, initialValue: T, useStorage: boolean = true) => {
  const storage = createJSONStorage<T>(() => AsyncStorage);
  return atomWithStorage<T>(key, initialValue, useStorage ? storage : undefined);
};

/**
 * 从浏览器 storage 中，移除某个键值对.
 * 注意：当前的移除行为，并不会影响继续设置，更不会引发异常。只是清理了本地的 storage 中某个键值对。
 * */
export const atomStorageClear = <T>(setFunc: (val: T | typeof RESET) => void) => {
  setFunc(RESET);
};
