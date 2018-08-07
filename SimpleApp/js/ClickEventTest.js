import React, {Component} from 'react';
import {
    Text,
    ToastAndroid,
    TouchableHighlight,
    View
} from 'react-native';

/*
 *  点击事件测试
 */
export default class ClickEventTest extends Component {
    onPressButton() {
        // logcat日志
        console.log("点击按钮！");
        // Toast日志
        ToastAndroid.show('点击按钮！', ToastAndroid.SHORT);
    }


    abc() {
        ToastAndroid.show('长按事件', ToastAndroid.LONG);
    }

    render() {
        return (
            <TouchableHighlight onPress={this.onPressButton} onLongPress={this.abc}>
                <Text style={{backgroundColor: 'blue', width: 100}}>Button</Text>
            </TouchableHighlight>
        );
    }
}
