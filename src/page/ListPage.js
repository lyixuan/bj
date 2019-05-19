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
    const {params={}} = this.props.navigation.state
    this.state = {
      isLoading:false,
      isShowMore:0,
      resultData:{},
      nextPn:0,
      text:params.text,
      key:juhe_key
    };
  }
  componentDidMount() {
    this.setState({
      isLoading:true
    },()=>this.quary('0'))
  }
  endReached=()=>{
    this.setState({
      isShowMore:1
    })
    const {data=[],totalNum=0} = this.state.resultData;
    // 数据加载完判断
    if(data && data.length < parseInt(totalNum)){
      this.quary()
    }else{
      console.log('已加载完成')
    }
  }
  quary=(pn)=>{
    const {key,text,nextPn} = this.state;
    api.getCaiPuList({key,menu:text,pn:pn?Number(pn):nextPn}).then((resp) => {
      this.state.isLoading = false;
      if (resp) {
        const {data=[]} = this.state.resultData;
        const {totalNum=0} = resp;
        const rt = {
          data:data.concat(resp.data),
          totalNum:resp.totalNum,
          pn:resp.pn,
        }
        this.setState({
          resultData: rt,
          nextPn:Number(resp.pn)+1
        }) // 展示列表

        if (rt.data.length>=Number(totalNum)) {
          this.setState({
            isShowMore:2
          })
        } else {
          this.setState({
            isShowMore:0
          })
        }
        this.store();// 存储查询历史记录
      } else {
        this.setState({resultData: {}})
      }
    })
  };
  store=()=>{
    const {text} = this.state;
    storage.load({
      key: 'History',
    }).then(ret => {
      // 如果找到数据，则在then方法中返回
      ret.unshift(text)
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
  onchange = (text)=>{
    this.setState({text})
  }
  onSubmit = ()=>{
    const {navigation} = this.props;
    this.setState({
      isLoading:true
    },()=>this.quary('0'))
  }
  render() {
    const {navigation} = this.props;
    console.log(this.state.isLoading)
    return (
      <View style={styles.container}>
        <HeaderComponent
          text={this.state.text}
          navigation={navigation}
          onTextChange={(text)=>this.onchange(text)}
          onSubmit={this.onSubmit}
        />
        {this.state.isLoading?(
          <ActivityIndicator style={styles.container1}/>
        ):(
          <List {...this.props} resultData={this.state.resultData} isShowMore={this.state.isShowMore} endReached={this.endReached}></List>
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
