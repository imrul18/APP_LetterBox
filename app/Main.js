import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

import MenuPage from './MenuPage';
import Upload from './Upload';
import ShowAll from './ShowAll';
import Show from './Show';

const Stack = createNativeStackNavigator();

const Auth = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Menu" component={MenuPage} />
        <Stack.Screen name="Upload" component={Upload} />
        <Stack.Screen name="Show All" component={ShowAll} />
        <Stack.Screen name="Details" component={Show} />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};

export default Auth;
