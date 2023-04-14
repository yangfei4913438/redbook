import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Navigation from 'pages/navigation';

const App = (): JSX.Element => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Navigation />
    </SafeAreaProvider>
  );
};

export default App;
