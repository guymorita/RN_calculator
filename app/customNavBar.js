import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';

var NavigationBarRouteMapper = {
  LeftButton: (route, navigator, index, navState) =>{
    return
  },
  RightButton: (route, navigator, index, navState) => {
    if(route.title != 'CalculatorPage'){
      return (
        <TouchableOpacity onPress={() => navigator.pop()}>
          <Text>Save</Text>
        </TouchableOpacity>
      );
    }else{
      return (
        <TouchableOpacity onPress={() => navigator.push({title: 'SettingsPage'})}>
          <Text>Settings</Text>
        </TouchableOpacity>
      );
    }
  },
  Title: (route, navigator, index, navState) => {
    return;
  }
};

// export this component
module.exports = (
  <Navigator.NavigationBar
    routeMapper={NavigationBarRouteMapper} />
);
