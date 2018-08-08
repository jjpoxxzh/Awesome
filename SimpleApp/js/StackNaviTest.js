import React, {Component} from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {StackNavigator} from 'react-navigation';


// 第一个界面
class HomeScreen extends Component {

    static navigationOptions = {
        title: 'Home',
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={stack_styles.container}>
                <Text style={{width:120,height: 80, backgroundColor: 'white'}}>Hello, Chat App!</Text>
                <Button
                    onPress={() => navigate('Chat', {user: 'Lucy'})}
                    title="联系Lucy"
                />
            </View>
        );
    }
}

// 第二个界面
class ChatScreen extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title: `与 ${navigation.state.params.user} 对话`,
    });

    render() {
        const {params} = this.props.navigation.state;
        return (
            <View style={stack_styles.container}>
                <Text style={{height: 200, backgroundColor: '#bebebe'}}>正在与{params.user}交谈</Text>
            </View>
        );
    }
}

const stack_styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFAC69',
    },
});

export const stack = StackNavigator({
    Home: {screen: HomeScreen},
    Chat: {screen: ChatScreen},
});

module.exports = {
    simple: stack,
};
