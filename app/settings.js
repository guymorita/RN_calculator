import React, { Component } from 'react';
import {
  AppRegistry,
  Picker,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
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

  componentDidMount() {
    this.getSceneTransition();
  }

  render() {
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
      </View>
    );
  }
}

module.exports = Settings;
