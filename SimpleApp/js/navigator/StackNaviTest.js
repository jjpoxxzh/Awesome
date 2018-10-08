import React, { Component } from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View
} from 'react-native';

import { StackNavigator, createStackNavigator } from 'react-navigation';


// Home界面
class HomeScreen extends Component {

    static navigationOptions = {
        title: 'Home',
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={stack_styles.container}>
                <View style={{ margin: 40, }}>
                    <Text >Hello, Chat App!</Text>
                </View>
                <Button
                    onPress={() => navigate('Chat', { user: 'Lucy' })}
                    title="联系Lucy"
                />
            </View>
        );
    }
}

// 对话界面
class ChatScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `与 ${navigation.state.params.user} 对话`,
    });

    render() {
        const { params } = this.props.navigation.state;
        return (
            <View style={stack_styles.container}>
                <View style={{ backgroundColor: 'white' }}>
                    <Text >正在与{params.user}交谈</Text>
                </View>
            </View>
        );
    }
}

const stack_styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#FFAC69',
    },
});

// StackNavigator 与 createStackNavigator 是一样的
export default createStackNavigator({
    Home: { screen: HomeScreen },
    Chat: { screen: ChatScreen },
});

