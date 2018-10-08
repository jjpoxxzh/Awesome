import React, { Component } from 'react';
import {
    Button,
    Text,
    View
} from 'react-native';

import { TabNavigator } from 'react-navigation';


class RecentChatsScreen extends Component {
    render() {
        return (
            <View
                style={{ flex: 1, backgroundColor: '#FFAC69', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 22 }}>List of recent chats</Text>
            </View>
        );

    }
}

class AllContactsScreen extends Component {
    render() {
        return (
            <View
                style={{ flex: 1, backgroundColor: '#F08176', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 22 }}>List of all contacts</Text>
            </View>
        );
    }
}

const TabNavigatorTest = TabNavigator({
    Recent: { screen: RecentChatsScreen },
    All: { screen: AllContactsScreen },
});
TabNavigatorTest.navigationOptions = {
    title: 'My Chats',
};

export default TabNavigatorTest;
