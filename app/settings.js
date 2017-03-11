import React, { Component } from 'react';
import {
  AppRegistry,
  AsyncStorage,
  Picker,
  StyleSheet,
  Text,
  View
} from 'react-native';

import SegmentedControlTab from 'react-native-segmented-control-tab';
import defaults from './defaults';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  setSelectSceneTransition(scene){
    try {
      this.setSceneTransition(scene);
      this.setState({
        scene: scene
      });
    } catch (error) {
      console.log("Oop!! Something went wrong !!!" + error);
    }
  }

  async setSceneTransition(scene) {
    try {
      await AsyncStorage.setItem('SCENE_SELECTED', scene);

      this.setState({
        sceneTransition: scene
      });
    } catch(err) {
      console.log("Something wrong with the data" + err);
    }
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

  async handleSegmentTipChange(index) {

    try {
      await AsyncStorage.setItem('DEFAULT_TIP', String(index));

      this.setState({
        defaultTipIndex: index
      });
    } catch(err) {
      console.log("Something wrong with the data" + err);
    }
  }

  async getdefaultDefaultTip() {
    try {
      let defaultTipIndex = await AsyncStorage.getItem('DEFAULT_TIP');
      defaultTipIndex = Number(defaultTipIndex);
      this.setState({
        defaultTipIndex: defaultTipIndex
      });

    } catch(err) {
      console.log("Data problems" + err);
    }
  }
  componentWillMount() {
    this.getSceneTransition();
    this.getdefaultDefaultTip();
  }

  render() {
    var { segmentValues } = defaults;

    return (
      <View style={{marginTop:50,padding:10}}>
        <View>
          <Text style={{fontSize:25}}>Scene Transitions</Text>
          <Picker
            selectedValue={this.state.sceneTransition}
            onValueChange={(scene) => this.setSelectSceneTransition(scene)}>
            <Picker.Item label="FloatFromRight" value="FloatFromRight" />
            <Picker.Item label="FloatFromLeft" value="FloatFromLeft" />
            <Picker.Item label="FloatFromBottom" value="FloatFromBottom" />
            <Picker.Item label="FloatFromBottomAndroid" value="FloatFromBottomAndroid" />
            <Picker.Item label="SwipeFromLeft" value="SwipeFromLeft" />
            <Picker.Item label="HorizontalSwipeJump" value="HorizontalSwipeJump" />
            <Picker.Item label="HorizontalSwipeJumpFromRight" value="HorizontalSwipeJumpFromRight" />
          </Picker>
        </View>
        <View>
          <Text style={{fontSize:25}}>Default Tip</Text>
          <SegmentedControlTab
            values={segmentValues}
            selectedIndex={this.state.defaultTipIndex}
            onTabPress= {index => this.handleSegmentTipChange(index)}
            />
        </View>
      </View>
    );
  }
}

module.exports = Settings;
