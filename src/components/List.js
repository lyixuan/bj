import React, {Component} from 'react';
import { FlatList, StyleSheet, ActivityIndicator, Text, View,Image } from 'react-native';
import ListItem from './ListItem';
import { juhe_key } from "../util/config";

export default class List extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      refreshing: false
    }
  }
  // 下拉刷新
  _onRefresh=()=>{
    // todo 功能不好使
    // 页面渲染之后在加载结束周期重新加载
    this.props.refresh();
  }
  /*没有数据时显示的组件*/
  listEmptyComponent=()=> {
    return <View >
      <Text>
        暂时没有数据,先等2秒
      </Text>
    </View>
  }
  /*row*/
  _renderItem=(obj)=>{
    const {item={}} = obj;
    return (
      <View>
        <Text>
          {item.name}
        </Text>
      </View>
    )
  }
  _endReached=()=>{
    this.props.endReached();
    let that=this
    const {data=[],totalNum} = this.props.resultData;
    // 数据加载完判断
    if(data && data.length < parseInt(totalNum)){
      that.state.currentPage++;
    }else{
      console.log('已加载完成')
    }
  }
  render(){
    const {resultData} = this.props;
    const {data=[]} = resultData;
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor= {(item,index) => item.id||index.toString()}
          data = {data}   // 列表的数据源, 数组
          // extraData = {this.state} //引用类型，数据可能不会更新，只是复制，没有操作引用的对象
          // ListEmptyComponent = {this._listEmptyComponent} //列表为空时渲染
          // initialNumToRender = {6} //首屏渲染的数据量，不会在滑动中被卸载
          renderItem={({ item }) => (<ListItem {...this.props} item={item}/>)} //渲染列表数据
            // columnWrapperStyle = {{borderWidth: 2}}  //行数>1时，可额外设置行样式
            // showsVerticalScrollIndicator = {false} //继承ScrollView的属性，显示水平指示器默认是true
            // horizontal = {false} //默认true是垂直布局
            // numColumns = {3}  // 水平布局的item数量
            refreshing = {true}
            onRefresh = {this._onRefresh} //下拉刷新
            // onEndReachedThreshold = {0.1} //当距离内容比例不足内容0.1比例时触发onEndReached
            onEndReached = {this._endReached} //上拉加载数据
            />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding:15
  },
});
