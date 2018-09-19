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
        this.anim = this.anim || new Animated.Value(0);
    }

    render() {
        return (
            <View style={styles.container}>
                <RNTesterButton onPress={() => {
                    Animated.spring(this.anim, {
                        toValue: 0,   // 返回到起点
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
                                scale: this.anim.interpolate({  // 缩放
                                    inputRange: [0, 1],
                                    outputRange: [1, 4],
                                })
                            },
                            {
                                translateX: this.anim.interpolate({ // 平移
                                    inputRange: [0, 1],
                                    outputRange: [0, 500],
                                })
                            },
                            {
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