import React, {Component} from 'react';
import { FlatList, StyleSheet, ActivityIndicator, Text, View,Image } from 'react-native'
import {showapi_appid,showapi_sign} from '../util/config';
import {urlEncode} from '../util/tool';
import api from '../service/base';

const lists = [{
  shopAddr: "http://item.jd.com/23706217386.html",
  shopImg: "http://img11.360buyimg.com/n7/jfs/t1/29984/19/8741/418224/5c78fe8bE5d6379a0/dc36b16d7e455a56.jpg",
  shopPrice: "￥52.00",
  shopTitle: "马勒 MAHLE空调滤清器 空调格 空调滤芯 保时捷macan",
  shopType: "京东商城(汇栗车品专营店) (第三方 )"
},{
  shopAddr: "http://item.jd.com/1023710.html",
  shopImg: "http://img10.360buyimg.com/n7/jfs/t2617/363/1224315686/297221/b05f5d50/57384a56N959a8b34.jpg",
  shopPrice: "￥69.00",
  shopTitle: "汉格斯特(Hengst)空调滤E2948LC(奥迪A4/A4L/A5/Q5/保时捷Macan)",
  shopType: "京东商城 (自营)"
}]
export default class List extends Component {
  constructor(props){
    super(props);
    this.state ={
      isLoading: false,
      dataSource: [],
      params:{
        showapi_appid,
        showapi_sign,
        keyWords:'mac'
      },
    };
  }
  componentDidMount(){
    this.query();
  };

  query = ()=>{
    this.setState({ lists });
    // const {params = {}} = this.state;
    // this.setState({ isLoading:true });
    // api.getShopList(params).then((resp) => {
    //   console.log(12,12,resp)
    //   this.setState({ isLoading:false });
    //   if (resp.ret_code === 0) {
    //     const dataSource = resp.shopList;
    //     this.setState({ dataSource });
    //   }
    // });
  };
  render(){
    if(this.state.isLoading){
      return(
        <View style={styles.container}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => (
            <View>
              <Text>{item.shopTitle}, {item.shopPrice}</Text>
              <Image source={{uri: item.shopImg}}
                     style={{width: 400, height: 400}} />
            </View>
          )}
          keyExtractor={(item, index) => item.shopAddr}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
