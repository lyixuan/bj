import React, {Component} from 'react';
import {Button,StyleSheet, Text, View,TextInput} from 'react-native';

export default class SearchPage extends Component<Props> {
  render() {
    const {navigation} = this.props;
    const {state,setParams} = navigation;
    const {params} = state;
    const showtext = params&&params.mode === 'edit'?'正在编辑':'编辑完成';
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>搜索页</Text>
        <Text style={styles.welcome}>{showtext}</Text>
        <TextInput style={styles.input} onChangeText={text=>{
          setParams({title:text})
        }}/>
        <Button
          title={'跳转到 搜索结果列表'}
          onPress = {()=>{navigation.navigate('ListPage')}}/>
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
  input:{
    height:50,
    borderWidth:1,
    marginTop:10,
    borderColor:'#ccc'
  }
});
