import React, {Component} from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';

import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';


/*
 *  Tab控制器
 */

export default class OverlayExample extends Component {

    render() {
        return (
            <ScrollableTabView
                style={styles.container}
                renderTabBar={() => <DefaultTabBar backgroundColor='rgba(255, 255, 255, 0.7)'/>}
                tabBarPosition='overlayTop'
            >
                <ScrollView tabLabel='iOS'>
                    <Icon name='logo-apple' color='black' size={300} style={styles.icon}/>
                    <Icon name='ios-phone-portrait' color='black' size={300} style={styles.icon}/>
                    <Icon name='logo-apple' color='#DBDDDE' size={300} style={styles.icon}/>
                    <Icon name='ios-phone-portrait' color='#DBDDDE' size={300} style={styles.icon}/>
                </ScrollView>
                <ScrollView tabLabel='Android'>
                    <Icon name='logo-android' color='#A4C639' size={300} style={styles.icon}/>
                    <Icon name='logo-android' color='black' size={300} style={styles.icon}/>
                    <Icon name='logo-android' color='brown' size={300} style={styles.icon}/>
                </ScrollView>
            </ScrollableTabView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        marginTop: 0,
    },
    icon: {
        width: 300,
        height: 300,
        alignSelf: 'center',
    },
});