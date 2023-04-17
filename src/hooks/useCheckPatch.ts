import { useCallback, useEffect, useState } from 'react';
import { Alert, Linking, Platform } from 'react-native';
import {
  CheckResult,
  checkUpdate,
  currentVersion,
  downloadAndInstallApk,
  downloadUpdate,
  isFirstTime,
  isRolledBack,
  markSuccess,
  packageVersion,
  switchVersion,
  switchVersionLater,
  UpdateAvailableResult,
} from 'react-native-update';

import _updateConfig from '../../update.json';

// @ts-ignore
const { appKey } = _updateConfig[Platform.OS];

// 用到的类型，第三方库的类型定义一塌糊涂，没法用
interface Info {
  expired: boolean;
  downloadUrl: string;
  upToDate: boolean;
  name: string;
  description: string;
}

const useCheckPatch = () => {
  const [received, setReceived] = useState(0);
  const [total, setTotal] = useState(0);

  const doUpdate = useCallback(async (info: CheckResult) => {
    try {
      const hash = await downloadUpdate(info as UpdateAvailableResult, {
        onDownloadProgress: ({ received, total }) => {
          setReceived(received);
          setTotal(total);
        },
      });
      if (!hash) {
        return;
      }
      Alert.alert('提示', '下载完毕,是否重启应用?', [
        {
          text: '是',
          onPress: () => {
            switchVersion(hash);
          },
        },
        { text: '否' },
        {
          text: '下次启动时',
          onPress: () => {
            switchVersionLater(hash);
          },
        },
      ]);
    } catch (err: any) {
      Alert.alert('更新失败', err.message);
    }
  }, []);

  const startCheckUpdate = useCallback(async () => {
    if (__DEV__) {
      // 开发模式不支持热更新，跳过检查
      return;
    }
    let info: Info;
    try {
      info = (await checkUpdate(appKey)) as Info;
    } catch (err: any) {
      Alert.alert('更新检查失败', err.message);
      return;
    }
    if (info.expired) {
      Alert.alert('提示', '您的应用版本已更新，点击确定下载安装新版本', [
        {
          text: '确定',
          onPress: () => {
            if (info.downloadUrl) {
              // apk可直接下载安装
              if (Platform.OS === 'android' && info.downloadUrl.endsWith('.apk')) {
                downloadAndInstallApk({
                  url: info.downloadUrl,
                  onDownloadProgress: ({ received, total }) => {
                    setReceived(received);
                    setTotal(total);
                  },
                });
              } else {
                Linking.openURL(info.downloadUrl);
              }
            }
          },
        },
      ]);
    } else if (info.upToDate) {
      Alert.alert('提示', '您的应用版本已是最新.');
    } else {
      Alert.alert('提示', '检查到新的版本' + info.name + ',是否下载?\n' + info.description, [
        {
          text: '是',
          onPress: () => {
            doUpdate(info as CheckResult);
          },
        },
        { text: '否' },
      ]);
    }
  }, [doUpdate]);

  useEffect(() => {
    if (isFirstTime) {
      // 必须调用此更新成功标记方法
      // 否则默认更新失败，下一次启动会自动回滚
      markSuccess();
      // 补丁成功，上报服务器信息
    } else if (isRolledBack) {
      // 补丁回滚，上报服务器信息
      console.log('刚刚更新失败了,版本被回滚.');
    } else {
      startCheckUpdate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 下载进度：{received} / {total}
  return {
    received,
    total,
    packageVersion,
    currentVersion,
    startCheckUpdate,
  };
};

export default useCheckPatch;
