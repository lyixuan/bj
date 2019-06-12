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

  _onPressSearch =()=> {
    this.inputSubmit();
  }
  inputChange=(text)=>{
    this.props.onTextChange(text);
  }
  inputSubmit=(e)=>{
    this.refs.textInput1.blur();
    this.props.onSubmit();
  }
  render () {
    const {navigation,text} = this.props
    return (
      <LinearGradient style={styles.container} colors={['#FD6C1F', '#F98D23']}
                      start={{x: 0, y: 1}}
                      end={{x: 1, y: 0}}>
        <TouchableOpacity onPress={() => {
          navigation.navigate('HomePage',{random:Math.random()*10})
        }}>
          <Image source={require('../img/back.png')}
                 style={{width: 22, height: 22,marginTop:9}}/>
        </TouchableOpacity>
        <ImageBackground source={require('../img/search2.png')} style={styles.searchIcon}/>
        <TextInput
          ref="textInput1"
                   defaultValue={text}
                   clearButtonMode="while-editing"
                   onChangeText={(text)=>this.inputChange(text)}
                   onSubmitEditing={(v)=>this.inputSubmit(v)}
                   style={styles.searchTextInput}
                   placeholder={'上万种菜色供您选择'}
        />

        <TouchableOpacity style={styles.rightIcons} onPress={this._onPressSearch}>
          <Text style={{color:'#fff',fontSize:16}}>搜索</Text>
        </TouchableOpacity>
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
  searchIcon:{
    position: 'absolute',
    top: 63,
    left: 53,
    width:16,
    height:16,
    zIndex:1000
  },
  searchTextInput: {
    flex:1,
    borderRadius: 5,
    color: '#333',
    backgroundColor: 'white',
    height: 30,
    paddingLeft: 32,
    paddingTop: 3,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 5,
    fontSize: 14,
    textDecorationLine: 'none',
  },
  rightIcons: {
    marginTop: 6,
    paddingTop: 5,
    marginRight: 10,
  },

})