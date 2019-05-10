import { createStackNavigator,createBottomTabNavigator,createMaterialTopTabNavigator } from 'react-navigation'; // https://reactnavigation.org/docs/zh-Hans/getting-started.html
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
    headerMode: 'none',    // 隐藏本路由页面头部
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
},{//定义配置
  initialRouteName: 'HomePage',     //设置初始路由为Home
});

//
// const navigationOptions={
//   title:'详情页',
//   header:HeaderComponent,                       //自定义头部组件
//   headerTitle:TitleComponent,                   //自定义标题组件
//   headerLeft:LeftComponent,                     //自定义左边组件，会替换掉默认返回按钮
//   headerRight:<Text>右边元素</Text>,            //自定义右边元素，注意这里不可以放组件
//   headerBackImage:{uri:'mipmap/ic_launcher'},   //自定义返回按钮的图片
//   headerStyle:{                                 //导航栏样式设置
//     backgroundColor:'#8bc9ff',
//   },
//   headerTintColor:'#fff',                       //按钮、标题颜色设置
//   headerTitleStyle:{                            //标题字体样式设置
//     fontWeight:'bold',
//   },
//   headerTransparent:true,                       //使头部背景透明
//   gesturesEnabled:true,                         //开启手势操作
//   gestureDirection:'inverted',            //修改返回手势操作方向为从右到左，默认为从左到右
//   gestureResponseDistance:{               //定义手势响应距离屏幕边界的距离
//     horizontal:100,
//     vertical:50
//   }
// };