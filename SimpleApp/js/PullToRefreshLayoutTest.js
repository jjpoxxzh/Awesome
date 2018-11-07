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

    // 取数据
    fetchData() {
        // 地址有可能改变，参见https://reactnative.cn/docs/0.51/sample-application-movies.html
        let REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json';

        fetch(REQUEST_URL)
            .then(response => response.json())
            .then(responseData => {
                console.log(responseData.movies.length);
                this.pulltorefresh.stopRefresh();   // 停止刷新
            }).catch(e => {
                console.log("错误信息", e);
                this.setState({
                    load: 2,
                });
            });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <PullToRefreshLayout ref={component => { this.pulltorefresh = component }}
                    onRefresh={() => {
                        console.log('onRefresh')
                        this.fetchData();
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