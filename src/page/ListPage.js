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
      resultData:{},
      nextPn:0,
      text:'土豆'||params.text,
      key:juhe_key
    };
  }
  componentDidMount() {
    this.quary();
  }
  refresh=()=>{
    console.log(12333)
    this.setState({
      nextPn:0,
      resultData:{}
    },()=>this.quary())
    this.quary();
  }
  endReached=()=>{
    const {data=[],totalNum} = this.props.resultData;
    // 数据加载完判断
    if(data && data.length < parseInt(totalNum)){
      this.quary()
    }else{
      console.log('已加载完成')
    }
  }
  quary=()=>{
    const {key,text,nextPn} = this.state;
    this.setState({
      isLoading:true
    })
    api.getCaiPuList({key,menu:text,pn:nextPn}).then((resp) => {
      if (resp) {
        resp.data = this.resultData.data.concat(resp.data);
        this.setState({
          resultData: resp,
          nextPn:resp.pn+1
        }) // 展示列表
      } else {
        this.setState({resultData: {}})
      }
      this.setState({
        isLoading:false
      })
    })
  };
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
          <List {...this.props} resultData={this.state.resultData} refresh={this.refresh} endReached={this.endReached}></List>
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
