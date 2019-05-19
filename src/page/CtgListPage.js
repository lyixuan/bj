import React, {Component} from 'react';
import {StyleSheet, Text, View,ActivityIndicator} from 'react-native';
import CateList from '../components/CateList';
import HeaderComponent2 from '../components/HeaderComponent2';
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
      title:params.name,
      cid:params.cid,
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
    const {key,cid,nextPn} = this.state;
    api.getCaiPuCataList({key,cid,pn:pn?Number(pn):nextPn}).then((resp) => {
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
      } else {
        this.setState({resultData: {}})
      }
    })
  };
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <HeaderComponent2
          title={this.state.title}
          navigation={navigation}
        />
        {this.state.isLoading?(
          <ActivityIndicator style={styles.container1}/>
        ):(
          <CateList {...this.props} resultData={this.state.resultData} isShowMore={this.state.isShowMore} endReached={this.endReached}></CateList>
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
