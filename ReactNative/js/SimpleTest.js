import React, {Component} from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';

import infoLog from 'infoLog';
const TAG = 'Main';

export default class SimpleTest extends Component {

  render() {

  let pic = {
        uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
      };

    return (
      <View style={simplestyles.container}>
        <Text style={simplestyles.hello}>原生中嵌入React Native
            <Text style={{color:'#ff0000'}}>内部测试</Text>
        </Text>
        <Image source={pic} style={{width: 193, height: 110}} >
            <Image style={simplestyles.center} source={require('./img/icon_geo.png')} />
        </Image>
      </View>
    )
  }

}

const simplestyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#bebebe',
  },
  hello: {
    fontSize: 25,
    textAlign: 'center',
    backgroundColor:'#ebebeb',
    margin: 10,
    color: '#0000ff',
  },
  center: {
      width: 20,
      height: 20,
      position:'absolute',

    },
});