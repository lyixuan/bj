import { createStackNavigator,createBottomTabNavigator,createMaterialTopTabNavigator } from 'react-navigation';
import React from 'react';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import {Button,Platform} from 'react-native'
import HomePage from './src/page/HomePage';
// import Page1 from './src/page/Page1';
// import Page2 from './src/page/Page2';
// import Page3 from './src/page/Page3';
// import DetailPage from './src/page/DetailPage';

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