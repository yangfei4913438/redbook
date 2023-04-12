import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import BottomTabs from 'pages/bottomTabs';

const App = (): JSX.Element => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <BottomTabs />
    </SafeAreaProvider>
  );
};

export default App;
