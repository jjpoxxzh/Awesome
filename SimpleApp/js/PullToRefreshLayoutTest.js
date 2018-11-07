/**
 * Created by Administrator on 2018/11/6.
 */

import React, { Component } from 'react';
import {
    Dimensions,
    Image,
    Text,
    View
} from 'react-native';

import PullToRefreshLayout from './PullToRefreshLayout';

var screen = Dimensions.get('window');


export default class PullToRefreshLayoutTest extends Component {

    // 模拟网络取数据
    stopRefresh() {
        setTimeout(() => {
            this.pulltorefresh.stopRefresh();   // 停止刷新
        }, 3000);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <PullToRefreshLayout ref={component => { this.pulltorefresh = component }}
                    onRefresh={() => {
                        console.log('onRefresh')
                        this.stopRefresh();

                    }}>
                    <Image style={{ width: screen.width, height: 200 }}
                        source={require('./img/001.jpg')} />
                    <Text>中华人民共和国</Text>
                    <View style={{ height: 200, backgroundColor: 'green' }}></View>
                </PullToRefreshLayout>
            </View>
        );
    }
}