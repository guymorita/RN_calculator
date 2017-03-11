/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Button,
  Navigator,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Calc from './app/calculator';
import Settings from './app/settings';

export default class calculator extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{id: 'CalculatorPage', title: 'Tip Calculator Page'}}
        renderScene={(route, navigator) => {
          switch (route.id) {
            case 'CalculatorPage':
              return <Calc navigator={navigator} />
              break;
            case 'BlankPage':
              return (
                <View>
                  <Button
                    style={{width:10, flex:0.1}}
                    title="Go Back"
                    onPress={() => navigator.pop({id:"CalculatorPage"})}
                  />

                  <Settings />
                </View>
              )
              break;
            default:
          }
        }}
      />
    );
  }
}

AppRegistry.registerComponent('calculator', () => calculator);
