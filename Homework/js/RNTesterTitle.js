import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

/**
 * 顶部栏（显示标题）
 *
 */
export default class RNTesterTitle extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    {this.props.title}
                </Text>
            </View>
        );

    }
}

var styles = StyleSheet.create({
    container: {
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        margin: 10,     // 如果某一边有元素，则那一边的距离为0，需要另设置margin具体方向的属性，比如下面的marginBottom
        marginBottom: 0,
        height: 45,
        padding: 10,
        backgroundColor: 'white',
    },
    text: {
        fontSize: 19,
        fontWeight: '500',
    },
});