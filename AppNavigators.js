import { createStackNavigator,createBottomTabNavigator,createMaterialTopTabNavigator } from 'react-navigation';
import React from 'react';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import {Button,Platform} from 'react-native'
import HomePage from './src/page/HomePage';
// import Page1 from './src/page/Page1';
// import Page2 from './src/page/Page2';
// import Page3 from './src/page/Page3';
// import DetailPage from './src/page/DetailPage';


// const AppTopNavigator = createMaterialTopTabNavigator({
//   Page1:{
//     screen: Page1,
//     navigationOptions: {
//       tabBarLabel: 'All'
//     }
//   },
//   Page2:{
//     screen: Page2,
//     navigationOptions: {
//       tabBarLabel: 'React'
//     }
//   },
//   Page3:{
//     screen: Page3,
//     navigationOptions: {
//       tabBarLabel: 'Vue'
//     }
//   },
// },{
//   tabBarOptions:{
//     tabStyle:{
//       minWidth: 50
//     },
//     upperCaseLabel:false,   // 是否支持选项卡标签大写
//     scrollEnabled:true,    // 是否支持选项卡滚动
//     style:{
//       backgroundColor:"#678"  // tabBar 背景色
//     },
//     indicatorStyle:{  // 标签指示器样式
//       height: 2,
//       backgroudColor: '#fff'
//     },
//     labelStyle:{ // 文字样式
//       fontSize: 13,
//       marginTop: 6,
//       marginBottom: 6,
//     }
//
//   }
// });
//
// const AppBottomNavigator = createBottomTabNavigator({
//   Page1:{
//     screen: Page1,
//     navigationOptions: {
//       tabBarLabel: '全部',
//       tabBarIcon:({tintColor,focused}) =>(
//         <Ionicons name={'ios-home'} size={26} style={{color:tintColor}}/>
//       )
//     }
//   },
//   Page2:{
//     screen: Page2,
//     navigationOptions: {
//       tabBarLabel: '最热',
//       tabBarIcon:({tintColor,focused}) =>(
//         <Ionicons name={'ios-people'} size={26} style={{color:tintColor}}/>
//       )
//     }
//   },
//   Page3:{
//     screen: Page3,
//     navigationOptions: {
//       tabBarLabel: '趋势',
//       tabBarIcon:({tintColor,focused}) =>(
//         <Ionicons name={'ios-chatboxes'} size={26} style={{color:tintColor}}/>
//       )
//     }
//   },
// },{
//   tabBarOptions:{
//     activeTintColor: Platform.OS === 'ios'?"#e91e63":"#fff"
//   }
// });

export const AppStackNavigator = createStackNavigator({
  HomePage: {
    screen: HomePage,
    navigationOptions: {
      title: '首页'
    }
  },
  // Page1: {
  //   screen: Page1,
  //   navigationOptions: ({ navigation }) => ({ // 动态配置title
  //     title: `${navigation.state.params.name}页面名`
  //   })
  // },
  // Page2: {
  //   screen: Page2,
  //   navigationOptions: {// 静态配置title
  //     title: 'This is Page2'
  //   }
  // },
  // Page3: {
  //   screen: Page3,
  //   navigationOptions: (props)=>{
  //     const {navigation}=props;
  //     const {state, setParams} = navigation;
  //     const {params} = state;
  //     return {
  //       title: params.title? params.title:'This is P3',
  //       headerRight:(
  //         <Button
  //           title={params.mode === 'edit'?'保存':'编辑'}
  //           onPress={()=>setParams({mode:params.mode==='edit'?'':'edit'})}
  //         />
  //       )
  //     }
  //   }
  // },
  // DetailPage: {
  //   screen: DetailPage,
  //   navigationOptions: {
  //     title: 'This is DetailPage'
  //   }
  // },
  // Bottom: {
  //   screen: AppBottomNavigator,
  //   navigationOptions: {
  //     title: 'AppBottomNavigator'
  //   }
  // },
  // Top: {
  //   screen: AppTopNavigator,
  //   navigationOptions: {
  //     title: 'AppTopNavigator'
  //   }
  // },
});