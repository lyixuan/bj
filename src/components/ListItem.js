import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

export default class ListItem extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  jump = () => {
    console.log(this.props)
    this.props.navigation.navigate('DetailPage', { name: 'abcdefc' })
  };

  render() {
    const { item } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={e=>this.jump(e)}>
        <View>
          <View style={{ flex: 1, height: 50 }}>
            {/*<Image source={{ uri: item.shopImg }}*/}
                   {/*style={{ width: 200, height: 200 }}/>*/}
          </View>
          <View style={{ flex: 1.5, height: 50}}>
            <Text>{item.shopTitle}, {item.shopPrice}</Text>
          </View>
        </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
