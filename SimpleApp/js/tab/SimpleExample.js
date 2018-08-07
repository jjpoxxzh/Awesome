import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';


/*
 *  Tab控制器
 */
export default class SimpleExample extends Component {


    newPage(text) {
        return (
            <View tabLabel={text} style={styles.container}>
                <Text style={styles.tv}>text</Text>
            </View>
        );
    }


    render() {
        return (
            <ScrollableTabView style={styles.tab}
                               renderTabBar={() => <DefaultTabBar />} ref={tabView => {
                this.tabView = tabView
            }}>
                <View tabLabel='Tab #1'>
                        <Text style={styles.tv}>新闻</Text>
                </View>
                <View tabLabel='Tab #2'>
                    <Text style={styles.tv}>热点</Text>
                </View>
                <View tabLabel='Tab #3'>
                    <Text style={styles.tv}>图书</Text>
                </View>
                <TouchableOpacity tabLabel='Back' onPress={() => this.tabView.goToPage(0)}>
                    <Text>回到第一页</Text>
                </TouchableOpacity>
            </ScrollableTabView>
        );
    }
}


const styles = StyleSheet.create({
    tab: {
        marginTop: 0,
        backgroundColor: '#bebebe',
    },
    container: {
        flex: 1,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tv: {
        fontSize: 20,
    }
});