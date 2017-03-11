import React, { Component } from 'react';
import {
  AppRegistry,
  AsyncStorage,
  Navigator,
  StyleSheet,
  Text,
  View
} from 'react-native';

import CustomNavBar from './customNavBar';
import Calculator from './calculator';
import Settings from './settings';

export default class PowerRanger extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async getSceneTransition() {
    try {
      let sceneTransitionValue = await AsyncStorage.getItem('SCENE_SELECTED');

      this.setState({
        sceneTransition: sceneTransitionValue
      });
    } catch(err) {
      console.log("Data problems" + err);
    }
  }

  render() {
    const routes = [
      {title: 'CalculatorPage', index: 0},
      {title: 'SettingsPage', index: 1}
    ];

    return (
      <Navigator
        initialRoute={routes[0]}
        initialRouteStack={routes}
        renderScene={this.renderScene.bind(this)}
        navigationBar={CustomNavBar}
        configureScene={this.configureScene.bind(this)}
       />
    );
  }

  renderScene(route, navigator) {
    switch (route.title) {
      case 'CalculatorPage':
        return (<Calculator navigator={navigator} />);
      case 'SettingsPage':
        return (<Settings navigator={navigator} />);
    }
  }

  configureScene(route, routeStack){
    this.getSceneTransition();

    if (this.state.sceneTransition) {
      return Navigator.SceneConfigs[this.state.sceneTransition];
    }
    return Navigator.SceneConfigs.FloatFromRight;
  }
}

module.exports = PowerRanger;
