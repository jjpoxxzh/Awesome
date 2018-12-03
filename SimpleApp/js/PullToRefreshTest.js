/**
 * Created by Administrator on 2018/11/6.
 */

import React, { Component } from 'react';
import {
    Dimensions,
    Image,
    Text,
    StyleSheet,
    View
} from 'react-native';

const screen = Dimensions.get('window');
import PullToRefresh from './PullToRefresh3';

/**
 * 下拉刷新测试
 */
export default class PullToRefreshTest extends Component {

    // 模拟网络取数据
    onRefresh() {
        setTimeout(() => {
            this.pulltorefresh.stopRefresh();   // 停止刷新
        }, 2000);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <PullToRefresh
                    ref={component => {
                        this.pulltorefresh = component
                    }}
                    backgroundSource={require('./img/header.png')}
                    onRefresh={() => {
                        this.onRefresh();
                    }}>
                    <Text style={{ fontSize: 20, height: 160, backgroundColor: '#FFAC69' }}>中华人民共和国</Text>
                    <Image style={{ width: screen.width, height: 200 }}
                        source={require('./img/001.jpg')} />
                    <View style={{ height: 200, backgroundColor: 'green' }}>
                    </View>
                </PullToRefresh>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    test: {
        fontSize: 20,
        height: 200,
        textAlign: 'center',
        margin: 10,
        borderWidth: 1,
        borderColor: '#FFAC69'
    }
});