import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import List from '../components/List';

type Props = {}
export default class ListPage extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <List></List>
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
