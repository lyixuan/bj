import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
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
    this.state = {}
  }

  jump = (e,item) => {
    this.props.navigation.navigate('DetailPage', {details: item})
  }

  render () {
    const {item = {}} = this.props
    const {id = '', title = '', albums = [], burden = '', imtro = '', ingredients = '', tags = '', steps = []} = item
    const a = randomNum(1,1000);
    const b = randomNum(1,a);
    const temArr = ingredients.split(';');
    const arr = [];
    temArr.forEach((v)=>{
      arr.push(v.substr(0,v.indexOf(',')))
    });
    const newingredients = arr.join(',');
    return (
      <View>
        <TouchableOpacity onPress={(e) => this.jump(e,item)}>
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
    )
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
  }
})
