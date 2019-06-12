import React, {Component} from 'react';
import {StyleSheet, Text, View,ActivityIndicator,Image,ScrollView,TouchableOpacity,Alert} from 'react-native';
import HeaderComponent3 from '../components/HeaderComponent3';
import { Card } from 'react-native-shadow-cards'
import storage from "../util/storage";
export default class DetailPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      flist:{}

    }
  }
  componentDidMount () {
    storage.load({
      key: 'favorite',
    }).then(ret => {
      // 如果找到数据，则在then方法中返回
      this.setState({
        flist:ret
      })
    }).catch(err => {
      this.setState({
        flist:{}
      })
    });
  };
  store=(details)=>{
    storage.load({
      key: 'favorite',
    }).then(ret => {
      // 如果找到数据，则在then方法中返回
      if(ret[details.id]) {
        delete ret[details.id]
      } else {
        ret[details.id]=details;
      }
      storage.save({
        key: 'favorite',
        data: ret,
      })
      this.setState({
        flist:ret
      })
    }).catch(err => {
      // 如果没有找到数据且没有sync方法，
      // 或者有其他异常，则在catch中返回
      storage.save({
        key: 'favorite',
        data: {[details.id]:details},
      })
      this.setState({
        flist:{[details.id]:details}
      })
    });
  };

  render() {
    const {navigation} = this.props
    const {details={},isHome} = navigation.state.params
    const {id = '', title = '', albums = [], imtro = '',ingredients = '', steps = [],burden = '',   tags = ''} = details
    const arr = ingredients.split(';');
    const arr2 = burden.split(';');

    let isShouCang = false;
    const {flist} =this.state;
    for (let key in flist) {
      if (key==details.id) {
        isShouCang=true
      }
    }
    const yongliao = (arr.concat(arr2)).map((v,id)=>{
      const array = v.split(',');
      return (
      <View style={styles.line} key={id}>
        <Text style={styles.lineL}>{array[0]}</Text><Text style={styles.lineR}>{array[1]}</Text>
      </View>
    )})



    const zuofa = steps.map((v,i)=>{
      return (
        <View style={styles.row} key={i}>
          <Text style={styles.rowL}>{v.step}</Text>
          <Image source={{uri:v.img}}
                 style={styles.rowLR}/>
        </View>
      )
    });
    return (
      <View style={styles.container}>
        <HeaderComponent3
          title={title}
          navigation={navigation}
          isHome={isHome}
        />
        {this.state.isLoading?(
          <ActivityIndicator style={styles.container1}/>
        ):(
        <ScrollView>
          <View style={styles.Wrap}>
            <View style={styles.box1}>
              <Image source={{uri:albums[0]}}
                     style={styles.imgStyle}/>
              <Text style={styles.tt}>{title}</Text>
            </View>
            <View style={styles.box2}>
              <Text style={styles.inner1}>心得</Text>
              <Text style={styles.inner2}>{imtro}</Text>
              <Text style={styles.inner1}>用料</Text>
              <View>
                {yongliao}
              </View>
              <Text style={styles.inner1}>做法</Text>
              <View>
                {zuofa}
              </View>
            </View>
          </View>
          </ScrollView>
        )}
        <Card style={styles.searchBox1}/>
        <TouchableOpacity style={styles.searchBox1} activeOpacity={1}
                          onPress={() => this.store(details)}>
          <View style={{flexDirection: 'row',justifyContent: 'center',
            alignItems: 'center',height:50}}>
            {!isShouCang?<Image source={require('../img/shoucang.png')}
                   style={{width: 30, height: 30,marginTop:2}}/>:<Image source={require('../img/shoucang2.png')}
                                                                        style={{width: 30, height: 30,marginTop:2}}/>}

            <Text style={{fontSize:20,marginLeft:5,marginTop:2}}>收藏</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F6F6F6'
  },
  container1: {
    marginTop:'30%'
  },
  box1:{
    backgroundColor:'#fff',
  },
  Wrap:{
    backgroundColor:'#F6F6F6',
  },imgStyle:{
    // 设置背景颜色
    backgroundColor:'#fff',
    // 设置宽度
    width:'100%',
    // 设置高度
    height:230,
    // 设置图片填充模式
    resizeMode:'cover',
  },tt:{
    fontSize:20,
    fontWeight:'500',
    textAlign:'center',
    marginTop:20,
    marginBottom:20,
  },
  box2:{
    marginTop:15,
    backgroundColor:'#fff',
    paddingLeft:15,
    paddingRight:15,
    paddingBottom:40
  },
  inner1:{
    textAlign:'left',
    fontWeight:'500',
    fontSize:16,
    marginTop:20,
    marginBottom:10,
  },
  inner2:{
    textAlign:'left',
    fontWeight:'400',
    fontSize:16,
    lineHeight:24
  },
  line:{
    borderBottomWidth:1,
    height:45,
    flexDirection:'row',
    borderColor:'#eee',
    paddingLeft:5
  },
  lineL:{
    flex:1,
    lineHeight:45,
    fontSize:16,
  },
  lineR:{
    flex:1,
    lineHeight:45,
    fontSize:16,
    color:'#999'
  },
  rowL:{
    fontSize:16,
    lineHeight:24,
    paddingLeft:5,
    paddingRight:5
  },
  rowLR:{
    marginTop:15,
    marginBottom:15,
    marginLeft:'5%',
    width:'90%',
    // 设置高度
    height:200,
  },
  searchBox1: {
    position: 'absolute',
    bottom: 60,
    right: 20,
    width: 120,
    height: 50,
    opacity: 0.95,
    borderRadius:25,
    color: '#c8c8c8',
  },
});
