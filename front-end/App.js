import React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import TabNavigator from './components/TabNavigator';
import { COLOURS } from './styles/colours';

function App() {
  const Theme = {
    dark: false,
    colors: {
      primary: COLOURS.aqua,
      background: 'white',
      card: COLOURS.purple,
      text: 'white',
      border: '',
      notification: '',
    },

  };
  

  return (
    <NavigationContainer theme={Theme}>
      <TabNavigator />
    </NavigationContainer>
  );
}
export default App;
