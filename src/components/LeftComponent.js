import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

export default class LeftComponent extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  jump = () => {
    console.log(this.props)
    this.props.navigation.navigate('DetailPage', { name: 'abcdefc' })
  };

  render() {
    const { item } = this.props;
    return (
        <View>
            <Text>left组件</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    flexDirection: 'row'
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
