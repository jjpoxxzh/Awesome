import React, { Component } from 'react';
import {
    Button,
    Text,
    View
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import { TabNavigator } from 'react-navigation';

// Home
class HomeScreen extends Component {

    static navigationOptions = {
        title: 'Welcome',
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Text>Hello, Chat App!</Text>
                <Button
                    onPress={() => navigate('Chat', { user: 'Lucy' })}
                    title="Chat with Lucy"
                />
            </View>
        );
    }
}

// Chat
class ChatScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `Chat with ${navigation.state.params.user}`,
    });

    render() {
        const { params } = this.props.navigation.state;
        return (
            <View>
                <Text>Chat with {params.user}</Text>
            </View>
        );
    }
}

// RecentChats
class RecentChatsScreen extends Component {
    render() {
        return (
            <View>
                <Text>List of recent chats</Text>
                <Button
                    onPress={() => this.props.navigation.navigate('Chat', { user: 'Lucy' })}
                    title="Chat with Lucy"
                />

            </View>
        );
    }
}

// AllContacts
class AllContactsScreen extends Component {
    render() {
        return (
            <View>
                <Text>List of all contacts</Text>
                <Button
                    onPress={() => this.props.navigation.navigate('Chat', { user: 'Lily' })}
                    title="Chat with Lily"
                />
            </View>
        )

    }
}

// 内层的 TabNavigator
const MainScreenNavigator = TabNavigator({
    Recent: { screen: RecentChatsScreen },
    All: { screen: AllContactsScreen },
});
MainScreenNavigator.navigationOptions = {
    title: 'My Chats',
};

// 外层的 StackNavigator
const stackNavigatorTest = StackNavigator({
    Home: { screen: MainScreenNavigator },
    Chat: { screen: ChatScreen },
});

export default stackNavigatorTest;
