import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

export default class ListItem extends Component<Props> {
  constructor (props) {
    super(props)
    this.state = {}
  }

  jump = () => {
    console.log(this.props)
    this.props.navigation.navigate('DetailPage', {name: 'abcdefc'})
  }

  render () {
    const {item = {}} = this.props
    console.log('item', item)
    const {id = '', title = '', albums = [], burden = '', imtro = '', ingredients = '', tags = '', steps = []} = item
    return (
      <View>
        <TouchableOpacity onPress={e => this.jump(e)}>
          <View style={{flex: 1, flexDirection: 'row', height: 110}}>
            <View style={styles.left}>
              <Image imageStyle={{borderRadius:10}} source={{uri: albums && albums[0]}}
                     style={{width: '90%', height: '90%',borderRadius:10}}/>
            </View>
            <View
              style={{flex: 1.5, height: '100%', backgroundColor: 'skyblue'}}>
              <Text>{title}</Text>
              <Text>{tags}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  left: {
    flex: 1, height: '100%', backgroundColor: 'powderblue',

  },
  item: {},
})
