import { createStackNavigator } from 'react-navigation'; // https://reactnavigation.org/docs/zh-Hans/getting-started.html
import React from 'react';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import HomePage from './src/page/HomePage';
import SearchPage from './src/page/SearchPage';
import ListPage from './src/page/ListPage';
import CtgListPage from './src/page/CtgListPage';
import DetailPage from './src/page/DetailPage';

export const AppStackNavigator = createStackNavigator({
  HomePage: {
    screen: HomePage,
    navigationOptions:{
      header: null,  //隐藏顶部导航栏
    }
  },
  SearchPage: {
    screen: SearchPage,
    navigationOptions:{
      header: null,  //隐藏顶部导航栏
    }

  },
  ListPage: {
    screen: ListPage,
    navigationOptions:{
      header: null,  //隐藏顶部导航栏
    }
  },
  CtgListPage: {
    screen: CtgListPage,
    navigationOptions:{
      header: null,  //隐藏顶部导航栏
    }
  },
  DetailPage: {
    screen: DetailPage,
    navigationOptions: ({ navigation }) => ({ // 动态配置title
      title: `${navigation.state.params.name}页面名`
    })
  },
},{//定义配置
  initialRouteName: 'HomePage',     //设置初始路由为Home
  // initialRouteName: 'ListPage',     //设置初始路由为Home
  navigationOptions: {  // 屏s幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
    header: {  // 导航栏相关设置项
      backTitle: '返回',  // 左上角返回键文字
      style: {
        // backgroundColor: '#fff'
      },
      titleStyle: {
        // color: 'green'
      }
    },
    cardStack: {
      gesturesEnabled: true
    },
    headerMode: 'screen', // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
  },
});
