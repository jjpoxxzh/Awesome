import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated,
} from 'react-native';

import RNTesterButton from './RNTesterButton';

/**
 * 缩放、平移、旋转动画
 */
export default class TransformBounceExample extends Component {

    constructor(props) {
        super(props);
        this.anim = this.anim || new Animated.Value(0);     // 动画初始值为0
    }

    render() {
        return (
            <View style={styles.container}>
                <RNTesterButton onPress={() => {
                    // 此动画改变anim的值
                    Animated.spring(this.anim, {
                        toValue: 0,   // 最后又变回0，即返回到起点
                        velocity: 3,  // 给它移动的速度
                        tension: -10, // 缓慢
                        friction: 1,  // 多次振荡
                    }).start();
                }}>
                    Press to Fling it!
              </RNTesterButton>
                <Animated.View
                    style={[styles.content, {
                        transform: [   // Array order matters
                            {
                                // scale 随着 anim 的变化而变化，anim为0时scale为1，anim为1时scale为4
                                scale: this.anim.interpolate({  // 缩放
                                    inputRange: [0, 1],
                                    outputRange: [1, 4],
                                })
                            },
                            {
                                // translateX 随着 anim 的变化而变化，anim为0时translateX为0，anim为1时scale接近500
                                translateX: this.anim.interpolate({ // 平移
                                    inputRange: [0, 1],
                                    outputRange: [0, 500],
                                })
                            },
                            {
                                // rotate 随着 anim 的变化而变化，anim为0时rotate为0deg，anim为1时360deg
                                rotate: this.anim.interpolate({ // 旋转
                                    inputRange: [0, 1],
                                    outputRange: [
                                        '0deg', '360deg' // 'deg' or 'rad'
                                    ],
                                })
                            },
                        ]
                    }
                    ]}>
                    <Text style={styles.tv}>Transforms!</Text>
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        backgroundColor: 'deepskyblue',
        borderWidth: 1,
        borderColor: 'dodgerblue',
        padding: 20,
        margin: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    tv: {
        fontSize: 28,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
});