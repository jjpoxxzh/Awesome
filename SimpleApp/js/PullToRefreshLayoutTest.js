/**
 * Created by Administrator on 2018/11/6.
 */


import React, {Component} from 'react';
import {
    Dimensions,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    Platform,
    View
} from 'react-native';

import PullToRefreshLayout from './PullToRefreshLayout';

var screen = Dimensions.get('window');

export default class PullToRefreshLayoutTest extends Component {


    render() {
        let PK_GGVIEW = 'abc';
        return (
            <View style={{flex: 1}}>
                <PullToRefreshLayout ref={PK_GGVIEW} style={{flex: 1}} onRefresh={() => {
                    console.log('onRefresh')
                }}>
                    <Image style={{width: 400, height: 200}}
                           source={require('./img/001.jpg')}/>
                    <Text>中华人民共和国</Text>
                    <View style={{height: 70, backgroundColor: 'green'}}></View>
                </PullToRefreshLayout>
            </View>
        );
    }
}