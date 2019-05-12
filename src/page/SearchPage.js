import React, {Component} from 'react';
import {Button,StyleSheet, Text, View,TextInput,TouchableOpacity,ScrollView} from 'react-native';
import HeaderComponent from '../components/HeaderComponent';

export default class SearchPage extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      text:''
    };
  }
  click = (text)=>{
    this.setState({
      text
    },this.onSubmit())

  }
  onchange = (text)=>{
    this.setState({text})
  }
  onSubmit = ()=>{
    console.log(22)

  }
  render() {
    const {navigation} = this.props;
    const hot = ['红烧鱼','杏鲍菇','酸辣粉','胡萝卜','可乐鸡翅','番茄炒蛋','鱼香茄子','京酱肉丝','带鱼','土豆丝'].map((v)=>(<TouchableOpacity onPress={()=>this.click(v)} style={styles.box2Inner}  key={v}><Text style={{fontSize:15, color:'#333'}}>{v}</Text></TouchableOpacity>))
    const nest = ['红烧鱼','杏鲍菇','酸辣粉','胡萝卜','可乐鸡翅','番茄炒蛋','鱼香茄子','京酱肉丝','带鱼','土豆丝'].map((v)=>(<TouchableOpacity onPress={()=>this.click(v)} style={styles.box22Inner}  key={v}><Text style={{fontSize:15, color:'#333'}}>{v}</Text></TouchableOpacity>))
    return (
    <View style={styles.container}>
      <HeaderComponent
        text={this.state.text}
        navigation={navigation}
        onTextChange={(text)=>this.onchange(text)}
        onSubmit={this.onSubmit}
      />
      <ScrollView >
        <View style={styles.box1}>
          <Text style={styles.boxInner}>热门搜索</Text>
        </View>
        <View style={styles.box2}>
          {hot}
        </View>
        <View style={styles.box11}>
          <Text style={styles.boxInner}>最近搜索</Text>
        </View>
        <View style={styles.box22}>
          {nest}
        </View>
      </ScrollView>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F5F5F5'
  },
  box1: {
    backgroundColor:'#fff',
    textAlign: 'left',
    borderBottomColor:'#F7F7F7',
    borderBottomWidth:1,
    paddingLeft:15
  },
  box11:{
    backgroundColor:'#fff',
    textAlign: 'left',
    borderBottomColor:'#F7F7F7',
    borderBottomWidth:1,
    paddingLeft:15,
    marginTop:15
  },
  boxInner:{
    paddingTop:12,
    paddingBottom:12,
    fontSize:18,
    color:'#919191',
  },
  box2:{
    height:90,
    flexDirection:'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop:10,
    paddingLeft:15
  },
  box22:{
    backgroundColor: '#fff',
  },
  box2Inner:{
    marginTop:20,
    width:'19%',
    textAlign:'center'
  },
  box22Inner:{
    marginTop:20,
    textAlign:'center',
    height:30,
    lineHeight:30,
    paddingLeft:18,
    paddingRight:20,
    borderBottomWidth:1,
    borderBottomColor:'#F7F7F7',
  },
  input:{
    height:50,
    borderWidth:1,
    marginTop:10,
    borderColor:'#ccc'
  }
});
