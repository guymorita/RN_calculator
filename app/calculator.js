import React, { Component } from 'react';
import {
  AppRegistry,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import SegmentedControlTab from 'react-native-segmented-control-tab';

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
    var percent = this.segmentValues()[index];
    percent = parseFloat(percent) / 100;

    var tipAmount = amount * percent;
    var total = amount + (tipAmount);

    this.setState({
      total: total,
      tipAmount: tipAmount
    });
  }

  segmentValues() {
    return ["10%", "15%", "50%"];
  }

  render() {
    return (
      <View>
        <View>
          <Button
             style={{flex:1, margin:5, fontSize:20}}
             title="Calculator"
             onPress={() => this.props.navigator.push({id:'BlankPage'})}
             />
          <Text>
            Tip Calculator
          </Text>
        </View>

        <View>
          <Text>
            Bill Amount
          </Text>
          <TextInput
            onChangeText={(amount) => this.handleBillAmountChange(amount)}
            keyboardType="numeric"
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
            values={this.segmentValues()}
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
