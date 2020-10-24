/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {Component} from 'react';
import TrackerScreen from './Tracker.js';
import DailyScreen from './Daily.js';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={'Daily'}
            component={DailyScreen}
            options={{
              title: 'Daily Country Graph',
              headerTitleStyle: {
                fontWeight: 'bold',
                color: '#D2691E',
              },
            }}
          />
          <Stack.Screen
            name={'Detailed'}
            component={TrackerScreen}
            options={{
              title: 'Detailed Information',
              headerTitleStyle: {
                fontWeight: 'bold',
                color: '#D2691E',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
//
// const styles = StyleSheet.create({
//   pink: {
//     flex: 1,
//     backgroundColor: 'pink',
//   },
// });

export default App;
