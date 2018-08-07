import React, {Component} from 'react';
import {
    Button,
    Text,
    View
} from 'react-native';

import {StackNavigator} from 'react-navigation';
import {TabNavigator} from 'react-navigation';


class HomeScreen extends React.Component {

    static navigationOptions = {
        title: 'Welcome',
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View>
                <Text>Hello, Chat App!</Text>
                <Button
                    onPress={() => navigate('Chat', {user: 'Lucy'})}
                    title="Chat with Lucy"
                />
            </View>
        );
    }
}

class ChatScreen extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title: `Chat with ${navigation.state.params.user}`,
    });

    render() {
        const {params} = this.props.navigation.state;
        return (
            <View>
                <Text>Chat with {params.user}</Text>
            </View>
        );
    }
}


class RecentChatsScreen extends React.Component {
    render() {
        return (
            <View>
                <Text>List of recent chats</Text>
                <Button
                    onPress={() => this.props.navigation.navigate('Chat', {user: 'Lucy'})}
                    title="Chat with Lucy"
                />

            </View>
        );
    }
}

class AllContactsScreen extends React.Component {
    render() {
        return (
            <View>
                <Text>List of all contacts</Text>
                <Button
                    onPress={() => this.props.navigation.navigate('Chat', {user: 'Lucy'})}
                    title="Chat with Lucy"
                />
            </View>
        )

    }
}

const MainScreenNavigator = TabNavigator({
    Recent: {screen: RecentChatsScreen},
    All: {screen: AllContactsScreen},
});
MainScreenNavigator.navigationOptions = {
    title: 'My Chats',
};

const stack = StackNavigator({
    Home: {screen: MainScreenNavigator},
    Chat: {screen: ChatScreen},
});

module.exports = {
    simple: stack,
};
