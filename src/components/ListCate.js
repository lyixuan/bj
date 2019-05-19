// import React, {Component} from 'react';
// import { FlatList, StyleSheet, ActivityIndicator, Text, View,Image } from 'react-native';
// import ListItemCate from './ListItemCate';
//
// export default class ListCate extends Component {
//   render(){
//     const {resultData} = this.props;
//     const {data=[]} = resultData;
//     return (
//       <View style={styles.container}>
//         {/*https://www.jianshu.com/p/3d229c26ad94*/}
//         <FlatList
//           data={data}
//           renderItem={({item}) => (
//             <ListItemCate {...this.props} item={item}/>
//           )}
//           keyExtractor={(item, index) => item.id}
//         />
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   item: {
//     fontSize: 18,
//     height: 44,
//   },
// });
