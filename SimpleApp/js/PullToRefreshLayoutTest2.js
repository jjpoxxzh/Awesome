/**
 * Created by Administrator on 2018/11/6.
 */

import React, {Component} from 'react';
import {
    Dimensions,
    Image,
    TouchableNativeFeedback,
    TouchableOpacity,
    Text,
    StyleSheet,
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

    renderTest() {
        return (
            <View style={{flex: 1}}>
                <Text style={styles.test}>
                    Welcome to React Native!
                </Text>
                <Text style={styles.test}>
                    To get started, edit index.android.js
                </Text>
                <Text style={styles.test}>
                    To get started, edit index.android.js
                </Text>
            </View>
        );
    }


    render() {
        return (
            <View style={{flex: 1}}>
                <PullToRefreshLayout ref={component => {
                    this.pulltorefresh = component
                }}
                                     onRefresh={() => {
                                         console.log('onRefresh')
                                         this.stopRefresh();

                                     }}>
                    {this.renderTest()}
                    <Image style={{width: screen.width, height: 200}}
                           source={require('./img/001.jpg')}/>
                    <Text>中华人民共和国</Text>
                    <View style={{height: 200, backgroundColor: 'green'}}>
                    </View>
                </PullToRefreshLayout>
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