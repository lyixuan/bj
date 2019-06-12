import React, { Component } from 'react'
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Card } from 'react-native-shadow-cards'
import { juhe_key } from '../util/config'
import api from '../service/base'
import storage from '../util/storage'
import CtgListPage from "./CtgListPage";  //https://blog.csdn.net/huxinguang_ios/article/details/79892440
import ListItem from '../components/ListItem'

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
      favoriteList:null
    }
  }

  componentDidMount () {
    this.query()
    this.favoriteLoad()
  };
  componentWillReceiveProps(nextProps){
    const {params:params1={}} = this.props.navigation.state
    const {params:params2={}} = nextProps.navigation.state
    if (params1!==params2||params1.random!==params2.random) {
      this.favoriteLoad()
    }
  }


  clear = ()=>{
    storage.remove({
      key: 'favorite',
    });
  }

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
  favoriteLoad=()=>{
    storage.load({
      key: 'favorite',
    }).then(ret => {
      this.setState({
        favoriteList:ret||null
      })
      console.log(343434,ret)
    }).catch(err => {
      // 如果没有找到数据且没有sync方法，
      // 或者有其他异常，则在catch中返回
      this.setState({
        favoriteList:{}
      })
    });
  }
  render () {
    const {navigation} = this.props
    const {caishi = {},favoriteList} = this.state;
    const data = [];
    for (let key in favoriteList) {
      data.push(favoriteList[key])
    }
    const list = data.map((item)=>(<ListItem {...this.props} isHome={true} item={item}/>))
    const categor = caiList.map((v)=>{
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CtgListPage',
              {name: v.name,cid:v.id})
          }} key={v.id}>
          <View style={styles.contentInner}>
            <View  style={styles.imgWrap}>
              <Image source={v.img}
                     style={styles.imgStyle}/>
            </View>
            <Text style={styles.contentText}>{v.name}</Text>
          </View>
        </TouchableOpacity>
      )
    })

    const categor2 = caiList2.map((v)=>{
      return (
        <TouchableOpacity
          key={v.id}
          onPress={() => {
            navigation.navigate('CtgListPage',
              {name: v.name,cid:v.id})
          }}>
          <View style={styles.contentInner}>
            <View  style={styles.imgWrap}>
              <Image source={v.img}
                     style={styles.imgStyle}/>
            </View>
            <Text style={styles.contentText}>{v.name}</Text>
          </View>
        </TouchableOpacity>
      )
    })


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
              <Text style={styles.searchText}>今天想吃点什么？</Text>
            </View>
          </TouchableOpacity>
        </LinearGradient>
        <ScrollView>
        <View style={styles.content}>
          <View style={styles.contentTop}>
            <View style={styles.contentLine}/>
            <View style={styles.contentCat}><Text style={{
              fontSize: 20,
              color:'#333',
              fontWeight: ('bold', '600'),
            }}>菜式菜品</Text>
            </View>
          </View>
          <View style={{flexDirection: 'column'}}>
            <View style={{flex: 0, flexDirection: 'row',height:100,marginTop:20,justifyContent: 'space-between',}}>
              {categor}
            </View>
            <View style={{flex: 0,height:100, flexDirection: 'row',marginTop:15,justifyContent: 'space-between',}}>
              {categor2}
            </View>
          </View>
          <View style={styles.contentTop2}>
            <View style={styles.contentLine}/>
            <View style={styles.contentCat}><Text style={{
              fontSize: 20,
              color:'#333',
              fontWeight: ('bold', '600'),
            }}>我的收藏</Text>
            </View>
          </View>
          <View style={{flexDirection: 'column'}}>
              {data.length>0?list:<View style={{height: '100%',width:'100%', alignItems: 'center'}}>
                <Text style={{color:'#bfbfbf',marginTop:25,fontSize:18}}>您还没有收藏菜谱哦!</Text>
                <Text style={{color:'#bfbfbf',marginTop:5,fontSize:18}}>赶快去看看吧~</Text>
              </View>}
          </View>
        </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    overflow: 'visible',
    height: 160,
    padding: 15,
    marginBottom: 30,
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
    flexDirection: 'column',
    width: '100%',
  },
  contentTop: {
    flexDirection: 'row',
    height: 25,
  },
  contentTop2:{
    flexDirection: 'row',
    height: 25,
    marginTop:20
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
});

const caiList =[
  {
    id:1,
    name:'家常菜',
    img:require('../img/jiachangcai.png')
  },
  {
    id:2,
    name:'快手菜',
    img:require('../img/kuaishoucai.png')
  },{
    id:3,
    name:'创意菜',
    img:require('../img/chuangyicai.png')
  },{
    id:4,
    name:'素菜',
    img:require('../img/sucai.png')
  }
];

const caiList2 =[
  {
    id:5,
    name:'凉菜',
    img:require('../img/liangcai.png')
  },{
    id:6,
    name:'烘焙',
    img:require('../img/hongpei.png')
  },{
    id:7,
    name:'面食',
    img:require('../img/mianshi.png')
  },{
    id:8,
    name:'汤',
    img:require('../img/tang.png')
  }
];