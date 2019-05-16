import React, {Component} from 'react';
import {StyleSheet, Text, View,ActivityIndicator} from 'react-native';
import List from '../components/List';
import HeaderComponent from '../components/HeaderComponent';
import api from '../service/base'
import { juhe_key } from '../util/config'
export default class ListPage extends Component {
  constructor(props) {
    super(props);
    const {params} = this.props.navigation.state
    this.state = {
      isLoading:false,
      resultData:{},
      cid:params.cid,
      key:juhe_key
    };
  }
  componentDidMount() {
    this.quary();
  }
  quary=()=>{
    const {key,cid} = this.state;
    this.setState({
      isLoading:true
    });
    api.getCaiPuList({key,cid}).then((resp) => {
      if (resp) {
        this.setState({resultData: resp}) // 展示列表
      } else {
        this.setState({resultData: {}})
      }
      this.setState({
        isLoading:false
      })
    })
  }
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
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
