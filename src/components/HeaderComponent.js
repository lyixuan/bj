import React, {Component} from 'react';
import {
  Alert,
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity,
}from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default  class Header extends Component {

  _onPressCity(e) {

    Alert.alert(
      'alert',
      '点击了城市',
    );

  }

  _onPressSearch(e) {
    Alert.alert(
      'alert',
      '点击了搜索',
    );
  }

  _onPressIcon(e) {
    Alert.alert(
      'alert',
      '点击了icon',
    );
  }

  render() {
    return (
      <View style={styles.container}>

        <TouchableOpacity onPress={e=>this._onPressCity(e)}>
          <View style={styles.cityDropdown}>
            <Text style={styles.cityTitle}>三亚</Text>
            <FontAwesomeIcon name="angle-double-down" color="#ffffff" size={20}/>
          </View>
        </TouchableOpacity>


        <View style={styles.searchBar}>
          <TouchableOpacity onPress={e=>this._onPressSearch(e)}>
            {
              Platform.OS === 'ios' ? (
                <TextInput editable={false} style={styles.searchTextInput}
                           placeholder={'请输入公寓名称搜索...'}></TextInput>) : (
                <Text style={styles.searchTextInput}>请输入公寓名称搜索...</Text>)
            }
          </TouchableOpacity>
        </View>


        <View style={styles.rightIcons}>
          <TouchableOpacity onPress={e=>this._onPressIcon(e)}>
            <FontAwesomeIcon name="qrcode" color="#ffffff" size={20}/>
          </TouchableOpacity>
        </View>


        <View style={styles.rightIcons}>
          <TouchableOpacity onPress={e=>this._onPressIcon(e)}>
            <FontAwesomeIcon name="bell" color="#ffffff" size={20}/>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#e75404',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,  // 处理iOS状态栏
    height: Platform.OS === 'ios' ? 60 : 40,   // 处理iOS状态栏
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 10,
  },
  cityDropdown: {
    marginTop: 5,
    flexDirection: 'row',
    paddingTop: 5,
    marginLeft: 10,
    marginRight: 5,
    backgroundColor: '#e75404',
  },
  cityTitle: {
    color: '#ffffff',
    paddingTop: Platform.OS === 'ios' ? 2 : 0,
    marginRight: 2,
  },
  searchBar: {
    height: 50,
    flex: 1,
  },
  searchTextInput: {
    borderRadius: 10,
    textAlignVertical: 'top',
    color: '#ccc',
    backgroundColor: 'white',
    height: 25,
    paddingLeft: 8,
    paddingTop: 5,
    marginRight: 5,
    marginTop: 6,
    fontSize: 12,
    textDecorationLine: 'none',
  },
  rightIcons: {
    marginTop: 5,
    paddingTop: 5,
    marginLeft: 2,
    marginRight: 5,
  }

});