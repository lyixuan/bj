import React, {Component} from 'react';
import {StyleSheet, Text, View,ActivityIndicator} from 'react-native';
import List from '../components/List';
import HeaderComponent from '../components/HeaderComponent';
import api from '../service/base'
import storage from '../util/storage'
import { juhe_key } from '../util/config'
export default class ListPage extends Component {
  constructor(props) {
    super(props);
    const {params} = this.props.navigation.state
    this.state = {
      isLoading:false,
      resultData:{},
      text:params.text,
      key:juhe_key
    };
  }
  componentDidMount() {
    this.quary();
  }
  store=()=>{
    const {text} = this.state;
    storage.load({
      key: 'History',
    }).then(ret => {
      // 如果找到数据，则在then方法中返回
      ret.push(text)
      const list =Array.from(new Set(ret));
      storage.save({
        key: 'History',
        data: list,
      })
    }).catch(err => {
      // 如果没有找到数据且没有sync方法，
      // 或者有其他异常，则在catch中返回
      storage.save({
        key: 'History',
        data: [text],
      })
    });
  }
  quary=()=>{
    const {key,text} = this.state;
    this.setState({
      isLoading:true
    })
    api.getCaiPuList({key,menu:text}).then((resp) => {
      if (resp) {
        this.store();// 存储查询历史记录
        this.setState({resultData: resp}) // 展示列表
      } else {
        this.setState({resultData: {}})
      }
      this.setState({
        isLoading:false
      })
    })
  }
  onchange = (text)=>{
    this.setState({text})
  }
  onSubmit = ()=>{
    const {navigation} = this.props;
    this.quary()
  }
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <HeaderComponent
          text={this.state.text}
          navigation={navigation}
          onTextChange={(text)=>this.onchange(text)}
          onSubmit={this.onSubmit}
        />
        {this.state.isLoading?(
          <View style={styles.container1}>
            <ActivityIndicator/>
          </View>
        ):(
          <List {...this.props} resultData={this.state.resultData}></List>
        )}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container1:{
    marginTop:'30%'
  }
});
