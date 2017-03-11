
import React, { Component } from 'react';
import {
  AppRegistry,
  Button,
  Navigator,
  StyleSheet,
  Text,
  View
} from 'react-native';

import PowerRanger from './app/powerRanger';

export default class calculator extends Component {
  render() {
    return (
      <PowerRanger />
    );
  }
}

AppRegistry.registerComponent('calculator', () => calculator);
