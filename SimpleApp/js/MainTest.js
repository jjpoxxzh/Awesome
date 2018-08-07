import React, {Component} from 'react';
import {
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    Platform,
    View
} from 'react-native';

import {TAG} from './styleconfig';


/**
 * 此实例用于测试
 */
export default class Main extends Component {


    testString() {
        console.log(StatusBar.currentHeight)
        var arr = [{name: 'a'}, {name: 'b'}, {name: 'c'}, {name: 'd'}]
        for (var i in arr) {
            console.log(i, arr[i]);
        }
    }

    render() {
        return (
            <View style={mainstyles.container}>
                <TouchableOpacity onPress={() => {
                    this.testString();
                }}>
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
                </TouchableOpacity>
            </View>
        );
    }


}

const mainstyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#f32e37'
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
