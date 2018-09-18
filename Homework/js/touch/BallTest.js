import React, {Component} from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
} from 'react-native';

const {width, height} = Dimensions.get('window');

import MenuBall from './MenuBall';

import infoLog from 'infoLog';
const TAG = 'BallTest';
/**
 * 测试悬浮小球的滚动
 */
export default class BallTest extends Component {

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#F5FCFF', flexDirection: 'row'}}>
                <View style={{flex: 1, height: height, backgroundColor: 'black'}}/>
                <View style={{flex: 1, height: height, backgroundColor: 'white'}}/>
                <MenuBall/>
            </View>
        );
    }
}
