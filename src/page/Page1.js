import React, {Component} from 'react';
import {Button,StyleSheet, Text, View} from 'react-native';

type Props = {}
export default class Page1 extends Component<Props> {
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Page1!</Text>
        <Button
          title={'跳转到 详情页面'}
          onPress = {()=>{navigation.navigate('DetailPage')}}/>
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
