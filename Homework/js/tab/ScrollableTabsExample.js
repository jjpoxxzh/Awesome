/*
 *  Tab控制器
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';


export default class ScrollableTabsExample extends Component {

    render() {
        return <ScrollableTabView
            style={{marginTop: 20, }}
            initialPage={2}
            renderTabBar={() => <ScrollableTabBar />}
        >
            <Text tabLabel='Tab #1'>My</Text>
            <Text tabLabel='Tab #2 word word'>favorite</Text>
            <Text tabLabel='Tab #3 word word word'>project</Text>
            <Text tabLabel='Tab #4 word word word word'>favorite</Text>
            <Text tabLabel='Tab #5'>project</Text>
            <Text tabLabel='Tab #6'>消息</Text>
            <Text tabLabel='Tab #7'>推荐</Text>
        </ScrollableTabView>;
    }
}


const styles = StyleSheet.create({
    bigblue: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 30,
    },
    red: {
        color: 'red',
    }
});