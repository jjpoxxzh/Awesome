/**
 * Created by Administrator on 2018/11/6.
 */

import React, { Component } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    Text,
    View
} from 'react-native';

import PullToRefreshLayout from './PullToRefreshLayout2';

var screen = Dimensions.get('window');


export default class PullToRefreshLayoutTest2 extends Component {

    // 模拟网络取数据
    stopRefresh() {
        setTimeout(() => {
            this.pulltorefresh.stopRefresh();   // 停止刷新
        }, 2000);
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
                    <View style={{ height: 800, backgroundColor: 'green' }}></View>
                </PullToRefreshLayout>
            </View>
        );
    }
}