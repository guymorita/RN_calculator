/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Calc from './app/calculator';

export default class calculator extends Component {
  render() {
    return (
      <Calc />
    );
  }
}

AppRegistry.registerComponent('calculator', () => calculator);
