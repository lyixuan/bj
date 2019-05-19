import React, {Component} from 'react';
import {Button,StyleSheet, Text, View,TextInput,TouchableOpacity,ScrollView} from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import { juhe_key } from '../util/config'
import storage from '../util/storage'
export default class SearchPage extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      text:'',
      key: juhe_key,
      historyStoreList:[],
    };
  }
  componentDidMount() {
    this.historyStore();
  }
  historyStore=()=>{
    storage.load({
      key: 'History',
    }).then(ret => {
      this.setState({
        historyStoreList:Array.isArray(ret)?ret:[]
      })
    }).catch(err => {
      // 如果没有找到数据且没有sync方法，
      // 或者有其他异常，则在catch中返回
      this.setState({
        historyStoreList:[]
      })
    });
  }
  click = (text)=>{
    this.setState({
      text
    },()=>this.onSubmit())

  }
  clear = ()=>{
    storage.remove({
      key: 'History',
    });
    this.setState({
      historyStoreList:[]
    })
  }
  onchange = (text)=>{
    this.setState({text})
  }
  onSubmit = ()=>{
    const {navigation} = this.props;
    const {text}=this.state
    if (!text) return
    this.store();// 存储查询历史记录
    navigation.navigate('ListPage', {text} )
  }
  store=()=>{
    const {text} = this.state;
    storage.load({
      key: 'History',
    }).then(ret => {
      // 如果找到数据，则在then方法中返回
      ret.push(text)
      const list =Array.from(new Set(ret));
      storage.save({
        key: 'History',
        data: list,
      })
    }).catch(err => {
      // 如果没有找到数据且没有sync方法，
      // 或者有其他异常，则在catch中返回
      storage.save({
        key: 'History',
        data: [text],
      })
    });
  }
  render() {
    const {navigation} = this.props;
    const {historyStoreList} = this.state;
    const hot = ['红烧鱼','杏鲍菇','酸辣粉','胡萝卜','可乐鸡翅','番茄炒蛋','鱼香茄子','京酱肉丝','带鱼','土豆丝'].map((v)=>(<TouchableOpacity onPress={()=>this.click(v)} style={styles.box2Inner}  key={v}><Text style={{fontSize:15, color:'#333'}}>{v}</Text></TouchableOpacity>))
    const historyStoreMap = historyStoreList.map((v)=>(<TouchableOpacity onPress={()=>this.click(v)} style={styles.box22Inner}  key={v}><Text style={{fontSize:15, color:'#333'}}>{v}</Text></TouchableOpacity>))
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
        {
          historyStoreList.length===0?(
            <View>
              <View style={styles.box11}>
                <Text style={styles.boxInner}>最近搜索</Text>
                <TouchableOpacity onPress={()=>this.clear()}><Text style={styles.del}>清空</Text></TouchableOpacity>
              </View>
              <View style={styles.box22}>
                <View style={styles.box22Inner}>
                  <Text style={{fontSize:15, color:'#666',textAlign:'center'}}>暂无数据</Text>
                </View>
              </View>
            </View>
          ):(
            <View>
              <View style={styles.box11}>
                <Text style={styles.boxInner}>最近搜索</Text>
                <TouchableOpacity onPress={()=>this.clear()}><Text style={styles.del}>清空</Text></TouchableOpacity>
              </View>
              <View style={styles.box22}>
                {historyStoreMap}
              </View>
            </View>
          )
        }
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
    flexDirection:'row',
    justifyContent: 'space-between',
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
  del:{
    paddingTop:15,
    paddingRight:15,
    fontSize:14,
    color:'#616161',
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
