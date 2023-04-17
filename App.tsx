import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Navigation from 'pages/navigation';
import useCheckPatch from 'hooks/useCheckPatch';

const App = (): JSX.Element => {
  // 检查热更新
  useCheckPatch();

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Navigation />
    </SafeAreaProvider>
  );
};

export default App;
