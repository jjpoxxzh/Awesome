import React, {Component} from 'react';
import {
    Text,
    ToastAndroid,
    TouchableHighlight,
    StatusBar,
    View
} from 'react-native';

import DiyTimer from './DiyTimer'

/*
 *  点击事件测试
 */
export default class TimerTest extends Component {


    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#e7e7e7', justifyContent: 'center'}}>
                <DiyTimer time={12} isRunning={true} onStart={() => {
                    ToastAndroid.show('计时开始！', ToastAndroid.SHORT)
                }} onEnd={() => {
                    ToastAndroid.show('计时结束了！', ToastAndroid.SHORT)
                }} />
                <DiyTimer time={20} isRunning={false}/>
                <DiyTimer time={40} isRunning={true}/>
            </View>
        );
    }
}
