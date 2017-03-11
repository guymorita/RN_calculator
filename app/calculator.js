import React, { Component } from 'react';
import {
  AppRegistry,
  AsyncStorage,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import SegmentedControlTab from 'react-native-segmented-control-tab';
import defaults from './defaults';

export default class Calc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      billAmount: 0,
      segmentControlIndex: 0,
      total: 0,
      tipAmount: 0
    }
  }

  handleBillAmountChange(amount) {
    this.setState({
      billAmount: amount
    });

    this.updateTotals(amount, this.state.segmentControlIndex);
  }

  handleSegmentControlChange(index) {
    this.setState({
      segmentControlIndex: index
    });

    this.updateTotals(this.state.billAmount, index);
  }

  updateTotals(amount, index) {
    amount = parseFloat(amount);
    var percent = defaults.segmentValues[index];
    percent = parseFloat(percent) / 100;

    var tipAmount = amount * percent;
    var total = amount + (tipAmount);

    this.setState({
      total: total,
      tipAmount: tipAmount
    });
  }

  async getDefaultTip() {
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
    this.getDefaultTip();
  }

  render() {
    return (
      <View>
        <View style={{marginTop: 20, marginBottom: 30}}>
          <Text style={{fontSize: 20, color: "blue", alignSelf: "center"}}>
            Calculator
          </Text>
        </View>

        <View>
          <Text>
            Bill Amount
          </Text>
        </View>

        <View>
          <TextInput
            onChangeText={(amount) => this.handleBillAmountChange(amount)}
            keyboardType="numeric"
            placeholder="Enter an amount"
            style={{height: 40}}
            maxLength={10}
            />
        </View>

        <View>
          <Text>
            Tip Amount: {this.state.tipAmount}
          </Text>
        </View>

        <View>
          <SegmentedControlTab
            values={defaults.segmentValues}
            selectedIndex={this.state.defaultTipIndex}
            onTabPress= {index => this.handleSegmentControlChange(index)}
            />
        </View>

        <View>
          <Text>
            Bill Input: {this.state.billAmount}
          </Text>
          <Text>
            Tip amount: {this.state.tipAmount}
          </Text>
          <Text>
            Segment Control: {this.state.segmentControlIndex}
          </Text>
          <Text>
            Total: {this.state.total}
          </Text>
        </View>
      </View>
    );
  }
}

module.exports = Calc;
