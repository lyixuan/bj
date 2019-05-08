import React, {Component} from 'react';
import {Button,StyleSheet, Text, View} from 'react-native';


export default class HomePage extends Component<Props> {
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <Button
          title={'点我搜索。。'}
          onPress = {()=>{navigation.navigate('SearchPage',{name:'abcdefc'})}}/>
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
