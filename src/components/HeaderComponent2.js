import React, { Component } from 'react'
import {
  Alert,
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ImageBackground,
  Image
}from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
export default  class HeaderComponent extends Component {
  render () {
    const {navigation,title} = this.props
    return (
      <LinearGradient style={styles.container} colors={['#FD6C1F', '#F98D23']}
                      start={{x: 0, y: 1}}
                      end={{x: 1, y: 0}}>
        <TouchableOpacity style={{width:40,height:40}} onPress={() => {
          navigation.navigate('HomePage')
        }}>
          <Image source={require('../img/back.png')}
                 style={{width: 22, height: 22,marginTop:9}}/>
        </TouchableOpacity>
        <Text style={styles.searchTextInput}>{title}</Text>
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 50,
    height: 90,
    paddingLeft: 10,
    paddingRight: 5,
    paddingBottom: 10,
  },
  searchTextInput: {
    flex:1,
    textAlign:'center',
    color: '#fff',
    marginTop:12,
    marginRight:30,
    height: 30,
    fontSize: 20,
  },
})