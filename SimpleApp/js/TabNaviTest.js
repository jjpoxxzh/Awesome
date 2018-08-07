import React, {Component} from 'react';
import {
    Button,
    Text,
    View
} from 'react-native';

import {StackNavigator} from 'react-navigation';
import {TabNavigator} from 'react-navigation';


class RecentChatsScreen extends React.Component {
    render() {
        return (
            <View
                style={{flex: 1, backgroundColor: globalstyle.color_1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 22}}>List of recent chats</Text>
            </View>
        );

    }
}

class AllContactsScreen extends React.Component {
    render() {
        return (
            <View
                style={{flex: 1, backgroundColor: globalstyle.color_2, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 22}}>List of all contacts</Text>
            </View>
        );
    }
}

const MainScreenNavigator = TabNavigator({
    Recent: {screen: RecentChatsScreen},
    All: {screen: AllContactsScreen},
});
MainScreenNavigator.navigationOptions = {
    title: 'My Chats',
};

module.exports = {
    simple: MainScreenNavigator,
};
