import { createStackNavigator,createBottomTabNavigator,createMaterialTopTabNavigator } from 'react-navigation';
import React from 'react';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import {Button,Platform} from 'react-native'
import HomePage from './src/page/HomePage';
import SearchPage from './src/page/SearchPage';
import ListPage from './src/page/ListPage';
import DetailPage from './src/page/DetailPage';

export const AppStackNavigator = createStackNavigator({
  HomePage: {
    screen: HomePage,
    headerMode: 'none',
    navigationOptions: {
      title: 'This is ListPage'
    },
    mode:'modal'

  },
  SearchPage: {
    screen: SearchPage,
    navigationOptions: (props)=>{
      const {navigation}=props;
      const {state, setParams} = navigation;
      const {params} = state;
      console.log(navigation)
      return {
        title: params&&params.title? params.title:'This is SearchPage',
        headerRight:(
          <Button
            title={params&&params.mode === 'edit'?'保存':'编辑'}
            onPress={()=>setParams({mode:params.mode==='edit'?'':'edit'})}
          />
        )
      }
    }

  },
  ListPage: {
    screen: ListPage,
    navigationOptions: {
      title: 'This is ListPage'
    }
  },
  DetailPage: {
    screen: DetailPage,
    navigationOptions: ({ navigation }) => ({ // 动态配置title
      title: `${navigation.state.params.name}页面名`
    })
  },
});