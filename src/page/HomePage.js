import React, {Component} from 'react';
import {Button,StyleSheet, Text, View} from 'react-native';
import List from '../components/List';

export default class HomePage extends Component {
  static navigationOptions = {
    title:'商品比价',
    headerBackTitle:'返回首页' // 设置返回此页面的按钮文案
  };
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        {/*<Text>顶顶顶顶</Text>*/}
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
