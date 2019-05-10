import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import List from '../components/List';
import HeaderComponent from '../components/HeaderComponent';

export default class ListPage extends Component {
  constructor(props) {
    super(props);
    console.log(props)
  }
  render() {
    return (
      <View style={styles.container}>
        <HeaderComponent/>
        <List {...this.props}></List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
