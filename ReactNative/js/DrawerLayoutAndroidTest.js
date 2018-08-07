import React, {Component} from 'react';
import {
    DrawerLayoutAndroid,
    ProgressBarAndroid,
    StyleSheet,
    Text,
    View
} from 'react-native';

import infoLog from 'infoLog';
const TAG = 'Main';

export default class DrawerLayoutAndroidTest extends Component {

  render() {
    return (
      <DrawerLayoutAndroid style={{height:200,backgroundColor:'#bebebe'}}
        renderNavigationView={() => <Text>React Native</Text>}>
        <ProgressBarAndroid />
      </DrawerLayoutAndroid>
    );
  }

}
