import React, {Component} from 'react';
import {StyleSheet, Text, View,ActivityIndicator,Image} from 'react-native';
import HeaderComponent3 from '../components/HeaderComponent3';

export default class DetailPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
    }
  }

  render() {
    const {navigation} = this.props
    const {details={}} = navigation.state.params
    console.log(details)
    const {id = '', title = '', albums = [], burden = '', imtro = '', ingredients = '', tags = '', steps = []} = details
    return (
      <View style={styles.container}>
        <HeaderComponent3
          title={title}
          navigation={navigation}
        />
        {this.state.isLoading?(
          <ActivityIndicator style={styles.container1}/>
        ):(
          <View style={styles.Wrap}>
            <View style={styles.box1}>
              <Image source={{uri:albums[0]}}
                     style={styles.imgStyle}/>
              <Text style={styles.tt}>{title}</Text>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F6F6F6'
  },
  container1: {
    marginTop:'30%'
  },
  box1:{
    backgroundColor:'#fff',
  },
  Wrap:{
    backgroundColor:'#F6F6F6'
  },imgStyle:{
    // 设置背景颜色
    backgroundColor:'#fff',
    // 设置宽度
    width:'100%',
    // 设置高度
    height:230,
    // 设置图片填充模式
    resizeMode:'cover',
  },tt:{
    fontSize:22,
    fontWeight:'500',
    textAlign:'center',
    marginTop:15,
    marginBottom:15,
  }
});
