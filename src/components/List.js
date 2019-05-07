import React, {Component} from 'react';
import { FlatList, StyleSheet, ActivityIndicator, Text, View } from 'react-native'
import {showapi_appid,showapi_sign} from '../util/config';
import {urlEncode} from '../util/tool';
import api from '../service/base';

export default class List extends Component {
  constructor(props){
    super(props);
    this.state ={
      isLoading: true,
      dataSource: [],
      params:{
        showapi_appid,
        showapi_sign,
        keyWords:'mac'
      }
    };
  }
  componentDidMount(){
    console.log(3333);
    this.query();
  };

  query = ()=>{
    console.log(122222);
    const {params = {}} = this.state;
    api.getShopList(params).then((resp) => {
      console.log(12,12,resp)
      if (resp.ret_code === 0) {
        const lists = resp.shopList;
        console.log(lists)
      }
    });

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
          renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>}
          keyExtractor={(item, index) => item.showapi_res_id}
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
