import React, { Component } from 'react';
import {
    Dimensions,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import FlexScrollView from './nativemodule/FlexScrollView';

var screen = Dimensions.get('window');

export default class Main extends Component {

    testString() {
        console.log(StatusBar.currentHeight);
        var arr = [{ name: 'a' }, { name: 'b' }, { name: 'c' }, { name: 'd' }];
        for (var i in arr) {
            console.log(i, arr[i]);
        }
    }

    render() {
        return (
            <FlexScrollView style={{ flex: 1, width: screen.width, height: screen.height, }}>
                <TouchableNativeFeedback style={mainstyles.container}>
                    <Text style={mainstyles.welcome}>
                        Welcome to React Native!
                    </Text>
                    <Text style={mainstyles.instructions}>
                        To get started, edit index.android.js
                    </Text>
                    <Text style={mainstyles.instructions}>
                        Double tap R on your keyboard to reload,{'\n'}
                        Shake or press menu button for dev menu
                    </Text>
                    <Text style={mainstyles.welcome}>
                        中华人民共和国大圣
                    </Text>
                </TouchableNativeFeedback>
            </FlexScrollView>
        );
    }

}

const mainstyles = StyleSheet.create({
    container: {
        width: screen.width,
        height: screen.height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        height: 100,
        textAlign: 'center',
        margin: 10,
        color: '#f32e37'
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        height: 80,
        marginBottom: 5,
    },
});
