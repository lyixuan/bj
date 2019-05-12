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
    this.props.onSubmit();
  }
  render () {
    const {navigation,text} = this.props
    return (
      <LinearGradient style={styles.container} colors={['#FD6C1F', '#F98D23']}
                      start={{x: 1, y: 0}}
                      end={{x: 0, y: 1}}>
        <TouchableOpacity onPress={() => {
          navigation.navigate('HomePage')
        }}>
          <Image source={require('../img/back.png')}
                 style={{width: 24, height: 24,marginTop:7}}/>
        </TouchableOpacity>
        <ImageBackground source={require('../img/search2.png')} style={styles.searchBox}/>
        <TextInput autoFocus={true}
                   value={text}
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
    paddingTop: 40,
    height: 80,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 10,
  },
  searchBox:{
    position: 'absolute',
    top: 52,
    left: 46,
    width:16,
    height:16,
    zIndex:1000
  },
  searchTextInput: {
    flex:1,
    borderRadius: 5,
    color: '#333',
    backgroundColor: 'white',
    height: 25,
    lineHeight:25,
    paddingLeft: 32,
    paddingTop: 5,
    marginRight: 12,
    marginLeft: 10,
    marginTop: 6,
    fontSize: 14,
    textDecorationLine: 'none',
  },
  rightIcons: {
    marginTop: 5,
    paddingTop: 5,
    marginRight: 10,
  },

})