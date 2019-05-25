import React, {Component} from 'react';
import {StyleSheet, Text, View,ActivityIndicator,Image,ScrollView} from 'react-native';
import HeaderComponent3 from '../components/HeaderComponent3';

export default class DetailPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
    }
  }

  render() {
    const {navigation} = this.props
    const {details={}} = navigation.state.params
    console.log(details)
    const {id = '', title = '', albums = [], imtro = '',ingredients = '', steps = [],burden = '',   tags = ''} = details
    const arr = ingredients.split(';');
    const arr2 = burden.split(';');

    const yongliao = (arr.concat(arr2)).map((v,id)=>{
      const array = v.split(',');
      return (
      <View style={styles.line} key={id}>
        <Text style={styles.lineL}>{array[0]}</Text><Text style={styles.lineR}>{array[1]}</Text>
      </View>
    )})

    const zuofa = steps.map((v)=>{
      return (
        <View style={styles.row}>
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
  }
});
