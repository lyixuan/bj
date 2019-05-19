import React, { Component } from 'react'
import {
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
  Dimensions,
  Image
} from 'react-native'
import CateListItem from './CateListItem'

export default class List extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      refreshing: false,
    }
  }

  /*没有数据时显示的组件*/
  listEmptyComponent = () => {
    return (<View style={{height: '100%', alignItems: 'center', justifyContent: 'center'}}>
        <Image source={require('../img/nodata.png')}
               style={{width: 128, height: 128,marginTop:150}}/>
        <Text style={{color:'#bfbfbf',marginTop:5}}>抱歉，还没有您要找的菜谱</Text>
      </View>
    )
  }
  _endReached = () => {
    this.props.endReached()
  }
  _createListFooter = () => {
    const {isShowMore} = this.props
    return (
      <View style={styles.footerView}>
        {isShowMore == 1 && <ActivityIndicator/>}
        <Text style={{color: '#ccc',textAlign:'center',marginTop:3}}>
          {isShowMore ==1  ? '加载更多数据...':isShowMore ==2?'没有更多数据了':''}
        </Text>
      </View>
    )
  }

  render () {
    const {resultData, isLoading} = this.props
    const {data = []} = resultData
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={(item, index) => item.id+Math.random() || index.toString()}
          data={data}   // 列表的数据源, 数组
          showsVerticalScrollIndicator={false}  // //隐藏垂直滚动条
          renderItem={({item}) => (
            <CateListItem {...this.props} item={item}/>)} //渲染列表数据
          onEndReachedThreshold={0.2} //当距离内容比例不足内容0.1比例时触发onEndReached
          onEndReached={this._endReached} //上拉加载数据
          ListFooterComponent={this._createListFooter}
          ListEmptyComponent={this.listEmptyComponent}
          numColumns={2}
          // columnWrapperStyle = {{borderWidth: 2}}
          horizontal={false}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height:Dimensions.get("window").height-100,
    paddingRight: 15,
  },
  footerView:{
    height:50,
  }
})
