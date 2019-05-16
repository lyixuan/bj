import React, { Component } from 'react'
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Card } from 'react-native-shadow-cards'
import { juhe_key } from '../util/config'
import api from '../service/base'
import storage from '../util/storage'
import SplashScreen from "rn-splash-screen";  //https://blog.csdn.net/huxinguang_ios/article/details/79892440

storage.sync = {
  // sync方法的名字必须和所存数据的key完全相同
  // 参数从params中解构取出
  // 最后返回所需数据或一个promise
  async CaiPuFenLei(params) {
    return api.getCaiPuFenLei(params).then((resp) => {
      if (resp) {
        storage.save({
          key: 'CaiPuFenLei',
          data: resp,
        })
        return resp
      }
    })
  },
}

export default class HomePage extends Component<Props> {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      dataSource: [],
      caishi: {},
      params: {
        key: juhe_key,
      },
    }
  }

  componentDidMount () {
    setTimeout(() => {
      // SplashScreen.hide();
    }, 3000);//延时2秒消失
    // 放在componentDidMount方法中可以让app的界面先加载出来，避免出现白屏闪一下的问题。

    this.query()
  };

  query = () => {
    const {params = {}} = this.state
    this.setState({isLoading: true})
    storage.load({
      key: 'CaiPuFenLei',
      // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
      autoSync: true, // 设置为false的话，则等待sync方法提供的最新数据(当然会需要更多时间)。

      // syncInBackground(默认为true)意味着如果数据过期，
      // 在调用sync方法的同时先返回已经过期的数据。
      syncInBackground: true,
      syncParams: this.state.params,
    }).then(ret => {
      // 如果找到数据，则在then方法中返回
      let caishi = {}
      ret.forEach((v) => {
        if (v.parentId === '10001') {
          caishi = v
        }
      })
      this.setState({dataSource: ret, caishi, isLoading: false})
    })
  }

  render () {
    const {navigation} = this.props
    const {caishi = {}} = this.state
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#FD6C1F', '#F98D23']} start={{x: 1, y: 0}}
                        end={{x: 0, y: 1}} style={styles.header}>
          <View style={styles.title}>
            <Text style={styles.title1}>菜谱大全</Text>
            <Text style={styles.title2}>小白做菜必备烹饪助手</Text>
          </View>
          <Card style={styles.searchBox1}/>
          <TouchableOpacity activeOpacity={0.99} style={styles.searchBox2}
                            onPress={() => {
                              navigation.navigate('SearchPage',
                                {name: 'abcdefc'})
                            }}>
            <View style={styles.searchBox3}>
              <View>
                <Image source={require('../img/search.png')}
                       style={{width: 20, height: 20,marginTop:2}}/>
              </View>
              <Text style={styles.searchText}> 今天想吃点什么？</Text>
            </View>
          </TouchableOpacity>
        </LinearGradient>
        <View style={styles.content}>
          <View style={styles.contentTop}>
            <View style={styles.contentLine}/>
            <View style={styles.contentCat}><Text style={{
              fontSize: 20,
              color:'#333',
              fontWeight: ('bold', '600'),
            }}>{caishi.name}</Text>
            </View>
          </View>
          <View style={{flex: 1,flexDirection: 'column'}}>
            <View style={{flex: 0, flexDirection: 'row',height:100,marginTop:20,justifyContent: 'space-between',}}>
              <View style={styles.contentInner}>
                <View  style={styles.imgWrap}>
                  <Image source={require('../img/jiachangcai.png')}
                         style={styles.imgStyle}/>
                </View>
                <Text style={styles.contentText}>家常菜</Text>
              </View>
              <View style={styles.contentInner}>
                <View  style={styles.imgWrap}>
                  <Image source={require('../img/kuaishoucai.png')}
                         style={styles.imgStyle}/>
                </View>
                <Text style={styles.contentText}>快手菜</Text>
              </View>
              <View style={styles.contentInner}>
                <View  style={styles.imgWrap}>
                  <Image source={require('../img/chuangyicai.png')}
                         style={styles.imgStyle}/>
                </View>
                <Text style={styles.contentText}>创意菜</Text>
              </View>
              <View style={styles.contentInner}>
                <View  style={styles.imgWrap}>
                  <Image source={require('../img/sucai.png')}
                         style={styles.imgStyle}/>
                </View>
                <Text style={styles.contentText}>素菜</Text>
              </View>
            </View>
            <View style={{flex: 0,height:100, flexDirection: 'row',marginTop:15,justifyContent: 'space-between',}}>
              <View style={styles.contentInner}>
                <View  style={styles.imgWrap}>
                  <Image source={require('../img/liangcai.png')}
                         style={styles.imgStyle}/>
                </View>
                <Text style={styles.contentText}>凉菜</Text>
              </View>
              <View style={styles.contentInner}>
                <View  style={styles.imgWrap}>
                  <Image source={require('../img/hongpei.png')}
                         style={styles.imgStyle}/>
                </View>
                <Text style={styles.contentText}>烘焙</Text>
              </View>
              <View style={styles.contentInner}>
                <View  style={styles.imgWrap}>
                  <Image source={require('../img/mianshi.png')}
                         style={styles.imgStyle}/>
                </View>
                <Text style={styles.contentText}>面食</Text>
              </View>
              <View style={styles.contentInner}>
                <View  style={styles.imgWrap}>
                  <Image source={require('../img/tang.png')}
                         style={styles.imgStyle}/>
                </View>
                <Text style={styles.contentText}>汤</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {},
  header: {
    overflow: 'visible',
    height: 160,
    padding: 15,
    marginBottom: 50,
  },
  title: {
    marginTop: 40,
    color: '#fff',
    textAlign: 'left',
  },
  title1: {
    color: '#fff',
    fontSize: 28,
  },
  title2: {
    marginTop: 5,
    color: '#fff',
    fontSize: 14,
  },
  searchBox1: {
    position: 'absolute',
    top: 135,
    left: 15,
    width: '100%',
    height: 50,
    opacity: 0.15,
    color: '#B8B8B8',
  },
  searchBox2: {
    position: 'absolute',
    top: 135,
    left: 15,
    width: '100%',
    height: 50,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  searchBox3: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  searchText: {
    textAlign: 'center',
    height: 50,
    lineHeight: 53,
    fontSize: 16,
    color: '#B8B8B8',
  },
  content: {
    padding: 15,
    flex: 1,
    width: '100%',
  },
  contentTop: {
    flexDirection: 'row',
    height: 25,
  },
  contentLine: {
    width: 4,
    height: 20,
    backgroundColor: '#F4796F',
  },
  contentCat: {
    width: 140,
    height: 20,
    lineHeight: 20,
    textAlign: 'left',
    marginLeft: 5,
  },
  contentInner: {
    padding: 0,
    width:74,
    height:100
  },
  contentText:{
    marginTop:5,
    width:74,
    color:'#666',
    textAlign:'center'
  },
  imgStyle: {
    // 设置背景颜色
    backgroundColor:'#fff',
    // 设置宽度
    width:74,
    // 设置高度
    height:74,
    // 设置图片填充模式
    resizeMode:'contain',
    borderRadius:15,
    // borderWidth:10,
    // borderColor:'#f0f0f0',
  },
  imgWrap:{
    shadowOffset:{ width:3, height:3 }, shadowColor:'#bbb', shadowOpacity:0.8, shadowRadius:15
  }
})
