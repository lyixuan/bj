import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { showapi_appid, showapi_sign } from "../util/config";
import api from '../service/base';
console.log(12,global.storage)

global.storage.sync = {
  // sync方法的名字必须和所存数据的key完全相同
  // 参数从params中解构取出
  // 最后返回所需数据或一个promise
  async CaiPuFenLei(params) {
    api.getCaiPuFenLei(params).then((resp) => {
      console.log(12, 12, resp)
      if (resp) {
        global.storage.save({
          key: 'CaiPuFenLei',
          data: resp
        });
        return resp;
      }
    });
  }
};

export default class HomePage extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      dataSource: {},
      params: {
        showapi_appid,
        showapi_sign,
      },
    };
  }

  componentDidMount() {
    this.query();
  };

  query = () => {
    const { params = {} } = this.state;
    this.setState({ isLoading: true });
    global.storage.load({
      key: 'CaiPuFenLei',
      // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
      autoSync: true, // 设置为false的话，则等待sync方法提供的最新数据(当然会需要更多时间)。

      // syncInBackground(默认为true)意味着如果数据过期，
      // 在调用sync方法的同时先返回已经过期的数据。
      syncInBackground: true,
    })
      .then(ret => {
        // 如果找到数据，则在then方法中返回
        console.log('ret', ret);
        this.setState({ dataSource: ret, isLoading: false });
      })
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text>菜谱大全</Text>
        <Button
          title={'点我搜索111。。'}
          onPress={() => {
            navigation.navigate('SearchPage', { name: 'abcdefc' })
          }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
