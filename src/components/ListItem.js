import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity,ActivityIndicator } from 'react-native'
import storage from "../util/storage";

function randomNum(minNum,maxNum){
  switch(arguments.length){
    case 1:
      return parseInt(Math.random()*minNum+1,10);
      break;
    case 2:
      return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
      break;
    default:
      return 0;
      break;
  }
}

export default class ListItem extends Component<Props> {
  constructor (props) {
    super(props)
    this.state = {
      flist:{},
      isLoading:false
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
    this.setState({
      isLoading:true
    })
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
        flist:ret,
        isLoading:false
      })
    }).catch(err => {
      // 如果没有找到数据且没有sync方法，
      // 或者有其他异常，则在catch中返回
      storage.save({
        key: 'favorite',
        data: {[details.id]:details},
      })
      this.setState({
        flist:{[details.id]:details},
        isLoading:false
      })
    });
  };
  jump = (e,item) => {
    this.props.navigation.navigate('DetailPage', {details: item,isHome:this.props.isHome})
  }

  render () {
    const {item = {},isHome} = this.props
    const {id = '', title = '', albums = [], burden = '', imtro = '', ingredients = '', tags = '', steps = []} = item
    const a = randomNum(1,1000);
    const b = randomNum(1,a);
    const temArr = ingredients.split(';');
    const arr = [];
    temArr.forEach((v)=>{
      arr.push(v.substr(0,v.indexOf(',')))
    });
    const newingredients = arr.join(',');

    let isShouCang = false;
    const {flist} =this.state;
    for (let key in flist) {
      if (key==id) {
        isShouCang=true
      }
    }

    if(isHome&&isShouCang){
      return <View>
        {this.state.isLoading?(
          <ActivityIndicator style={styles.container1}/>
        ):(
          <View>
            <TouchableOpacity style={{width:'90%'}} onPress={(e) => this.jump(e,item)}>
              <View style={{flex: 1, flexDirection: 'row', height: 100,marginTop:15}}>
                <View style={styles.left}>
                  <Image imageStyle={{borderRadius:10}} source={{uri: albums && albums[0]}}
                         style={{width: '90%', height: '100%',borderRadius:10}}/>
                </View>
                <View style={styles.right}>
                  <View style={{height: '100%'}}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.ingredients} numberOfLines={2}>{newingredients}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{width:'10%',position:'absolute',right:0,top:15,height:100}} activeOpacity={1}
                              onPress={() => this.store(item)}>
              <Image source={require('../img/del.png')}
                     style={styles.flatIcon}/>
            </TouchableOpacity>
          </View>
        )}
      </View>
    } else if(!isHome){
      return <View>
        <TouchableOpacity  onPress={(e) => this.jump(e,item)}>
          <View style={{flex: 1, flexDirection: 'row', height: 100,marginTop:15}}>
            <View style={styles.left}>
              <Image imageStyle={{borderRadius:10}} source={{uri: albums && albums[0]}}
                     style={{width: '90%', height: '100%',borderRadius:10}}/>
            </View>
            <View style={styles.right}>
              <View style={{height: '100%'}}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.ingredients} numberOfLines={1}>{newingredients}</Text>
                <Text style={styles.count}>{a}万浏览 {b}万收藏</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    } else {
      return null
    }

  }
}

const styles = StyleSheet.create({
  left: {
    flex: 1,
    height: '100%'

  },
  right:{
    flex: 1.2,
    height: '100%',
  },
  title: {
    fontSize:16,
    fontWeight:'500',
    paddingTop:5

  },
  ingredients: {
    fontSize:13,
    marginTop:5,
    color:'#BEBEBE'
  },
  count:{
    position:'absolute',
    bottom:5,
    fontSize:13,
  },
  flatIcon:{
    width: 18, height: 18,marginTop:2,
    position:'absolute',
    right:5,
    top:5
  },
  container1:{
    marginTop:'30%'
  }
})
